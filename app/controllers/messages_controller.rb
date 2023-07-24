class MessagesController < ApplicationController
  
  def index
    messages = Message.all
    render json: messages
  end

  def show
    user = User.find(params[:id])
    message = Message.find(user.id)
    render json: message
  end

  def create
    message = Message.create!(message_params)
    render json: message, status: :created
  end

  def destroy
    message = Message.find(params[:id])
    message.destroy
    head :no_content
  end

  private

  def message_params
    params.permit(:sender_id, :receiver_id, :list_id, :content)
  end
end