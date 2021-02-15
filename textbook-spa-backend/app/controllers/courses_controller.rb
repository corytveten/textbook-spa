class CoursesController < ApplicationController

    def index
        courses = Course.all
        render json: courses.to_json(:include => {:school => {:only => :name}}, :except => [:created_at, :updated_at]) 
    end

    def show
        course = Course.find_by(id: params[:id])
        render json: course.to_json(:include => {:school => {:only => :name}}, :except => [:created_at, :updated_at]) 
    end

end
