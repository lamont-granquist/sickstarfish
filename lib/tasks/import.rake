require 'twitter'
require 'uri'
require 'tempfile'
require 'exifr'

def find_image_url(text)
  URI.extract(text).each do |uri|
    uri = "http://distilleryimage8.ak.instagram.com/9df735305a1111e3a78d12f4d430b315_8.jpg"
    t = Tempfile.open("sickseastar")
    t.binmode
    resp = Net::HTTP.get_response(URI.parse(uri))
    if resp['content-type'] =~ /image/
      puts resp['content-type']
      t.write(resp.body)
      case resp['content-type']
      when "image/jpeg"
        pp EXIFR::JPEG.new(t.path).exif.lat
      when "image/tiff"
        pp EXIFR::TIFF.new(t.path).exif
      end
    end
  end
end

namespace :import do
  desc "import from twitter"
  task :twitter => :environment do
    client = Twitter::REST::Client.new do |config|
      config.consumer_key    ="3RxqXSt4dMu4Yp2y1bniAQ"
      config.consumer_secret = "LjKC12HbhR2eeZ9nHQcIngCwW7CWFIuTqnYpp7Dahw"
    end
    %w{sickstarfish sickseastar sickseastars deadstarfish deadseastar deadseastars}.each do |tag|
      client.search("#{tag} -rt").each do |tweet|
        t = Tweet.new(
          :tweet_type => "twitter",
          :uri => tweet.uri.normalize.to_s,
          :full_text => tweet.full_text,
          :user_name => tweet.user.name,
          :user_image_uri => tweet.user.profile_image_uri,
        )
        pp tweet.coordinates
#        t.image_url(find_image_url(t.full_text))
#        pp t
        # :lat
        # :lng
        #  :image_uri
#        t.save!
      end
    end
  end

  desc "import from instagram"
  task :instagram => :environment do
    Instagram.configure do |config|
      config.client_id     = ENV['INSTAGRAM_CLIENT_ID']
      config.client_secret = ENV['INSTAGRAM_CLIENT_SECRET']
    end
    %w{sickstarfish sickseastar sickseastars deadstarfish deadseastar deadseastars}.each do |tag|
      Instagram.tag_recent_media(tag).each do |media|
        next unless media.location && media.user
        next unless media.type == "image"
        t = Tweet.new(
          :tweet_type => "instagram",
          :uri => media.link,
          :full_text => media.caption.text,
          :user_name => media.user.username,
          :user_image_uri => media.user.profile_picture,
          :lat => media.location.latitude,
          :lng => media.location.longitude,
          :image_uri => media.images.thumbnail.url,
        )
        t.save rescue nil
      end
    end
  end
end

