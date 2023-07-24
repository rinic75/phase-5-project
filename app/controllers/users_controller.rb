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
    messages = Message.where(receiver_id: user.id)
    data = {
      lists: user.lists,
      messages: messages
    }
  
    render json: data
  end

  def received_messages
    current_user_id = params[:user_id]
    received_messages = Message.where(receiver_id: current_user_id)
    render json: received_messages
  end

  def sent_messages
    user_id = params[:user_id]
    @sent_messages = Message.where(sender_id: user_id)
    render json: @sent_messages
  end

  private
  def user_params
    params.permit(:name, :email, :password, :zipcode)
  end

end
