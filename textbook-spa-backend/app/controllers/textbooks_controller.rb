class TextbooksController < ApplicationController

    def index
        textbooks = Textbook.all
        render json: TextbookSerializer.new(textbooks).to_serialized_json
    end

    def show
        textbook = Textbook.find_by(id: params[:id]) 
        render json: TextbookSerializer.new(textbook).to_serialized_json
    end

    def create
        textbook = Textbook.create(textbook_params)
        render json: textbook
    end

    def destroy
        textbook = Textbook.find_by(id: params[:id])
        textbook.destroy
        render json: textbook
    end

    private
    def textbook_params
        params.permit(:title, :author, :course_id)
    end

end
