class Message < ApplicationRecord
  validates :sender_id, presence: true
  validates :receiver_id, presence: true
  validates :list_id, presence: true
  validates :content, presence: true, length: { minimum: 10, maximum: 100 }

  belongs_to :list
  belongs_to :sender, class_name: 'User', foreign_key: :sender_id
  belongs_to :receiver, class_name: 'User', foreign_key: :receiver_id
end
