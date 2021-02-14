class TextbooksController < ApplicationController

    def index
        textbooks = Textbook.all
        render json: textbooks, include: :course   
    end

    def show
        textbook = Textbook.find_by(id: params[:id])
        render json: textbook, include: :course
    end

end
