# Jewelry E-Commerce Website

Internship project — a basic full-stack e-commerce learning application. Customers can browse jewelry, manage a cart, and place orders; admins manage products, categories, inventory, customers, and orders.

This `main` branch holds only the project architecture: an empty folder/file skeleton for the team to build into. No business logic has been implemented here yet.

## Project Structure

```
backend/            Node/Express API
  server.js
  src/
    config/          DB connection, env-driven config
    models/          User, Category, Product, Cart, CartItem, Order, OrderItem
    controllers/     Request handlers per resource
    routes/          Express routers per resource
    middleware/       Auth (JWT), RBAC, error handling
    services/         Business logic (kept out of controllers)
    utils/            Shared helpers
    validators/        Request validation schemas

frontend/            Customer website (React)
  src/
    pages/            Home, Categories, Products, ProductDetails, Cart, Checkout, Orders, Profile
    components/        Reusable UI (navbar, footer, product card, etc.)
    context/           App-wide state (auth, cart)
    services/          API client calls
    utils/

admin/               Admin panel (separate React app)
  src/
    pages/            Dashboard, Products, Categories, Inventory, Customers, Orders
    components/
    services/
    utils/

docs/
  API.md             REST API reference
```

## Roles

- **Customer** — register/login, browse & search products, manage cart, checkout, view own orders and profile.
- **Admin** — protected panel: dashboard stats, product/category/inventory management, view customers, manage orders and order status.

## Tech Direction

- Backend: Node.js + Express, MongoDB (Mongoose), JWT-based authentication, RBAC (`customer` / `admin`).
- Frontend & Admin: React (Vite).
- Each app (`backend/`, `frontend/`, `admin/`) has its own `package.json` — run `npm install` inside the relevant folder.

## Git Workflow

Branch off `main` per feature, following the naming used for this project:

```
feature/home-page
feature/product-list
feature/auth
feature/cart
feature/orders
```

Use clear, imperative commit messages, e.g. `Add product listing page`, `Implement product API`, `Fix order validation`. Open a PR into `main` for review before merging.

## Order Status Flow

```
Order Placed → Confirmed → Processing → Shipped → Delivered
                     ↘ Cancelled
```

Only the admin can update order status.
