# Next.js project setup

*Automatically synced with your [v0.dev](https://v0.dev) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/britishandbohemians-projects/v0-next-js-project-setup)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/R5l0SzdzTvj)

## Overview

This repository will stay in sync with your deployed chats on [v0.dev](https://v0.dev).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.dev](https://v0.dev).

## Deployment

Your project is live at:

**[https://vercel.com/britishandbohemians-projects/v0-next-js-project-setup](https://vercel.com/britishandbohemians-projects/v0-next-js-project-setup)**

## GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages with proper CSS and static asset handling.

### Manual Deployment

1. Build the project for static export:
   ```bash
   npm run build:static
   ```

2. The static files will be generated in the `out/` directory with all CSS and assets properly included

3. Verify the build:
   ```bash
   npm run verify
   ```

4. Push the `out/` directory to the `gh-pages` branch or enable GitHub Pages in your repository settings

### Automatic Deployment

The project includes a GitHub Actions workflow that automatically builds and deploys to GitHub Pages when you push to the main branch. The build process ensures:
- ✅ CSS files are properly exported and optimized
- ✅ All static assets are copied to the output directory
- ✅ `.nojekyll` file is created to prevent Jekyll processing
- ✅ Custom 404 page is generated for better user experience

### Local Development

```bash
npm run dev
```

### Build Commands

- `npm run build` - Standard Next.js build
- `npm run build:static` - Build optimized for static export (includes CSS and assets)
- `npm run verify` - Verify that all necessary files are in the build output
- `npm run export` - Alias for standard build
- `npm run deploy` - Build, verify, and show deployment info
- `npm run gh-pages` - Build for GitHub Pages deployment

## Build your app

Continue building your app on:

**[https://v0.dev/chat/projects/R5l0SzdzTvj](https://v0.dev/chat/projects/R5l0SzdzTvj)**

## How It Works

1. Create and modify your project using [v0.dev](https://v0.dev)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository