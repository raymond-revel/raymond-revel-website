# Website Update Workflow Guide

## 🎯 Overview

This guide explains how to make changes to your website, test them locally, and deploy them to production.

---

## 📁 Your Project Location

**Project Path:**
```
/Volumes/Raymond's HD/Raymond Revel/Website:Cursor:Claude/raymond-revel-website
```

**You can close and reopen Cursor anytime!** Your project files are saved locally.

---

## 🔄 Complete Workflow: Update → Test → Deploy

### Step 1: Open Your Project in Cursor

**If Cursor is closed:**

1. **Open Cursor**
2. **File → Open Folder** (or `Cmd+O` on Mac)
3. **Navigate to:** `/Volumes/Raymond's HD/Raymond Revel/Website:Cursor:Claude/raymond-revel-website`
4. **Click "Open"**

**If Cursor is already open:**
- Just make sure you're in the correct folder
- Check the folder name in the sidebar

---

### Step 2: Make Your Changes

**Common things you might want to update:**

#### 📝 Content Updates
- **Blog posts:** Edit files in `content/blog/`
- **Music releases:** Edit `lib/music.ts`
- **Photos:** Add images to `public/images/photos/` and update `lib/photos.ts`
- **Videos:** Update `lib/videos.ts` for TikTok/Instagram URLs

#### 🎨 Design Updates
- **Styling:** Edit component files in `components/` or `app/`
- **Colors/Fonts:** Edit `app/globals.css`
- **Layout:** Edit page files in `app/`

#### 🆕 New Features
- **New pages:** Create files in `app/`
- **New components:** Create files in `components/`
- **New blog posts:** Create `.md` files in `content/blog/`

**Just edit files normally in Cursor!**

---

### Step 3: Test Locally

**Before deploying, always test your changes locally!**

#### Start the Development Server

1. **Open Terminal in Cursor:**
   - `View → Terminal` (or `` Ctrl+` `` / `` Cmd+` ``)

2. **Navigate to project folder** (if not already there):
   ```bash
   cd "/Volumes/Raymond's HD/Raymond Revel/Website:Cursor:Claude/raymond-revel-website"
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Wait for it to start:**
   - You'll see: `✓ Ready in X seconds`
   - Local URL: `http://localhost:3000`

5. **Open in browser:**
   - Visit: `http://localhost:3000`
   - Your site will auto-reload when you make changes!

#### Test Your Changes

- ✅ **Check all pages** work correctly
- ✅ **Test on mobile** (resize browser window)
- ✅ **Check for errors** in browser console (F12)
- ✅ **Verify links** work
- ✅ **Test forms/buttons** if you added any

#### Stop the Server

- **Press `Ctrl+C`** in the terminal to stop the server
- Or close the terminal tab

---

### Step 4: Commit Your Changes

**Save your changes to Git:**

1. **Check what changed:**
   ```bash
   git status
   ```
   - Shows files you've modified

2. **Stage your changes:**
   ```bash
   git add .
   ```
   - Adds all changed files

3. **Commit with a message:**
   ```bash
   git commit -m "Update blog post about new song"
   ```
   - Use a descriptive message about what you changed

**Example commit messages:**
- `"Add new blog post: Behind The Tune: Freefall"`
- `"Update music page with latest releases"`
- `"Fix footer styling"`
- `"Add new photos to gallery"`

---

### Step 5: Push to GitHub

**Upload changes to GitHub:**

```bash
git push origin main
```

- This uploads your changes to GitHub
- Vercel will automatically detect the changes and deploy!

**If you get an error:**
- Make sure you're logged into GitHub
- Check your internet connection
- Try again

---

### Step 6: Vercel Auto-Deploys

**Vercel automatically deploys when you push to GitHub!**

1. **Go to Vercel Dashboard:** https://vercel.com/dashboard
2. **Click on your project:** `raymond-revel-website`
3. **Watch the deployment:**
   - Status: "Building..." → "Deploying..." → "Ready"
   - Usually takes 1-3 minutes

4. **Your site is live!**
   - Visit: `https://raymondrevelmusic.com`
   - Changes are live!

---

## 📋 Quick Reference: Common Tasks

### Add a New Blog Post

1. **Create file:** `content/blog/my-new-post.md`
2. **Add frontmatter:**
   ```markdown
   ---
   title: "My New Post"
   date: "2025-11-22"
   excerpt: "Brief description"
   category: "Blog"
   image: "/images/blog/my-image.jpg"
   ---
   
   Your blog content here...
   ```
3. **Test locally:** `npm run dev` → Visit `/blog/my-new-post`
4. **Commit & push:** `git add . && git commit -m "Add new blog post" && git push`

### Update Music Releases

1. **Edit:** `lib/music.ts`
2. **Add/update releases** in the `discography` array
3. **Test locally:** Check `/music` page
4. **Commit & push**

### Add New Photos

1. **Add images** to `public/images/photos/`
2. **Run script** (optional): `npm run generate-photos`
   - Or manually update `lib/photos.ts`
3. **Test locally:** Check `/photos` page
4. **Commit & push**

### Update Videos

1. **Edit:** `lib/videos.ts`
2. **Add TikTok/Instagram URLs** to arrays
3. **Test locally:** Check `/videos` page
4. **Commit & push**

---

## 🔧 Troubleshooting

### "Command not found" errors

**Make sure you're in the project folder:**
```bash
cd "/Volumes/Raymond's HD/Raymond Revel/Website:Cursor:Claude/raymond-revel-website"
```

### "Port 3000 already in use"

**Kill the process:**
```bash
# Mac/Linux:
lsof -ti:3000 | xargs kill -9

# Or just use a different port:
npm run dev -- -p 3001
```

### Changes not showing locally

1. **Stop server:** `Ctrl+C`
2. **Restart:** `npm run dev`
3. **Hard refresh browser:** `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)

### Git push errors

**If you get authentication errors:**
- Make sure you're logged into GitHub
- You might need to use a Personal Access Token
- Check: https://github.com/settings/tokens

### Vercel deployment fails

1. **Check Vercel dashboard** for error messages
2. **Check build logs** in Vercel
3. **Test locally first** - if it works locally, it should work on Vercel
4. **Common issues:**
   - Syntax errors in code
   - Missing dependencies
   - Build errors

---

## 💡 Best Practices

### ✅ Always Test Locally First
- Never push changes without testing
- Catch errors before they go live

### ✅ Use Descriptive Commit Messages
- `"Fix typo"` ✅
- `"Update"` ❌ (too vague)

### ✅ Commit Often
- Small, frequent commits are better than huge ones
- Easier to track changes and rollback if needed

### ✅ Check Vercel After Deploying
- Make sure deployment succeeded
- Test the live site after deployment

### ✅ Keep Cursor Updated
- Update Cursor regularly for bug fixes
- Keep Node.js updated: `node --version` (should be 18+)

---

## 🎯 Typical Workflow Example

**Example: Adding a new blog post**

```bash
# 1. Open Cursor (if closed)
# File → Open Folder → raymond-revel-website

# 2. Create new blog post file
# content/blog/my-song-story.md

# 3. Test locally
npm run dev
# Visit http://localhost:3000/blog/my-song-story

# 4. Stop server (Ctrl+C)

# 5. Commit changes
git add .
git commit -m "Add blog post: My Song Story"
git push origin main

# 6. Check Vercel dashboard
# Wait for deployment (1-3 minutes)

# 7. Visit live site
# https://raymondrevelmusic.com/blog/my-song-story
```

---

## 📚 Additional Resources

- **Next.js Docs:** https://nextjs.org/docs
- **Vercel Docs:** https://vercel.com/docs
- **Git Basics:** https://git-scm.com/doc

---

## 🆘 Need Help?

**If you get stuck:**
1. Check error messages carefully
2. Test locally first
3. Check Vercel build logs
4. Ask me for help! I can troubleshoot with you

---

## ✅ Summary

**Your workflow:**
1. **Open Cursor** → Edit files
2. **Test locally** → `npm run dev`
3. **Commit changes** → `git add . && git commit -m "message"`
4. **Push to GitHub** → `git push origin main`
5. **Vercel auto-deploys** → Check dashboard
6. **Site is live!** → Visit raymondrevelmusic.com

**You can close Cursor anytime** - your files are saved locally! Just reopen it when you want to make changes.

**Happy coding!** 🚀

