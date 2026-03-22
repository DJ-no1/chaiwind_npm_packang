# chaiwind

> **v3.0.0** - A lightweight utility-first CSS engine for the ChaiCode family

Write `chai-*` class names on your HTML elements. ChaiWind scans the DOM, parses those class names, and applies inline styles directly. **No build step, no config, no stylesheet required.**

New in v3: Modular ES modules architecture + MutationObserver for dynamic content

---

## What's New in v3.0.0

- **MutationObserver** - Automatically styles dynamically added content
- **4-File Modular Architecture** - Easy to understand and customize
- **70+ Utilities** - Added grid, line-height, letter-spacing, z-index, and more
- **Easy Customization** - Edit `src/tokens.js` for colors/spacing, `src/handlers.js` for utilities
- **ES Modules** - Modern JavaScript with better tooling support

**[See full changelog](./CHANGELOG.md)**

---

## Install

```bash
npm install chaiwind
```

---

## Quick Start

```html
<!DOCTYPE html>
<html>
  <head>
    <title>ChaiWind v3</title>
  </head>
  <body>
    <!-- Use chai-* classes anywhere -->
    <div class="chai-bg-chai chai-p-4 chai-rounded-md chai-text-white">
      Hello ChaiCode!
    </div>

    <div class="chai-flex chai-items-center chai-justify-between chai-gap-4">
      <p class="chai-text-xl chai-font-bold chai-text-masala">Hitesh sir</p>
      <p class="chai-text-sm chai-text-gray">ChaiCode</p>
    </div>

    <!-- Import and initialize ChaiWind -->
    <script type="module">
      import { initChai } from "./node_modules/chaiwind/src/index.js";
      initChai();
    </script>
  </body>
</html>
```

**That's it!** ChaiWind will:

1. Scan all `chai-*` classes
2. Convert them to inline styles
3. Remove the classes (keeps your HTML clean)
4. Watch for new elements added dynamically

---

## How It Works

1. **Parse** - Finds all `chai-*` classes (e.g., `chai-bg-piyush`)
2. **Apply** - Converts to inline style (`style.backgroundColor = '#ec4899'`)
3. **Clean** - Removes the class from the element
4. **Watch** - MutationObserver monitors for dynamically added content

---

## Dynamic Content

ChaiWind automatically styles elements added after page load:

```html
<button id="add">Add Element</button>
<div id="container"></div>

<script type="module">
  import { initChai } from "./node_modules/chaiwind/src/index.js";
  initChai();

  document.getElementById("add").onclick = () => {
    const div = document.createElement("div");
    div.className = "chai-bg-piyush chai-p-4 chai-rounded-md chai-text-white";
    div.textContent = "Dynamically added!";
    document.getElementById("container").appendChild(div);
    // Styled immediately - no manual rescan needed
  };
</script>
```

---

## Customization

Want to add your own colors or utilities? ChaiWind v3 makes it super easy!

### Adding Custom Colors

Edit `node_modules/chaiwind/src/tokens.js` (or fork and modify):

```js
export const colors = {
  // Add your brand colors
  mybrand: "#ff6b6b",
  "mybrand-dark": "#ee5a6f",

  // ... existing ChaiCode colors
};
```

Now use: `chai-bg-mybrand`, `chai-text-mybrand`, `chai-border-mybrand`

### Adding Custom Utilities

Edit `node_modules/chaiwind/src/handlers.js`:

```js
export const handlers = {
  // Add custom utility
  "shadow-glow": (el) =>
    (el.style.boxShadow = "0 0 20px rgba(255,107,107,0.5)"),

  // ... existing handlers
};
```

Now use: `chai-shadow-glow`

---

## Color Tokens

### ChaiCode Brand

| Class                   | Value     | Use Case      |
| ----------------------- | --------- | ------------- |
| `chai-bg-chaicode`      | `#f97316` | Primary brand |
| `chai-bg-chaicode-dark` | `#1a1a2e` | Dark mode     |

### Hitesh sir — Chai Palette

| Class            | Value     | Description     |
| ---------------- | --------- | --------------- |
| `chai-bg-chai`   | `#c8843a` | Classic chai    |
| `chai-bg-adrak`  | `#d4a056` | Ginger gold     |
| `chai-bg-masala` | `#8b4513` | Deep masala     |
| `chai-bg-kulhad` | `#b5651d` | Clay kulhad     |
| `chai-bg-tapri`  | `#6b3a2a` | Dark roasted    |
| `chai-bg-dudh`   | `#f5f0e8` | Milk chai cream |

### Tea Collection

| Class                    | Value     | Description        |
| ------------------------ | --------- | ------------------ |
| `chai-bg-green-tea`      | `#7fbf7f` | Fresh green tea    |
| `chai-bg-chamomile-tea`  | `#f5e6a6` | Gentle chamomile   |
| `chai-bg-black-tea`      | `#3b2f2f` | Deep black tea     |
| `chai-bg-herbal-tea`     | `#a3c585` | Soft herbal blend  |
| `chai-bg-matcha-tea`     | `#6ea64d` | Rich matcha green  |
| `chai-bg-white-tea`      | `#f2f2f2` | Delicate white tea |
| `chai-bg-masala-chai`    | `#c68642` | Spiced masala chai |
| `chai-bg-darjeeling-tea` | `#d4a373` | Golden Darjeeling  |
| `chai-bg-irani-chai`     | `#b08968` | Persian irani chai |
| `chai-bg-oolong-tea`     | `#a47148` | Amber oolong       |
| `chai-bg-lemongrass-tea` | `#c9e4a7` | Light lemongrass   |
| `chai-bg-tandoori-chai`  | `#b7410e` | Bold tandoori chai |
| `chai-bg-chai-tea`       | `#8b5e3c` | Classic chai brown |
| `chai-bg-peach-tea`      | `#ffb07c` | Fruity peach tea   |
| `chai-bg-mate-tea`       | `#6b8e23` | Earthy mate        |
| `chai-bg-rooibos-tea`    | `#b22222` | Red rooibos        |
| `chai-bg-nilgiri-tea`    | `#5c4033` | Dark nilgiri       |
| `chai-bg-dark-tea`       | `#1c1c1c` | Almost black tea   |

### Piyush sir — Pink Palette

| Class                  | Value     | Description   |
| ---------------------- | --------- | ------------- |
| `chai-bg-piyush`       | `#ec4899` | Hot pink      |
| `chai-bg-piyush-light` | `#f9a8d4` | Soft blush    |
| `chai-bg-piyush-dark`  | `#be185d` | Deep magenta  |
| `chai-bg-rose`         | `#fb7185` | Rose          |
| `chai-bg-blush`        | `#fce7f3` | Barely blush  |
| `chai-bg-fuschia`      | `#d946ef` | Electric      |
| `chai-bg-lipstick`     | `#c2185b` | Bold lipstick |

### Akash sir — Mac Palette

| Class                 | Value     | Description |
| --------------------- | --------- | ----------- |
| `chai-bg-midnight`    | `#1d1d1f` | Apple black |
| `chai-bg-spacegray`   | `#86868b` | Mac gray    |
| `chai-bg-silver`      | `#e8e8ed` | Mac silver  |
| `chai-bg-starlight`   | `#f5f1eb` | Starlight   |
| `chai-bg-macos-blue`  | `#0071e3` | Apple blue  |
| `chai-bg-macos-green` | `#34c759` | Apple green |
| `chai-bg-macos-red`   | `#ff3b30` | Apple red   |
| `chai-bg-aluminum`    | `#d1d1d6` | Aluminum    |

**Each color works with**: `chai-bg-*`, `chai-text-*`, `chai-border-*`

---

## Spacing

| Utility    | Values                                     | CSS Property   |
| ---------- | ------------------------------------------ | -------------- |
| `chai-p`   | `0,1,2,3,4,5,6,7,8,9,10,12,14,16,20,24,32` | padding        |
| `chai-px`  | Same as above                              | padding-x      |
| `chai-py`  | Same as above                              | padding-y      |
| `chai-pt`  | Same as above                              | padding-top    |
| `chai-pb`  | Same as above                              | padding-bottom |
| `chai-pl`  | Same as above                              | padding-left   |
| `chai-pr`  | Same as above                              | padding-right  |
| `chai-m`   | Same as above                              | margin         |
| `chai-mx`  | Same as above                              | margin-x       |
| `chai-my`  | Same as above                              | margin-y       |
| `chai-mt`  | Same as above                              | margin-top     |
| `chai-mb`  | Same as above                              | margin-bottom  |
| `chai-ml`  | Same as above                              | margin-left    |
| `chai-mr`  | Same as above                              | margin-right   |
| `chai-gap` | Same as above                              | gap            |

**Scale**: `0`=0px, `1`=4px, `2`=8px, `3`=12px, `4`=16px, `5`=20px, `6`=24px, `7`=28px, `8`=32px, `9`=36px, `10`=40px, `12`=48px, `14`=56px, `16`=64px, `20`=80px, `24`=96px, `32`=128px

**Example**: `chai-p-4` = 16px padding, `chai-mx-auto` = auto horizontal margin

---

## Typography

### Font Size, `chai-text-{size}`

| Class            | Value | Output |
| ---------------- | ----- | ------ |
| `chai-text-xs`   | xs    | 11px   |
| `chai-text-sm`   | sm    | 13px   |
| `chai-text-base` | base  | 16px   |
| `chai-text-lg`   | lg    | 18px   |
| `chai-text-xl`   | xl    | 20px   |
| `chai-text-2xl`  | 2xl   | 24px   |
| `chai-text-3xl`  | 3xl   | 30px   |
| `chai-text-4xl`  | 4xl   | 36px   |
| `chai-text-5xl`  | 5xl   | 48px   |
| `chai-text-6xl`  | 6xl   | 64px   |

### Font Weight - `chai-font-{weight}`

`chai-font-thin` `chai-font-light` `chai-font-normal` `chai-font-medium`
`chai-font-semibold` `chai-font-bold` `chai-font-black`

### Text Alignment - `chai-text-{align}`

`chai-text-left` `chai-text-center` `chai-text-right`

### Text Transform

`chai-uppercase` `chai-lowercase` `chai-capitalize`

### Text Decoration

`chai-italic` `chai-underline` `chai-line-through` `chai-no-underline` `chai-truncate`

### Line Height - `chai-leading-{value}`

`chai-leading-none` `chai-leading-tight` `chai-leading-snug`
`chai-leading-normal` `chai-leading-relaxed` `chai-leading-loose`

### Letter Spacing - `chai-tracking-{value}`

`chai-tracking-tight` `chai-tracking-normal` `chai-tracking-wide`
`chai-tracking-wider` `chai-tracking-widest`

---

## Layout

### Display

`chai-flex` `chai-grid` `chai-block` `chai-inline-block` `chai-inline` `chai-hidden`

### Flexbox

`chai-flex-col` `chai-flex-row` `chai-flex-wrap` `chai-flex-1`

#### Align Items - `chai-items-{value}`

`chai-items-center` `chai-items-start` `chai-items-end` `chai-items-stretch`

#### Justify Content - `chai-justify-{value}`

`chai-justify-center` `chai-justify-start` `chai-justify-end`
`chai-justify-between` `chai-justify-around` `chai-justify-evenly`

### Grid

| Class              | CSS                                   |
| ------------------ | ------------------------------------- |
| `chai-grid-cols-2` | grid-template-columns: repeat(2, 1fr) |
| `chai-grid-cols-3` | grid-template-columns: repeat(3, 1fr) |
| `chai-grid-cols-4` | grid-template-columns: repeat(4, 1fr) |
| `chai-col-span-2`  | grid-column: span 2                   |
| `chai-col-span-3`  | grid-column: span 3                   |

---

## Sizing

### Width - `chai-w-{value}`

`chai-w-full` (100%), `chai-w-screen` (100vw), `chai-w-auto`
Or use spacing scale: `chai-w-4`, `chai-w-8`, `chai-w-24`, etc.

### Height - `chai-h-{value}`

`chai-h-full` (100%), `chai-h-screen` (100vh), `chai-h-auto`
Or use spacing scale: `chai-h-4`, `chai-h-8`, `chai-h-24`, etc.

### Min/Max

`chai-max-w-{n}` `chai-min-h-{n}` `chai-min-w-{n}`

---

## Position

`chai-relative` `chai-absolute` `chai-fixed` `chai-sticky`

### Z-Index - `chai-z-{value}`

`chai-z-0` `chai-z-10` `chai-z-20` ... `chai-z-50`

---

## Border & Radius

### Border

`chai-border` (1px solid currentColor)
`chai-border-{color}` (1px solid with color)

### Border Radius - `chai-rounded-{size}`

`chai-rounded-none` `chai-rounded-sm` `chai-rounded-md`
`chai-rounded-lg` `chai-rounded-xl` `chai-rounded-2xl` `chai-rounded-full`

---

## Shadow

| Class                | CSS                              |
| -------------------- | -------------------------------- |
| `chai-shadow-none`   | none                             |
| `chai-shadow-sm`     | 0 1px 3px rgba(0,0,0,0.10)       |
| `chai-shadow-md`     | 0 4px 12px rgba(0,0,0,0.12)      |
| `chai-shadow-lg`     | 0 8px 24px rgba(0,0,0,0.15)      |
| `chai-shadow-xl`     | 0 16px 48px rgba(0,0,0,0.20)     |
| `chai-shadow-chai`   | 0 4px 20px rgba(200,132,58,0.35) |
| `chai-shadow-piyush` | 0 4px 20px rgba(236,72,153,0.30) |
| `chai-shadow-mac`    | 0 8px 32px rgba(29,29,31,0.25)   |

---

## Misc Utilities

### Opacity - `chai-opacity-{value}`

`chai-opacity-0` (0%), `chai-opacity-50` (50%), `chai-opacity-100` (100%)

### Overflow

`chai-overflow-hidden` `chai-overflow-auto`
`chai-overflow-x-auto` `chai-overflow-y-auto`

### Cursor

`chai-cursor-pointer` `chai-cursor-not-allowed` `chai-cursor-{any CSS cursor value}`

### Object Fit

`chai-object-cover` `chai-object-contain`

### User Select

`chai-select-none`

### Transition

`chai-transition` (all 150ms ease), `chai-transition-none`

### Centering

`chai-mx-auto` (horizontal center with auto margins)

---

## Migration from v2.x

### Breaking Changes

1. **Import method changed** - ES modules instead of script tag
2. **Must call initChai()** - Not automatic anymore

### Migration Steps

**Before (v2.x)**:

```html
<script src="node_modules/chaiwind/chaiwind.js"></script>
```

**After (v3.x)**:

```html
<script type="module">
  import { initChai } from "./node_modules/chaiwind/src/index.js";
  initChai();
</script>
```

All your `chai-*` classes work exactly the same! Just change how you load the script.

---

## File Structure

```
node_modules/chaiwind/
├── src/
│   ├── index.js      # Entry point - exports initChai()
│   ├── tokens.js     # Design tokens (customize colors/spacing here!)
│   ├── engine.js     # Core parser + MutationObserver
│   └── handlers.js   # Utility mappings (add custom utilities here!)
├── demo/
│   └── demo.html     # Live demo
├── package.json
├── README.md
└── CHANGELOG.md
```

**Beginner-friendly!** Just 4 files - easy to understand and customize.

---

## Known Limitations

- **Inline styles override external CSS** - This is fundamental to the inline approach
- **No hover/focus states** - Inline styles can't express pseudo-classes (`:hover`, `:focus`)
- **No responsive breakpoints** - Media queries require a stylesheet
- **ES Module support required** - For older browsers, use a bundler or stay on v2.x

---

## Demo

Check out `node_modules/chaiwind/demo/demo.html` for a live example with all utilities!

Or try it online: [Coming soon]

---

## Why ChaiWind?

- **Zero build step** - Just import and go
- **No configuration** - Sensible ChaiCode-themed defaults
- **Dynamic content support** - MutationObserver handles dynamic content
- **Beginner-friendly** - 4 simple files you can read and understand
- **Easy to customize** - Edit tokens.js and handlers.js
- **ChaiCode branding** - Themed colors celebrating our mentors

---

## License

MIT

---

Made for the ChaiCode family
