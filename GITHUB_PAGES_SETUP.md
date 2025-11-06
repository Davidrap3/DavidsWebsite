# GitHub Pages Deployment Guide

This guide explains how to deploy your art catalog website to GitHub Pages for free static hosting.

## Prerequisites

- Your code is already on GitHub (which it is!)
- You have push access to the repository

---

## Initial Setup (One-Time)

### Step 1: Build the Static Site

The website needs to be built into static files first. Run these commands in your terminal:

```bash
# Navigate to the client directory
cd client

# Install dependencies (if not already done)
npm install

# Build the production version
npm run build
```

This creates a `client/build/` directory with all the static files.

### Step 2: Update .gitignore

Make sure the build folder is NOT ignored by git. Open `.gitignore` and check that `/build` or `build/` is NOT listed (or is commented out with `#`).

If you see:
```
/build
```

Either remove that line or comment it out:
```
# /build
```

### Step 3: Configure GitHub Pages

**Option A: Use gh-pages branch (Recommended)**

1. Install gh-pages package:
```bash
npm install --save-dev gh-pages
```

2. Add these scripts to `client/package.json`:
```json
"scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
}
```

3. Add homepage URL to `client/package.json`:
```json
{
    "name": "client",
    "version": "0.1.0",
    "homepage": "https://YOUR-GITHUB-USERNAME.github.io/DavidsWebsite",
    "private": true,
    ...
}
```
Replace `YOUR-GITHUB-USERNAME` with the actual GitHub username.

4. Deploy:
```bash
npm run deploy
```

This will:
- Build your site
- Create/update a `gh-pages` branch
- Push the built files to that branch

**Option B: Use docs folder**

1. Move your build folder:
```bash
cd ..  # Go back to root
mkdir -p docs
cp -r client/build/* docs/
```

2. Commit the docs folder:
```bash
git add docs/
git commit -m "Add docs folder for GitHub Pages"
git push
```

3. Go to your GitHub repository settings:
   - Click "Settings" tab
   - Scroll to "Pages" section
   - Under "Source", select "main" branch
   - Select "/docs" folder
   - Click "Save"

---

## Enabling GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top right)
3. Click **Pages** (left sidebar)
4. Under **Source**:
   - If using gh-pages: Select "gh-pages" branch and "/ (root)"
   - If using docs: Select "main" branch and "/docs"
5. Click **Save**

Wait a few minutes, then visit:
```
https://YOUR-GITHUB-USERNAME.github.io/DavidsWebsite
```

---

## Updating Your Site

Every time you make changes (add artworks, edit text, etc.):

### If using gh-pages:
```bash
cd client
npm run deploy
```

### If using docs folder:
```bash
cd client
npm run build
cd ..
rm -rf docs/*
cp -r client/build/* docs/
git add docs/
git commit -m "Update website"
git push
```

The site will automatically update in 1-3 minutes.

---

## Important Notes About Static Hosting

### What Works ✅
- All gallery images
- All artwork metadata
- Contact form (if it doesn't need server-side processing)
- All JSON file updates

### What Doesn't Work ❌
- The Flask backend API
- Server-side email sending
- Database operations

### Email Form Solution

Your contact form currently may rely on the Flask backend. For GitHub Pages, you have these options:

1. **Use a service like Formspree or EmailJS**
   - Formspree: https://formspree.io/
   - EmailJS: https://www.emailjs.com/
   - Both have free tiers

2. **Use a Google Form**
   - Embed a Google Form for contact

3. **Use Netlify Forms** (if hosting on Netlify instead)

---

## Troubleshooting

### Site Shows 404
- Make sure GitHub Pages is enabled
- Check that the branch/folder is correct
- Wait 5-10 minutes for GitHub to build

### Images Not Loading
- Check that image paths are correct (should start with `images/` not `/images/`)
- Make sure images are in the `client/public/images/` folder
- Verify images were copied to the build folder

### JSON Files Not Loading
- Make sure they're in `client/public/data/`
- Check that the paths in your code use `/data/filename.json`
- Verify they were copied to the build folder

### CSS Not Loading
- Make sure you ran `npm run build`
- Check the homepage URL in package.json matches your GitHub Pages URL

---

## Alternative: Using Netlify (Easier Option)

If GitHub Pages seems complicated, Netlify is even easier:

1. Go to https://netlify.com
2. Sign in with GitHub
3. Click "Add new site" → "Import existing project"
4. Select your repository
5. Set build settings:
   - Build command: `cd client && npm run build`
   - Publish directory: `client/build`
6. Click "Deploy"

Netlify will:
- Auto-build on every push
- Provide a free domain
- Handle form submissions for free
- Give you HTTPS automatically

---

## Quick Deploy Checklist

- [ ] Run `npm run build` in client folder
- [ ] Check that build folder was created
- [ ] Set up GitHub Pages (gh-pages branch or docs folder)
- [ ] Enable Pages in repository settings
- [ ] Wait 3-5 minutes
- [ ] Visit your site URL
- [ ] Test adding/editing JSON files
- [ ] Verify images load correctly

---

## Maintenance Workflow

When your friend updates content:

1. Edit JSON files (following MAINTENANCE_GUIDE.md)
2. Add any new images to `client/public/images/testingImages/`
3. Commit changes:
   ```bash
   git add .
   git commit -m "Added new artwork"
   git push
   ```
4. Deploy updated site:
   ```bash
   cd client
   npm run deploy
   ```

That's it! The site updates in minutes.
