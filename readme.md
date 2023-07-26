## Endpoints

### User Routes

#### POST /register
Register a new user.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}

{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}



Response:

Status: 201 Created
Body:{
  "message": "Account created successfully"
}

POST /login
Login with existing user credentials.

Request Body:{
  "email": "john.doe@example.com",
  "password": "password123"
}

Response:

Status: 201 Created
Body:
json
Copy code
{
  "token": "your_jwt_token",
  "message": "Login Successful"
}

Category Routes
POST /category
Create a new category.

Request Body:

json
Copy code
{
  "name": "Electronics"
}
Response:

Status: 201 Created
Body:
json
Copy code
{
  "message": "Category added successfully"
}
GET /category
Get all categories.

Response:

Status: 200 OK
Body:
json
Copy code
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
Product Routes
POST /products
Create a new product.

Request Body:

json
Copy code
{
  "title": "Smartphone",
  "description": "High-end smartphone with great features.",
  "price": 499.99,
  "availability": true,
  "categoryId": "category_id"
}
Response:

Status: 201 Created
Body:
json
Copy code
{
  "message": "Product added successfully"
}
GET /products/category/:categoryId
Get all products under a specific category.

Response:

Status: 200 OK
Body:
json
Copy code
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
GET /products/id/:productId
Get a specific product by its ID.

Response:

Status: 200 OK
Body:
json
Copy code
{
  "_id": "product_id",
  "title": "Smartphone",
  "description": "High-end smartphone with great features.",
  "price": 499.99,
  "availability": true,
  "categoryId": "category_id"
}
Cart Routes
GET /cart
Get all data from the user's cart.

Response:

Status: 200 OK
Body:
json
Copy code
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
POST /cart/:productId
Add a product to the cart.

Response:

Status: 200 OK
Body:
json
Copy code
{
  "message": "Product added to cart successfully"
}
PATCH /cart/:productId
Update the quantity of a product in the cart.

Request Body:

json
Copy code
{
  "quantity": 3
}
Response:

Status: 200 OK
Body:
json
Copy code
{
  "message": "Cart item updated successfully"
}
DELETE /cart/:productId
Delete an item from the cart.

Response:

Status: 200 OK
Body:
json
Copy code
{
  "message": "Cart item deleted successfully"
}
Order Routes
POST /order/:productId
Place an order for a specific product.

Response:

Status: 200 OK
Body:
json
Copy code
{
  "message": "Order placed successfully"
}
GET /order
Get the order history for the authenticated user.

Response:

Status: 200 OK
Body:
json
Copy code
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
GET /order/:orderId
Get detailed information of a specific order by its ID.

Response:

Status: 200 OK
Body:
json
Copy code
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
