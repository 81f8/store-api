# E-commerce API Documentation

## Introduction

This API powers an e-commerce platform, providing endpoints for both admin dashboard functionalities and client interactions. Developed using Node.js, Express.js, and PostgreSQL.

## Endpoints

### Admin Dashboard

| Endpoint                                         | Description               |
| ------------------------------------------------ | ------------------------- |
| `POST /api/v1/dashboard/admin/login`             | Admin login               |
| `GET /api/v1/dashboard/products`                 | Get all products          |
| `GET /api/v1/dashboard/products/:id`             | Get a product by ID       |
| `POST /api/v1/dashboard/products/add`            | Add a new product         |
| `PUT /api/v1/dashboard/products/update/:id`      | Update a product by ID    |
| `DELETE /api/v1/dashboard/products/delete/:id`   | Delete a product by ID    |
| `POST /api/v1/dashboard/admin/register`          | Register a new admin      |
| `GET /api/v1/dashboard/orders/view`              | View all orders           |
| `POST /api/v1/dashboard/orders/changeStatus/:id` | Change order status by ID |

### Client

| Endpoint                          | Description           |
| --------------------------------- | --------------------- |
| `GET /api/v1/client/products`     | Get all products      |
| `GET /api/v1/client/products/:id` | Get a product by ID   |
| `POST /api/v1/client/orders/add`  | Add a new order       |
| `POST /api/v1/client/register`    | Register a new client |
| `POST /api/v1/client/login`       | Client login          |

## Request Examples

### Admin Dashboard

    Use Token header for authentication
    you can get a token by login to admin account

#### Admin Login

```json
POST /api/v1/dashboard/admin/login
{
    "username": "admin",
    "password": "admin123"
}
```

#### Add Product

```json
POST /api/v1/dashboard/products/add
{
    "id": "123",
    "name": "Product Name",
    "price": 20.99,
    "discount": 5,
    "image": "product-image.jpg",
    "active": true
}
```

#### Update Product

```json
PUT /api/v1/dashboard/products/update/123
{
    "name": "Updated Product Name",
    "price": 25.99,
    "discount": 7,
    "image": "updated-image.jpg",
    "active": true
}
```

#### Delete Product

```json
DELETE /api/v1/dashboard/products/delete/123
```

#### Register Admin

```json
POST /api/v1/dashboard/admin/register
{
    "username": "newadmin",
    "password": "newadmin123"
}
```

#### Change Order Status

```json
POST /api/v1/dashboard/orders/changeStatus/2
{
    "status": "shipped"
}
```

### Client

#### Client Login

```json
POST /api/v1/client/login
{
    "username": "user",
    "password": "user123"
}
```

#### Add Order

```json
POST /api/v1/client/orders/add
{
    "items": ["product1", "product2"],
    "userID": "user123",
    "address": "123 Street, City",
    "status": "pending"
}
```

## About the Developer

This API was developed by salam adil.
For inquiries, please contact sllaim3333@gmail.com.
