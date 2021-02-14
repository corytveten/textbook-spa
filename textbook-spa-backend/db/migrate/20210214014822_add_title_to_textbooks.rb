class AddTitleToTextbooks < ActiveRecord::Migration[5.2]
  def change
    add_column :textbooks, :title, :string
  end
end
