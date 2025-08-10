# 📝 React + Node.js Todo App with Automated Tests

## 📌 Overview
This is a simple **Todo application** with:
- **React** frontend
- **Node.js** backend API

It demonstrates:
- User authentication (login with valid/invalid credentials)
- CRUD operations for todo items
- Automated **UI** and **API** testing

---

## 🚀 Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/marwa900/test-automation.git
cd test-automation

2️⃣ Install dependencies
Backend


```cd backend
npm install

Frontend
```cd ../frontend
npm install

3️⃣ Start the backend server

```cd ../backend
npm run start

 The backend runs at:
http://localhost:4000

4️⃣ Start the frontend app

```cd ../frontend
npm start

By default, the frontend runs at:
http://localhost:3001 (or as configured)

🧪 Running Tests
UI Tests (Cypress)
From the project root:


```cd frontend
npm run test:e2e
Covers:

Login (valid & invalid credentials)

Create, edit, delete todos

UI data validation

API Tests (Supertest)
From the project root:

```cd backend
npm run test:api
Covers:

POST /login

GET /items

POST /items

PUT /items/:id

DELETE /items/:id

Includes both positive and negative test cases.

📋 What is being tested
Frontend UI workflows: login, CRUD operations, validation.

Backend API endpoints: authentication, create, edit and delete item .

📌 Test coverage areas
Positive and negative scenarios for all main flows.

Error handling and validation checks.

🛠 Tools Used
Cypress → End-to-end UI testing (fast, reliable, easy debugging)

Supertest → Integration testing for Node.js APIs

