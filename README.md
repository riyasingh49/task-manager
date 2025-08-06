# Task Manager App 📝

A full-stack task management system built with Node.js, React, Sequelize (PostgreSQL), and JWT-based authentication.

## 🚀 Features

- User registration and login (with roles: `user`, `admin`)
- Create, update, delete tasks
- Filter, sort, and search tasks
- Role-based access (admin/user)
- Responsive frontend using React
- Dockerized app for quick deployment
- Deployed using **Render**

## 🌐 Live Demo

- 🔗 **Frontend**: [[https://your-frontend-url.onrender.com](https://task-manager-frontend1-zlfx.onrender.com/login)) ]
- 🔗 **Backend API**:[ https://your-backend-url.onrender.com/api](https://task-manager-backend-cev2.onrender.com)

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


## ⚙️ Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/task-manager.git
cd task-manager
``` 
### 2. Backend Environment Setup
Create a .env file inside the backend/ directory:
```bash
PORT=5050
JWT_SECRET=your_jwt_secret
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=task_manager
DB_HOST=db
```

### 3. Run Locally with Docker 🐳
```bash
docker-compose up --build
```

### 4. Access Locally
Frontend: http://localhost:5173
Backend API: http://localhost:5050/api

