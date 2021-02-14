class CoursesController < ApplicationController

    def index
        courses = Course.all
        render json: courses, include: :school    
    end

    def show
        course = Course.find_by(id: params[:id])
        render json: course, include: :school
    end

end
