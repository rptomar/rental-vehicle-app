# 🚗 Vehicle Rental App

This is a full-stack Vehicle Rental App built with **React.js**, **Node.js**, **Express**, **MySQL**, **Sequelize**, **Material UI**, and **Tailwind CSS**.

---

## 📁 Project Structure

vehicle-rental-app/
├── backend/ # Node.js backend with Express & Sequelize
├── frontend/ # React frontend with Material UI
├── README.md # Project documentation


---

## 🛠️ Backend Setup (Node.js + Express + Sequelize + MySQL)

### 1. Install Dependencies

```bash
cd backend
npm install

2. Configure Environment Variables
Create a .env file inside the backend/ folder:

DB_USER=postgres
DB_USER=root
DB_PASS=          # Leave blank if using default XAMPP setup
DB_NAME=vehicle_rental
DB_HOST=localhost
DB_PORT=3306
PORT=5000

3. Start MySQL Server Using XAMPP
Open XAMPP Control Panel

Start Apache and MySQL modules

Go to: http://localhost/phpmyadmin

4. Create the Database
In phpMyAdmin, run the following SQL:

CREATE DATABASE vehicle_rental;

5. Seed Initial Data
Run the seed script to populate vehicle types and models:
node seeders/seed.js


6. Start the Server
npm start                 # bcs i have installed nodemon to run nodemon
Server running on port 5000
Executing (default): SELECT 1+1 AS result
✅ MySQL connected successfully.             #display if server and backend running successfully 

Frontend Setup (React + Material UI)
1. Install Dependencies
cd frontend
npm install

2. Backend URL Setup
Instead of a .env file, the backend base URL is configured in:
frontend/src/utils/app.js

3. Start the React App
npm start
Frontend runs on: http://localhost:3000

✅ Application Features
Step-by-step form with validation

Fetch vehicle types and models dynamically from the backend

Date range picker for booking dates

Prevents overlapping bookings

Clean UI with Material UI + Tailwind

📬 API Endpoints
GET /api/types?wheels=${wheels} – Fetch vehicle types (e.g., hatchback, cruiser)

GET /api/vehicles?typeId={typeId} – Fetch vehicles by type

POST /api/book – Submit a new booking request

⚠️ Important Notes
Always start MySQL in XAMPP before launching backend.

No hardcoded values: all vehicle data comes from the backend.

Both frontend and backend have input validation.

Make sure seed.js runs successfully to initialize your database with sample data.



