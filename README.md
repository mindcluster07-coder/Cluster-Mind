# Cluster-Mind

Customer Dashboard - AI Personalized Marketing System.

## Structure

- `frontend/` - React + Vite customer dashboard
- `backend/` - Express + MongoDB REST API
- `ai-ml/` - FastAPI AI/ML service

## Setup

```bash
npm install
npm run seed
npm run dev:backend
npm run dev:frontend
```

## Deploy

- Frontend: `cd frontend && vercel --prod`
- Backend: `cd backend && vercel --prod`
