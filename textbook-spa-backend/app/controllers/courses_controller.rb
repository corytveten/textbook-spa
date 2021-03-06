class CoursesController < ApplicationController

    def index
        courses = Course.order(:code)
        render json: CourseSerializer.new(courses).to_serialized_json
        
    end

    def show
        course = Course.find_by(id: params[:id])
        render json: CourseSerializer.new(course).to_serialized_json

    end

    def create
        school = School.find_by(id: params[:course][:schoolId])
        course = Course.create(course_params)
        if (course.save)
            render json: course        
        else
            render json: {error: course.errors}, status: 400
        end       
    end


    private
    def course_params
        params.permit(:code, :title, :school_id)
    end

end
