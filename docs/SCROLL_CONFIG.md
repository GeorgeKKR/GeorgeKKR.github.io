# Scroll Configuration Guide

Quick guide to customize your scroll experience.

## Current Settings

The portfolio uses **fast, responsive** smooth scrolling optimized for modern displays.

**Default Configuration:**
- Duration: `0.3s` (very fast)
- Wheel Multiplier: `1.5` (high sensitivity)
- Touch Multiplier: `2` (responsive touch)
- Easing: Exponential ease-out

## Quick Adjustments

### Location
Edit: `components/providers/smooth-scroll-provider.tsx`

```typescript
const lenis = new Lenis({
  duration: 0.3,           // ← Adjust this
  wheelMultiplier: 1.5,    // ← Adjust this
  touchMultiplier: 2,      // ← Adjust this
  // ... rest of config
})
```

---

## Common Presets

### Ultra Fast (Current)
```typescript
duration: 0.3
wheelMultiplier: 1.5
```
**Feel:** Instant, snappy, very responsive  
**Best For:** High refresh rate displays, power users

---

### Balanced
```typescript
duration: 0.5
wheelMultiplier: 1.2
```
**Feel:** Smooth with good control  
**Best For:** General use, most users

---

### Smooth & Buttery
```typescript
duration: 0.8
wheelMultiplier: 1.0
```
**Feel:** Cinematic, very smooth  
**Best For:** Portfolio showcase, slower browsing

---

### Native (Disable Smooth Scrolling)
Create `.env.local` file:
```bash
NEXT_PUBLIC_DISABLE_SMOOTH_SCROLL=true
```
**Feel:** Browser native scrolling  
**Best For:** Maximum performance, accessibility

---

## Parameter Reference

### Duration
Controls how long the scroll animation takes.

| Value | Feel | Use Case |
|-------|------|----------|
| `0.2` | Lightning fast | Power users, 144Hz+ |
| `0.3` | Very fast (default) | Modern displays, responsive |
| `0.5` | Balanced | General use |
| `0.8` | Smooth | Showcase mode |
| `1.2` | Very smooth | Cinematic |

### Wheel Multiplier
Controls scroll distance per wheel tick.

| Value | Feel | Use Case |
|-------|------|----------|
| `0.8` | Precise control | Detailed work |
| `1.0` | Standard | Balanced |
| `1.5` | Fast (default) | Efficient browsing |
| `2.0` | Very fast | Quick navigation |

### Touch Multiplier
Controls scroll distance for touch/trackpad.

| Value | Feel | Use Case |
|-------|------|----------|
| `1.5` | Standard | Mobile devices |
| `2.0` | Fast (default) | Trackpad |
| `2.5` | Very fast | Quick swipes |

---

## Advanced Options

### Custom Easing
Change the easing function for different motion feel:

```typescript
// Exponential (default) - smooth deceleration
easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))

// Linear - constant speed
easing: (t) => t

// Cubic - gentle ease-out
easing: (t) => 1 - Math.pow(1 - t, 3)

// Sine - very smooth
easing: (t) => Math.sin((t * Math.PI) / 2)
```

### Disable on Mobile Only
```typescript
// In smooth-scroll-provider.tsx
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
if (isMobile) {
  return // Already implemented
}
```

---

## Troubleshooting

### "Scrolling feels too slow"
**Solutions:**
1. Reduce duration: `duration: 0.2`
2. Increase multiplier: `wheelMultiplier: 2.0`
3. Try Ultra Fast preset

### "Scrolling is too sensitive"
**Solutions:**
1. Reduce multiplier: `wheelMultiplier: 1.0`
2. Try Balanced preset

### "I want instant scrolling"
**Solutions:**
1. Set very low duration: `duration: 0.1`
2. Or disable smooth scrolling entirely (see Native preset)

### "Different feel on MacBook vs external monitor"
**Normal behavior** - Lenis adapts to your hardware automatically.

### "Not working at all"
**Check:**
1. Clear browser cache
2. Restart dev server: `npm run dev`
3. Check console for errors
4. Verify `NEXT_PUBLIC_DISABLE_SMOOTH_SCROLL` is not set

---

## Testing Your Changes

1. Edit `smooth-scroll-provider.tsx`
2. Save the file (hot reload)
3. Test scrolling immediately
4. Adjust and repeat

**Tip:** Keep DevTools console open to check for errors.

---

## Recommended Settings by Use Case

### Personal Portfolio (Current)
```typescript
duration: 0.3
wheelMultiplier: 1.5
```

### Agency/Studio Website
```typescript
duration: 0.6
wheelMultiplier: 1.2
```

### E-commerce/SaaS
```typescript
duration: 0.2
wheelMultiplier: 1.8
```

### Blog/Content Site
```typescript
duration: 0.4
wheelMultiplier: 1.3
```

### Photography Portfolio
```typescript
duration: 0.8
wheelMultiplier: 1.0
```

---

## Browser Compatibility

| Browser | Smooth Scroll | Notes |
|---------|--------------|-------|
| Chrome 90+ | ✅ Full support | Best performance |
| Firefox 85+ | ✅ Full support | Great performance |
| Safari 14+ | ✅ Full support | ProMotion supported |
| Edge 90+ | ✅ Full support | Same as Chrome |
| Mobile Safari | ⚠️ Disabled | Uses native (better UX) |
| Mobile Chrome | ⚠️ Disabled | Uses native (better UX) |

---

## Performance Impact

| Setting | CPU Usage | Battery Impact | Smoothness |
|---------|-----------|----------------|------------|
| duration: 0.2 | Low | Minimal | Good |
| duration: 0.5 | Medium | Low | Great |
| duration: 1.0 | Medium | Medium | Excellent |
| Native scroll | Lowest | None | Instant |

---

## FAQ

**Q: Will this slow down my site?**  
A: No. Lenis is highly optimized and uses RAF efficiently.

**Q: Can I disable on specific pages?**  
A: Yes. Conditionally render `<SmoothScrollProvider>` in `app/layout.tsx`

**Q: Does it work with anchor links?**  
A: Yes. Lenis handles `#anchor` links automatically.

**Q: Can I scroll programmatically?**  
A: Yes. Use `window.__lenis.scrollTo(target, options)`

**Q: What about accessibility?**  
A: Smooth scroll auto-disables for users with `prefers-reduced-motion`.

---

## Resources

- [Lenis Documentation](https://github.com/studio-freight/lenis)
- [Performance Guide](./PERFORMANCE.md)
- [Scroll Optimization Summary](./SCROLL_OPTIMIZATION.md)
- [Quick Reference](./SCROLL_QUICK_REFERENCE.md)

---

**Last Updated:** December 2024  
**Current Version:** 2.0.0 (Fast & Responsive)