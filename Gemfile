source "https://rubygems.org"

gem "rails", "~> 4.0.0"
gem "sass-rails", "~> 4.0.0"
gem "coffee-rails", "~> 4.0.0"

#gem "turbolinks"
gem "jbuilder", "~> 1.0.1"

group :production do
  gem "mysql2"
  gem "unicorn"
end

group :development, :test do
  gem "sqlite3"
  gem "puma"
end

gem "uglifier", ">= 1.0.3"
gem "therubyracer", "~> 0.10.2", require: "v8"
gem "bootstrap-sass", "~> 3.0"

gem "figaro"
gem "bootstrap_form"
gem "rake", "~> 0.9.3.beta.1"
gem "will_paginate"
gem "will_paginate-bootstrap"
gem "font-awesome-rails"

# javascript mapping
gem 'leaflet-rails'

# twitter API to search tweets
gem 'twitter'

# reading EXIF data
gem 'exifr'

# searching instagram
gem 'faraday', '~> 0.8.0'
gem 'instagram'

# acct management
gem 'devise'
gem 'cancan'
gem 'omniauth-twitter'
gem 'omniauth-facebook'
gem 'omniauth-instagram'
gem 'uuidtools'

group :test do
  gem "shoulda"
end

group :development, :test do
  gem "rspec-rails"
  gem "simplecov"
  gem "factory_girl_rails"
  gem "capybara"
end

group :development do
  gem "rails3-generators"
  gem "better_errors"
  gem "binding_of_caller"
  gem "meta_request"
  gem "pry"
  gem "pry-rails"
end
