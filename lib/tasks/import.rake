require 'twitter'

namespace :import do
  desc "import from twitter"
  task :twitter => :environment do
    client = Twitter::REST::Client.new do |config|
      config.consumer_key    ="3RxqXSt4dMu4Yp2y1bniAQ"
      config.consumer_secret = "LjKC12HbhR2eeZ9nHQcIngCwW7CWFIuTqnYpp7Dahw"
    end
    %w{sickstarfish sickseastar sickseastars deadstarfish deadseastar deadseastars}.each do |tag|
      client.search("#{tag} -rt").each do |tweet|
        pp tweet
      end
    end
  end
end

