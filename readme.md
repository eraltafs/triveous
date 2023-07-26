## Deployment

https://triveous.onrender.com/

# E-Commerce API Documentation

Welcome to the documentation for the E-Commerce API! This API provides various endpoints to manage users, products, categories, carts, and orders for an E-commerce application.

## Table of Contents

- [Getting Started](#getting-started)

  - [Prerequisites](#prerequisites)

  - [Installation](#installation)

  - [Running the Server](#running-the-server)

- [Authentication](#authentication)

- [Rate Limiting](#rate-limiting)

- [Endpoints](#endpoints)

  - [User Endpoints](#user-endpoints)

  - [Category Endpoints](#category-endpoints)

  - [Product Endpoints](#product-endpoints)

  - [Cart Endpoints](#cart-endpoints)

  - [Order Endpoints](#order-endpoints)

- [Models](#models)

- [Controllers](#controllers)

- [Middleware](#middleware)

## Getting Started

### Prerequisites

Before running the API, ensure you have the following software installed:

- MongoDB (Make sure it's running locally or provide the database URL in the .env file)

- Node 18.16.0

### Installation

1.  Clone this repository to your local machine:

        git clone https://github.com/eraltafs/triveous.git

2.  Install the dependencies:
    ```
    cd triveous
    npm install
    ```
3.  Create a .env file in the root of the project and add the following variables:

    ```
    MongoDB connection URL
    mongoUrl=<your mongoUrl>
    Secret key for JWT authentication
    key=<your secret key>
    ```

### Running the Server

To start the API server, use the following command:

      npm start

The server will be available at http://localhost:8000/

### Authentication

    When a user registers or logs in successfully, a JWT token is generated and provided in the response. This token should be included in the header for secure access to protected endpoints.

## Endpoints

### User Endpoints

`Create a new user account`

#### POST /register

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response:**

Status: 201 Created

Body:

```json
{
  "message": "Account created successfully"
}
```

#### POST /login

Login with existing user credentials.

**Request Body:**

```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response:**

Status: 201 Created

Body:

```json
{
  "token": "your_jwt_token",
  "message": "Login Successful"
}
```

### Category Endpoints

Create a new category.

#### POST /category

**Request Body:**

```json
{
  "name": "Electronics"
}
```

**Response:**

Status: 201 Created

Body:

```json
{
  "message": "Category added successfully"
}
```

#### GET /category

Get all categories.

**Response:**

Status: 200 OK
Body:

```json
[
  {
    "_id": "category_id",
    "name": "Electronics"
  },
  {
    "_id": "category_id",
    "name": "Books"
  },
  ...
]
```

### Product Endpoints

#### POST /products

Create a new product.

**Request Body:**

```json
{
  "title": "Smartphone",
  "description": "High-end smartphone with great features.",
  "price": 499.99,
  "availability": true,
  "categoryId": "category_id"
}
```

**Response:**

Status: 201 Created
Body:

```json
{
  "message": "Product added successfully"
}
```

#### GET /products/category/:categoryId

Get all products under a specific category.

**Response:**

Status: 200 OK
Body:

```json
[
  {
    "_id": "product_id",
    "title": "Smartphone",
    "description": "High-end smartphone with great features.",
    "price": 499.99,
    "availability": true,
    "categoryId": "category_id"
  },
  {
    "_id": "product_id",
    "title": "Laptop",
    "description": "Powerful laptop for all your needs.",
    "price": 899.99,
    "availability": true,
    "categoryId": "category_id"
  },
  ...
]
```

#### GET /products/id/:productId

Get a specific product by its ID.

**Response:**

Status: 200 OK
Body:

```json
{
  "_id": "product_id",
  "title": "Smartphone",
  "description": "High-end smartphone with great features.",
  "price": 499.99,
  "availability": true,
  "categoryId": "category_id"
}
```

### Cart Endpoints

#### GET /cart

Get all data from the user's cart.

**Response:**

Status: 200 OK
Body:

```json
{
  "_id": "cart_id",
  "userId": "user_id",
  "items": [
    {
      "_id": "item_id",
      "productId": "product_id",
      "quantity": 2,
      "price": 999.98
    },
    ...
  ],
  "totalPrice": 999.98
}
```

#### POST /cart/:productId

Add a product to the cart.

**Response:**

Status: 200 OK
Body:

```json
{
  "message": "Product added to cart successfully"
}
```

#### PATCH /cart/:productId

Update the quantity of a product in the cart.

**Request Body:**

```json
{
  "quantity": 3
}
```

**Response:**

Status: 200 OK
Body:

```json
{
  "message": "Cart item updated successfully"
}
```

#### DELETE /cart/:productId

Delete an item from the cart.

**Response:**

Status: 200 OK
Body:

```json
{
  "message": "Cart item deleted successfully"
}
```

### Order Endpoints

#### POST /order/:productId

Place an order for a specific product.

**Response:**

Status: 200 OK
Body:

```json
{
  "message": "Order placed successfully"
}
```

#### GET /order

Get the order history for the authenticated user.

**Response:**

Status: 200 OK
Body:

```json
[
  {
    "_id": "order_id",
    "userId": "user_id",
    "items": [
      {
        "_id": "item_id",
        "productId": "product_id",
        "quantity": 2
      },
      ...
    ],
    "totalAmount": 999.98,
    "orderDate": "2023-07-26T10:15:00.000Z"
  },
  ...
]
```

#### GET /order/:orderId

Get detailed information of a specific order by its ID.

**Response:**

Status: 200 OK
Body:

```json
{
  "_id": "order_id",
  "userId": "user_id",
  "items": [
    {
      "_id": "item_id",
      "productId": "product_id",
      "quantity": 2
    },
    ...
  ],
  "totalAmount": 999.98,
  "orderDate": "2023-07-26T10:15:00.000Z"
}
```


### Models
  - The API uses the following models to interact with the MongoDB database:

      * UserModel: Represents the user schema and model.
      * ProductModel: Represents the product schema and model.
      * CategoryModel: Represents the category schema and model.
      * CartModel: Represents the cart schema and model.
      * OrderModel: Represents the order schema and model.
### Controllers
  - Controllers handle the business logic for each endpoint and interact with the database through the corresponding models. They are responsible for processing requests and sending responses.

      * users.controller: Handles user registration and login functionality.
      * product.controller: Manages product creation and retrieval.
      * category.controller: Handles category creation and retrieval.
      * cart.controller: Manages cart functionality, such as adding, updating, and deleting items.
      * order.controller: Manages order placement and retrieval.
### Middleware
  - authenticate: Authentication middleware that checks the validity of the JWT token and ensures secure access to protected routes.