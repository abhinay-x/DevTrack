# DevTrack · Developer Activity Intelligence

DevTrack is a full-stack productivity companion for engineers. It centralizes daily logs, learning goals, reusable code snippets, and activity analytics while keeping privacy controls, accessibility, and responsive UX at the forefront.

---

## 🧰 Tech Stack
| Layer      | Technologies                                         |
| ---------- | ---------------------------------------------------- |
| Frontend   | React 18, Vite, Tailwind CSS, Recharts, Lucide Icons |
| Backend    | Node.js, Express, MongoDB, Mongoose, JWT Auth        |
| Tooling    | Axios, ESLint, Prettier, npm workspaces              |

---

## ✨ Core Features
1. **Unified Dashboard** – Snapshot of streaks, category breakdowns, and weekly activity (auto-fills gaps if analytics is empty).
2. **Goals & Planning** – CRUD workflows for personal or team goals with filtering and progress states.
3. **Logs & Retros** – Daily log capture with search and sorting to build a personal knowledge graph.
4. **Snippet Library** – Organized code snippets with metadata for quick recall.
5. **AI-ready Insights** – Analytics endpoints structured for ML/AI augmentation.
6. **Secure Auth** – JWT-based authentication with token-aware Axios interceptors.
7. **Responsive Navigation** – Modern hamburger menu with keyboard navigation, focus traps, and scroll locking.
8. **Footer & Static Pages** – Privacy, Terms, and Support pages routed publicly (`/privacy`, `/terms`, `/support`) plus footer shortcuts across the app.

---

## 📁 Project Structure
```
DevTrack
├── client/                 # React SPA
│   ├── src/
│   │   ├── components/     # Layout, navigation, widgets
│   │   ├── context/        # Theme + auth providers
│   │   ├── pages/          # Dashboard, Logs, Goals, Snippets, Privacy, Terms, Support…
│   │   └── services/       # Axios client & API helpers
│   └── vite.config.js
├── server/                 # Express API
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── routes/         # API route definitions
│   │   ├── middleware/     # Auth, validation, error handling
│   │   └── config/         # DB connection, JWT secret, etc.
│   └── server.js
|--postman/                  # Postman collection
│   └── DevTrack.postman_collection.json
|
└── README.md
```

---

## ⚙️ Getting Started

### 1. Prerequisites
- Node.js ≥ 18
- npm ≥ 9
- MongoDB Atlas URI (or local MongoDB instance)

### 2. Clone & Install
```bash
git clone <repository-url>
cd DevTrack

# Backend
cd server
npm install

# Frontend (in a new terminal tab)
cd ../client
npm install
```

### 3. Environment Variables
Create `.env` files in `server/` and `client/`.

**server/.env**
```
PORT=5000
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<strong-secret>
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
```

**client/.env**
```
VITE_API_URL=http://localhost:5000
```

### 4. Run Locally
```bash
# Terminal 1 – backend
cd server
npm run dev

# Terminal 2 – frontend
cd client
npm run dev
```
Visit `http://localhost:5173`.

---

## 🧪 Testing
- **Unit / Integration (server)**: `npm test`
- **Linting (client)**: `npm run lint`
(Add more coverage steps as suites expand.)

---

## 📘 API Documentation
A complete Postman collection covering authentication and goal CRUD endpoints is available at `/postman/DevTrack.postman_collection.json`. Import it into Postman to explore the APIs quickly.

**Collection Structure**
1. `Auth / Register` – `POST /api/auth/register`
2. `Auth / Login` – `POST /api/auth/login` (stores JWT in `token` variable)
3. `Auth / Get Profile` – `GET /api/auth/me`
4. `Goals / Create Goal` – `POST /api/goals`
5. `Goals / Get All Goals` – `GET /api/goals`
6. `Goals / Update Goal` – `PUT /api/goals/:id`
7. `Goals / Delete Goal` – `DELETE /api/goals/:id`

Configure the `baseUrl` variable (defaults to `http://localhost:5000`) and, after logging in once, the remaining secured requests will automatically include the bearer token.

---

## ✅ API Testing
All backend APIs were exercised via Postman. The shared collection demonstrates:
- Automated JWT token capture and reuse via environment variables.
- Environment-based configuration (`baseUrl`, dynamic `goalId`).
- CRUD lifecycle validation for goals (create → update → delete).
- Baseline assertions for status codes and response shapes on every endpoint.

You can find the collection in `/postman`.

---

## 🌐 Accessibility & UX
- Accessible button abstractions with proper ARIA attributes.
- Keyboard-friendly mobile menu with focus trapping and ESC handling.
- The dashboard layout uses flex columns so the footer anchors to the bottom without overlapping main content.

---

## 🔒 Privacy, Terms & Support
- **Privacy Policy**: `/privacy`
- **Terms of Service**: `/terms`
- **Support Channels**: `/support` (email, community forum, priority SLA links)
These routes are public and linked throughout the dashboard footer for quick access.

---

## 🚧 Roadmap
- Expand analytics (team-level dashboards, velocity signals).
- Integrate push notifications for streak reminders.
- Add automated backups/export flows for logs, goals, and snippets.
- Increase automated test coverage across client/server.

---

## 📈 Scalability & Production Considerations
- Frontend can be deployed on a CDN (Vercel/Netlify) for global edge distribution.
- Backend is container-friendly and can run behind a load balancer for horizontal scaling.
- API routes are modular, making it straightforward to introduce versioning (e.g., `/api/v1`).
- JWT secrets should be rotated regularly and tokens can be stored in http-only cookies for improved security.
- MongoDB indexes already exist for high-traffic collections; pagination parameters enable efficient large dataset browsing.
- Background workers (BullMQ/Cron) can be introduced for intensive analytics without blocking request cycles.

---

## 🤝 Contributing
1. Fork the repo and create a feature branch.
2. Follow the existing linting + formatting rules.
3. Submit a descriptive PR referencing the enhancement or bug.

---

Crafted to highlight real-world full-stack engineering practices: accessibility-informed UI, secure APIs, modular architecture, and thoughtful documentation.
