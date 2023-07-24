# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Category.destroy_all
User.destroy_all
List.destroy_all
Message.destroy_all


Category.create(name: "Driver")
Category.create(name: "Fairway")
Category.create(name: "Hybrid")
Category.create(name: "Iron")
Category.create(name: "Wedge")
Category.create(name: "Putter")
Category.create(name: "Bag")
Category.create(name: "Misc")

# User.create(name: "John", email: "john@john", password: "john") - user faker instead 5 times
User.create(name: "Chang", email: "chang@gmail.com", password: "1234", zipcode: "61874")

5.times do
  User.create(name: Faker::Name.name, email: Faker::Internet.email, password: "1234", zipcode: Faker::Address.zip_code)
end

# List.create(title: "John's List", description:"descriptiton", image:"empty", price: "100" user_id: User.first.id) - list faker instead 20 times
30.times do
  List.create(title: Faker::Commerce.product_name, description: Faker::Lorem.paragraph, image: Faker::LoremFlickr.image, price: Faker::Commerce.price, user_id: User.all.sample.id, category_id: Category.all.sample.id)
end

20.times do
  Message.create(sender_id: User.all.sample.id, receiver_id: User.all.sample.id, list_id: List.all.sample.id, content: Faker::Lorem.paragraph)
end

puts "✅ Done seeding!"