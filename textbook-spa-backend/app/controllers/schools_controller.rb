class SchoolsController < ApplicationController
    
    def index
        schools = School.all
        render json: SchoolSerializer.new(schools).to_serialized_json
    end

    def show
        school = School.find_by(id: params[:id])
        render json: SchoolSerializer.new(school).to_serialized_json
    end

    def create
        school = School.create(school_params)
        if (school.save)
            render json: school        
        else
            render :error
        end
    end

    def destroy
        school = School.find_by(id: params[:id])
        school.destroy
        render json: {schoolId: school.id}
    end

    private
    def school_params
        params.permit(:name)
    end
end
