class Init < ActiveRecord::Migration
  def change
    drop_table :things

    create_table :tags do |t|
      t.string :tag_type  # eg "twitter", "facebook", "instagram"

      t.decimal :lat, :precision => 15, :scale => 10
      t.decimal :lng, :precision => 15, :scale => 10

      # twitter.uri
      t.string :uri
      # twitter.full_text
      t.string :full_text
      # twitter.user.name
      t.string :user_name
      # twitter user.profile_image_uri
      t.string :user_image_uri
      # image_uri
      t.string :image_uri

      t.timestamps
    end

    add_index :tags, [:lat, :lng]
  end
end
