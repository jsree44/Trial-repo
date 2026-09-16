# Day 1 — Backend Task Note

**Intern:** Aysha Shafeek M M  
**Branch:** `feature/backend-day1-dev-aysha`  
**Date:** 2026-09-10

## Goal for Today

Node + Express + MongoDB backend with Authentication, Products, and Categories.

## What Was Completed

- [x] Project scaffolded (Express server, folder structure: config, models, controllers, routes, middleware)
- [x] MongoDB connection working (Mongoose + MongoDB Atlas)
- [x] User model + JWT-based authentication (register, login)
- [x] Authentication and admin authorization middleware
- [x] Category model + CRUD routes
- [x] Product model + CRUD routes (linked to Category)
- [x] Basic API behavior verified in Postman

## What Was Not Completed

- [ ] Complete end-to-end CRUD testing for all Product and Category APIs
- [ ] Full admin workflow testing

## APIs Created

| Method | Endpoint | Auth Required | Description |
|--------|----------|----------------|-------------|
| POST | `/api/auth/register` | No | Register a new user |
| POST | `/api/auth/login` | No | Login and receive JWT |
| GET | `/api/auth/me` | Yes | Get current logged-in user |
| GET | `/api/categories` | No | List all categories |
| GET | `/api/categories/:id` | No | Get single category |
| POST | `/api/categories` | Yes (admin) | Create category |
| PUT | `/api/categories/:id` | Yes (admin) | Update category |
| DELETE | `/api/categories/:id` | Yes (admin) | Delete category |
| GET | `/api/products` | No | List all products |
| GET | `/api/products/:id` | No | Get single product |
| POST | `/api/products` | Yes (admin) | Create product |
| PUT | `/api/products/:id` | Yes (admin) | Update product |
| DELETE | `/api/products/:id` | Yes (admin) | Delete product |

## Database / Model Details

**User:** name, email (unique), password (hashed), role (user/admin)

**Category:** name (unique), description

**Product:** name, description, price, stock, category (ref → Category), createdBy (ref → User)

## Problems Encountered

- Initially faced MongoDB authentication failure; credentials were corrected and the connection was successfully established.
- Postman Cloud Agent could not access `localhost`, so local Postman testing was used.
- Category and product creation require admin authorization.

## What Needs to Be Done Next

- Complete full Postman CRUD testing
- Verify admin workflow
- Add input validation and pagination
- Connect with the frontend team's API contract
- Deploy the backend for shared development

screenshots

<img width="1920" height="1080" alt="ss1" src="https://github.com/user-attachments/assets/a9637649-3abd-4a26-8bb7-75120ef43d10" />
<img width="1920" height="1080" alt="ss2" src="https://github.com/user-attachments/assets/2e1ffd8f-3848-45cf-8400-e19ee780aa9b" />
<img width="1920" height="1080" alt="ss3" src="https://github.com/user-attachments/assets/1cd7a982-8127-4477-a7c7-ec841ab4e07a" />
<img width="1372" height="547" alt="ss4" src="https://github.com/user-attachments/assets/d6930c7f-eaa5-4902-932f-5095ebd03889" />
