# Deployment Checklist

Complete this checklist before deploying your portfolio to production.

## 📋 Pre-Deployment Checklist

### 1. Content Review ✏️

- [ ] **Update Personal Information**
  - [ ] Name in `lib/content.ts` → `introData.title`
  - [ ] Job titles in `lib/content.ts` → `introData.subtitle`
  - [ ] Bio/description in `lib/content.ts` → `aboutData.description`
  - [ ] Philosophy quote in `lib/content.ts` → `aboutData.philosophy`

- [ ] **Update Contact Information**
  - [ ] Email address in `lib/content.ts` → `contactConfig.email`
  - [ ] EmailJS credentials in `lib/content.ts` → `contactConfig` (serviceId, templateId, userId)
  - [ ] Social media links in `lib/content.ts` → `socialLinks`

- [ ] **Update Portfolio Projects**
  - [ ] Add/remove projects in `lib/content.ts` → `portfolioItems`
  - [ ] Verify all project images load correctly
  - [ ] Test all project video links (YouTube URLs)
  - [ ] Check project descriptions and tags

- [ ] **Update Work Experience**
  - [ ] Add/update jobs in `lib/content.ts` → `workTimeline`
  - [ ] Verify dates and company names
  - [ ] Update job descriptions and highlights

- [ ] **Update Skills & Education**
  - [ ] Update skills list in `lib/content.ts` → `skills`
  - [ ] Update education in `lib/content.ts` → `education`
  - [ ] Verify skill percentages and categories

### 2. Assets & Media 🖼️

- [ ] **Replace Placeholder Images**
  - [ ] Profile photo: `public/img/profile_headshot.webp`
  - [ ] Add any additional project images to `public/img/`
  - [ ] Optimize all images (WebP format, compressed)

- [ ] **Create Favicon & Icons**
  - [ ] Generate favicon.ico (32x32)
  - [ ] Create favicon-16x16.png
  - [ ] Create apple-touch-icon.png (180x180)
  - [ ] Update manifest.json icons if needed
  - Tools: [favicon.io](https://favicon.io) or [realfavicongenerator.net](https://realfavicongenerator.net)

- [ ] **Verify All Media Loads**
  - [ ] Test all images display correctly
  - [ ] Test all videos play/embed properly
  - [ ] Check for broken image links

### 3. Configuration ⚙️

- [ ] **Update Site Metadata**
  - [ ] Site title in `app/layout.tsx` → `metadata.title`
  - [ ] Description in `app/layout.tsx` → `metadata.description`
  - [ ] Keywords in `lib/content.ts` → `meta.keywords`
  - [ ] Author name in `app/layout.tsx` → `metadata.authors`
  - [ ] Site URL in `lib/content.ts` → `meta.siteUrl`

- [ ] **Update Open Graph Data**
  - [ ] OG title in `app/layout.tsx` → `metadata.openGraph.title`
  - [ ] OG description in `app/layout.tsx` → `metadata.openGraph.description`
  - [ ] OG image (1200x630) in `app/layout.tsx` → `metadata.openGraph.images`
  - [ ] OG URL in `app/layout.tsx` → `metadata.openGraph.url`

- [ ] **Update Package.json**
  - [ ] Project name in `package.json`
  - [ ] Homepage URL in `package.json` → `homepage`
  - [ ] Version number if needed

- [ ] **Update robots.txt**
  - [ ] Verify correct domain in `public/robots.txt`
  - [ ] Update sitemap URL when available

- [ ] **Update manifest.json**
  - [ ] App name in `public/manifest.json`
  - [ ] Theme colors match your brand
  - [ ] Icons reference correct files

### 4. EmailJS Setup 📧

- [ ] **Create EmailJS Account**
  - [ ] Sign up at [emailjs.com](https://www.emailjs.com/)
  - [ ] Verify email address

- [ ] **Configure Email Service**
  - [ ] Add email service (Gmail, Outlook, etc.)
  - [ ] Create email template
  - [ ] Get Service ID, Template ID, and User ID

- [ ] **Update Contact Form**
  - [ ] Add Service ID to `lib/content.ts` → `contactConfig.serviceId`
  - [ ] Add Template ID to `lib/content.ts` → `contactConfig.templateId`
  - [ ] Add User ID to `lib/content.ts` → `contactConfig.userId`

- [ ] **Test Contact Form**
  - [ ] Submit test message
  - [ ] Verify email received
  - [ ] Check form validation works

### 5. Code Quality 🔍

- [ ] **Run Type Checking**
  ```bash
  npm run type-check
  ```
  - [ ] No TypeScript errors

- [ ] **Run Linter**
  ```bash
  npm run lint
  ```
  - [ ] No ESLint errors or warnings

- [ ] **Format Code**
  ```bash
  npm run format
  ```
  - [ ] All files formatted consistently

- [ ] **Test Build**
  ```bash
  npm run build
  ```
  - [ ] Build completes successfully
  - [ ] No build errors
  - [ ] Check build size (reasonable bundle size)

### 6. Testing 🧪

- [ ] **Manual Testing - Desktop**
  - [ ] Test all pages load correctly (Home, Work, About, Contact)
  - [ ] Test navigation between pages
  - [ ] Test all links work (internal and external)
  - [ ] Test contact form submission
  - [ ] Test portfolio filtering on Work page
  - [ ] Test video modals open/close correctly
  - [ ] Verify all animations work smoothly
  - [ ] Test mobile menu (resize window to mobile)

- [ ] **Manual Testing - Mobile**
  - [ ] Test on actual mobile device or DevTools
  - [ ] Verify responsive layout works
  - [ ] Test touch interactions
  - [ ] Verify text is readable
  - [ ] Test form on mobile
  - [ ] Check hamburger menu works

- [ ] **Cross-Browser Testing**
  - [ ] Chrome/Edge (Chromium)
  - [ ] Firefox
  - [ ] Safari (if on Mac)
  - [ ] Mobile Safari (iPhone)
  - [ ] Mobile Chrome (Android)

- [ ] **Performance Testing**
  - [ ] Run Lighthouse audit
  - [ ] Check page load times
  - [ ] Verify images load efficiently
  - [ ] Check animations don't cause jank

- [ ] **Accessibility Testing**
  - [ ] Run Lighthouse accessibility audit
  - [ ] Test keyboard navigation (Tab, Enter, Esc)
  - [ ] Test with screen reader if possible
  - [ ] Verify color contrast is sufficient
  - [ ] Check skip to content link works

### 7. SEO Preparation 🔍

- [ ] **Meta Tags**
  - [ ] Titles are descriptive and unique per page
  - [ ] Descriptions are compelling (150-160 chars)
  - [ ] Keywords are relevant
  - [ ] Canonical URLs set correctly

- [ ] **Structured Data (Optional)**
  - [ ] Add JSON-LD schema for Person
  - [ ] Add schema for CreativeWork
  - [ ] Validate with Google's Rich Results Test

- [ ] **Sitemap (Optional but Recommended)**
  - [ ] Generate sitemap.xml
  - [ ] Add to robots.txt
  - [ ] Submit to Google Search Console

### 8. Analytics Setup 📊

- [ ] **Vercel Analytics (Already Integrated)**
  - [ ] Works automatically on Vercel deployment
  - [ ] No additional setup needed

- [ ] **Google Analytics (Optional)**
  - [ ] Create GA4 property
  - [ ] Add tracking code to layout.tsx
  - [ ] Test tracking works

- [ ] **Google Search Console (Recommended)**
  - [ ] Verify domain ownership
  - [ ] Submit sitemap
  - [ ] Monitor indexing status

### 9. Environment & Secrets 🔐

- [ ] **Check .env File**
  - [ ] No sensitive data committed to git
  - [ ] All required env vars documented
  - [ ] .env in .gitignore

- [ ] **Update .gitignore**
  - [ ] Verify sensitive files are ignored
  - [ ] Check .env* files are ignored
  - [ ] Confirm node_modules ignored

### 10. Git & Version Control 📦

- [ ] **Commit All Changes**
  ```bash
  git add .
  git commit -m "Prepare for production deployment"
  ```

- [ ] **Push to GitHub**
  ```bash
  git push origin main
  ```

- [ ] **Tag Release (Optional)**
  ```bash
  git tag -a v2.0.0 -m "Production release v2.0.0"
  git push origin v2.0.0
  ```

## 🚀 Deployment Options

### Option 1: GitHub Pages (Current Setup)

**Prerequisites:**
- [ ] GitHub repository is public (or GitHub Pro for private)
- [ ] Repository name matches: `username.github.io`

**Deploy:**
```bash
npm run build          # Build static site
npm run predeploy      # Prepare deployment
npm run deploy         # Deploy to gh-pages branch
```

**Post-Deployment:**
- [ ] Wait 2-5 minutes for GitHub Pages to update
- [ ] Visit https://yourusername.github.io
- [ ] Verify site loads correctly
- [ ] Test all functionality on live site

**Custom Domain (Optional):**
- [ ] Add CNAME file to public/ directory
- [ ] Configure DNS settings with your provider
- [ ] Enable HTTPS in GitHub Pages settings

### Option 2: Vercel (Recommended)

**Prerequisites:**
- [ ] Create account at [vercel.com](https://vercel.com)

**Deploy:**
1. [ ] Connect GitHub repository to Vercel
2. [ ] Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `out`
   - Install Command: `npm install`
3. [ ] Click "Deploy"

**Post-Deployment:**
- [ ] Verify deployment succeeds
- [ ] Test preview URL
- [ ] Configure custom domain if desired
- [ ] Enable automatic deployments

**Advantages:**
- Automatic deployments on git push
- Preview deployments for PRs
- Built-in analytics
- Better performance (global CDN)
- Automatic HTTPS

### Option 3: Netlify

**Prerequisites:**
- [ ] Create account at [netlify.com](https://netlify.com)

**Deploy:**
1. [ ] Connect GitHub repository
2. [ ] Configure build settings:
   - Build Command: `npm run build`
   - Publish Directory: `out`
3. [ ] Click "Deploy site"

**Post-Deployment:**
- [ ] Test deployment
- [ ] Configure custom domain
- [ ] Enable automatic deployments

## ✅ Post-Deployment Verification

### Immediate Checks (Within 5 Minutes)

- [ ] **Site Loads**
  - [ ] Homepage loads without errors
  - [ ] All pages accessible
  - [ ] No 404 errors

- [ ] **Visual Check**
  - [ ] Styling looks correct
  - [ ] Images display properly
  - [ ] Animations work smoothly
  - [ ] No layout breaks

- [ ] **Functionality Check**
  - [ ] Navigation works
  - [ ] Contact form submits (test it!)
  - [ ] Portfolio filtering works
  - [ ] Video modals open correctly
  - [ ] External links open in new tabs

### Extended Checks (Within 24 Hours)

- [ ] **Performance**
  - [ ] Run Lighthouse audit on live site
  - [ ] Check Core Web Vitals
  - [ ] Verify load times acceptable

- [ ] **Cross-Device Testing**
  - [ ] Test on desktop
  - [ ] Test on tablet
  - [ ] Test on mobile phone
  - [ ] Test on different browsers

- [ ] **SEO Check**
  - [ ] Google "site:yourdomain.com"
  - [ ] Verify meta tags with View Source
  - [ ] Check Open Graph preview (Facebook Debugger, Twitter Card Validator)
  - [ ] Submit to Google Search Console

- [ ] **Analytics Verification**
  - [ ] Visit site and verify analytics tracking
  - [ ] Check analytics dashboard shows visits
  - [ ] Verify event tracking if configured

### Ongoing Monitoring (First Week)

- [ ] **Daily Checks**
  - [ ] Monitor analytics for traffic
  - [ ] Check contact form submissions
  - [ ] Look for error reports

- [ ] **User Feedback**
  - [ ] Share with friends/colleagues
  - [ ] Gather feedback
  - [ ] Note any issues reported

## 🐛 Troubleshooting Common Issues

### Build Fails
- Check for TypeScript errors: `npm run type-check`
- Check for missing dependencies: `npm install`
- Clear cache: `rm -rf .next && rm -rf node_modules && npm install`

### Styling Broken
- Verify Tailwind CSS is processing correctly
- Check globals.css is imported in layout.tsx
- Clear browser cache (Cmd+Shift+R / Ctrl+Shift+R)

### Images Not Loading
- Verify image paths are correct (relative to public/)
- Check image files exist in public/img/
- Verify file extensions match (case-sensitive on some hosts)

### Contact Form Not Working
- Verify EmailJS credentials are correct
- Check browser console for errors
- Test EmailJS service separately
- Ensure CORS is enabled in EmailJS settings

### Animations Janky
- Test on different devices
- Check if too many animations running simultaneously
- Consider reducing animations on lower-end devices
- Verify prefers-reduced-motion is respected

## 📚 Additional Resources

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [GitHub Pages Guide](https://docs.github.com/en/pages)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [Web.dev Performance Guide](https://web.dev/performance/)
- [Google Search Console](https://search.google.com/search-console)

## 🎉 You're Ready to Deploy!

Once all items are checked, you're ready for production deployment!

**Final Command:**
```bash
npm run deploy
```

**Then celebrate! 🎊**

Your portfolio is live and ready to showcase your work to the world!

---

**Last Updated:** November 11, 2024  
**Version:** 2.0.0