class TextbooksController < ApplicationController

    def index
        textbooks = Textbook.all
        #render json: textbooks.to_json(:include => {:course => {:only => [:code, :title]}}, :except => [:created_at, :updated_at]) 
        render json: TextbookSerializer.new(textbooks).to_serialized_json
    end

    def show
        textbook = Textbook.find_by(id: params[:id])
        #render json: textbook.to_json(:include => {:course => {:only => [:code, :title]}}, :except => [:created_at, :updated_at]) 
        render json: TextbookSerializer.new(textbook).to_serialized_json
    end

    def create

    end

end
