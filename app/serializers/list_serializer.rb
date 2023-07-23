class ListSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :image, :price, :user_id, :category_id
  has_many :messages
end
