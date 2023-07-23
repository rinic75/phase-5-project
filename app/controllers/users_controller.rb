class UsersController < ApplicationController
  def signup
    user = User.create!(user_params)
    render json: user, status: :created
  end

  def auth
    user = User.find_by(id: session[:user_id])
    if user
      render json: user
    else
      render json: { error: "Not authorized" }, status: :unauthorized
    end
  end

  def index
    users = User.all
    render json: users
  end

  def create
    user = User.create!(user_params)
    render json: user, status: :created
  end

  def show 
    user = User.find_by(id: params[:id])
    render json: user.lists, include: :messages
  end

  private
  def user_params
    params.permit(:name, :email, :password, :zipcode)
  end

end
