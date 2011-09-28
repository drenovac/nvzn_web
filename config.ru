::DEFAULT_APP = 'powerforce'
::DEFAULT_LANGUAGE = 'en'
::CURRENT_BUILDS = {
  'powerforce' => File.open('VERSION') {|version| version.read}
}

require './lib/static_asset'

run Sinatra::Application
