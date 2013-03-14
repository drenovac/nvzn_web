# -*- encoding: utf-8 -*-

Gem::Specification.new do |s|
  s.name = "jruby-openssl"
  s.version = "0.7.7"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.authors = ["Ola Bini and JRuby contributors"]
  s.date = "2012-05-21"
  s.description = "JRuby-OpenSSL is an add-on gem for JRuby that emulates the Ruby OpenSSL native library."
  s.email = "ola.bini@gmail.com"
  s.extra_rdoc_files = ["History.txt", "Manifest.txt", "README.txt", "License.txt"]
  s.files = ["History.txt", "Manifest.txt", "README.txt", "License.txt"]
  s.homepage = "https://github.com/jruby/jruby-ossl"
  s.rdoc_options = ["--main", "README.txt"]
  s.require_paths = ["lib/shared"]
  s.rubyforge_project = "jruby-extras"
  s.rubygems_version = "1.8.24"
  s.summary = "OpenSSL add-on for JRuby"

  if s.respond_to? :specification_version then
    s.specification_version = 3

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<bouncy-castle-java>, [">= 1.5.0146.1"])
      s.add_development_dependency(%q<rdoc>, ["~> 3.10"])
    else
      s.add_dependency(%q<bouncy-castle-java>, [">= 1.5.0146.1"])
      s.add_dependency(%q<rdoc>, ["~> 3.10"])
    end
  else
    s.add_dependency(%q<bouncy-castle-java>, [">= 1.5.0146.1"])
    s.add_dependency(%q<rdoc>, ["~> 3.10"])
  end
end
