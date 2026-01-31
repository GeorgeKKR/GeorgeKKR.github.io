# Performance Optimization Guide

This document outlines the performance optimizations implemented in this portfolio for high refresh rate displays, including MacBook Pro's ProMotion (120Hz), gaming monitors (144Hz+), and adaptive refresh rate displays.

## Table of Contents

- [Overview](#overview)
- [High Refresh Rate Support](#high-refresh-rate-support)
- [Smooth Scrolling with Lenis](#smooth-scrolling-with-lenis)
- [Scroll Hook Optimizations](#scroll-hook-optimizations)
- [GPU Acceleration](#gpu-acceleration)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

---

## Overview

Modern displays support refresh rates from 60Hz up to 240Hz. This portfolio is optimized to provide butter-smooth scrolling and animations regardless of your display's refresh rate.

### Key Features

- **Frame-Rate Independent Scrolling**: Consistent feel across all refresh rates
- **Adaptive Smoothing**: Automatically adjusts to your display's capabilities
- **GPU Acceleration**: Hardware-accelerated transforms for optimal performance
- **Lenis Integration**: Industry-leading smooth scroll library
- **Optimized Hooks**: RAF-based scroll tracking with minimal overhead
- **Reduced Motion Support**: Respects user accessibility preferences

---

## High Refresh Rate Support

### How It Works

The scrolling system automatically detects your display's refresh rate and adjusts animation parameters accordingly:

```typescript
// Refresh rate detection
let isHighRefreshRate = false
let frameCount = 0
let lastTime = performance.now()

const detectRefreshRate = () => {
  frameCount++
  const currentTime = performance.now()
  const elapsed = currentTime - lastTime

  if (elapsed >= 1000) {
    const fps = Math.round((frameCount * 1000) / elapsed)
    isHighRefreshRate = fps > 75 // 90Hz, 120Hz, 144Hz+
  }
}
```

### Adaptive Parameters

High refresh rate displays get optimized settings:

- **Duration**: 0.8s (high refresh) vs 1.0s (standard)
- **Wheel Multiplier**: 0.8 for more precise control
- **Easing**: Custom exponential curve with smoothstep
- **Frame Time Delta**: Adaptive smoothing based on actual frame time

---

## Smooth Scrolling with Lenis

### Configuration

```typescript
const lenis = new Lenis({
  duration: isHighRefreshRate ? 0.8 : 1.0,
  easing: (t) => {
    const smoothT = t * t * (3 - 2 * t) // Smoothstep
    return Math.min(1, 1.001 - Math.pow(2, -10 * smoothT))
  },
  orientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 0.8, // Optimized for precision
  normalizeWheel: true, // Consistent across input devices
  autoRaf: false, // Manual RAF for better control
})
```

### Animation Loop

Frame-rate independent animation loop:

```typescript
let lastFrameTime = 0

function raf(time: number) {
  const deltaTime = time - lastFrameTime
  lastFrameTime = time
  
  lenis.raf(time) // Pass actual timestamp
  requestAnimationFrame(raf)
}
```

### Performance Optimizations

1. **Page Visibility**: Pauses animation when tab is hidden
2. **Manual RAF**: Better control over animation timing
3. **Global Instance**: Exposed as `window.__lenis` for hook integration
4. **Mobile Detection**: Disabled on mobile for native scrolling

---

## Scroll Hook Optimizations

### useScrollProgress

Tracks scroll position with optional smoothing:

```typescript
const { progress, scrollY } = useScrollProgress({
  smooth: true,
  smoothFactor: 0.15, // Adaptive based on frame rate
})
```

**Optimizations:**

- Adaptive smoothing factor based on frame delta time
- Sub-pixel precision threshold (0.0001)
- RAF cancellation when animation completes
- Direct Lenis event integration
- Ref-based values to avoid unnecessary re-renders

### useScrollDirection

Tracks scroll direction with threshold:

```typescript
const direction = useScrollDirection(10) // 10px threshold
```

**Optimizations:**

- Threshold prevents jitter on high refresh displays
- Single RAF per scroll event
- Ref-based last position tracking

### useScrollVelocity

NEW: Tracks scroll velocity for momentum effects:

```typescript
const velocity = useScrollVelocity()
// Returns pixels per second
```

**Use Cases:**

- Parallax effects based on scroll speed
- Dynamic blur based on velocity
- Momentum-based animations

---

## GPU Acceleration

### CSS Optimizations

```css
/* Force GPU acceleration */
body {
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}

/* Will-change for animated elements */
[data-animate] {
  will-change: transform, opacity;
}

/* CSS containment for better paint performance */
.card, .section {
  contain: layout style paint;
}
```

### Transform Best Practices

**DO:**
```css
/* Good: GPU accelerated */
transform: translate3d(x, y, 0);
transform: translateZ(0) scale(1.05);
```

**DON'T:**
```css
/* Bad: Triggers layout/paint */
top: 10px;
left: 20px;
width: calc(100% + 10px);
```

### Will-Change Usage

Use `will-change` strategically:

```typescript
// Add before animation
element.style.willChange = 'transform, opacity'

// Remove after animation completes
element.addEventListener('transitionend', () => {
  element.style.willChange = 'auto'
})
```

---

## Best Practices

### 1. Animation Performance

**Use Transform and Opacity Only**

```typescript
// Good
const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

// Bad - triggers layout
const variants = {
  hidden: { height: 0 },
  visible: { height: 'auto' },
}
```

### 2. Scroll-Triggered Animations

Use `useInView` with margin for preloading:

```typescript
const ref = useInView({
  margin: '100px', // Start animation before element enters viewport
  once: true, // Don't re-animate on scroll back
})
```

### 3. Image Optimization

```typescript
<Image
  src="/image.jpg"
  width={800}
  height={600}
  loading="lazy"
  placeholder="blur"
  quality={85}
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

### 4. Debounce Expensive Operations

```typescript
import { useDebounce } from '@/lib/hooks'

const debouncedValue = useDebounce(searchTerm, 300)
```

### 5. Code Splitting

```typescript
// Lazy load heavy components
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false, // If not needed for SEO
})
```

---

## Troubleshooting

### Issue: Scrolling Feels Laggy

**Solutions:**

1. Check browser DevTools Performance tab for long tasks
2. Reduce `duration` in Lenis config (try 0.6s)
3. Disable smooth scrolling temporarily to isolate issue
4. Check for expensive scroll event listeners

### Issue: Animations Stutter

**Solutions:**

1. Ensure you're only animating `transform` and `opacity`
2. Check for layout thrashing (reading then writing to DOM)
3. Add `will-change` to animated elements
4. Reduce number of simultaneous animations

### Issue: High CPU Usage

**Solutions:**

1. Check for infinite RAF loops
2. Ensure `will-change` is removed after animations
3. Limit number of scroll listeners
4. Use `IntersectionObserver` instead of scroll events where possible

### Issue: Different Behavior on Mobile

**Solutions:**

1. Smooth scrolling is disabled on mobile by default (for native feel)
2. Test animations separately without Lenis on mobile
3. Consider touch-specific optimizations

---

## Performance Metrics

### Target Metrics

- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **First Input Delay (FID)**: < 100ms
- **Scroll FPS**: 60+ (120+ on high refresh displays)

### Measuring Performance

```bash
# Lighthouse
npm run build
npm run start
# Then run Lighthouse in Chrome DevTools

# Bundle analysis
npm run build
npm run analyze
```

### Chrome DevTools

1. **Performance Tab**: Record scrolling, check for dropped frames
2. **Rendering Tab**: Enable "Frame Rendering Stats" and "Scrolling Performance Issues"
3. **Layers Tab**: Verify GPU acceleration (elements should show composite layers)

---

## Advanced: Custom Easing Functions

### Available Easings

```typescript
// Exponential ease-out (default)
const ease1 = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))

// Smoothstep
const ease2 = (t) => t * t * (3 - 2 * t)

// Cubic ease-out
const ease3 = (t) => 1 - Math.pow(1 - t, 3)

// Custom spring-like
const ease4 = (t) => {
  const c4 = (2 * Math.PI) / 3
  return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1
}
```

### Testing Easings

Use [cubic-bezier.com](https://cubic-bezier.com) or [easings.net](https://easings.net) to visualize and test easing functions.

---

## Resources

- [Lenis Documentation](https://github.com/studio-freight/lenis)
- [Framer Motion Performance](https://www.framer.com/motion/animation/##performance)
- [Web Vitals](https://web.dev/vitals/)
- [GPU Animation Best Practices](https://www.html5rocks.com/en/tutorials/speed/high-performance-animations/)
- [ProMotion Display](https://developer.apple.com/documentation/quartzcore/optimizing_promocore_refresh_rates_for_iphone_13_pro_and_ipad_pro)

---

**Last Updated**: December 2024
**Version**: 2.0.0