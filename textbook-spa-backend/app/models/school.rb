class School < ApplicationRecord
    has_many :courses, :dependent => :destroy
    validates :name, uniqueness: { case_sensitive: false, message: "School already exists."}
end
