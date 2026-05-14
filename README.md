# Gorilla Scape

Gorilla Scape is a multiplayer 3D game platform built with React, Three.js, Node.js, Express, MongoDB, and Socket.io.

The project is structured as a monorepo containing:

- `backend` → REST API and multiplayer WebSocket server
- `game-project` → 3D frontend experience powered by React and Three.js

---

# Features

## Backend

- RESTful API architecture
- Real-time multiplayer synchronization with Socket.io
- MongoDB integration
- Batch block generation system
- Health monitoring endpoints
- CORS support for frontend communication
- Data synchronization scripts

## Frontend

- Real-time multiplayer gameplay
- 3D rendering with Three.js
- Physics integration using cannon-es
- Audio system with Howler
- Animations with GSAP
- Mobile and keyboard controls
- Modular game engine structure

---

# Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | Frontend UI |
| Vite | Frontend build tool |
| Three.js | 3D rendering |
| cannon-es | Physics engine |
| GSAP | Animations |
| Howler | Audio engine |
| Node.js | Backend runtime |
| Express.js | REST API |
| MongoDB | Database |
| Socket.io | Multiplayer networking |

---

# Project Structure

```text
Gorilla_Scape/
├── backend/
│   ├── data/
│   ├── scripts/
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   └── app.js
│
└── game-project/
    ├── public/
    └── src/
        ├── Experience/
        ├── loaders/
        ├── network/
        └── controls/
```

---

# Requirements

- Node.js 18+
- npm
- MongoDB (Local or MongoDB Atlas)

---

# Environment Variables

## Backend

Create a `.env` file inside `backend/`.

```env
MONGO_URI=mongodb://127.0.0.1:27017/threejs_blocks
PORT=3001
API_URL=http://localhost:3001/api/blocks/batch
```

## Frontend

Create `.env` or `.env.local` inside `game-project/`.

```env
VITE_API_URL=http://localhost:3001
VITE_ENEMIES_COUNT=1
```

---

# Installation

## Backend Setup

```bash
cd backend
npm install
```

## Frontend Setup

```bash
cd ../game-project
npm install
```

---

# Running the Project

Use two separate terminals.

## Start Backend

```bash
cd backend
node app.js
```

Backend server:

```text
http://localhost:3001
```

---

## Start Frontend

```bash
cd game-project
npm run dev
```

Frontend server:

```text
http://localhost:5173
```

---

# API Documentation

Base URL:

```text
http://localhost:3001/api/blocks
```

## Endpoints

### Get Blocks by Level

```http
GET /api/blocks?level=1
```

Response fields:

```json
{
  "name": "Block A",
  "x": 0,
  "y": 1,
  "z": 2,
  "level": 1
}
```

---

### Create Block

```http
POST /api/blocks
```

Request body:

```json
{
  "name": "Block A",
  "x": 0,
  "y": 1,
  "z": 2,
  "level": 1
}
```

---

### Insert Multiple Blocks

```http
POST /api/blocks/batch
```

Request body:

```json
[
  {
    "name": "Block A",
    "x": 0,
    "y": 1,
    "z": 2,
    "level": 1
  }
]
```

---

### Health Check

```http
GET /api/blocks/ping
```

Response:

```json
{
  "message": "pong"
}
```

---

# Multiplayer System

Socket.io runs on the same backend server.

Server URL:

```text
http://localhost:3001
```

## Main Events

| Event | Description |
|---|---|
| `new-player` | Registers new players |
| `update-position` | Synchronizes movement and rotation |
| `remove-player` | Handles disconnections |
| `players-update` | Updates multiplayer state |
| `existing-players` | Sends connected players list |

## Example Client Connection

```js
import { io } from 'socket.io-client'

const socket = io('http://localhost:3001')
```

---

# Backend Utilities

## Scripts

Location:

```text
backend/scripts/
```

Utility scripts include:

- Block synchronization
- Data generation
- Source processing

## Data

Location:

```text
backend/data/
```

Contains:

- Models
- Position data
- Game world resources

Optional seed command:

```bash
node seed.js
```

---

# Frontend Architecture

Main frontend modules:

```text
game-project/src/
├── Experience/     # Core 3D engine
├── loaders/        # Asset loaders
├── network/        # Multiplayer communication
└── controls/       # Input systems
```

---

# Development Ports

| Service | Port |
|---|---|
| Backend | 3001 |
| Frontend | 5173 |

---

# LAN Multiplayer Testing

Run Vite with host enabled:

```bash
npm run dev -- --host
```

Example frontend environment configuration:

```env
VITE_API_URL=http://192.168.1.100:3001
```

---

# Troubleshooting

## MongoDB Connection Issues

Ensure MongoDB is running and the `MONGO_URI` is correct.

## Frontend Cannot Reach Backend

Verify:

- `VITE_API_URL`
- Backend server status
- Browser console errors

## CORS Issues

CORS is enabled in development using:

- Express `cors()`
- Socket.io `origin: '*'`

---

# Deployment Ready

The architecture supports:

- Local development
- LAN multiplayer environments
- Cloud deployment
- Containerized infrastructure

---

# Future Improvements

Potential future enhancements:

- Authentication system
- Matchmaking
- Dedicated game servers
- Player persistence
- Advanced physics interactions
- Voice chat integration
- Leaderboards and rankings

---

# License

ISC License.

---

# Author

Developed by Camilo.
