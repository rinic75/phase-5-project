class CategoriesController < ApplicationController
  def index
    categories = Category.all
    render json: categories
  end
  
  def show
    category = Category.find(params[:id])
    render json: category.lists.to_json(include: :user)
  end

  def chart
    categories = Category.all
    category_list = categories.map do |category|
      {name: category.name, value: category.lists.count}
    end
    render json: category_list
  end

end
