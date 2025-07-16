# Perfume Selling Website – Project Setup Guide

This document outlines the steps to install dependencies, configure the database, populate initial data, and run the MERN stack application (MongoDB, Express.js, React, Node.js).

---

## 📁 Project Structure

```plaintext
ecommerce-perfume-mern/
│
├── client/       # React Frontend
├── server/        # Node/Express Backend
```

---

## 🔧 Prerequisites

Ensure the following are installed on your system:

- [Node.js & npm](https://nodejs.org/)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community)
- [Visual Studio Code](https://code.visualstudio.com/) or editor of your choice

---

## 📦 Step 1: Install Dependencies

> **Note**: `node_modules/` folders have been omitted for portability. You'll need to reinstall dependencies.

### Frontend (React)

```bash
cd client
npm install
```

### Backend (Node/Express)

```bash
cd server
npm install
```

---

## 🛠️ Step 2: Set Up MongoDB

### 1. Start MongoDB

Start your MongoDB server by running:

```bash
"C:\mongodb\bin\mongod.exe"
```

Keep this terminal session open while using the app.

---

## 🧪 Step 3: Populate the Database

We provide two options to populate the `sembFrags` MongoDB database:

### ✅ Option A: Automatic Script (Recommended)

Run this script to automatically populate the database:

```bash
cd server
node autoPopulateMyDatabase.js
```

**Expected Success Output:**

```plaintext
Connected to MongoDB
Current collection counts: { users: 0, categories: 0, products: 0 }
Data inserted into users collection
Data inserted into categories collection
Data inserted into products collection
```

If re-run, the script will detect if the collections are already populated:

```plaintext
Collections already contain the expected number of documents. No need to populate.
```

### 🧾 Option B: Manual via Mongo Shell

If the auto script fails, use `mongosh` to manually insert data:

1. Open the file:

```
Server_Back_End/sembFrags DB jsons/sembFrags MONGODB CREATION COMMANDS.txt
```

2. Paste and execute each command inside the `mongosh` shell to manually create:
   - Database: `sembFrags`
   - Collections: `users`, `categories`, `products`
   - Sample data

---

## 🚀 Step 4: Running the Application

Run the **backend** first, then the **frontend**.

### Backend

```bash
cd server
npx nodemon index.js
```

### Frontend

```bash
cd client
npm start
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🔐 Sample Login Credentials

A default user is available for testing:

```plaintext
Email:    johndoe@mail.com
Password: 123
```

> You can also create new accounts via the signup functionality.

---

## 📞 Contact

For questions or support:
- 📧 isaacsemb1996@gmail.com  

---

## ✅ Final Notes

- Keep the `mongod` process running in the background while using the application.
- Always install dependencies before running the app.
- For consistent environments, consider containerizing with Docker in the future.