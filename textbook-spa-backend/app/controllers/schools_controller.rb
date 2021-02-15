class SchoolsController < ApplicationController
    
    def index
        schools = School.all
        render json: schools.to_json(:include => {:courses => {:only => [:code, :title]}}, :except => [:created_at, :updated_at])   
    end

    def show
        school = School.find_by(id: params[:id])
        render json: school.to_json(:include => {:courses => {:only => [:code, :title]}}, :except => [:created_at, :updated_at])  
    end
end
