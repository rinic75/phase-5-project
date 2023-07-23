class ChangColumnName < ActiveRecord::Migration[6.1]
  def change
    rename_column :messages, :listing_id, :list_id
  end
end
