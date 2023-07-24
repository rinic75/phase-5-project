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


Category.create(name: "Driver", image_Url: "https://www.tgw.com/blog-assets/wp-content/uploads/2021/03/2021-Best-Golf-Drivers-Featured.jpg")
Category.create(name: "Fairway", image_Url: "https://golf.com/wp-content/uploads/2021/10/GettyImages-1132705407rr.jpg")
Category.create(name: "Hybrid", image_Url: "https://southamptongolfclub.com/wp-content/uploads/2019/03/Golf-Hybrids.jpg")
Category.create(name: "Iron", image_Url: "https://cdn.cosmicjs.com/0e627be0-d156-11eb-a3a9-058a56ece6a0-Blade-Irons-Set-Featured-Image.jpg")
Category.create(name: "Wedge", image_Url: "https://www.golfdigest.com/content/dam/images/golfdigest/fullset/2019/01/23/5c48f01e14ab9c2d16760c20_Hot-List-2019-Wedges%20USE.jpg")
Category.create(name: "Putter", image_Url: "https://golfweek.usatoday.com/wp-content/uploads/sites/87/2022/07/LAGP-putter-vs-traditional-blade-size.png?resize=1024,681")
Category.create(name: "Bag", image_Url: "https://robbreport.com/wp-content/uploads/2021/12/mnmlbag01.jpg?w=1000")
Category.create(name: "Misc", image_Url: "https://goldinauctions.com/ItemImages/000020/20669d_med.jpeg")

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