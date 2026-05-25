# CineSync

CineSync is a full-stack MERN web application where users can browse movies, manage a personal wishlist, rate films, and connect with friends.

Admins can manage movies and users through a dedicated dashboard.

## Features

### User
- Sign up, login, and manage profile
- Browse and search movies
- Add movies to wishlist
- Rate movies and view average ratings
- Search for users and send friend requests
- Accept or reject friend requests
- View friends and their wishlists

### Admin
- Login as admin
- Add, edit, and delete movies
- Manage users

## Tech Stack

**Frontend:** React, React Router, Axios  
**Backend:** Node.js, Express.js, MongoDB, Mongoose  
**Auth:** JWT, bcryptjs  
**Other:** cors, dotenv  

## Live Demo

- Frontend: https://cinesync-frontend.vercel.app
- Backend: https://cinesync-backend-ylss.onrender.com

## Getting Started

### Prerequisites
- Node.js
- MongoDB

### Installation

```bash
git clone https://github.com/Nitya0607/CineSync.git
cd CineSync

# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
```

### Running the App

```bash
# Start backend
npm run dev

# Start frontend (open a new terminal)
cd frontend
npm start
```