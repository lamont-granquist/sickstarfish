class ChangeUri < ActiveRecord::Migration
  def change
    change_column :tweets, :uri, :string, :null => true
  end
end
