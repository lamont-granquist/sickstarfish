class Tweet < ActiveRecord::Base
   TWEET_TYPES = [ "twitter", "instagram", "facebook" ]

   validates :tweet_type, inclusion: TWEET_TYPES

   validates :lat, :numericality => { :greater_than_or_equal_to => -90, :less_than_or_equal_to => 90 }, :presence => true
   validates :lng, :numericality => { :greater_than_or_equal_to => -180, :less_than_or_equal_to => 180 }, :presence => true

   validates_presence_of :uri
   validates_presence_of :full_text
   validates_presence_of :user_name
   validates_presence_of :user_image_uri  # what about default twitter image?
   validates_presence_of :image_uri

   validates_uniqueness_of :uri


end

