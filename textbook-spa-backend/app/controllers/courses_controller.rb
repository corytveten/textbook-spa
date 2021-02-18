class CoursesController < ApplicationController

    def index
        courses = Course.all
        render json: CourseSerializer.new(courses).to_serialized_json
    end

    def show
        course = Course.find_by(id: params[:id])
        if (course)
            render json: CourseSerializer.new(course).to_serialized_json
        else
            render json: {message: "no courses for school"}
        end
    end

end
