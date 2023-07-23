class List < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true, length: { minimum: 10, maximum: 100 }
  validates :category_id, presence: true
  validates :user_id, presence: true
  
  belongs_to :category
  belongs_to :user
  
  has_many :messages

end
