class RenameTagType < ActiveRecord::Migration
  def change
    rename_column :tweets, :tag_type, :tweet_type
  end
end
