class Course < ApplicationRecord
  belongs_to :school
  has_many :textbooks
  validates :code, uniqueness: { scope: :school_id, message: "course already exists." }
end
