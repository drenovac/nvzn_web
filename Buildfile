# ===========================================================================
# Project:   Powerforce
# Copyright: ©2010 My Company, Inc.
# ===========================================================================

# Add initial buildfile information here
config :all,
    :required => [:sproutcore, :ki],
    :load_fixtures => true

config :aristo_theme, :theme_name => 'aristo-theme'

#server = "localhost:9292"
server = "www.roster-me.com.au:9292"

proxy '/api', :to => server