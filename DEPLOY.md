# AI Ops Council Deployment

## Infrastructure

- **Domain:** aiopscouncil.io
- **Server:** 3.89.149.112 (i-06a5a06b82f87fae2)
- **SSH:** `ssh -i "C:\Users\Animesh Kumar\Downloads\clawapi.io.pem" ubuntu@3.89.149.112`
- **Frontend:** /var/www/aiopscouncil (served by nginx)
- **Backend:** Docker container on port 3001

## DynamoDB Tables

- `aiops-users` - User accounts
- `aiops-memberships` - Membership status
- `aiops-applications` - Join applications

## Stripe (Live Mode)

- **Product:** AI Ops Council Membership (`prod_TzmXUoTaY6XWII`)
- **Price:** $500/year (`price_1T1mzeFJXvDXV14qWBdptyLc`)
- **Webhook:** `https://aiopscouncil.io/api/webhook`
- **Webhook Secret:** `whsec_iG0CuuNtHXBZECrzoHu4LCmACXgyauyi`

## Backend Environment Variables

```bash
PORT=3001
JWT_SECRET=aiops-council-jwt-secret-2026
STRIPE_SECRET_KEY=<see clawapi project .claude/stripe>
STRIPE_WEBHOOK_SECRET=<see below in Stripe section>
CONSOLE_URL=https://aiopscouncil.io
AWS_REGION=us-east-1
```

## Deployment Steps

### 1. Build and Push Frontend

```bash
# Local machine
cd C:/Projects/aiopscouncil.io
npm run build
```

### 2. Update Server

```bash
# SSH to server
ssh -i "C:\Users\Animesh Kumar\Downloads\clawapi.io.pem" ubuntu@3.89.149.112

# Pull latest code
cd /home/ubuntu/aiopscouncil.io
git pull origin main

# Build frontend
npm install && npm run build
sudo cp -r dist/* /var/www/aiopscouncil/

# Build and run backend
cd backend
npm install && npm run build

# Run backend with Docker
docker build -t aiopscouncil-backend .
docker stop aiopscouncil-backend 2>/dev/null || true
docker rm aiopscouncil-backend 2>/dev/null || true
docker run -d --name aiopscouncil-backend \
  -p 3001:3001 \
  -e PORT=3001 \
  -e JWT_SECRET=aiops-council-jwt-secret-2026 \
  -e STRIPE_SECRET_KEY="$STRIPE_SECRET_KEY" \
  -e STRIPE_WEBHOOK_SECRET="$STRIPE_WEBHOOK_SECRET" \
  -e CONSOLE_URL=https://aiopscouncil.io \
  -e AWS_REGION=us-east-1 \
  aiopscouncil-backend

# Note: Set STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET env vars first
# STRIPE_SECRET_KEY from clawapi project .claude/stripe
# STRIPE_WEBHOOK_SECRET=whsec_iG0CuuNtHXBZECrzoHu4LCmACXgyauyi
```

### 3. Update Nginx Config

Update `/etc/nginx/sites-available/aiopscouncil` to proxy `/api` to backend:

```nginx
server {
    server_name aiopscouncil.io www.aiopscouncil.io _;

    root /var/www/aiopscouncil;
    index index.html;

    # API proxy to backend
    location /api/ {
        proxy_pass http://localhost:3001/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Frontend SPA
    location / {
        try_files $uri $uri/ /index.html;
    }

    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/aiopscouncil.io/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/aiopscouncil.io/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}

server {
    if ($host = aiopscouncil.io) {
        return 301 https://$host$request_uri;
    }

    listen 80;
    server_name aiopscouncil.io www.aiopscouncil.io _;
    return 404;
}
```

Then reload nginx:
```bash
sudo nginx -t && sudo systemctl reload nginx
```

## Testing

1. Visit https://aiopscouncil.io/join - Submit application
2. Check emails forward to Edward and Animesh
3. Visit https://aiopscouncil.io/login - Register account
4. Visit https://aiopscouncil.io/membership - Complete checkout
5. Verify Stripe subscription created
6. Verify membership status updates in DynamoDB

## Email System

Already configured (see main project docs):
- contact@aiopscouncil.io
- hello@aiopscouncil.io
- info@aiopscouncil.io
- team@aiopscouncil.io
- council@aiopscouncil.io
- partnerships@aiopscouncil.io
- fellows@aiopscouncil.io
- initiatives@aiopscouncil.io
- membership@aiopscouncil.io

All forward to: edward+0001@etumos.com, animeshk604@gmail.com
