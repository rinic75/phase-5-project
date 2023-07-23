class User < ApplicationRecord
  has_secure_password

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true, format: { with: /\A[^@\s]+@[^@\s]+\z/, message: "must be a valid email address" }
  validates :password, presence: true, length: { minimum: 4, maximum: 12 }
  validates :zipcode, presence: true, length: { is: 5 }

  has_many :lists
  has_many :categories, through: :lists
  has_many :received_message, foreign_key: :receiver_id, class_name: "Message"
  has_many :messages, foreign_key: :sender_id
  
end
