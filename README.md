# BurritoShop

### clone the repo 

### go into the folder cd burrito-shop-backend 

run "npm install"

in bakcend folder run "npx nodemon src/app.ts" to start the server make sure its on port 3000 

Install mongoDB Compass "brew tap mongodb/brew" -> 'brew install mongodb-community@7.0" this will install mongodb. if needed update xcode command line tools 

install mongodb and run "brew tap mongodb/brew" and then "brew install mongodb-community" -> "brew services start mongodb/brew/mongodb-community" 

mondoDB compass GUI to view DB and collectinos 

through api endpoint use postman http://localhost:3000/api/burritos and body - raw - json as below 

{
  "name": "Chicken Burrito Regular",
  "size": "regular",
  "price": 3
}

{
  "name": "Chicken Burrito XL",
  "size": "XL",
  "price": 5
}

{
  "name": "Veg Burrito Regular",
  "size": "regular",
  "price": 2.5
}

{
  "name": "Veg Burrito XL",
  "size": "XL",
  "price": 4.5
}

### frontend go the folder burrito-app and "npm install" and "npm start" 

routes 

1. http://localhost:3001/order - for customer app 

2. http://localhost:3001/orders - for employee app 





