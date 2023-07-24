class AddColumn < ActiveRecord::Migration[6.1]
  def change
    add_column :categories, :image_Url, :string
  end
end
