# Deployment Guide

Complete guide to deploying the AI Ops Council website to production.

## Pre-Deployment Checklist

- [ ] Run `npm run build` successfully
- [ ] Run `npm run type-check` with no errors
- [ ] Run `npm run lint` and fix any issues
- [ ] Test locally with `npm run dev`
- [ ] Update metadata and content as needed
- [ ] Configure environment variables
- [ ] Test form submission
- [ ] Check mobile responsiveness
- [ ] Verify SEO metadata (og:image, title, description)

## Local Testing

```bash
# Build and test locally
npm run build
npm start

# Visit http://localhost:3000
# Test all pages and forms
```

## Vercel Deployment (Recommended)

Vercel is the official Next.js hosting platform and offers the best integration.

### Step 1: Prepare Repository

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit: AI Ops Council website"
git branch -M main

# Add remote (replace with your GitHub URL)
git remote add origin https://github.com/YOUR_USERNAME/aiopscouncil.io
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to [https://vercel.com](https://vercel.com)
2. Sign up or log in with GitHub account
3. Click "New Project"
4. Select your `aiopscouncil.io` repository
5. Vercel will auto-detect Next.js configuration
6. Click "Deploy"

### Step 3: Configure Environment Variables

In Vercel Dashboard:

1. Go to Settings > Environment Variables
2. Add any needed variables:
   - `NEXT_PUBLIC_FORM_ENDPOINT` (optional, defaults to `/api/apply`)
   - `FORM_SUBMISSION_ENDPOINT` (optional, for external form service)
3. Redeploy after adding environment variables

### Step 4: Set Custom Domain

In Vercel Dashboard:

1. Go to Settings > Domains
2. Add `aiopscouncil.io`
3. Vercel will provide DNS records to add
4. Update your DNS provider with these records
5. Wait for DNS propagation (usually 5 minutes)

### Step 5: Enable Auto-Deploy

By default, Vercel auto-deploys on every push to `main` branch:

```bash
# To push changes and auto-deploy
git add .
git commit -m "Update content"
git push
```

## Netlify Deployment

Alternative platform with easy GitHub integration.

### Step 1: Connect Repository

1. Go to [https://netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Select GitHub and authorize
4. Choose your `aiopscouncil.io` repository

### Step 2: Configure Build Settings

1. Build command: `npm run build`
2. Publish directory: `.next`
3. Click "Deploy site"

### Step 3: Set Environment Variables

1. Go to Site settings > Build & deploy > Environment
2. Add environment variables:
   - `NEXT_PUBLIC_FORM_ENDPOINT`
   - `FORM_SUBMISSION_ENDPOINT`
3. Trigger redeploy

### Step 4: Configure Custom Domain

1. Go to Site settings > Domain management
2. Add custom domain: `aiopscouncil.io`
3. Update DNS records per Netlify's instructions
4. Verify domain

## Docker Deployment (Self-Hosted)

For maximum control and self-hosting.

### Step 1: Build Docker Image

```bash
docker build -t aiopscouncil:latest .
```

### Step 2: Run Container Locally

```bash
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_FORM_ENDPOINT=/api/apply \
  aiopscouncil:latest
```

### Step 3: Push to Registry

```bash
# Docker Hub
docker tag aiopscouncil:latest your-username/aiopscouncil:latest
docker push your-username/aiopscouncil:latest

# Or use any registry (AWS ECR, Google Container Registry, etc.)
```

### Step 4: Deploy to Cloud

**AWS (ECS/Fargate):**

```bash
# Create task definition, service, and load balancer
# See AWS documentation for detailed setup
```

**Google Cloud Run:**

```bash
# Build and deploy
gcloud run deploy aiopscouncil \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars="NEXT_PUBLIC_FORM_ENDPOINT=/api/apply"
```

**DigitalOcean App Platform:**

```bash
# Connect GitHub repo to DigitalOcean
# Configure build settings:
# - Build command: npm run build
# - Run command: npm start
# Deploy
```

## Database Integration (Optional)

For storing applications instead of logging to console:

### PostgreSQL with Prisma

1. Install Prisma:
   ```bash
   npm install @prisma/client
   npm install -D prisma
   ```

2. Initialize Prisma:
   ```bash
   npx prisma init
   ```

3. Define schema in `prisma/schema.prisma`:
   ```prisma
   model Application {
     id            String    @id @default(cuid())
     name          String
     email         String    @unique
     discord       String
     role          String
     yearsExperience String
     warStory      String    @db.Text
     createdAt     DateTime  @default(now())
   }
   ```

4. Run migrations:
   ```bash
   npx prisma migrate dev --name init
   ```

5. Update API route `app/api/apply/route.ts`:
   ```typescript
   import { PrismaClient } from '@prisma/client';

   const prisma = new PrismaClient();

   export async function POST(request: NextRequest) {
     const body = await request.json();

     const application = await prisma.application.create({
       data: body,
     });

     return NextResponse.json({ success: true }, { status: 200 });
   }
   ```

6. Add DATABASE_URL to environment variables

## Email Integration (Optional)

For sending confirmation emails to applicants:

### Resend

1. Sign up at [https://resend.com](https://resend.com)
2. Get API key
3. Install Resend SDK:
   ```bash
   npm install resend
   ```

4. Update API route:
   ```typescript
   import { Resend } from 'resend';

   const resend = new Resend(process.env.RESEND_API_KEY);

   export async function POST(request: NextRequest) {
     const body = await request.json();

     // Send confirmation email
     await resend.emails.send({
       from: 'applications@aiopscouncil.io',
       to: body.email,
       subject: 'Application Received',
       html: `<p>Hi ${body.name},</p><p>We received your application. We'll review it and get back to you soon.</p>`,
     });

     return NextResponse.json({ success: true });
   }
   ```

### SendGrid

```bash
npm install @sendgrid/mail
```

```typescript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(request: NextRequest) {
  const body = await request.json();

  await sgMail.send({
    to: body.email,
    from: 'applications@aiopscouncil.io',
    subject: 'Application Received',
    html: `<p>Hi ${body.name},</p><p>We received your application!</p>`,
  });

  return NextResponse.json({ success: true });
}
```

## Analytics & Monitoring

### Vercel Analytics

Automatically available on Vercel. View in Vercel Dashboard > Analytics.

### Google Analytics

1. Create property at [https://analytics.google.com](https://analytics.google.com)
2. Add tracking script to `app/layout.tsx`:
   ```typescript
   import Script from 'next/script';

   <Script
     src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
     strategy="afterInteractive"
   />
   <Script
     id="google-analytics"
     strategy="afterInteractive"
     dangerouslySetInnerHTML={{
       __html: `
         window.dataLayer = window.dataLayer || [];
         function gtag(){dataLayer.push(arguments);}
         gtag('js', new Date());
         gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
       `,
     }}
   />
   ```

3. Add `NEXT_PUBLIC_GA_ID` environment variable

### Sentry (Error Tracking)

1. Sign up at [https://sentry.io](https://sentry.io)
2. Create Next.js project
3. Install SDK:
   ```bash
   npm install @sentry/nextjs
   ```

4. Configure Sentry

## Performance Optimization

### Image Optimization

Already handled by Next.js Image component. Monitor in Vercel Analytics.

### Cache Headers

Next.js automatically sets optimal cache headers:
- Static pages: 31536000 seconds (1 year)
- Dynamic pages: 0 seconds

### CDN

- **Vercel**: Global CDN built-in
- **Netlify**: Global CDN built-in
- **Self-hosted**: Use Cloudflare for free CDN

## Security

### HTTPS

- Vercel: Automatic with Let's Encrypt
- Netlify: Automatic with Let's Encrypt
- Self-hosted: Use Let's Encrypt or your certificate provider

### CORS

Already configured for form submission. Adjust in `app/api/apply/route.ts` if needed.

### Headers

Add security headers in `next.config.ts`:

```typescript
export const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};
```

## Continuous Integration/Deployment (CI/CD)

### GitHub Actions

Create `.github/workflows/ci.yml`:

```yaml
name: CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run type-check
      - run: npm run lint
      - run: npm run build
```

Then on Vercel/Netlify, auto-deploy on main push.

## Monitoring Deployments

### Vercel

```bash
# View deployments
vercel deployments

# View logs
vercel logs [deployment-url]
```

### Check Site Health

```bash
# Check for 404s
curl -i https://aiopscouncil.io/nonexistent

# Check Core Web Vitals
# https://vercel.com/analytics > Speed Insights

# Check SEO
# https://search.google.com/search-console
```

## Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
npm run build -- --verbose

# Check Node version
node --version  # Should be 18+

# Check npm version
npm --version
```

### Deployment Errors

1. Check deployment logs in Vercel/Netlify dashboard
2. Verify environment variables are set
3. Check if `.next` folder is in `.gitignore`
4. Ensure `package-lock.json` is committed

### Performance Issues

1. Check Core Web Vitals in Vercel Analytics
2. Optimize images with Next.js Image
3. Enable ISR (Incremental Static Regeneration) if needed
4. Use Vercel Analytics to identify bottlenecks

## Rollback

### Vercel

```bash
# In Vercel Dashboard:
# Deployments > Select previous deployment > Promote to Production
```

### Netlify

```bash
# In Netlify Dashboard:
# Deploys > Select previous deploy > Publish deploy
```

### Manual Rollback

```bash
git revert <commit-hash>
git push
# Site will auto-redeploy
```

## Maintenance

### Regular Updates

```bash
# Check for outdated packages
npm outdated

# Update packages
npm update

# Test and deploy
npm run build
git push
```

### Monitor Uptime

Use services like:
- [Uptime Robot](https://uptimerobot.com) (free)
- [Pingdom](https://www.pingdom.com)
- [Datadog](https://www.datadoghq.com)

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Netlify Docs**: https://docs.netlify.com

---

Last updated: 2025-02-13
