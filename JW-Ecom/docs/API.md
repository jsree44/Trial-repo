# API Reference

## Authentication
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout

## Products
- GET /api/products
- GET /api/products/:id
- POST /api/products
- PUT /api/products/:id
- DELETE /api/products/:id

## Categories
- GET /api/categories
- POST /api/categories
- PUT /api/categories/:id
- DELETE /api/categories/:id

## Cart
- GET /api/cart
- POST /api/cart/items
- PUT /api/cart/items/:id
- DELETE /api/cart/items/:id

## Orders
- POST /api/orders
- GET /api/orders
- GET /api/orders/:id

## Admin Orders
- GET /api/admin/orders
- PUT /api/admin/orders/:id/status
