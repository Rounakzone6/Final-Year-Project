# Nestify

Nestify is a full-stack college accommodation platform with:
- a **public frontend** for students searching for colleges, hostels, PGs, and messes
- an **admin dashboard** for managing cities, colleges, owner requests, and listings
- a **backend API** powered by Express, MongoDB, Cloudinary, and Swagger
- a **bot module** for future AI / knowledge features

## Startup Vision
Nestify is designed to launch as a startup MVP with:
- clean separation between **frontend**, **admin**, and **backend**
- API documentation at `/api-docs`
- RESTful modular routes for cities, colleges, hostels, PGs, mess, reviews, owners, and contributions
- scalable asset uploads via Cloudinary

## Structure
- `frontend/` - public web app
- `admin/` - admin dashboard
- `backend/` - backend API, authentication, and database
- `bot/` - AI bot module

## Run locally
### Install dependencies
From the repository root:
```bash
npm install
npm run install:all
```

### Start development
```bash
npm run dev
```

This launches:
- backend: `backend` API server
- frontend: `frontend` Vite app
- admin: `admin` Vite app

### Individual module commands
```bash
npm --prefix backend run dev
npm --prefix frontend run dev
npm --prefix admin run dev
```

## Environment variables
Create `.env` files from these examples:
- `backend/.env.example`
- `frontend/.env.example`
- `admin/.env.example`
- `bot/.env.example`

## Backend env variables
- `MONGO_URI`
- `JWT_SECRET`
- `SUPER_ADMIN_EMAIL`
- `SUPER_ADMIN_PASSWORD`
- `CLOUDINARY_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `RECAPTCHA_SECRET_KEY`
- `PORT`
- `SWAGGER_SERVER_URL`

## Frontend env variables
- `VITE_BACKEND_URL`
- `VITE_GOOGLE_MAPID`
- `VITE_GOOGLE_MAP_API_KEY`
- `VITE_RECAPTCHA_SITE_KEY`

## Admin env variables
- `VITE_BACKEND_URL`

## Bot env variables
- `OPENAI_API_KEY`
- `GOOGLE_GENAI_API_KEY`
- `MONGO_URI`

## Production notes
- deploy `backend/` to a Node host
- deploy `frontend/` and `admin/` to Vercel or Netlify
- use a shared MongoDB Atlas database and secure Cloudinary credentials
- keep secrets out of source control
