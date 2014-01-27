# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20131130002041) do

  create_table "tweets", force: true do |t|
    t.string   "tweet_type"
    t.decimal  "lat",            precision: 15, scale: 10
    t.decimal  "lng",            precision: 15, scale: 10
    t.string   "uri"
    t.string   "full_text"
    t.string   "user_name"
    t.string   "user_image_uri"
    t.string   "image_uri"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "tweets", ["lat", "lng"], name: "index_tweets_on_lat_and_lng"

end
