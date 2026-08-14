# Thoughtflows — India's No. 1 Medical Coding Academy

A full-stack, cinematic marketing site + admin CMS for a medical coding academy, built on the MERN stack. The visual identity (navy `#153F6C`, deep teal `#0B8995`, bright teal `#16ADBA`) is derived directly from the Thoughtflows logo.

This is a first-pass scaffold seeded with realistic **placeholder content** (15 branches, 6 courses, 18 trainers, testimonials, gallery, stats) so the site is fully browsable out of the box. Swap the placeholder data for real content through the admin dashboard, or by editing `server/src/seed/seed.js` and re-seeding.

## Stack

- **Frontend**: React 19, Vite, React Router 7, Tailwind CSS 3, Framer Motion, Three.js (`@react-three/fiber` + `@react-three/drei`), Axios, lucide-react
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT auth, bcrypt

## Project Structure

```
thoughtflows-academy/
├── client/                  # React + Vite frontend
│   └── src/
│       ├── components/      # Navbar, Footer, Hero, cards, form controls...
│       │   └── sections/    # Home page section blocks (About, WhyChooseUs, etc.)
│       ├── pages/           # Route-level pages (Home, Courses, BranchDetail...)
│       │   └── admin/       # Admin login + generic CRUD dashboard
│       ├── context/         # AuthContext (admin session)
│       ├── hooks/           # useFetch (shared data-fetching hook)
│       ├── services/        # Axios instance
│       └── config/          # adminResources.js — declarative CRUD config
└── server/                  # Express + MongoDB backend
    └── src/
        ├── models/          # Mongoose schemas
        ├── controllers/     # Route handlers (crudFactory.js powers most of them)
        ├── routes/          # Express routers
        ├── middleware/      # JWT auth, error handling
        └── seed/            # seed.js — placeholder data loader
```

## Getting Started

### 1. Backend

```bash
cd server
cp .env.example .env       # then edit MONGO_URI, JWT_SECRET, etc.
npm install
npm run seed                # populates MongoDB with placeholder content + admin account
npm run dev                 # starts API on http://localhost:5000
```

Default seeded admin login (change `ADMIN_SEED_PASSWORD` in `.env` before seeding in any real deployment):
- Email: `admin@thoughtflows.in`
- Password: `ChangeMe123!`

### 2. Frontend

```bash
cd client
cp .env.example .env       # VITE_API_URL defaults to http://localhost:5000/api
npm install
npm run dev                 # starts site on http://localhost:5173
```

Visit `/admin/login` to sign in to the CMS.

### 3. Production build

```bash
cd client && npm run build   # outputs client/dist
cd server && npm start       # NODE_ENV=production node src/server.js
```

## Admin CMS

`/admin` is a single reusable CRUD system (see `client/src/config/adminResources.js` + `pages/admin/ResourceManager.jsx`) covering Courses, Branches, Trainers, Testimonials, Gallery, and Placement Stats — plus a dedicated Enquiries inbox with status tracking. Adding a new manageable field/resource means editing the config file, not writing a new page.

## Notes & Next Steps

- **Images**: all placeholder imagery uses `picsum.photos` seeded URLs so every card/gallery item renders immediately. Replace via the admin dashboard's image-URL fields once you have real photography, or wire up a proper upload flow (an `images/` static route and multer-based upload endpoint are natural next additions).
- **Branch pages**: branches use one dynamic route (`/branches/:slug`) driven by MongoDB data rather than 15 hand-built pages — add, remove, or edit branches entirely from the admin dashboard.
- **Google Maps embeds**: seeded with basic `google.com/maps?q=` embeds; swap in real embed URLs (with a Maps Embed API key) per branch for production.
- **Testing**: this environment couldn't reach a live MongoDB instance to run the API end-to-end (the sandbox's network allowlist blocks MongoDB's binary download host), so verification here was via syntax checks, static review, and a clean production build. Run `npm run seed` locally and click through the site before going live.
