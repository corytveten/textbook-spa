class Course < ApplicationRecord
  belongs_to :school
  has_many :textbooks
  #validates :code, uniqueness: { scope: :code, message: "course already exists." }
end
