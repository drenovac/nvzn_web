require 'rubygems'
require 'active_record'
require 'activerecord-jdbc-adapter'
require './lib/sqljdbc4.jar'

require 'sinatra'
require 'json'

# Serve up static assets with a long expiration header

config = {
  :url => "jdbc:sqlserver://110.175.29.142;databaseName=NVZN11",
  :adapter => "jdbc",
  :username => "sa",
  :password => "s1nemojP0werforce",
  :driver => 'com.microsoft.sqlserver.jdbc.SQLServerDriver'
}

use Rack::Deflater

get '/api/v1.1/site/timecards' do

  ActiveRecord::Base.establish_connection( config )
  connection = ActiveRecord::Base.connection

  #customer = params[:customer]
  customer = 'WESCHAT'
  #this_monday = Date.today.monday.to_formatted_s("%d %d %Y")
  #next_friday = Date.today.next_week(:sunday).to_formatted_s("%d %d %Y")
  this_monday = '14 FEB 2011'
  next_friday = '20 FEB 2011'

  sql =<<SQL
    SELECT ROSTER_TIMECARD.roster_date, ROSTER_TIMECARD.customer, ROSTER_TIMECARD.employee,
    ROSTER_TIMECARD.ftime, ROSTER_TIMECARD.stime, employee.surname, employee.first_name
    FROM  ROSTER_TIMECARD INNER JOIN
          EMPLOYEE ON ROSTER_TIMECARD.employee = EMPLOYEE.employee INNER JOIN
          CNA ON ROSTER_TIMECARD.customer = CNA.code

    WHERE roster_date >= '#{this_monday}' AND roster_date <= '#{next_friday}'
    AND  customer = '#{customer}'
    ORDER BY customer,  employee, roster_date, stime, ftime
SQL

  response = {
      :name => params[:customer],
      :employees => {}
  }
  results = connection.execute(sql)
  employees = {}

  results.each do |r|

    employee_id = r['employee']
    employees[employee_id] ||= {
      :first_name => r['first_name'],
      :last_name => r['surname'],
      :id => employee_id,
      :timeCards => []
    }

    employees[employee_id][:timeCards] << {
      :date => r['roster_date'],
      :start => r['stime'],
      :finish => r['ftime']
    }
  end

  response[:employees] = employees.map {|key| key[1] }
  employees.collect

  ActiveRecord::Base.clear_active_connections!

  #response = '[' << response.join(",\n") << ']' # JSON output
  #response = response.join(",\n")
  response.to_json

end
