
# CMS Backend (Node + Express + MongoDB)

A strong, production-ready backend to power your custom CMS with:
- JWT auth (httpOnly cookie)
- Role-based access (admin/editor)
- Pages CRUD with blocks (heading/paragraph/image/button)
- Public GET APIs for published content
- Validation with Zod
- Centralized error handling
- Security hardening (helmet, CORS, rate limiting, compression)
- Logging (morgan)
- Admin seeding script

## Structure
```
src/
  config/db.js
  controllers/
    authController.js
    pageController.js
  middleware/
    auth.js
    error.js
    validate.js
  models/
    Page.js
    User.js
  routes/
    authRoutes.js
    pageRoutes.js
  seed/adminSeeder.js
  utils/
    asyncHandler.js
    logger.js
  server.js
```

## Quick Start

1) Install deps
```bash
npm install
```

2) Configure environment
Create `.env` from `.env.example` and set values:
```bash
cp .env.example .env
```

3) Run MongoDB and seed an admin
```bash
npm run seed:admin
```

4) Start server
```bash
npm run dev
```

## API Overview

### Auth
- `POST /api/auth/login` — { email, password }
- `POST /api/auth/logout`
- `POST /api/auth/register` — Admin only, create user (admin/editor)

### Public Pages
- `GET /api/pages?query=&page=1&limit=20`
- `GET /api/pages/:slug`

### Admin Pages (Auth required, admin/editor)
- `GET /api/admin/pages?status=all|published|draft&query=&page=1&limit=20`
- `GET /api/admin/pages/:id`
- `POST /api/admin/pages`
- `PUT /api/admin/pages/:id`
- `PATCH /api/admin/pages/:id/publish` — { published: boolean }
- `DELETE /api/admin/pages/:id`

## Notes
- JWT is set as an httpOnly cookie (`accessToken`) and also returned in JSON for flexibility.
- CORS is locked to `CORS_ORIGIN` — set it to your admin/frontend origin(s).
- For production, set `COOKIE_SECURE=true` and serve behind HTTPS.

