class SchoolSerializer
     
  def initialize(school_object)
    @school = school_object
  end
 
  def to_serialized_json
    @school.to_json(:include => {:courses => {:only => [:code, :title]}}, :except => [:created_at, :updated_at])  
  end
 
end