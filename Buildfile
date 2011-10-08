# ===========================================================================
# Project:   Powerforce
# Copyright: ©2010 My Company, Inc.
# ===========================================================================

# Add initial buildfile information here
config :all,
    :required => [:sproutcore, 'sproutcore/table', 'ki'],
    :load_fixtures => true

config :aristo_theme, :theme_name => 'aristo-theme'

proxy '/api', :to => 'localhost:9292'