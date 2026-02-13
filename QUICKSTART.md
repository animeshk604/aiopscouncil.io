# Quick Start Guide

Get the AI Ops Council website running in minutes.

## Installation (5 minutes)

```bash
# 1. Navigate to project directory
cd aiopscouncil.io

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env.local

# 4. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development Commands

```bash
npm run dev          # Start development server (with hot reload)
npm run build        # Build for production
npm run start        # Run production build locally
npm run lint         # Check code quality
npm run type-check   # Run TypeScript checking
```

## File Structure (Quick Reference)

```
app/                 # Pages and API routes
├── page.tsx         # Home page
├── about/page.tsx   # About page
├── products/page.tsx # Products page
├── join/page.tsx    # Join & form page
└── api/apply/route.ts # Form submission API

components/          # Reusable components
├── Navbar.tsx       # Top navigation
├── Footer.tsx       # Bottom footer
├── Hero.tsx         # Hero section
├── Card.tsx         # Card component
└── ApplicationForm.tsx # Application form

public/              # Static files
├── robots.txt       # SEO
└── sitemap.xml      # SEO

globals.css          # Global styles
```

## Key Files to Edit

### Update Content

| File | What to change |
|------|---------|
| `app/page.tsx` | Home page content, hero text |
| `app/about/page.tsx` | About page content |
| `app/products/page.tsx` | Product information, ClawAPI details |
| `app/join/page.tsx` | Join page text |
| `components/Navbar.tsx` | Logo text, navigation links |

### Customize Design

| File | What to change |
|------|---------|
| `tailwind.config.ts` | Colors, fonts, spacing |
| `app/globals.css` | Global styles, gradients |
| `components/Navbar.tsx` | Header styling |
| `components/Footer.tsx` | Footer styling |

### Configure Forms

| File | What to change |
|------|---------|
| `.env.local` | Form endpoints, API keys |
| `app/api/apply/route.ts` | Form submission logic |
| `components/ApplicationForm.tsx` | Form fields, validation |

## Making Changes

### Change Hero Text

```typescript
// app/page.tsx - line 30
<Hero
  title="Your Title Here"
  subtitle="Your Subtitle"
  description="Your description"
  cta={{ text: "Button Text", href: "/path" }}
/>
```

### Change Colors

```typescript
// tailwind.config.ts - in theme.extend.colors
cyan: {
  400: '#22d3ee',  // Change this
}
green: {
  400: '#4ade80',  // Or this
}
```

### Add Form Submission Endpoint

```bash
# .env.local - choose one:

# Option 1: Default (logs to console)
NEXT_PUBLIC_FORM_ENDPOINT=/api/apply

# Option 2: Google Forms
NEXT_PUBLIC_FORM_ENDPOINT=https://docs.google.com/forms/u/0/d/YOUR_FORM_ID/formResponse

# Option 3: Formspree
NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID

# Option 4: Custom backend
NEXT_PUBLIC_FORM_ENDPOINT=https://your-api.com/api/apply
```

## Deployment (2 clicks)

### Deploy to Vercel

1. Push code to GitHub
2. Go to https://vercel.com
3. Click "New Project"
4. Select your GitHub repo
5. Click "Deploy"

That's it! Your site is live at `https://yourdomain.vercel.app`

### Configure Custom Domain

1. In Vercel dashboard: Settings → Domains
2. Add `aiopscouncil.io`
3. Update DNS records (Vercel will show you how)
4. Wait 5 minutes for DNS propagation

See `DEPLOYMENT.md` for Netlify, Docker, and other options.

## Testing Locally

```bash
# Build and test production version
npm run build
npm start
# Open http://localhost:3000

# Check for issues
npm run lint
npm run type-check
```

## Common Tasks

### Update Form Fields

Edit `components/ApplicationForm.tsx`:

```typescript
// Add new field
<div>
  <label>New Field</label>
  <input
    name="newField"
    value={formData.newField}
    onChange={handleChange}
  />
</div>

// Update formData state
const [formData, setFormData] = useState<FormData>({
  // ... existing fields
  newField: '',
});

// Add validation
if (!formData.newField) newErrors.newField = 'Required';
```

### Add New Page

```bash
# 1. Create directory
mkdir app/newpage

# 2. Create page.tsx
cat > app/newpage/page.tsx << 'EOF'
import { Metadata } from 'next';
import Hero from '@/components/Hero';

export const metadata: Metadata = {
  title: 'New Page | AI Ops Council',
};

export default function NewPage() {
  return (
    <>
      <Hero title="New Page" subtitle="Subtitle" />
      {/* Add content here */}
    </>
  );
}
EOF
```

### Change Font

```typescript
// app/layout.tsx - update Google Fonts import
<link
  href="https://fonts.googleapis.com/css2?family=YourFont:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>

// tailwind.config.ts - update font family
fontFamily: {
  sans: ['YourFont', 'system-ui', 'sans-serif'],
}
```

## Troubleshooting

### Port 3000 Already In Use

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :3000
kill -9 <PID>

# Or use different port
npm run dev -- -p 3001
```

### Build Fails

```bash
# Clear cache
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### Form Not Submitting

1. Check browser console for errors (F12 > Console)
2. Check `.env.local` has correct endpoint
3. Verify API route exists at `app/api/apply/route.ts`
4. Test with curl:
   ```bash
   curl -X POST http://localhost:3000/api/apply \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@test.com","discord":"user","role":"Engineer","yearsExperience":"2-5","warStory":"A long story about production"}'
   ```

### Styles Not Applying

```bash
# Rebuild Tailwind
npm run build

# Or delete cache
rm -rf .next
npm run dev
```

## Environment Setup (One-Time)

```bash
# Install Node.js 18+ from https://nodejs.org

# Verify installation
node --version  # Should be 18+
npm --version   # Should be 8+

# Optional: Install Vercel CLI for easier deployments
npm install -g vercel
```

## Git Workflow (Recommended)

```bash
# Initial setup
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/aiopscouncil.io
git push -u origin main

# Making changes
git add .
git commit -m "Update content"
git push  # Auto-deploys on Vercel
```

## Performance Tips

1. **Minimize images**: Use WebP format when possible
2. **Lazy load**: Images load on demand automatically
3. **Cache bust**: Rename images if changed (prevents cache issues)
4. **Monitor**: Check Vercel Analytics > Speed Insights

## Security Checklist

- [ ] No API keys in code (use .env.local)
- [ ] .env.local added to .gitignore
- [ ] HTTPS enabled (automatic on Vercel)
- [ ] Form validation works
- [ ] No console.log with sensitive data

## Next Steps

1. ✅ Install and run locally
2. ✅ Customize content and colors
3. ✅ Test form submission
4. ✅ Deploy to Vercel/Netlify
5. ✅ Set up custom domain
6. ✅ Monitor analytics

## Documentation

- **Full Docs**: `README.md`
- **Deployment**: `DEPLOYMENT.md`
- **Project Overview**: `PROJECT_SUMMARY.md`
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind Docs**: https://tailwindcss.com/docs

## Support

- Check existing docs in the project
- Review Next.js documentation
- Search error messages in official docs
- Ask in Next.js Discord community

---

**Ready to launch?** Head to `DEPLOYMENT.md` when you're ready to go live!
