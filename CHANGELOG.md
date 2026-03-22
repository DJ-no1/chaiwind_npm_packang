# Changelog

All notable changes to ChaiWind will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/), and this project adheres to [Semantic Versioning](https://semver.org/).

## [3.0.0] - 2026-03-22

### 🎉 Major Refactor - Simpler & Better!

This is a complete architectural rewrite of ChaiWind with a focus on simplicity, maintainability, and extensibility.

### Breaking Changes

- **Module System**: Changed from single IIFE file to ES modules
  - Old: `<script src="chaiwind.js"></script>` (auto-runs)
  - New: `<script type="module">` with explicit `initChai()` call

- **File Structure**: Moved from monolithic `chaiwind.js` to modular `src/` directory
  - `src/index.js` - Entry point
  - `src/tokens.js` - Design system tokens
  - `src/engine.js` - Core parsing logic
  - `src/handlers.js` - Utility handlers

- **Initialization**: Must explicitly call `initChai()` to start

### New Usage

```html
<!DOCTYPE html>
<html>
  <head>
    <title>ChaiWind v3</title>
  </head>
  <body>
    <div class="chai-bg-chai chai-p-4 chai-rounded-md chai-text-white">
      Hello ChaiCode! ☕
    </div>

    <script type="module">
      import { initChai } from "./node_modules/chaiwind/src/index.js";
      initChai();
    </script>
  </body>
</html>
```

### Added

- ✨ **MutationObserver** - Automatically processes dynamically added content
  - Works seamlessly with React, Vue, Alpine.js, and vanilla JS
  - No need to manually rescan when adding elements

- 🎨 **New Utilities** (70+ total, up from 60+)
  - `chai-grid-cols-{n}` - CSS Grid columns
  - `chai-col-span-{n}` - Grid column span
  - `chai-leading-{value}` - Line height control
  - `chai-tracking-{value}` - Letter spacing
  - `chai-z-{value}` - Z-index
  - `chai-object-cover` / `chai-object-contain` - Object fit
  - `chai-select-none` - User select
  - `chai-overflow-{x|y}-{value}` - Overflow control

- 📁 **Beginner-Friendly Architecture**
  - Just 4 simple files - easy to understand how it works
  - Clear separation of concerns
  - Well-commented code explaining each function

- 🔧 **Easy Customization**
  - Want new colors? Edit `src/tokens.js`
  - Want new utilities? Add to `src/handlers.js`
  - No build process to run!

- 🚀 **Better Developer Experience**
  - ES modules = modern JavaScript
  - Import only what you need
  - Works with Vite, webpack, Rollup out of the box

### Enhanced

- **Color System**: Expanded ChaiCode-themed palettes
  - ☕ Hitesh sir - chai, adrak, masala, kulhad, tapri, dudh
  - 🩷 Piyush sir - piyush, rose, blush, fuschia, lipstick
  - 🍎 Akash sir - midnight, spacegray, silver, macos-blue
  - Plus full grayscale (gray-50 to gray-900)

- **Spacing Scale**: Added more values (14, 32) for better coverage

- **Font Scale**: Added `6xl` (64px) for extra large headings

- **Handler Organization**: Grouped by category with clear comments

### Migration from v2.x

**Step 1**: Update your HTML from:

```html
<script src="chaiwind.js"></script>
```

**To**:

```html
<script type="module">
  import { initChai } from "./node_modules/chaiwind/src/index.js";
  initChai();
</script>
```

**Step 2**: That's it! All your existing `chai-*` classes work exactly the same.

**Note**: If you need to support older browsers without ES module support, you may want to stay on v2.x or use a bundler.

### What Stays the Same

- ✅ All existing `cai-*` class names work identically
- ✅ Same API - just styled with inline styles
- ✅ Zero dependencies
- ✅ Lightweight and fast
- ✅ ChaiCode branding and themed colors

---

## [2.1.3] - 2025-XX-XX

### Changed

- Enhanced `applyClass` function for better utility handling
- Added new color, spacing, font size, radius, and shadow tokens

## [2.0.0] - 2025-XX-XX

### Added

- New logic with autocomplete suggestions
- Improved version with better architecture

## [1.0.0] - 2025-XX-XX

### Added

- Initial release
- Basic utility-first CSS engine
- ChaiCode themed colors
- Core utilities for padding, margin, colors, typography
