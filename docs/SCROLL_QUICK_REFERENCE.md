# Scroll Performance Quick Reference

Quick reference for high refresh rate scroll optimizations in this portfolio.

---

## 📚 Hooks API

### `useScrollProgress(options?)`

Track scroll position as a 0-1 value.

```typescript
const { progress, scrollY, scrollHeight } = useScrollProgress({
  smooth: true,           // Enable interpolation (default: false)
  smoothFactor: 0.15,     // 0.1-0.3, lower = smoother (default: 0.15)
  offset: 0,              // Offset from top in px (default: 0)
  element: null,          // Custom scroll element (default: window)
})
```

**Returns:**
- `progress: number` - Scroll progress 0-1
- `scrollY: number` - Current scroll position in pixels
- `scrollHeight: number` - Total scrollable height

**Example:**
```typescript
<motion.div style={{ scaleX: progress }} />
```

---

### `useScrollDirection(threshold?)`

Track scroll direction with optional threshold.

```typescript
const direction = useScrollDirection(10) // 10px threshold
// Returns: 'up' | 'down' | null
```

**Example:**
```typescript
const direction = useScrollDirection(50)
const isVisible = direction !== 'down'

<motion.header animate={{ y: isVisible ? 0 : -100 }} />
```

---

### `useScrollThreshold(threshold?)`

Check if scrolled past a pixel threshold.

```typescript
const isPast = useScrollThreshold(100) // true if scrollY > 100
```

**Example:**
```typescript
const isPast = useScrollThreshold(100)

<Button variant={isPast ? 'primary' : 'ghost'} />
```

---

### `useScrollVelocity()`

**NEW**: Track scroll velocity in pixels per second.

```typescript
const velocity = useScrollVelocity()
// Returns: number (pixels/second)
```

**Example:**
```typescript
const velocity = useScrollVelocity()
const blur = Math.min(Math.abs(velocity) / 100, 10)

<motion.div style={{ filter: `blur(${blur}px)` }} />
```

---

## ⚙️ Lenis Configuration

Current optimized settings in `smooth-scroll-provider.tsx`:

```typescript
{
  duration: isHighRefreshRate ? 0.8 : 1.0,  // Auto-adjusts for 120Hz+
  wheelMultiplier: 0.8,                      // Precise control
  touchMultiplier: 1.5,                      // Touch sensitivity
  smoothWheel: true,                         // Enable smooth scrolling
  orientation: 'vertical',                   // Scroll direction
  autoRaf: false,                            // Manual RAF control
}
```

**Accessing Lenis globally:**
```typescript
const lenis = (window as any).__lenis

if (lenis) {
  lenis.scrollTo(0)                    // Scroll to top
  lenis.scrollTo('#section')           // Scroll to element
  lenis.scrollTo(500, { duration: 1 }) // Scroll to position
  lenis.stop()                         // Stop scrolling
  lenis.start()                        // Resume scrolling
}
```

---

## 🎨 Animation Best Practices

### ✅ DO: Use Transform & Opacity

```typescript
// Good - GPU accelerated
{
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}
```

### ❌ DON'T: Animate Layout Properties

```typescript
// Bad - triggers layout/paint
{
  hidden: { height: 0, marginTop: 20 },
  visible: { height: 'auto', marginTop: 0 }
}
```

---

## 🚀 Performance Checklist

### Scroll Animations
- [ ] Only animate `transform` and `opacity`
- [ ] Use `once: true` on scroll-triggered animations
- [ ] Add `margin` to IntersectionObserver for preloading
- [ ] Remove `will-change` after animations complete

### Images
- [ ] Use Next.js `<Image>` component
- [ ] Set proper `width`, `height`, and `sizes`
- [ ] Enable `loading="lazy"` and `placeholder="blur"`
- [ ] Optimize images to WebP/AVIF format

### Code
- [ ] Use `useCallback` for scroll event handlers
- [ ] Clean up RAF calls in `useEffect` cleanup
- [ ] Avoid state updates on every scroll event
- [ ] Use refs for frequently changing values

---

## 🎯 Common Patterns

### Fade In On Scroll
```typescript
import { useInView } from '@/lib/hooks/use-in-view'

const ref = useInView({ margin: '100px', once: true })

<motion.div
  ref={ref}
  initial={{ opacity: 0, y: 20 }}
  animate={ref.current ? { opacity: 1, y: 0 } : {}}
/>
```

### Progress Bar
```typescript
const { progress } = useScrollProgress({ smooth: true })

<motion.div
  style={{ scaleX: progress, transformOrigin: '0%' }}
  className="fixed top-0 left-0 h-1 w-full bg-accent-500"
/>
```

### Hide Header On Scroll Down
```typescript
const direction = useScrollDirection(50)
const isPastThreshold = useScrollThreshold(100)

<motion.header
  animate={{
    y: direction === 'down' && isPastThreshold ? -100 : 0
  }}
  transition={{ duration: 0.3 }}
/>
```

### Parallax Effect
```typescript
const { scrollY } = useScrollProgress()

<motion.div
  style={{ y: scrollY * 0.5 }} // Move at 50% speed
/>
```

### Velocity-Based Blur
```typescript
const velocity = useScrollVelocity()
const blur = Math.min(Math.abs(velocity) / 100, 10)

<motion.div
  style={{ filter: `blur(${blur}px)` }}
  transition={{ duration: 0.1 }}
/>
```

---

## 🔧 Customization

### Adjust Scroll Speed
```typescript
// In smooth-scroll-provider.tsx
duration: 0.2, // Even faster (default: 0.3)
duration: 0.8, // Slower, smoother
```

### Adjust Wheel Sensitivity
```typescript
wheelMultiplier: 1.0, // Less sensitive (default: 1.5)
wheelMultiplier: 2.0, // More sensitive (faster)
```

### Adjust Smoothing
```typescript
useScrollProgress({
  smooth: true,
  smoothFactor: 0.02, // Smoother, more lag
  smoothFactor: 0.2,  // More responsive, less smooth (default: 0.05)
})
```

---

## 🐛 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Scrolling too slow | Reduce `duration` (try 0.2) or increase `wheelMultiplier` (try 2.0) |
| Scrolling too fast | Increase `duration` (try 0.5) or reduce `wheelMultiplier` (try 1.0) |
| Animations stutter | Only animate `transform`/`opacity`, add `will-change` |
| High CPU usage | Check for infinite RAF loops, remove unused `will-change` |
| Scrolling not smooth enough | Reduce `duration` to 0.4-0.6 for balanced feel |
| Not working on mobile | Intentional - uses native scrolling for better UX |

---

## 📊 Display Support

| Display | Refresh Rate | Status | Notes |
|---------|--------------|--------|-------|
| MacBook Pro (ProMotion) | 120Hz | ✅ Optimized | Auto-detected |
| Standard Laptop | 60Hz | ✅ Optimized | Default settings |
| Gaming Monitor | 144-240Hz | ✅ Optimized | Auto-detected |
| iPad Pro | 120Hz | ✅ Optimized | Uses native scroll |
| iPhone/Mobile | 60-120Hz | ✅ Compatible | Native scroll enabled |

---

## 📖 Full Documentation

- **Performance Guide**: [`docs/PERFORMANCE.md`](./PERFORMANCE.md)
- **Optimization Summary**: [`docs/SCROLL_OPTIMIZATION.md`](./SCROLL_OPTIMIZATION.md)
- **Architecture**: [`../ARCHITECTURE.md`](../ARCHITECTURE.md)

---

**Last Updated**: December 2024  
**Version**: 2.0.0