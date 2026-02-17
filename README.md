# AI Ops Council

The exclusive community for AI operators running production systems.

## Project Info

**Website**: https://aiopscouncil.io

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, shadcn-ui
- **Backend**: Node.js, Express, TypeScript
- **Database**: AWS DynamoDB
- **Payments**: Stripe
- **Auth**: Email/Password + OAuth (Google, Discord, GitHub)

## Development

```sh
# Install dependencies
npm install

# Start frontend dev server
npm run dev

# Build for production
npm run build
```

## Backend

```sh
cd backend
npm install
npm run build
npm start
```

## Deployment

Frontend and backend deploy to AWS EC2 instance at aiopscouncil.io.

- Frontend: Served via nginx from `/var/www/aiopscouncil`
- Backend: PM2 process on port 3001, proxied via nginx at `/api`
