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
        render json: school        
    end

    #may want to add strong params
    private
    def school_params
        params.permit(:name)
    end
end
