# Task Manager App 📝

A full-stack task management system built with Node.js, React, Sequelize (PostgreSQL), and JWT-based authentication.

## 🚀 Features

- User registration and login (with roles: `user`, `admin`)
- Create, update, delete tasks
- Filter, sort, and search tasks
- Role-based access (admin/user)
- Responsive frontend using React
- Dockerized app for quick deployment

## 🏗️ Project Structure

task-manager/
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── migrations/
│ └── ...
├── frontend/
│ └── src/
│ └── pages/
├── docker-compose.yml
├── .env
├── README.md

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/task-manager.git
cd task-manager


## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/task-manager.git
cd task-manager
```
2. Environment Setup
Create a .env in backend/:
```
PORT=5050
JWT_SECRET=your_jwt_secret
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=task_manager
DB_HOST=db
```
4. Run with Docker 🐳
```
docker-compose up --build
```
5. Access the App
```
Frontend: http://localhost:5173
Backend API: http://localhost:5050/api
