# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require 'factory_girl'

FactoryGirl.create :user_role unless Role.find_by_name("User")
FactoryGirl.create :admin_role unless Role.find_by_name("Admin")
FactoryGirl.create :locked_role unless Role.find_by_name("Locked")
