class School < ApplicationRecord
    has_many :courses
    validates :name, uniqueness: { case_sensitvie: false, message: "School already exists."}
end
