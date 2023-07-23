class ListsController < ApplicationController
  def index
    lists = List.all
    render json: lists
  end

  def show 
    list = List.find(params[:id])
    render json: list.to_json(include: :messages)
  end

  def create
    list = List.create!(list_params)
    render json: list, status: :created
  end

  def update
    list = List.find(params[:id])
    list.update(list_params)
    render json: list
  end

  def destroy
    list = List.find(params[:id])
    list.destroy
    head :no_content
  end

  private
  def list_params
    params.permit(:title, :description, :price, :image, :category_id, :user_id)
  end
end
