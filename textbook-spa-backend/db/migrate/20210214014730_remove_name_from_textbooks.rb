class RemoveNameFromTextbooks < ActiveRecord::Migration[5.2]
  def change
    remove_column :textbooks, :name, :string
  end
end
