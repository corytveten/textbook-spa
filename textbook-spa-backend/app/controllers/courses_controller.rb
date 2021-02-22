class CoursesController < ApplicationController

    def index
        courses = Course.all
        render json: CourseSerializer.new(courses).to_serialized_json
        
    end

    #add logic so courses only appear once
    def show
        course = Course.find_by(id: params[:id])
        if (course)
            render json: CourseSerializer.new(course).to_serialized_json
        else
            render :error #{message: "no courses for school"}
        end
    end

    def create
        school = School.find_by(id: params[:schoolId])
        course = Course.create(code: params[:code], title: params[:title], school: school)
        render json: course        
    end

    #private
    #def course_params
    #    params.permit(:code, :title)
    #end

end
