#!/bin/bash
# Quick deployment script for Vercel
# Usage: bash deploy.sh

set -e

echo "🚀 Abdullah Malik's Portfolio - Deployment Script"
echo "=================================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
    git add .
    git commit -m "Initial portfolio commit"
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📥 Installing Vercel CLI..."
    npm install -g vercel
fi

# Build locally to catch errors early
echo "🔨 Building locally..."
npm run build

# Deploy to Vercel
echo "☁️ Deploying to Vercel..."
vercel

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Next steps:"
echo "1. Add environment variables in Vercel dashboard"
echo "2. Set SENDGRID_API_KEY and CONTACT_TO"
echo "3. Test the contact form"
echo ""
echo "Documentation:"
echo "📖 README.md - Project overview"
echo "📖 DEPLOYMENT.md - Detailed deployment guide"
echo "📖 CHECKLIST.md - Pre-launch checklist"
echo ""
