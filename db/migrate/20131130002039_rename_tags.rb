class RenameTags < ActiveRecord::Migration
  def change
    rename_table :tags, :tweets
  end
end
