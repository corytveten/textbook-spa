class Course < ApplicationRecord
  belongs_to :school
  has_many :textbooks, :dependent => :destroy 
  validates :code, uniqueness: { scope: :school, message: "course already exists." }
end
