# Oto Rent API Documentation

## About

This is the documentation for the Oto Rent API. Oto Rent is a platform for renting cars and other vehicles. It is a web application that allows users to rent vehicles with a wide range of options. The API is a RESTful API that allows users to access the data in the database. The API is also available as a mobile application.

## How to use this API

1. Clone this repository to your local machine
2. Install dependencies with ```npm install```
3. Import the database in ``` other/vehicle_rent.sql ``` to your local mysql database
4. Create ``` .env ``` file with your database credentials, cloudinary credentials and other configurations
5. Run the server with ```npm run dev``` for auto reloading
6. Run the server with ```npm start``` for production

## Endpoints

### Postman Documentation

For more updated documentation, please visit [Oto Rent API Postman Documentation](https://www.postman.com/planetary-robot-492100/workspace/public-workspace/collection/18341304-1965c150-cde1-4622-86d9-1103ea5ebafa?action=share&creator=18341304). And for environment variable documentation [here](https://www.postman.com/planetary-robot-492100/workspace/nabil-s-public-collection/environment/18341304-7cae8070-361c-4c1a-aa4e-fc8ace943f82)

### Vehicle Endpoint

| METHOD | API | REMARKS|
| :------: | --- | ------ |
| **GET** | /vehicles | List data of vehicles |
| **GET** | /vehicles/filter | List data of vehicles |
| **GET** | /vehicles/popular | Get list of popular vehicles |
| **GET** | /vehicles/:id | Get a vehicle data by id |
| **POST** | /vehicles | Input data to table of vehicles |
| **PATCH** | /vehicles/:id | Update data a vehicle partially by vehicle id |
| **PUT** | /vehicles/:id | Update all data of a vehicle by vehicle id |
| **DELETE** | /vehicles/:id | Delete a vehicle by vehicle id |

### User Endpoint

| METHOD | API | REMARKS|
| :------: | --- | ------ |
| **GET** | /users | List data of users |
| **GET** | /users/:id | Get an users data by id |
| **GET** | /users/profile | Get an users data by id that embeded in auth token |
| **POST** | /users | Input data to table of users |
| **PATCH** | /users/:id | Update data a user partially by user id |
| **DELETE** | /users/:id | Delete an user by user id |

### History Endpoint

| METHOD | API | REMARKS|
| :------: | --- | ------ |
| **GET** | /histories | List data of histories |
| **GET** | /histories/:id | Get a history data by id |
| **GET** | /histories/filter | Get list of filtered histories data |
| **POST** | /histories | Input data to table of histories |
| **PATCH** | /histories/:id | Update data a history partially by history id |
| **DELETE** | /histories/:id | Delete an history by history id |

### Categories Endpoint

| METHOD | API | REMARKS|
| :------: | --- | ------ |
| **GET** | /categories | List data of categories |
| **GET** | /categories/:id | Get a history data by id |
| **POST** | /categories | Input data to table of categories |
| **PUT** | /categories/:id | Update all data of a history by history id |
| **DELETE** | /categories/:id | Delete an history by history id |

## Request that has query params

### Vehicles Endpoints

- Filter vehicles data ```GET```

| KEYS | REMARKS | DESCRIPTION |
| :------: | :------: |------ |
| limit | ```number``` |use number to limit results of vehicles|
| page |```number```|use number to get another results vehicles|
| name |```string```| find vehicle name |
| minPrice |```number```| get vehicles that has minimum price from request |
| maxPrice |```number```| get vehicles that has maximum price from request |
| category_id |```category_id``` ```number```| get vehicles that has same category or type |
| prepayment |```boolean```| get vehicles just only can do prepayment |
| location |```string```| get vehicles that has like same location |
| sort_price |```asc``` ```desc```| sort vehicles data by price  |
| sort_qty |```asc``` ```desc```| sort vehicles data by availability |
| sort_capacity |```asc``` ```desc```| sort vehicles data by capacity |
