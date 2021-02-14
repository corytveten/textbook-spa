class Course < ApplicationRecord
  belongs_to :school
  has_many :textbooks
end
