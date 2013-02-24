require 'rubygems'
require 'active_record'
require 'activerecord-jdbc-adapter'
require './lib/sqljdbc4.jar'

require 'sinatra'
require 'rest_client'
require 'json'
require 'digest/sha2'

set :sessions, true

#COUCH = 'http://rectertupochastroyeysery:OKeJh8V1Rj8ABqXCvElfUCMj@geoffreyd.cloudant.com/nvzn'
COUCH = 'http://rectertupochastroyeysery:OKeJh8V1Rj8ABqXCvElfUCMj@10.1.1.50:5984/nvzn'

config = {
    #:url => "jdbc:sqlserver://10.1.1.50;databaseName=NVZN11",
    :url => "jdbc:sqlserver://10.1.1.50;databaseName=edmen",
    :adapter => "jdbc",
    :username => "sa",
    :password => "s1nemojP0werforce",
    :driver => 'com.microsoft.sqlserver.jdbc.SQLServerDriver'
}

#config = {
#  :url => "jdbc:jtds:sqlserver://10.1.1.50/edmen",
#  :adapter => "jdbcmssql",
#  :username => "sa",
#  :password => "s1nemojP0werforce"
#}

use Rack::Deflater

get '/api/v1.1/login' do
  halt 401, {'status' => "not authorised"}.to_json if !session || session[:username].blank?
  
  url = "#{COUCH}/#{session[:username]}"
  # TODO: Remove Password
  begin
    data = '{"status":"ok", "user":'+RestClient.get(url)+"}"
  rescue => e
    e.response
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
    
    session[:username] = username
    session[:id] = data["db_id"]
    body ({ :status => "ok", :user => data }).to_json
    
  rescue => e
    e.response
  end
end

get '/api/v1.1/logout' do
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
    SELECT RTC.roster_date, RTC.customer, RTC.employee,
    convert(varchar, RTC.ftime, 108) as finish, convert(varchar, RTC.stime, 108) as start,
    RTC.ftime, RTC.stime,
    EMPLOYEES.surname, EMPLOYEES.first_name,
    EMPLOYEES.photo_path, EMPLOYEES.contact_numbers,
    EMPLOYEES.employee_a_street, EMPLOYEES.employee_a_suburb,
    CNA.code, CNA.given_names, CNA.address, CNA.suburb, CNA.state, CNA.pcode,
    RTC.hour_type, ROSTER_TYPES.description
    FROM  RTC
    LEFT JOIN EMPLOYEES ON RTC.employee = EMPLOYEES.employee
    LEFT JOIN CNA ON RTC.customer = CNA.code
    LEFT JOIN ROSTER_TYPES ON RTC.hour_type = ROSTER_TYPES.code

    WHERE ROSTER_DATE BETWEEN '#{this_monday}' AND '#{next_sunday}'
    AND  customer IN (#{customer_id})
    ORDER BY customer,  employee, roster_date, stime, ftime
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
        :street => r['address'] || "",
        :suburb => r['suburb'] || "",
        :state  => r['state'] || "",
        :postcode => r['pcode'] || ""
      }
    }

    # info for single customer.
    customer['address'] ||= {
      :name => r['given_names'] || "",
      :street => r['address'] || "",
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
    SELECT ARTC.roster_date, ARTC.customer, ARTC.employee,
    convert(varchar, ARTC.ftime, 108) as finish, convert(varchar, ARTC.stime, 108) as start,
    ARTC.ftime, ARTC.stime,
    EMPLOYEES.surname, EMPLOYEES.first_name,
    EMPLOYEES.photo_path, EMPLOYEES.contact_numbers,
    EMPLOYEES.employee_a_street, EMPLOYEES.employee_a_suburb,
    CNA.code, CNA.given_names, CNA.address, CNA.suburb, CNA.state, CNA.pcode,
    ARTC.shift_type, ROSTER_TYPES.description
    FROM  ARTC
    LEFT JOIN EMPLOYEES ON ARTC.employee = EMPLOYEES.employee
    LEFT JOIN CNA ON ARTC.customer = CNA.code
    LEFT JOIN ROSTER_TYPES ON ARTC.shift_type = ROSTER_TYPES.code

    WHERE ROSTER_DATE BETWEEN '#{this_monday}' AND '#{next_sunday}'
    AND  customer IN (#{customer_id})
    ORDER BY customer,  employee, roster_date, stime, ftime
SQL
  #puts sql

  results = connection.execute(sql)
  results.each do |r|
    employee_id = 'ADHOC'
    tc_id = [employee_id, r['customer'], r['roster_date'], r['start'], r['finish']].join("*")
    c_code = r['code']

    # Customers list for multiple customers
    customers[c_code] ||= {
      :id => c_code,
      :address => {
        :street => r['address'] || "",
        :suburb => r['suburb'] || "",
        :state => r['state'] || "",
        :postcode => r['pcode'] || ""
      }
    }

    # info for single customer.
    customer['address'] ||= {
      :name => r['given_names'] || "",
      :street => r['address'] || "",
      :suburb => r['suburb'] || "",
      :state => r['state'] || "",
      :postcode => r['pcode'] || ""
    }

    employees[employee_id] ||= {
      :first_name => "ADHOC",
      :customer => "",
      :last_name => "",
      :photo_path => "",
      :contact_numbers => "",
      :address => "",
      :id => "ADHOC",
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

  customer['address'] ||= {}
  customer[:employees] = employees.map {|key| key[1][:id] }
  #employees.collect

  response = {
    :customer => customer,
    :customers => customers.map{|key| key[1] },
    :employees => employees.map {|key| key[1] },
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
  if !params[:week] || params[:week] == 0
    date = Date.today
  else
    date = Date.today + params[:week].to_i.weeks
  end
  this_monday = date.monday.to_formatted_s("%Y-%m-%d")
  if params[:weeks]
    next_sunday = (date+params[:weeks].to_i.weeks).sunday.to_formatted_s("%Y-%m-%d")
  else
    next_sunday = date.sunday.to_formatted_s("%Y-%m-%d")
  end
  # this_monday = '2010-09-27'
  # next_friday = '2010-10-03'

  sql =<<SQL
    SELECT RTC.roster_date, RTC.customer, RTC.employee,
    convert(varchar, RTC.ftime, 108) as finish, convert(varchar, RTC.stime, 108) as start,
    RTC.ftime, RTC.stime,
    EMPLOYEES.surname, EMPLOYEES.first_name,
    EMPLOYEES.photo_path, EMPLOYEES.contact_numbers,
    EMPLOYEES.employee_a_street, EMPLOYEES.employee_a_suburb,
    CNA.code, CNA.given_names, CNA.address, CNA.suburb, CNA.state, CNA.pcode,
    RTC.hour_type, ROSTER_TYPES.description
    FROM  RTC
    LEFT JOIN EMPLOYEES ON RTC.employee = EMPLOYEES.employee
    LEFT JOIN CNA ON RTC.customer = CNA.code
    LEFT JOIN ROSTER_TYPES ON RTC.hour_type = ROSTER_TYPES.code

    WHERE ROSTER_DATE BETWEEN '#{this_monday}' AND '#{next_sunday}'
    AND  EMPLOYEES.EMPLOYEE = '#{employee}'
    ORDER BY employee, customer, roster_date, stime, ftime
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
      :contact_numbers => r['contact_numbers'].to_s.split('<vm/>'),
      :address => [r['employee_a_street'], r['employee_a_suburb']].compact.reject(&:blank?).join(", "),
      :id => employee_id,
      :timeCards => []
    }

    customers[r['code']] ||= {
      :id => r['code'],
      :address => {
        :street => r['address'] || "",
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
    INSERT INTO APPROVED_TIMESHEETS (rtc_id, user_id, stime, ftime) VALUES
SQL

  changeset['TimeCard']['attributes'].each do |id, tc|
    rows << "('#{id}', '#{session[:username]}', '#{tc['start']}', '#{tc['finish']}')"
  end
  sql << rows.join(", ")

  json_sql =<<SQL
    INSERT INTO APPROVED_TIMESHEETS (misc_1) VALUES
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