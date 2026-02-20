# DevComm 🚀

> **Built for developers. Powered by vibes.**

A real-time communication platform tailored for developers — featuring live chat, video calls, friend discovery, and a geeky onboarding experience. Built with the MERN stack and powered by Stream's real-time infrastructure.

---

## ✨ Features

- **Authentication** — Secure sign up / login with JWT stored in httpOnly cookies
- **Developer Onboarding** — Profile setup with native language, geeky interest tags, location, and auto-generated avatars
- **Friend Discovery** — Browse recommended users; send, receive, and accept friend requests
- **Real-Time Chat** — Persistent messaging via Stream Chat SDK with threaded replies
- **Video Calls** — One-click WebRTC video calls via Stream Video SDK; share call links directly in chat
- **Notifications** — Incoming friend requests and accepted connection alerts
- **32 Themes** — DaisyUI theme switcher with localStorage persistence
- **Dev Helpdesk** — In-app feedback form powered by EmailJS (pre-filled with authenticated user info)
- **Responsive Layout** — Sidebar navigation on desktop, navbar on mobile

---

## 🛠 Tech Stack

### Backend
| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT (httpOnly cookies) + bcryptjs |
| Real-Time | Stream Chat & Video SDK |

### Frontend
| Layer | Technology |
|---|---|
| UI Library | React 18 |
| Routing | React Router v7 |
| State / Data Fetching | TanStack Query (React Query) |
| HTTP Client | Axios |
| Styling | Tailwind CSS + DaisyUI |
| Global State | Zustand |
| Real-Time Chat | stream-chat-react |
| Real-Time Video | @stream-io/video-react-sdk |
| Email | EmailJS |
| Notifications | react-hot-toast |
| Icons | Lucide React |

---

## 📁 Project Structure

```
devcomm/
├── backend/
│   ├── src/
│   │   ├── controllers/        # auth, user, chat controllers
│   │   ├── middleware/         # protectRoute (JWT)
│   │   ├── models/             # User, FriendRequest models
│   │   ├── routes/             # auth, user, chat routes
│   │   └── lib/                # db connection, stream client
│   └── server.js
│
└── frontend/
    └── src/
        ├── components/         # Layout, Navbar, Sidebar, cards, loaders
        ├── constants/          # Themes, languages, interest tags
        ├── hooks/              # useAuthHook, useLogin, useLogout, useSignup
        ├── lib/                # axios instance, API functions
        ├── pages/              # HomePage, ChatPage, CallPage, etc.
        └── store/              # Zustand theme store
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js v18+
- MongoDB instance (local or Atlas)
- [Stream](https://getstream.io) account (Chat + Video)
- [EmailJS](https://emailjs.com) account (optional, for Dev Helpdesk)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/devcomm.git
cd devcomm
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
```

Start the backend:

```bash
npm run dev
```

### 3. Frontend setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` directory:

```env
VITE_STREAM_API_KEY=your_stream_api_key

# Optional — for Dev Helpdesk contact form
VITE_SERVICE_ID=your_emailjs_service_id
VITE_TEMPLATE_ID=your_emailjs_template_id
VITE_PUBLIC_KEY=your_emailjs_public_key
```

Start the frontend:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 🔌 API Reference

### Auth Routes — `/api/auth`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/signup` | ❌ | Register a new user |
| `POST` | `/login` | ❌ | Login and receive JWT cookie |
| `POST` | `/logout` | ✅ | Clear auth cookie |
| `POST` | `/onboard` | ✅ | Complete profile setup |
| `GET` | `/me` | ✅ | Get authenticated user |

### User Routes — `/api/users`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/` | ✅ | Get recommended users |
| `GET` | `/friends` | ✅ | Get friends list |
| `POST` | `/friend-request/:id` | ✅ | Send friend request |
| `PUT` | `/friend-request/:id/accept` | ✅ | Accept friend request |
| `GET` | `/friend-requests` | ✅ | Get incoming & accepted requests |
| `GET` | `/ongoing-friend-requests` | ✅ | Get sent (outgoing) requests |

### Chat Routes — `/api/chat`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/token` | ✅ | Get Stream Chat/Video token |

---

## 🌐 Environment Variables Summary

| Variable | Location | Required | Description |
|----------|----------|----------|-------------|
| `PORT` | backend | ✅ | Server port (default: 5001) |
| `MONGO_URI` | backend | ✅ | MongoDB connection string |
| `JWT_SECRET` | backend | ✅ | Secret for signing JWT tokens |
| `STREAM_API_KEY` | backend | ✅ | Stream API key |
| `STREAM_API_SECRET` | backend | ✅ | Stream API secret |
| `VITE_STREAM_API_KEY` | frontend | ✅ | Stream API key (client-side) |
| `VITE_SERVICE_ID` | frontend | ⚠️ Optional | EmailJS service ID |
| `VITE_TEMPLATE_ID` | frontend | ⚠️ Optional | EmailJS template ID |
| `VITE_PUBLIC_KEY` | frontend | ⚠️ Optional | EmailJS public key |

---

## 🚀 Deployment

### Production Build

```bash
# Build frontend
cd frontend && npm run build

# Serve from backend (add static file serving in server.js)
# Or deploy frontend to Vercel/Netlify and backend to Render/Railway
```

### Key Notes for Production

- Set `NODE_ENV=production` in backend environment
- The frontend `axios.js` automatically switches base URL to `/api` in production mode
- Update CORS origin in the backend from `localhost:5173` to your production frontend URL
- Ensure all Stream and MongoDB credentials are set in your hosting provider's environment config

---

## 🐛 Known Issues / Improvements

- `{ timeseries: true }` in `User.model.js` should be `{ timestamps: true }` (typo causing missing `createdAt`/`updatedAt` fields)
- CORS origin is hardcoded to `localhost:5173` — should be moved to an environment variable
- `interestTag` is stored as a single string; naming implies it could support multiple tags in a future version
- dotenv path uses `./env` instead of the standard `./.env`

---

