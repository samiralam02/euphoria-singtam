# Euphoria Singtam — Bar & Restaurant Website

A full-stack MERN application for **Euphoria Singtam**, a premium bar and restaurant located in Singtam, Sikkim, India.

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React (Vite), React Router v6, Tailwind CSS, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT (jsonwebtoken) + bcryptjs |

---

## Project Structure

```
euphoria-singtam/
├── backend/              # Express API server
│   ├── config/db.js      # MongoDB connection
│   ├── controllers/      # Route handlers
│   ├── models/           # Mongoose schemas
│   ├── routes/           # Express routers
│   ├── middleware/       # JWT auth middleware
│   └── server.js         # Entry point
│
├── frontend/             # Vite + React app
│   └── src/
│       ├── components/   # Reusable UI components
│       ├── pages/        # Page-level components
│       └── services/     # Axios API service layer
│
└── README.md
```

---

## Quick Start

### Prerequisites
- Node.js >= 18
- MongoDB running locally (or MongoDB Atlas URI)

---

### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file (copy from `.env.example`):

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/euphoria_singtam
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

Backend runs on **http://localhost:5000**

---

### 2. Create Admin Account

After the server is running, create an admin user (one-time):

```bash
curl -X POST http://localhost:5000/api/admin/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","email":"admin@euphoriasingtam.com","password":"Admin@123"}'
```

> **Important:** After creating the admin, disable the `/api/admin/register` route in production by commenting it out in `backend/routes/adminRoutes.js`.

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on **http://localhost:5173**

---

## API Endpoints

### Public Endpoints

| Method | Route | Description |
|---|---|---|
| `POST` | `/api/bookings` | Create table booking |
| `POST` | `/api/party-bookings` | Create party booking |
| `POST` | `/api/admin/login` | Admin login |
| `GET` | `/api/health` | Health check |

### Protected Endpoints (require Bearer token)

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/bookings` | Get all table bookings |
| `PUT` | `/api/bookings/:id` | Update booking status |
| `DELETE` | `/api/bookings/:id` | Delete booking |
| `GET` | `/api/party-bookings` | Get all party bookings |
| `PUT` | `/api/party-bookings/:id` | Update party booking status |
| `DELETE` | `/api/party-bookings/:id` | Delete party booking |
| `GET` | `/api/admin/profile` | Get admin profile |

---

## Pages

| Route | Page |
|---|---|
| `/` | Home — Hero, signature dishes, CTA |
| `/about` | About — Story, owner, timeline |
| `/menu` | Menu — Starters, mains, desserts, cocktails |
| `/gallery` | Gallery — Filterable image grid |
| `/booking` | Table Booking Form |
| `/party-booking` | Party / Birthday Room Booking |
| `/testimonials` | Guest Reviews |
| `/contact` | Contact Form |
| `/admin/login` | Admin Login |
| `/admin/dashboard` | Admin Dashboard (protected) |

---

## Owner

**Anand Lamichaney (Mr.@one)**  
Entrepreneur & Social Media Influencer  
Founder, Euphoria Singtam

---

## License

Private — All rights reserved © Euphoria Singtam
