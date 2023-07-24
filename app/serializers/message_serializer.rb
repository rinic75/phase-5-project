class MessageSerializer < ActiveModel::Serializer
  attributes :id, :sender_id, :receiver_id, :list_id, :content

  belongs_to :list
  belongs_to :sender, class_name: 'User', foreign_key: :sender_id
  belongs_to :receiver, class_name: 'User', foreign_key: :receiver_id
end
