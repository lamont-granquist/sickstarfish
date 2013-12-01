require 'delegate'

class BoundedTweetQuery < SimpleDelegator
  def initialize(options = {})
    bb = options[:bb]
    relation = Tweet.all
    relation = relation.where("lng >= ? and lat >= ? and lng <= ? and lat <= ?", *bb.split(",")) if bb
    super(relation)
  end
end
