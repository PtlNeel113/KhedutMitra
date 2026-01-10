# CSS Classes & Animations Reference

## 🎨 New CSS Classes

### Animations

#### Blob Animation
```css
.animate-blob
/* 7 second organic blob movement */
```

#### Float Animation
```css
.animate-float
/* 6 second gentle floating motion */
```

#### Scan Animation
```css
.animate-scan
/* 2 second scanning beam effect */
```

#### Fade In Up
```css
.animate-fade-in-up
/* 0.6 second entrance animation from bottom */
```

#### Slow Zoom
```css
.animate-slow-zoom
/* 20 second slow zoom effect */
```

#### Pulse Slow
```css
.animate-pulse-slow
/* 3 second slow pulsing effect */
```

#### Bounce Slow
```css
.animate-bounce-slow
/* 2 second slow bounce animation */
```

#### Glow Pulse
```css
.animate-glow-pulse
/* 2 second pulsing glow effect */
```

#### Subtle Float
```css
.animate-subtle-float
/* 4 second gentle floating with slight movement */
```

#### Shimmer
```css
.animate-shimmer
/* 3 second shimmer loading animation */
```

#### Gradient Flow
```css
.animate-gradient-flow
/* 3 second flowing gradient animation */
```

---

### Animation Delays

```css
.animation-delay-200  /* 0.2s delay */
.animation-delay-400  /* 0.4s delay */
.animation-delay-600  /* 0.6s delay */
.animation-delay-800  /* 0.8s delay */
.animation-delay-1000 /* 1.0s delay */
.animation-delay-2000 /* 2.0s delay */
.animation-delay-4000 /* 4.0s delay */
```

**Example Usage:**
```html
<div class="animate-fade-in-up animation-delay-200">Content</div>
<div class="animate-fade-in-up animation-delay-400">Content</div>
<div class="animate-fade-in-up animation-delay-600">Content</div>
```

---

## ✨ Special Effects

### Glass Morphism
```css
.glass
/* Semi-transparent blurred background effect */
/* Light mode: white semi-transparent with white border */
/* Dark mode: slate semi-transparent with green border */
```

**Usage:**
```html
<div class="glass p-6 rounded-lg">
  Content with glass effect
</div>
```

### Neon Glow
```css
.neon-glow
/* Green glowing box shadow effect */
/* Light mode: 0 0 20px green/50 */
/* Dark mode: 0 0 30px green/60 */
```

**Usage:**
```html
<div class="neon-glow">Glowing element</div>
```

### Gradient Text
```css
.gradient-text
/* Green to emerald gradient text */
/* Light mode: green-600 to emerald-500 */
/* Dark mode: emerald-500 to cyan-400 */
```

**Usage:**
```html
<h1 class="gradient-text">Gradient Text</h1>
```

### Card Gradient
```css
.card-gradient
/* Gradient background with glassmorphism */
/* Light mode: white gradient with green border */
/* Dark mode: slate gradient with green border */
```

**Usage:**
```html
<div class="card-gradient p-6 rounded-lg">
  Card with gradient
</div>
```

### Text Contrast High
```css
.text-contrast-high
/* High contrast text for accessibility */
/* Light mode: dark navy */
/* Dark mode: light blue */
```

---

## 🎯 Button Styles

### Green Glow Button
```css
.btn-green-glow
/* Gradient green button with glow effect */
/* Hover: increased glow and slight elevation */
/* Active: pressed state */
```

**Usage:**
```html
<button class="btn-green-glow">Click me</button>
```

---

## 🔍 Visual Elements

### Grid Pattern
```css
.bg-grid-white/5
/* Subtle white grid pattern overlay (5% opacity) */

.bg-grid-white/10
/* Visible white grid pattern overlay (10% opacity) */
```

**Usage:**
```html
<div class="bg-grid-white/5">Content with grid overlay</div>
```

### Box Shadows
```css
.shadow-3xl
/* Extra large shadow effect */
/* Light mode: darker shadow */
/* Dark mode: extra dark shadow for more contrast */
```

### Enhanced Scrollbar
```css
/* Automatic green gradient scrollbar in light mode */
/* Automatic green glow scrollbar in dark mode */
/* Works on Webkit browsers (Chrome, Safari, Edge) */
```

---

## 📝 Form Enhancements

### Input Focus
```css
/* Inputs get green border on focus */
/* Green box shadow appears around input */
/* Smooth transition (0.3s) */
```

### Label Styling
```css
/* Bold font weight */
/* Dark mode: light cyan color */
/* Light mode: dark gray color */
```

### Placeholder Text
```css
/* Subtle gray color in both modes */
/* Better visibility with clear distinction */
```

---

## 🎬 Loading States

### Loader
```css
.loader
/* Custom rotating loader */
/* Border color animated spinner */
/* Green accent top border */
```

**Usage:**
```html
<div class="loader"></div>
```

### Skeleton
```css
.skeleton
/* Shimmer animation for loading skeleton */
/* Light mode: gray shimmer */
/* Dark mode: slate shimmer */
```

**Usage:**
```html
<div class="skeleton w-full h-8 rounded"></div>
```

---

## 🏷️ Badges

### Success Badge
```css
.badge-success
/* Green gradient badge */
/* White text on green background */
/* Rounded corners (border-radius: 20px) */
```

**Usage:**
```html
<span class="badge-success">Success</span>
```

---

## 💬 Tooltips

### Tooltip
```css
.tooltip
/* Dark background with text */
/* Light mode: dark gray with white text */
/* Dark mode: navy with green border */
/* Fixed width, no wrap */
```

**Usage:**
```html
<div class="tooltip">Helpful text</div>
```

---

## ♿ Accessibility Classes

### Screen Reader Only
```css
.sr-only
/* Visually hidden but readable by screen readers */
/* Used for accessibility labels */
```

**Usage:**
```html
<span class="sr-only">Loading...</span>
```

### Focus Visible
```css
/* Automatic focus outline on keyboard navigation */
/* Green outline in light mode */
/* Bright green outline in dark mode */
```

---

## 📊 Table Styling

### Automatic Enhancements
```css
/* Tables get green header background */
/* Rows have hover effects */
/* Dark mode: slate hover background */
/* Light mode: light gray hover background */
```

---

## 🎨 Dark Mode Utilities

### Dark Mode Specific
```css
.dark .glass
.dark .card-gradient
.dark .neon-glow
.dark .shadow-3xl
.dark .tooltip
.dark ::-webkit-scrollbar-track
.dark ::-webkit-scrollbar-thumb
```

All these automatically apply dark mode styling when the `dark` class is on the root element.

---

## 🔄 Usage Examples

### Example 1: Animated Card
```html
<div class="glass p-6 rounded-lg animate-fade-in-up animation-delay-200">
  <h3 class="gradient-text">Feature Title</h3>
  <p>Feature description</p>
</div>
```

### Example 2: Floating Element
```html
<div class="neon-glow p-4 rounded-lg animate-float animation-delay-1000">
  Content that floats
</div>
```

### Example 3: Loading State
```html
<div class="animate-shimmer">
  <div class="skeleton w-full h-4 rounded mb-2"></div>
  <div class="skeleton w-3/4 h-4 rounded"></div>
</div>
```

### Example 4: Button Group
```html
<div class="flex gap-4">
  <button class="btn-green-glow">Primary</button>
  <button class="btn-green-glow opacity-75">Secondary</button>
</div>
```

### Example 5: Staggered Animation
```html
<div class="animate-fade-in-up animation-delay-200">First</div>
<div class="animate-fade-in-up animation-delay-400">Second</div>
<div class="animate-fade-in-up animation-delay-600">Third</div>
```

---

## 🎯 Browser Support

- ✅ Chrome/Edge - Full support
- ✅ Firefox - Full support
- ✅ Safari - Full support
- ✅ Mobile browsers - Full support

---

## 📖 CSS Variables

### Theme Variables
```css
--background      /* Page background */
--foreground      /* Text color */
--card            /* Card background */
--primary         /* Green accent */
--accent          /* Secondary accent */
--border          /* Border color */
--input           /* Input background */
--ring            /* Focus ring color */
```

### Dark Mode Variables
```css
.dark {
  --background: #0f172a;    /* Deep navy */
  --foreground: #f0f9ff;    /* Light blue */
  --card: #1e293b;          /* Slate */
  --primary: #10b981;       /* Emerald green */
  --accent: #10b981;        /* Emerald green */
}
```

---

## 🚀 Performance Notes

- All animations use `transform` and `opacity` for smooth 60fps
- GPU-accelerated with `will-change` where appropriate
- Efficient CSS variables prevent duplication
- No JavaScript needed for animations
- Lightweight shadow effects in dark mode

---

## 💡 Tips

1. **Combine animations:** `animate-fade-in-up animation-delay-200`
2. **Stack effects:** `glass neon-glow animate-float`
3. **Use delays for staggered effects:** Different delay classes
4. **Test in both modes:** Always check light AND dark mode
5. **Respect motion preferences:** Users can disable animations in OS settings

---

*Last Updated: January 10, 2026*
*All classes tested and working perfectly!*
