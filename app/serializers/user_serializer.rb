class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :password_digest, :zipcode

  has_many :lists
  has_many :categories, through: :lists
  has_many :messages
  # has_many :received_messages, foreign_key: :receiver_id, class_name: "Message"
end
