class CoursesController < ApplicationController

    def index
        courses = Course.all
        render json: CourseSerializer.new(courses).to_serialized_json
        
    end

    #add logic so courses only appear once
    def show
        course = Course.find_by(id: params[:id])
        #if (course)
            render json: CourseSerializer.new(course).to_serialized_json
        #else
        #    render :error #{message: "no courses for school"}
        #end
    end

    def create
        #school = School.find_by(id: params[:course][:schoolId])
        course = Course.create(course_params)
        #if (course.save)
            render json: course        
        #else
        #    render :error
        #end       
    end

    def destroy
        
    end

    private
    def course_params
        params.permit(:code, :title, :school_id)
    end

end
