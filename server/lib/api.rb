require 'rubygems'
require 'active_record'
require 'activerecord-jdbc-adapter'
require './lib/sqljdbc4.jar'

require 'sinatra'
require 'rest_client'
require 'json'
require 'digest/sha2'

set :sessions, true

COUCH = 'http://rectertupochastroyeysery:OKeJh8V1Rj8ABqXCvElfUCMj@geoffreyd.cloudant.com/nvzn'

config = {
    :url => "jdbc:sqlserver://10.1.1.50;databaseName=NVZN11",
    :adapter => "jdbc",
    :username => "sa",
    :password => "s1nemojP0werforce",
    :driver => 'com.microsoft.sqlserver.jdbc.SQLServerDriver'
}

#config = {
#  :url => "jdbc:sqlserver://203.44.138.69;databaseName=NVZN11",
#  :adapter => "jdbc",
#  :username => "sa",
#  :password => "edmen",
#  :driver => 'com.microsoft.sqlserver.jdbc.SQLServerDriver'
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

  customer_id = params[:customer]
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

  sql =<<SQL
    SELECT ROSTER_TIMECARD.roster_date, ROSTER_TIMECARD.customer, ROSTER_TIMECARD.employee,
    convert(varchar, ROSTER_TIMECARD.ftime, 108) as finish, convert(varchar, ROSTER_TIMECARD.stime, 108) as start,
    employee.surname, employee.first_name,
    employee.photo_path, employee.contact_numbers,
    employee.employee_a_street, employee.employee_a_suburb
    FROM  ROSTER_TIMECARD INNER JOIN
          EMPLOYEE ON ROSTER_TIMECARD.employee = EMPLOYEE.employee INNER JOIN
          CNA ON ROSTER_TIMECARD.customer = CNA.code

    WHERE ROSTER_DATE BETWEEN '#{this_monday}' AND '#{next_sunday}'
    AND  customer = '#{customer_id}'
    ORDER BY customer,  employee, roster_date, stime, ftime
SQL

  #puts sql

  customer = {
      :id => customer_id,
      :employees => {},
      :start => this_monday,
      :finish => next_sunday
  }
  results = connection.execute(sql)
  employees = {}
  timecards = []

  results.each do |r|
    tc_id = rand().to_s.slice(2..-1)

    employee_id = r['employee']
    employees[employee_id] ||= {
      :first_name => r['first_name'],
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
      :finish => r['finish']
    }
  end

  customer[:employees] = employees.map {|key| key[1][:id] }
  #employees.collect

  response = {
    :customer => customer,
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
  next_sunday = date.sunday.to_formatted_s("%Y-%m-%d")
  # this_monday = '2010-09-27'
  # next_friday = '2010-10-03'

  sql =<<SQL
    SELECT ROSTER_TIMECARD.roster_date, ROSTER_TIMECARD.customer, ROSTER_TIMECARD.employee,
    substring(convert(varchar ROSTER_TIMECARD.ftime 108)), ROSTER_TIMECARD.stime, employee.surname, employee.first_name
    FROM  ROSTER_TIMECARD INNER JOIN
          EMPLOYEE ON ROSTER_TIMECARD.employee = EMPLOYEE.employee INNER JOIN
          CNA ON ROSTER_TIMECARD.customer = CNA.code

    WHERE ROSTER_DATE BETWEEN '#{this_monday}' AND '#{next_sunday}'
    AND  EMPLOYEE.EMPLOYEE = '#{employee}'
    ORDER BY employee, customer, roster_date, stime, ftime
SQL

  response = nil
  results = connection.execute(sql)
  employees = {}

  results.each do |r|

    response ||= {
      :first_name => r['first_name'],
      :last_name => r['surname'],
      :id => employee,
      :timeCards => []
    }

    response[:timeCards] << {
      :customer => r['customer'],
      :date => r['roster_date'],
      :start => r['stime'],
      :finish => r['ftime']
    }
  end
  
  response = {:id => employee, :timeCards => []} unless response

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
    INSERT INTO APPROVED_TIMESHEETS (misc_2) VALUES
    ('#{json}')
SQL

  ActiveRecord::Base.establish_connection( config )
  connection = ActiveRecord::Base.connection
  results = connection.execute(sql)
  #connection.execute(json_sql)

  ActiveRecord::Base.clear_active_connections!

  body ( {:status => 'ok'} ).to_json
end

# get '/api/:path' do
#   path = params[:path]
#   url = "#{COUCH}/#{path}"
#   puts "GET #{url}"
#   begin
#     data = RestClient.get url
#   rescue => e
#     e.response
#   end
# end
# 
# post '/api/:path' do
#   path = params[:path]
#   # this is a preferences request
#   url = "#{DB}/#{path}"
#   puts "POST #{url}"
#   puts request.body.string
#   begin
#     data = RestClient.post url, request.body
#   rescue => e
#     e.response
#   end
# end

get '/favicon.ico' do
  return
end