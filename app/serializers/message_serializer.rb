class MessageSerializer < ActiveModel::Serializer
  attributes :id, :sender_id, :receiver_id, :list_id, :content

  # has_many :lists
  # has_many :users
end
