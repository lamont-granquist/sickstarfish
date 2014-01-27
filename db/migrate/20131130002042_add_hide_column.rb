class AddHideColumn < ActiveRecord::Migration
  def change
    add_column :tweets, :hide, :boolean, default: false
  end
end
