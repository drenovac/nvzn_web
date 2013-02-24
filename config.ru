::DEFAULT_APP = 'nvzn'
::DEFAULT_LANGUAGE = 'en'
::CURRENT_BUILDS = {
  'nvzn' => File.open('VERSION') {|version| version.read}
}

require 'rubygems'
require './lib/static_asset'
require './lib/api'

run Sinatra::Application
