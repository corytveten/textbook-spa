class CreateCourses < ActiveRecord::Migration[5.2]
  def change
    create_table :courses do |t|
      t.string :code
      t.string :title
      t.references :school, foreign_key: true

      t.timestamps
    end
  end
end
