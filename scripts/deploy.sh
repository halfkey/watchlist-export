#!/bin/bash

# Build the project
echo "Building project..."
npm run build

# Deploy to Vercel
echo "Deploying to Vercel..."
vercel deploy --prod

# Check deployment status
echo "Checking deployment status..."
vercel ls 