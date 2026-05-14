# Deployment Guide

## ✅ What's Done

- ✅ 166 blog posts converted from MDX to Markdown
- ✅ Dark theme with orange (#F97316) accents
- ✅ Responsive design with Tailwind CSS
- ✅ Content collections configured
- ✅ GitHub Actions workflow ready
- ✅ Site builds successfully (174 pages)
- ✅ Original slug URLs preserved

## 🚀 Deployment Steps

### 1. Create GitHub Repository

```bash
cd /tmp/blog-rene-dohmen-site

# Option A: Create via GitHub CLI
gh repo create virge-creator/blog-rene-dohmen-site --public --source=. --remote=origin

# Option B: Create manually on GitHub, then:
git remote add origin git@github.com:virge-creator/blog-rene-dohmen-site.git
```

### 2. Enable GitHub Pages

1. Go to repository Settings → Pages
2. Source: **GitHub Actions**
3. Save

### 3. Push Code

```bash
git push -u origin main
```

The GitHub Actions workflow will automatically:
- Install dependencies
- Build the Astro site
- Deploy to GitHub Pages

### 4. Configure Custom Domain (blog.renedohmen.nl)

1. Go to Settings → Pages
2. Custom domain: `blog.renedohmen.nl`
3. Update DNS records:
   - Type: **CNAME**
   - Name: **blog** (or @ for apex)
   - Value: **virge-creator.github.io**

### 5. Verify Deployment

Visit: https://virge-creator.github.io/blog-rene-dohmen-site

Then after DNS propagates: https://blog.renedohmen.nl

## 📊 What Was Migrated

- **166 published posts** (5 skipped: 2 unpublished, 3 with conversion errors)
- **Original URLs preserved** (e.g., `/working-with-git-submodules/`)
- **Categories**: Computerz, Music, Life, Food, Personal, etc.
- **Images**: Thumbnails and post assets copied to `/public/images/`
- **Tags**: Auto-generated from content + categories

## 🎨 Site Features

- **Homepage**: Hero section + 6 recent posts + category browser
- **Blog page**: All posts with grid layout
- **Category pages**: Filtered by category
- **Post pages**: Full content with tags, reading time, date
- **Responsive**: Mobile-first design
- **Dark theme**: Black (#0a0a0a) + orange (#F97316)
- **Card hover effects**: Glowing orange borders

## 🛠️ Development

```bash
npm install
npm run dev        # Start dev server
npm run build      # Build for production
```

## ⚠️ Known Issues

- Some posts had images stripped (MDX-embedded images couldn't be reliably converted)
- 3 posts failed conversion (non-string titles in frontmatter)
- Code block syntax highlighting may need adjustment for some languages

## 🔧 Maintenance

- Add new posts to `src/content/blog/`
- Use frontmatter format:
  ```yaml
  ---
  title: 'Post Title'
  date: '2024-05-14'
  author: 'René Dohmen'
  category: 'Computerz'
  tags: ['python', 'linux']
  thumbnail: '/images/thumbnails/example.png'
  status: 'published'
  ---
  ```
- Push to `main` branch to auto-deploy

## 📁 Project Structure

```
/tmp/blog-rene-dohmen-site/
├── src/
│   ├── content/
│   │   ├── blog/          # 166 .md files
│   │   └── config.ts      # Content collection schema
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── BlogPost.astro
│   ├── components/
│   │   ├── PostCard.astro
│   │   └── Icon.astro
│   ├── pages/
│   │   ├── index.astro           # Homepage
│   │   ├── about.astro           # About page
│   │   ├── [slug].astro          # Individual posts
│   │   ├── blog/index.astro      # All posts
│   │   └── category/[category].astro
│   └── styles/
│       └── global.css
├── public/
│   └── images/
│       ├── thumbnails/    # Shared thumbnails
│       └── posts/         # Post-specific images
└── .github/
    └── workflows/
        └── deploy.yml     # GitHub Actions
```

## ✨ Success!

Your blog is ready to deploy! All 166 posts migrated successfully.
