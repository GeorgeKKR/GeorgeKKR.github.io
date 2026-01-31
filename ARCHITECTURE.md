# Portfolio Architecture Documentation

## Overview

This document provides a comprehensive overview of the portfolio website architecture, design decisions, component hierarchy, and best practices for extending the codebase.

## Technology Stack

### Core Framework
- **Next.js 14** with App Router for routing and server-side rendering
- **TypeScript** for type safety and better developer experience
- **React 18** for the UI layer

### Styling & Design
- **Tailwind CSS** for utility-first styling
- **Custom design tokens** in Tailwind config for consistent theming
- **Mobile-first responsive design** approach

### Animation
- **Framer Motion** for declarative animations and page transitions
- **Lenis** for smooth scrolling (disabled on mobile for performance)
- **Custom animation variants** in `lib/animations.ts`

### Form Management
- **React Hook Form** for performant form handling
- **Zod** for schema validation
- **EmailJS** for serverless email functionality

### Developer Experience
- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript strict mode** for type safety

## Project Structure

```
GeorgeKKR.github.io/
├── app/                                # Next.js App Router
│   ├── layout.tsx                     # Root layout with providers, metadata
│   ├── page.tsx                       # Home page
│   ├── about/page.tsx                 # About page
│   ├── work/page.tsx                  # Portfolio page
│   ├── contact/page.tsx               # Contact page
│   └── globals.css                    # Global styles and utilities
│
├── components/                         # React components
│   ├── ui/                            # Primitive UI components
│   │   ├── button.tsx                 # Button with variants
│   │   ├── card.tsx                   # Card component family
│   │   ├── section.tsx                # Section layout primitives
│   │   └── heading.tsx                # Typography component
│   │
│   ├── sections/                      # Page-specific sections
│   │   └── (feature-specific components)
│   │
│   ├── layout/                        # Layout components
│   │   ├── header.tsx                 # Site header with navigation
│   │   ├── footer.tsx                 # Site footer
│   │   └── page-transition.tsx        # Page transition wrapper
│   │
│   └── providers/                     # Context providers
│       └── smooth-scroll-provider.tsx # Lenis integration
│
├── lib/                               # Shared utilities
│   ├── animations.ts                  # Framer Motion variants
│   ├── utils.ts                       # Helper functions
│   ├── content.ts                     # Site content data
│   └── hooks/                         # Custom React hooks
│       ├── use-in-view.ts            # Intersection Observer hook
│       └── use-scroll-progress.ts     # Scroll tracking hook
│
├── public/                            # Static assets
│   ├── img/                          # Images
│   └── .nojekyll                     # GitHub Pages config
│
├── tailwind.config.ts                 # Tailwind configuration
├── tsconfig.json                      # TypeScript configuration
├── next.config.js                     # Next.js configuration
├── postcss.config.js                  # PostCSS configuration
├── .eslintrc.json                     # ESLint configuration
└── .prettierrc                        # Prettier configuration
```

## Design System

### Color Palette

```typescript
// Dark theme with gradient accents
dark: {
  400: '#0b1628',  // Primary background
  300: '#0d1826',
  200: '#0f1c2e',
  100: '#151f32',
}

accent: {
  500: '#39586a',  // Primary accent
  400: '#678ea3',
  300: '#8daabb',
}

primary: {
  500: '#f97316',  // CTA color
  600: '#ea580c',
}
```

### Typography Scale

- Display headings: 5xl to 9xl (responsive)
- Body text: base to xl
- Small text: xs to sm
- Font family: SF Pro Display / System fonts
- Letter spacing: -0.02em to -0.05em for headings

### Spacing System

- Uses Tailwind's default spacing scale (4px base)
- Extended with: 18, 88, 112, 128, 144
- Section spacing: sm, md, lg, xl, 2xl variants

### Animation Principles

1. **Smooth & Natural**: Spring-based animations with easing
2. **Performance**: GPU-accelerated transforms (translate, scale, opacity)
3. **Accessible**: Respects `prefers-reduced-motion`
4. **Purposeful**: Animations guide attention and provide feedback

## Component Architecture

### UI Primitives

#### Button
```typescript
<Button 
  variant="primary" | "secondary" | "outline" | "ghost" | "link"
  size="sm" | "md" | "lg" | "xl"
  iconBefore={<Icon />}
  iconAfter={<Icon />}
  isLoading={boolean}
>
  Click me
</Button>
```

#### Card
```typescript
<Card variant="glass" hoverable interactive>
  <CardImage src="..." alt="..." />
  <CardContent>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardContent>
  <CardFooter>Footer content</CardFooter>
</Card>
```

#### Section
```typescript
<Section 
  spacing="xl"
  background="gradient"
  width="7xl"
  centered
>
  <SectionHeader centered>
    <SectionTitle gradient>Title</SectionTitle>
    <SectionSubtitle>Subtitle</SectionSubtitle>
  </SectionHeader>
  {/* Content */}
</Section>
```

### Layout Components

#### Header
- Fixed position with blur backdrop on scroll
- Mobile menu with animated overlay
- Active link indicator with smooth transition

#### Footer
- Multi-column layout
- Social links
- Copyright and legal links

#### Page Transition
- Wraps page content
- Handles enter/exit animations
- Uses AnimatePresence from Framer Motion

### Custom Hooks

#### useInView
```typescript
const { ref, inView } = useInView({ once: true, amount: 0.3 })
```
- Tracks element visibility
- Triggers scroll-based animations
- Configurable threshold and repeat behavior

#### useScrollProgress
```typescript
const { progress, scrollY } = useScrollProgress()
```
- Returns scroll progress (0-1)
- Optional smooth interpolation
- Useful for scroll indicators

## Animation System

### Animation Variants Library

Located in `lib/animations.ts`, includes:

1. **Page Transitions**: fadeVariants, fadeUpVariants, scaleVariants
2. **Scroll Reveals**: scrollFadeIn, scrollFadeInLeft, scrollFadeInRight
3. **Stagger Effects**: staggerContainer, staggerItem
4. **Micro-interactions**: buttonVariants, cardVariants, linkUnderlineVariants
5. **Modals**: backdropVariants, modalVariants, drawerVariants

### Usage Pattern

```typescript
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
  variants={scrollFadeIn}
>
  Content
</motion.div>
```

### Performance Considerations

- Animations use `transform` and `opacity` (GPU accelerated)
- Viewport tracking uses Intersection Observer
- Smooth scrolling disabled on mobile
- RequestAnimationFrame for scroll updates

## Data Management

### Content Storage

All site content is centralized in `lib/content.ts`:

```typescript
// Example structure
export const portfolioItems: PortfolioItem[] = [
  {
    id: 'unique-id',
    title: 'Project Title',
    description: 'Description',
    category: 'directed' | 'produced' | 'dop' | 'commercial',
    featured: true,
    image: 'url',
    videoUrl: 'url',
    tags: ['tag1', 'tag2'],
    year: '2023',
  }
]
```

### Type Safety

TypeScript interfaces ensure type safety:
- `Meta` - SEO metadata
- `PortfolioItem` - Project data
- `WorkTimelineItem` - Experience data
- `Skill` - Skills data
- `Education` - Education data

## Routing & Navigation

### App Router Structure

```
/ (Home)
├── /work (Portfolio)
├── /about (About Me)
└── /contact (Contact Form)
```

### Navigation Behavior

- Smooth page transitions
- Active link highlighting
- Scroll to top on route change (handled by layout)
- Mobile menu closes on navigation

## Performance Optimization

### Next.js Features

- Static export for GitHub Pages
- Automatic code splitting
- Image optimization (unoptimized for static export)
- Font optimization

### Bundle Size

- Tree-shaking unused code
- Dynamic imports for heavy components
- Lazy loading images
- Minimal external dependencies

### Loading Strategy

- Critical CSS inlined
- Defer non-critical resources
- Preconnect to external domains

## Accessibility

### WCAG Compliance

- Semantic HTML5 elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus visible states
- Sufficient color contrast (4.5:1 minimum)

### Motion Preferences

```css
@media (prefers-reduced-motion: reduce) {
  /* Disable or minimize animations */
}
```

### Screen Reader Support

- Skip to main content link
- Descriptive alt text
- Proper heading hierarchy
- Form label associations

## SEO Optimization

### Metadata

```typescript
export const metadata: Metadata = {
  title: { default, template },
  description,
  keywords,
  openGraph: { /* ... */ },
  twitter: { /* ... */ },
}
```

### Best Practices

- Semantic HTML structure
- Meta descriptions for all pages
- Open Graph images
- Structured data (can be added)
- XML sitemap (can be generated)

## Deployment

### GitHub Pages

```bash
npm run build        # Build static export
npm run predeploy    # Prepare for deployment
npm run deploy       # Deploy to gh-pages branch
```

### Vercel (Recommended)

- Automatic deployments on push
- Preview deployments for PRs
- Built-in analytics
- Optimal caching and CDN

## Extending the Portfolio

### Adding a New Page

1. Create `app/new-page/page.tsx`
2. Add route to navigation in `components/layout/header.tsx`
3. Implement page with PageWrapper
4. Update metadata

### Adding New Content

1. Update types in `lib/content.ts`
2. Add data to appropriate array
3. Component will automatically render it

### Adding New Animations

1. Define variant in `lib/animations.ts`
2. Import and apply to motion component
3. Test with `prefers-reduced-motion`

### Custom UI Component

1. Create in `components/ui/`
2. Use TypeScript interfaces
3. Follow existing patterns (cn, forwardRef)
4. Add Framer Motion support if needed

## Best Practices

### Component Guidelines

- Keep components focused and single-purpose
- Use TypeScript for prop types
- Forward refs when wrapping DOM elements
- Use `cn()` utility for className merging

### Animation Guidelines

- Use viewport triggers for scroll animations
- Set `once: true` for performance
- Respect motion preferences
- Avoid animating expensive properties

### Styling Guidelines

- Mobile-first approach
- Use Tailwind utilities first
- Create custom utilities for repeated patterns
- Keep specificity low

### Performance Guidelines

- Optimize images before uploading
- Lazy load below-the-fold content
- Minimize re-renders with React.memo
- Use proper key props in lists

## Common Tasks

### Update Profile Image
Replace `public/img/profile_headshot.webp`

### Add New Project
Update `portfolioItems` array in `lib/content.ts`

### Change Color Scheme
Update `tailwind.config.ts` color definitions

### Modify Animations
Edit variants in `lib/animations.ts`

### Update Contact Email
Change `contactConfig` in `lib/content.ts`

## Troubleshooting

### Build Errors

- Clear `.next` folder: `rm -rf .next`
- Clear node_modules: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run type-check`

### Animation Issues

- Check browser DevTools for errors
- Verify Framer Motion version compatibility
- Test with motion preferences disabled

### Deployment Issues

- Ensure `output: 'export'` in next.config.js
- Verify `.nojekyll` file exists in public
- Check GitHub Pages settings

## Future Enhancements

### Potential Additions

- [ ] Blog section with MDX
- [ ] Case study pages for projects
- [ ] Testimonials section
- [ ] Awards and recognition page
- [ ] CMS integration (Sanity, Contentful)
- [ ] Multi-language support (i18n)
- [ ] Dark/light theme toggle
- [ ] Advanced filtering and search
- [ ] Project detail pages

### Performance Improvements

- [ ] Image CDN integration
- [ ] Service worker for offline support
- [ ] Advanced caching strategies
- [ ] Bundle size monitoring

## Conclusion

This architecture provides a solid foundation for a modern, performant, and maintainable portfolio website. The modular component structure, comprehensive animation system, and centralized content management make it easy to extend and customize while maintaining code quality and performance.

---

**Last Updated**: January 2024  
**Version**: 2.0.0  
**Author**: George Kelly