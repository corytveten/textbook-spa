class CourseSerializer
     
    def initialize(course_object)
      @course = course_object
    end
   
    def to_serialized_json
      @course.to_json(:include => {:school => {:only => :name}, :textbooks => {:only => [:title, :author, :edition]}}, :except => [:created_at, :updated_at])  
    end
   
  end