class CategorySerializer < ActiveModel::Serializer
  attributes :id, :name, :image_Url

  has_many :lists

end
