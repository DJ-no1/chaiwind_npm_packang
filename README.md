# chaiwind

A lightweight utility-first CSS engine for the ChaiCode family.

Write `chai-*` class names on your HTML elements. chaiwind scans the DOM,
parses those class names, and applies inline styles directly — no build step,
no config, no stylesheet required.

---

## Install

```bash
npm install chaiwind
```

VS Code autocomplete for all `chai-*` classes is set up automatically.
Restart VS Code once after install to activate suggestions.

---

## Setup

Add the script tag at the **bottom of your body** tag:

```html
<body>

  <!-- your HTML here -->

  <script src="node_modules/chaiwind/chaiwind.js"></script>
</body>
```

Then use `chai-*` classes on any element:

```html
<div class="chai-bg-chai chai-p-4 chai-rounded-md chai-text-white">
  Haanji!
</div>

<div class="chai-flex chai-items-center chai-justify-between chai-gap-4">
  <p class="chai-fs-lg chai-font-bold chai-text-masala">Hitesh sir</p>
  <p class="chai-fs-sm chai-text-gray">ChaiCode</p>
</div>
```

chaiwind converts each `chai-*` class into an inline style and removes the
class from the element. A `data-chaiwind` attribute is added so you can still
see what was applied by inspecting the element.

---

## How it works

1. Script runs after the DOM is ready
2. `querySelectorAll('[class]')` finds every element with a class
3. For each class starting with `chai-` — parses the suffix into a CSS property and value
4. Applies styles via `Object.assign(el.style, styles)`
5. Removes the `chai-*` class, stores applied names in `data-chaiwind`
6. `MutationObserver` watches for elements added after load and applies the same logic

---

## Color tokens

### ChaiCode brand
| Class | Value |
|---|---|
| `chai-bg-chaicode` | `#f97316` |
| `chai-bg-chaicode-dark` | `#1a1a2e` |

### Hitesh sir
| Class | Value |
|---|---|
| `chai-bg-chai` | `#c8843a` |
| `chai-bg-adrak` | `#d4a056` |
| `chai-bg-masala` | `#8b4513` |
| `chai-bg-kulhad` | `#b5651d` |

### Piyush sir
| Class | Value |
|---|---|
| `chai-bg-piyush` | `#ec4899` |
| `chai-bg-piyush-dark` | `#be185d` |

### Akash sir
| Class | Value |
|---|---|
| `chai-bg-midnight` | `#1d1d1f` |
| `chai-bg-silver` | `#e8e8ed` |

Each color token generates three classes: `chai-bg-*`, `chai-text-*`, `chai-border-*`

---

## Spacing

`chai-p-{0|1|2|3|4|6|8|10|12}` — padding  
`chai-px-` `chai-py-` `chai-pt-` `chai-pb-` `chai-pl-` `chai-pr-`  
`chai-m-{0|1|2|3|4|6|8|10|12}` — margin  
`chai-mx-` `chai-my-` `chai-mt-` `chai-mb-` `chai-ml-` `chai-mr-`  
`chai-gap-{n}` `chai-w-{n}` `chai-h-{n}`

Scale: 0=0px 1=4px 2=8px 3=12px 4=16px 6=24px 8=32px 10=40px 12=48px

---

## Typography

`chai-fs-{xs|sm|base|lg|xl|2xl}` — font size  
`chai-font-{normal|medium|semibold|bold}` — font weight  
`chai-text-{left|center|right}` — alignment  
`chai-uppercase` `chai-lowercase` `chai-capitalize`  
`chai-italic` `chai-underline` `chai-no-underline` `chai-truncate`

---

## Layout

`chai-flex` `chai-flex-col` `chai-flex-row` `chai-flex-wrap` `chai-flex-1`  
`chai-items-{start|center|end}`  
`chai-justify-{start|center|end|between}`  
`chai-grid` `chai-block` `chai-inline-block` `chai-hidden`

---

## Sizing

`chai-w-full` `chai-w-screen` `chai-w-auto`  
`chai-h-full` `chai-h-screen` `chai-h-auto`

---

## Position

`chai-relative` `chai-absolute` `chai-fixed` `chai-sticky`

---

## Border & Radius

`chai-border` `chai-border-2` `chai-border-none` `chai-border-dashed`  
`chai-rounded-{none|sm|md|lg|full}`

---

## Misc

`chai-overflow-{hidden|auto}`  
`chai-cursor-pointer` `chai-cursor-not-allowed`  
`chai-opacity-{0|50|100}`  
`chai-select-none` `chai-box-border`

---

## VS Code autocomplete

Configured automatically on install. To set up manually:

```json
{
  "css.customData": ["./node_modules/chaiwind/chaiwind.css-data.json"]
}
```

Add this to `.vscode/settings.json` and restart VS Code.

---

## Known limitations

- Inline styles override all external CSS — this is a tradeoff of the inline approach
- Hover and focus states (`chai-hover-*`) are not supported — inline styles cannot express pseudo-classes
- Responsive breakpoints (`sm:chai-p-4`) are not supported — media queries require a stylesheet

---

## License

MIT