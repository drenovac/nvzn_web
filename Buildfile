# ===========================================================================
# Project:   Powerforce
# Copyright: ©2010 My Company, Inc.
# ===========================================================================

# Add initial buildfile information here
config :nvzn,
    :required => [:sproutcore, :"more_cowbell", :ki, :tableview, :calendar, :'sproutcore/forms'],
    :theme => 'sproutcore/ace',
    :load_fixtures => true,
    :chrome_frame => true


server = "localhost:9292"
#server = "www.roster-me.com.au:9292"

proxy '/api', :to => server