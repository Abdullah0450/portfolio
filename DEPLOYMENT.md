# Deployment Guide

This guide covers deploying your portfolio to various platforms.

## 🚀 Recommended: Vercel

Vercel is the official Next.js hosting platform. It's fast, reliable, and has built-in support for serverless functions (required for the contact form).

### Steps:

1. **Push to GitHub** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/my-portfolio.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Framework: **Next.js** (auto-detected)
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Click "Deploy"

3. **Add Environment Variables**:
   - In Vercel dashboard, go to **Settings > Environment Variables**
   - Add:
     ```
     SENDGRID_API_KEY = your_sendgrid_api_key
     CONTACT_TO = maliktriples123789@gmail.com
     ```
   - Redeploy (Vercel will auto-trigger)

4. **Configure Custom Domain** (Optional):
   - In Vercel dashboard, go to **Settings > Domains**
   - Add your custom domain
   - Update DNS records according to Vercel instructions

### Automatic Deployments:
Every time you push to `main` branch, Vercel automatically builds and deploys. Preview URLs are created for pull requests.

---

## 🌐 Alternative: Netlify

Netlify is a great alternative with good Next.js support.

### Steps:

1. **Deploy from Git**:
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub account
   - Select repository
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Click "Deploy"

2. **Add Environment Variables**:
   - Go to **Site settings > Build & deploy > Environment**
   - Add:
     ```
     SENDGRID_API_KEY = your_sendgrid_api_key
     CONTACT_TO = maliktriples123789@gmail.com
     ```
   - Trigger a new deploy

3. **Configure Serverless Functions**:
   - Netlify requires a `netlify.toml` file for Next.js API routes
   - Create `netlify.toml` in project root:
     ```toml
     [build]
     command = "npm run build"
     functions = ".next/server"
     publish = ".next"

     [[redirects]]
     from = "/api/*"
     to = "/.netlify/functions/:splat"
     status = 200
     ```
   - Commit and push to trigger redeploy

---

## 📦 Self-Hosted: Docker

Host on your own server using Docker.

### Create `Dockerfile`:

```dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy app
COPY .next .next
COPY public public

# Expose port
EXPOSE 3000

# Start server
CMD ["npm", "start"]
```

### Build and Run:

```bash
# Build image
docker build -t my-portfolio .

# Run container
docker run -p 3000:3000 \
  -e SENDGRID_API_KEY=your_key \
  -e CONTACT_TO=your_email \
  my-portfolio
```

---

## 🔒 Security Checklist

Before deploying:

- [ ] Environment variables are set in hosting platform (not in repo)
- [ ] `.env.local` is in `.gitignore`
- [ ] No sensitive keys are hardcoded
- [ ] Contact form validates all inputs
- [ ] CORS headers are properly configured
- [ ] Rate limiting is enabled (optional, for contact API)
- [ ] SSL/TLS certificate is valid
- [ ] Security headers are set in `next.config.ts`

---

## 📊 Performance Monitoring

### Vercel Analytics:
- Automatic Core Web Vitals tracking
- Real user monitoring (RUM)
- Performance dashboard

### Google Search Console:
- Verify site ownership
- Monitor search performance
- Fix indexing issues

### Lighthouse:
```bash
npm install -g lighthouse

# Audit production build
lighthouse https://your-domain.com --view
```

---

## 🐛 Troubleshooting Deployment

### Build fails with peer dependency errors:
```bash
npm install --legacy-peer-deps
git commit -m "Fix peer dependencies"
git push
```

### Contact form returns 500 error:
- Check Vercel/Netlify logs
- Verify `SENDGRID_API_KEY` is set
- Ensure API key has "Mail Send" permission in SendGrid

### Static site generates but API routes don't work:
- Ensure platform supports serverless functions (Vercel/Netlify do)
- Check `next.config.ts` has no invalid exports
- Rebuild and redeploy

### Domain issues:
- Wait 24–48 hours for DNS propagation
- Clear browser cache
- Check DNS records with `nslookup` or `dig`

---

## 🔄 CI/CD Pipeline

### GitHub Actions (Optional):

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run build
      - run: npm run lint
```

---

## 📞 Support

For deployment help:
- **Vercel Docs:** https://vercel.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **SendGrid Docs:** https://docs.sendgrid.com

---

**Your portfolio is production-ready! 🎉**
