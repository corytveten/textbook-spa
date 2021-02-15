class TextbookSerializer
     
    def initialize(textbook_object)
      @textbook = textbook_object
    end
   
    def to_serialized_json
      @textbook.to_json(:include => {:course => {:only => [:code, :title]}}, :except => [:created_at, :updated_at])  
    end
   
  end