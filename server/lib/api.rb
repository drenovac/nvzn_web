# require 'rubygems'
require 'active_record'
require 'activerecord-jdbc-adapter'
require './lib/sqljdbc4.jar'

require 'sinatra'
require 'rest_client'
require 'json'
require 'digest/sha2'
require 'yaml'

set :sessions, true

settings = YAML.load_file('config.yml')

COUCH = settings['couch']

config = settings['db']

module Rack
  class ChromeFrame
    def initialize(app)
      @app = app
    end

    def call(env)
      status, headers, response = @app.call(env)
      headers["X-UA-Compatible"] ||= "chrome=1"
      [status, headers, response]
    end
  end
end

use Rack::Deflater
use Rack::ChromeFrame

get '/api/v1.1/login' do
  halt 401, {'status' => "not authorised"}.to_json if !session || session[:username].blank?
  
  url = "#{COUCH}/#{session[:username]}"
  # TODO: Remove Password
  begin
    data = '{"status":"ok", "user":'+RestClient.get(url)+"}"
  rescue => e
    '{"error": "'+e.inspect+'"}'
  end
  
end

post '/api/v1.1/login' do
  request.body.rewind  # in case someone already read it
  post = JSON.parse request.body.read
  username = post['username']
  password = Digest::SHA2.hexdigest(post['password'])

  url = "#{COUCH}/#{username}"
  
  begin
    data = JSON.parse(RestClient.get(url))
    puts "logging in: #{url}"
    
    halt 401, { :status => 'unauthorised', :data => data }.to_json unless data["reason"].blank?
    halt 401, { :status => 'unauthorised', :password => password, :data => data, :post => post }.to_json if data["password"] != password
    halt 500, { 
      :status => 'User is incomplete',
      :details => 'The Field `company` is missing'
    }.to_json if data['company'].blank?
    
    session[:username] = username
    session[:id] = data["db_id"]
    session[:company] = data['company']
    body ({ :status => "ok", :user => data }).to_json
    
  rescue => e
    e.inspect
  end
end

get '/api/v1.1/logout' do
  session[:username] = nil # IE doesn't work without this.
  session.clear
  body ({ :status => "ok" }).to_json
end

post '/api/v1.1/user' do
  request.body.rewind  # in case someone already read it
  post = JSON.parse request.body.read
  # TODO: read full user from the session, and update with new values
end

get '/api/v1.1/site/:customer/timecards' do
  
  halt 401, {'status' => "not authorised"}.to_json if session[:username].blank?

  ActiveRecord::Base.establish_connection( config )
  connection = ActiveRecord::Base.connection

  customer_id = params[:customer].gsub(/['"]/, "").split(",").map do |c|
    "'#{c}'"
  end.join(",")
  # customer = session[:id]
  company = session[:company]
  if !params[:week] || params[:week] == 0
    date = Date.today
  else
    date = Date.today + params[:week].to_i.weeks
  end
  this_monday = date.monday.to_formatted_s("%Y-%m-%d")
  next_sunday = date.sunday.to_formatted_s("%Y-%m-%d")
  # this_monday = '2010-09-27'
  # next_friday = '2010-10-03'

  customer = {
    :id => customer_id,
    :employees => {},
    :start => this_monday,
    :finish => next_sunday
  }
  #results = connection.execute(sql)
  customers = {}
  employees = {}
  timecards = []

  # GET Standard Timecards
  sql =<<SQL
    SELECT rtc.roster_date, rtc.customer, rtc.employee,
    convert(varchar, rtc.ftime, 108) as finish, convert(varchar, rtc.stime, 108) as start,
    rtc.ftime, rtc.stime,
    employees.surname, employees.first_name,
    employees.photo_path, employees.contact_numbers,
    employees.employee_a_street, employees.employee_a_suburb,
    cna.code, cna.given_name, cna.address, cna.suburb, cna.state, cna.pcode,
    rtc.hour_type, roster_types.description
    FROM  rtc
    LEFT JOIN employees ON rtc.employee = employees.employee
    LEFT JOIN cna ON rtc.customer = cna.code
    LEFT JOIN roster_types ON rtc.hour_type = roster_types.code

    WHERE roster_date BETWEEN '#{this_monday}' AND '#{next_sunday}'
    AND  customer IN (#{customer_id})
    AND employees.company = '#{company}'
    AND rtc.company = '#{company}'
    ORDER BY customer,  employee, surname, roster_date, stime, ftime
SQL
  #puts sql

  results = connection.execute(sql)
  results.each do |r|
    employee_id = r['employee']
    tc_id = [employee_id,r['customer'],r['roster_date'],r['start'],r['finish']].join("*")
    c_code = r['code']

    # Customers list for multiple customers
    customers[c_code] ||= {
      :id => c_code,
      :address => {
        :street => (r['address'] || "").split("@VM@").join(" "),
        :suburb => r['suburb'] || "",
        :state  => r['state'] || "",
        :postcode => r['pcode'] || ""
      }
    }

    # info for single customer.
    customer['address'] ||= {
      :name => r['given_name'] || "",
      :street => (r['address'] || "").split("@VM@").join(" "),
      :suburb => r['suburb'] || "",
      :state  => r['state'] || "",
      :postcode => r['pcode'] || ""
    }

    employees[employee_id] ||= {
      :first_name => r['first_name'],
      :customer => r['customer'],
      :last_name => r['surname'],
      :photo_path=> r['photo_path'],
      :contact_numbers => r['contact_numbers'].to_s.split('<vm/>'),
      :address => [r['employee_a_street'],r['employee_a_suburb']].compact.reject(&:blank?).join(", "),
      :id => employee_id,
      :timeCards => []
    }

    employees[employee_id][:timeCards] << tc_id
    timecards << {
      :id => tc_id,
      :employee => employee_id,
      :customer => r['customer'],
      :date => r['roster_date'],
      :start => r['start'],
      :finish => r['finish'],
      :type => r['hour_type'],
      :desc => r['description']
    }
  end

  # GET AdHoc Timecards
  sql =<<SQL
    SELECT artc.roster_date, artc.customer, artc.employee,
    convert(varchar, artc.ftime, 108) as finish, convert(varchar, artc.stime, 108) as start,
    artc.ftime, artc.stime,
    employees.surname, employees.first_name,
    employees.photo_path, employees.contact_numbers,
    employees.employee_a_street, employees.employee_a_suburb,
    cna.code, cna.given_name, cna.address, cna.suburb, cna.state, cna.pcode,
    artc.shift_type, roster_types.description
    FROM  artc
    LEFT JOIN employees ON artc.employee = employees.employee
    LEFT JOIN cna ON artc.customer = cna.code
    LEFT JOIN roster_types ON artc.shift_type = roster_types.code

    WHERE roster_date BETWEEN '#{this_monday}' AND '#{next_sunday}'
    AND  customer IN (#{customer_id})
    AND employees.company = '#{company}'
    AND artc.company = '#{company}'
    ORDER BY customer,  employee, surname, roster_date, stime, ftime
SQL
  #puts sql

  adhoc_emoloyee = nil
  results = connection.execute(sql)
  results.each do |r|
    c_code = r['code']
    no_fill = r['description'] == 'No Fill'
    employee_id = 'ADHOC'+c_code
    employee_id += 'NoFill' if no_fill
    tc_id = ['ADHOC', r['customer'], r['roster_date'], r['start'], r['finish']].join("*")

    # Customers list for multiple customers. Added if there are only adhoc shifts
    customers[c_code] ||= {
      :id => c_code,
      :address => {
        :street => (r['address'] || '').split("@VM@").join(' '),
        :suburb => r['suburb'] || '',
        :state => r['state'] || '',
        :postcode => r['pcode'] || ''
      }
    }

    # info for single customer that only has adhoc shifts.
    customer['address'] ||= {
      :name => r['given_name'] || "",
      :street => (r['address'] || "").split("@VM@").join(" "),
      :suburb => r['suburb'] || "",
      :state => r['state'] || "",
      :postcode => r['pcode'] || ""
    }

    employees[employee_id] ||= {
      :first_name => no_fill ? 'ADHOCNOFILL' : 'ADHOC',
      :customer => r['customer'],
      :last_name => "~"+(no_fill ? "z" : "a"),
      :photo_path => "",
      :contact_numbers => "",
      :address => "",
      :id => employee_id,
      :timeCards => []
    }

    employees[employee_id][:timeCards] << tc_id
    timecards << {
      :id => tc_id,
      :employee => employee_id,
      :customer => r['customer'],
      :date => r['roster_date'],
      :start => r['start'],
      :finish => r['finish'],
      :type => r['shift_type'],
      :desc => r['description']
    }
  end

  # GET Cancelled Timecards
  sql =<<SQL
    SELECT crtc.roster_date, crtc.customer, crtc.employee, canx_rtc_id,
    convert(varchar, crtc.ftime, 108) as finish, convert(varchar, crtc.stime, 108) as start,
    crtc.ftime, crtc.stime,
    cna.code, cna.given_name, cna.address, cna.suburb, cna.state, cna.pcode,
    crtc.reason as description
    FROM  crtc
    LEFT JOIN cna ON crtc.customer = cna.code

    WHERE roster_date BETWEEN '#{this_monday}' AND '#{next_sunday}'
    AND  customer IN (#{customer_id})
    AND crtc.company = '#{company}'
    ORDER BY customer,  employee, roster_date, canx_rtc_id
SQL
  #puts sql

  results = connection.execute(sql)
  #results = []
  results.each do |r|
    c_code = r['customer']
    employee_id = 'CANCELLED'+c_code
    tc_id = ['CANCELLED', r['canx_rtc_id']].join('*')

    # Customers list for multiple customers. Added if there are only adhoc shifts
    customers[c_code] ||= {
      :id => c_code,
      :address => {
        :street => (r['address'] || '').split('@VM@').join(' '),
        :suburb => r['suburb'] || '',
        :state => r['state'] || '',
        :postcode => r['pcode'] || ''
      }
    }

    # info for single customer that only has cancelled shifts.
    customer['address'] ||= {
      :name => r['given_name'] || '',
      :street => (r['address'] || '').split('@VM@').join(' '),
      :suburb => r['suburb'] || '',
      :state => r['state'] || '',
      :postcode => r['pcode'] || ''
    }

    employees[employee_id] ||= {
      :first_name => 'CANCELLED',
      :customer => r['customer'],
      :last_name => '~h',
      :photo_path => '',
      :contact_numbers => '',
      :address => '',
      :id => employee_id,
      :timeCards => []
    }

    employees[employee_id][:timeCards] << tc_id
    timecards << {
      :id => tc_id,
      :employee => employee_id,
      :customer => r['customer'],
      :date => r['roster_date'],
      :start => r['start'],
      :finish => r['finish'],
      :type => 'Cancelled',
      :desc => r['description']
    }
  end

  customer['address'] ||= {}
  customer[:employees] = employees.values.sort { |a, b|
    if a[:customer] == b[:customer]
      a[:last_name] <=> b[:last_name]
    else
      a[:customer] <=> b[:customer]
    end
  }.map {|o| o[:id] }

  #if adhoc_emoloyee
  #  customer[:employees] << 'ADHOC'
  #  employees['ADHOC'] = adhoc_emoloyee
  #end
  #TODO: .push(*canceled)

  response = {
    :customer => customer,
    :customers => customers.values,
    :employees => employees.values,
    :timecards => timecards
  }

  ActiveRecord::Base.clear_active_connections!

  response.to_json

end

get '/api/v1.1/employee/timecards' do
  
  halt 401, {'status' => "not authorised"}.to_json if session[:username].blank?

  ActiveRecord::Base.establish_connection( config )
  connection = ActiveRecord::Base.connection

  #customer = params[:customer]
  employee = session[:id]
  company  = session[:company]
  if !params[:week] || params[:week] == 0
    date = Date.today
  else
    date = Date.today + params[:week].to_i.weeks
  end
  this_monday = date.monday.to_formatted_s("%Y-%m-%d")
  if params[:weeks]
    next_sunday = (date.monday+params[:weeks].to_i.weeks).to_formatted_s("%Y-%m-%d")
  else
    next_sunday = date.sunday.to_formatted_s("%Y-%m-%d")
  end
  # this_monday = '2010-09-27'
  # next_friday = '2010-10-03'

  sql =<<SQL
    SELECT rtc.roster_date, rtc.customer, rtc.employee,
    convert(varchar, rtc.ftime, 108) as finish, convert(varchar, rtc.stime, 108) as start,
    rtc.ftime, rtc.stime,
    employees.surname, employees.first_name,
    employees.photo_path, employees.contact_numbers,
    employees.employee_a_street, employees.employee_a_suburb,
    cna.code, cna.given_name, cna.address, cna.suburb, cna.state, cna.pcode,
    rtc.hour_type, roster_types.description
    FROM  rtc
    LEFT JOIN employees ON rtc.employee = employees.employee
    LEFT JOIN cna ON rtc.customer = cna.code
    LEFT JOIN roster_types ON rtc.hour_type = roster_types.code

    WHERE roster_date BETWEEN '#{this_monday}' AND '#{next_sunday}'
    AND  employees.employee = '#{employee}'
    AND  rtc.company = '#{company}'
    ORDER BY employee, customer, surname, roster_date, stime, ftime
SQL
  puts sql

  emp = nil
  results = connection.execute(sql)
  employees = {}
  customers = {}
  timecards = []

  results.each do |r|
    employee_id = r['employee']
    tc_id = [employee_id,r['customer'],r['roster_date'],r['start'],r['finish']].join("*")

    emp ||= {
      :first_name => r['first_name'],
      :customer => r['customer'],
      :last_name => r['surname'],
      :photo_path => r['photo_path'],
      :contact_numbers => r['contact_numbers'].to_s.split('@vm@'),
      :address => [r['employee_a_street'], r['employee_a_suburb']].compact.reject(&:blank?).join(", "),
      :id => employee_id,
      :timeCards => []
    }

    customers[r['code']] ||= {
      :id => r['code'],
      :address => {
        :street => (r['address'] || "").split("@VM@").join(" "),
        :suburb => r['suburb'] || "",
        :state  => r['state'] || "",
        :postcode => r['pcode'] || ""
      }
    }

    emp[:timeCards] << tc_id
    timecards << {
      :id => tc_id,
      :employee => employee_id,
      :customer => r['customer'],
      :date => r['roster_date'],
      :start => r['start'],
      :finish => r['finish'],
      :type => r['hour_type'],
      :desc => r['description']
    }
  end

  emp ||= {:id => employee, timecards => []}
  
  response = {
    :employee => emp,
    :timecards => timecards,
    :customers => customers.map {|key| key[1] }
  }

  ActiveRecord::Base.clear_active_connections!

  response.to_json

end

post '/api/v1.1/timecards' do
  json = request.body.read
  changeset = JSON.parse json
  puts "Got changeset: "+changeset.inspect
  rows = []

  sql =<<SQL
    INSERT INTO approved_timesheets (rtc_id, user_id, stime, ftime) VALUES
SQL

  changeset['TimeCard']['attributes'].each do |id, tc|
    rows << "('#{id}', '#{session[:username]}', '#{tc['start']}', '#{tc['finish']}')"
  end
  sql << rows.join(", ")

  json_sql =<<SQL
    INSERT INTO approved_timesheets (misc_1) VALUES
    ('#{json}')
SQL

  ActiveRecord::Base.establish_connection( config )
  connection = ActiveRecord::Base.connection
  results = connection.execute(sql)
  #connection.execute(json_sql)

  ActiveRecord::Base.clear_active_connections!

  body ( {:status => 'ok'} ).to_json
end


get '/favicon.ico' do
  return
end
