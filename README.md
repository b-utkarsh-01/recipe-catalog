# Recipe Catalog Frontend

React + Vite frontend for the Recipe Catalog application.

## Tech Stack
- React
- Vite
- React Router
- Context API
- Nginx (for container serving + API reverse proxy)

## Prerequisites
- Node.js 20+
- npm

## Local Development
From this folder (`recipe-catalog`):

```bash
npm install
npm run dev
```

Vite will print a local URL (usually `http://localhost:5173`).

## Build for Production

```bash
npm run build
npm run preview
```

## API Configuration
Frontend uses:

- `VITE_API_BASE_URL` (optional), or
- default: `/api/recipe`

This default works with Docker/Kubernetes because Nginx proxies `/api/*` to backend.

## Docker (Frontend Only)
From project root:

```bash
docker build -t recipe-frontend:latest ./recipe-catalog
docker run -d --name recipe-frontend -p 80:80 recipe-frontend:latest
```

Open `http://localhost`.

## Run Full App with Docker Compose
From project root:

```bash
docker compose up --build -d
```

- Frontend: `http://localhost`
- Backend: `http://localhost:5000`

## Scripts
- `npm run dev` -> start dev server
- `npm run build` -> production build
- `npm run preview` -> preview production build
- `npm run lint` -> lint code
