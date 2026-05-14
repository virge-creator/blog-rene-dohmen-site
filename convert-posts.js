import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_DIR = '/tmp/blog-rene-dohmen/@elegantstack/site/content/posts';
const ASSETS_DIR = '/tmp/blog-rene-dohmen/@elegantstack/site/content/assets';
const OLD_WP_DIR = '/tmp/blog-rene-dohmen/content_old/blog/wp-content/uploads';
const TARGET_CONTENT_DIR = path.join(__dirname, 'src/content/blog');
const TARGET_IMAGES_DIR = path.join(__dirname, 'public/images');

// Unsplash images for different categories/topics
const UNSPLASH_IMAGES = {
  'Computerz': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800',
  'Music': 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800',
  'Life': 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800',
  'Food': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
  'Personal': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800',
  'linux': 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800',
  'git': 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800',
  'python': 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800',
  'motorcycle': 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800',
  'default': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
};

// Tag generation based on keywords
const TAG_KEYWORDS = {
  'python': ['python', 'django', 'fastapi', 'flask'],
  'javascript': ['javascript', 'js', 'node', 'react', 'vue'],
  'linux': ['linux', 'ubuntu', 'debian', 'arch', 'unix'],
  'docker': ['docker', 'container'],
  'git': ['git', 'github', 'version control'],
  'nginx': ['nginx', 'web server'],
  'ssh': ['ssh', 'secure shell'],
  'ansible': ['ansible', 'automation'],
  'database': ['mysql', 'postgresql', 'mongodb', 'database'],
  'motorcycle': ['motorcycle', 'suzuki', 'vx800', 'bike'],
  'music': ['music', 'audio', 'guitar', 'band'],
  'tutorial': ['how to', 'guide', 'tutorial'],
  'devops': ['devops', 'deployment', 'ci/cd'],
};

async function extractFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  
  const frontmatterText = match[1];
  const frontmatter = {};
  
  // Parse YAML-like frontmatter
  const lines = frontmatterText.split('\n');
  let currentKey = null;
  
  for (const line of lines) {
    if (line.startsWith('  ') && currentKey) {
      // Array item
      const value = line.trim().replace(/^-\s*/, '');
      if (!Array.isArray(frontmatter[currentKey])) {
        frontmatter[currentKey] = [];
      }
      frontmatter[currentKey].push(value);
    } else if (line.includes(':')) {
      const [key, ...valueParts] = line.split(':');
      const value = valueParts.join(':').trim().replace(/^['"]|['"]$/g, '');
      currentKey = key.trim();
      frontmatter[currentKey] = value || [];
    }
  }
  
  return {
    frontmatter,
    content: content.slice(match[0].length).trim()
  };
}

function generateTags(title, content, category) {
  const tags = new Set([category]);
  const searchText = `${title} ${content}`.toLowerCase();
  
  for (const [tag, keywords] of Object.entries(TAG_KEYWORDS)) {
    for (const keyword of keywords) {
      if (searchText.includes(keyword.toLowerCase())) {
        tags.add(tag);
        break;
      }
    }
  }
  
  return Array.from(tags).slice(0, 8); // Max 8 tags
}

function cleanMarkdown(content) {
  // Remove import statements
  content = content.replace(/^import\s+.*$/gm, '');
  
  // Convert MDX-specific syntax to plain Markdown
  content = content.replace(/<YouTube\s+youTubeId=['"]([^'"]+)['"]\s*\/>/g, 
    'Watch on YouTube: https://youtube.com/watch?v=$1');
  
  // Remove JSX components
  content = content.replace(/<[A-Z][^>]*>/g, '');
  content = content.replace(/<\/[A-Z][^>]*>/g, '');
  
  // Clean up extra whitespace
  content = content.replace(/\n{3,}/g, '\n\n');
  
  return content.trim();
}

async function copyImage(srcPath, destPath) {
  try {
    await fs.mkdir(path.dirname(destPath), { recursive: true });
    await fs.copyFile(srcPath, destPath);
    return true;
  } catch (error) {
    console.error(`Failed to copy image: ${srcPath}`, error.message);
    return false;
  }
}

async function processThumbnail(thumbnailPath, slug, category, title) {
  if (!thumbnailPath) {
    // No thumbnail - use Unsplash
    const titleLower = title.toLowerCase();
    for (const [key, url] of Object.entries(UNSPLASH_IMAGES)) {
      if (key !== 'default' && titleLower.includes(key.toLowerCase())) {
        return url;
      }
    }
    return UNSPLASH_IMAGES[category] || UNSPLASH_IMAGES.default;
  }
  
  // Handle relative paths like ../../assets/git.png or ./image.jpg
  let sourcePath;
  if (thumbnailPath.includes('../../assets/')) {
    const filename = path.basename(thumbnailPath);
    sourcePath = path.join(ASSETS_DIR, filename);
  } else if (thumbnailPath.startsWith('./')) {
    const filename = path.basename(thumbnailPath);
    sourcePath = path.join(SOURCE_DIR, slug, filename);
  } else {
    // Absolute path or external URL
    if (thumbnailPath.startsWith('http')) {
      return thumbnailPath;
    }
    sourcePath = thumbnailPath;
  }
  
  // Copy to public/images/thumbnails/
  const filename = path.basename(sourcePath);
  const destPath = path.join(TARGET_IMAGES_DIR, 'thumbnails', filename);
  
  const copied = await copyImage(sourcePath, destPath);
  if (copied) {
    return `/images/thumbnails/${filename}`;
  }
  
  // Fallback to Unsplash
  return UNSPLASH_IMAGES[category] || UNSPLASH_IMAGES.default;
}

async function processPost(slug) {
  const mdxPath = path.join(SOURCE_DIR, slug, 'index.mdx');
  
  try {
    const content = await fs.readFile(mdxPath, 'utf-8');
    const parsed = await extractFrontmatter(content);
    
    if (!parsed) {
      console.warn(`⚠️  No frontmatter found in ${slug}`);
      return null;
    }
    
    const { frontmatter, content: body } = parsed;
    
    // Skip unpublished posts
    if (frontmatter.status !== 'published') {
      console.log(`⏭️  Skipping unpublished: ${slug}`);
      return null;
    }
    
    // Extract data
    const title = frontmatter.title || slug;
    const category = frontmatter.category || 'Personal';
    const date = frontmatter.date || new Date().toISOString();
    const author = Array.isArray(frontmatter.author) 
      ? frontmatter.author[0] 
      : frontmatter.author || 'René Dohmen';
    
    // Generate tags
    const tags = generateTags(title, body, category);
    
    // Process thumbnail
    const thumbnail = await processThumbnail(
      frontmatter.thumbnail, 
      slug, 
      category, 
      title
    );
    
    // Clean markdown content
    const cleanedBody = cleanMarkdown(body);
    
    // Copy post-local images
    const postDir = path.join(SOURCE_DIR, slug);
    try {
      const files = await fs.readdir(postDir);
      const imageFiles = files.filter(f => 
        /\.(jpg|jpeg|png|gif|webp)$/i.test(f) && f !== 'index.mdx'
      );
      
      for (const imgFile of imageFiles) {
        const srcPath = path.join(postDir, imgFile);
        const destPath = path.join(TARGET_IMAGES_DIR, 'posts', slug, imgFile);
        await copyImage(srcPath, destPath);
      }
    } catch (error) {
      // No images directory
    }
    
    // Create new frontmatter
    const newFrontmatter = {
      title,
      date,
      author,
      category,
      tags,
      thumbnail,
      status: 'published'
    };
    
    // Build new Markdown file
    const newContent = `---
title: '${title.replace(/'/g, "''")}'
date: '${date}'
author: '${author}'
category: '${category}'
tags: ${JSON.stringify(tags)}
thumbnail: '${thumbnail}'
status: 'published'
---

${cleanedBody}
`;
    
    // Write to target directory
    const targetPath = path.join(TARGET_CONTENT_DIR, `${slug}.md`);
    await fs.writeFile(targetPath, newContent, 'utf-8');
    
    console.log(`✅ Converted: ${slug}`);
    return { slug, title, success: true };
    
  } catch (error) {
    console.error(`❌ Error processing ${slug}:`, error.message);
    return { slug, error: error.message, success: false };
  }
}

async function main() {
  console.log('🚀 Starting blog conversion...\n');
  
  // Create directories
  await fs.mkdir(TARGET_CONTENT_DIR, { recursive: true });
  await fs.mkdir(path.join(TARGET_IMAGES_DIR, 'thumbnails'), { recursive: true });
  await fs.mkdir(path.join(TARGET_IMAGES_DIR, 'posts'), { recursive: true });
  
  // Get all post directories
  const postDirs = await fs.readdir(SOURCE_DIR);
  const validPosts = [];
  
  for (const dir of postDirs) {
    const mdxPath = path.join(SOURCE_DIR, dir, 'index.mdx');
    try {
      await fs.access(mdxPath);
      validPosts.push(dir);
    } catch {
      // Not a valid post directory
    }
  }
  
  console.log(`📚 Found ${validPosts.length} posts to convert\n`);
  
  // Process all posts
  const results = [];
  for (const slug of validPosts) {
    const result = await processPost(slug);
    if (result) {
      results.push(result);
    }
  }
  
  // Summary
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  console.log('\n' + '='.repeat(50));
  console.log(`✨ Conversion complete!`);
  console.log(`   Successful: ${successful}`);
  console.log(`   Failed: ${failed}`);
  console.log(`   Total: ${results.length}`);
  console.log('='.repeat(50));
}

main().catch(console.error);
