/**
 * handlers.js
 * Maps every chai-* utility to a function that sets el.style directly
 *
 * Structure:
 *   'utility': (el, value) => el.style.someProperty = resolvedValue
 *
 * How it's used in engine.js:
 *   handlers['bg'](el, 'piyush')  →  el.style.backgroundColor = '#ec4899'
 */

import { colors, spacing, fontSizes, radii, shadows } from "./tokens.js";

export const handlers = {
  // ── padding ───────────────────────────────────────────────────────────────
  p: (el, v) => (el.style.padding = spacing[v] || v + "px"),
  px: (el, v) => {
    el.style.paddingLeft = spacing[v] || v + "px";
    el.style.paddingRight = spacing[v] || v + "px";
  },
  py: (el, v) => {
    el.style.paddingTop = spacing[v] || v + "px";
    el.style.paddingBottom = spacing[v] || v + "px";
  },
  pt: (el, v) => (el.style.paddingTop = spacing[v] || v + "px"),
  pb: (el, v) => (el.style.paddingBottom = spacing[v] || v + "px"),
  pl: (el, v) => (el.style.paddingLeft = spacing[v] || v + "px"),
  pr: (el, v) => (el.style.paddingRight = spacing[v] || v + "px"),

  // ── margin ────────────────────────────────────────────────────────────────
  m: (el, v) => (el.style.margin = spacing[v] || v + "px"),
  mx: (el, v) => {
    el.style.marginLeft = spacing[v] || v + "px";
    el.style.marginRight = spacing[v] || v + "px";
  },
  my: (el, v) => {
    el.style.marginTop = spacing[v] || v + "px";
    el.style.marginBottom = spacing[v] || v + "px";
  },
  mt: (el, v) => (el.style.marginTop = spacing[v] || v + "px"),
  mb: (el, v) => (el.style.marginBottom = spacing[v] || v + "px"),
  ml: (el, v) => (el.style.marginLeft = spacing[v] || v + "px"),
  mr: (el, v) => (el.style.marginRight = spacing[v] || v + "px"),

  // ── gap ───────────────────────────────────────────────────────────────────
  gap: (el, v) => (el.style.gap = spacing[v] || v + "px"),

  // ── colors ────────────────────────────────────────────────────────────────
  // chai-bg-chai, chai-bg-red, chai-bg-#ff0000
  bg: (el, v) => (el.style.backgroundColor = colors[v] || v),
  border: (el, v) => {
    // chai-border        → just adds a solid border
    // chai-border-chai   → solid border with chai color
    if (!v) {
      el.style.border = "1px solid currentColor";
    } else {
      el.style.border = "1px solid " + (colors[v] || v);
    }
  },

  // ── text — handles 3 things: color, size, alignment ──────────────────────
  // chai-text-chai     → color
  // chai-text-xl       → font size
  // chai-text-center   → text align
  text: (el, v) => {
    if (colors[v]) el.style.color = colors[v];
    else if (fontSizes[v]) el.style.fontSize = fontSizes[v];
    else el.style.textAlign = v;
  },

  // ── font ──────────────────────────────────────────────────────────────────
  font: (el, v) => {
    const weightMap = {
      thin: "100",
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      black: "900",
    };
    if (weightMap[v]) el.style.fontWeight = weightMap[v];
  },

  // ── border radius ─────────────────────────────────────────────────────────
  // chai-rounded-md, chai-rounded-full, chai-rounded-20 (raw px)
  rounded: (el, v) => (el.style.borderRadius = radii[v] || v + "px"),

  // ── shadow ────────────────────────────────────────────────────────────────
  shadow: (el, v) => (el.style.boxShadow = shadows[v] || v),

  // ── opacity ───────────────────────────────────────────────────────────────
  // chai-opacity-50 → 0.5
  opacity: (el, v) => (el.style.opacity = String(Number(v) / 100)),

  // ── sizing ────────────────────────────────────────────────────────────────
  w: (el, v) => {
    if (v === "full") el.style.width = "100%";
    else if (v === "screen") el.style.width = "100vw";
    else if (v === "auto") el.style.width = "auto";
    else el.style.width = spacing[v] || v + "px";
  },
  h: (el, v) => {
    if (v === "full") el.style.height = "100%";
    else if (v === "screen") el.style.height = "100vh";
    else if (v === "auto") el.style.height = "auto";
    else el.style.height = spacing[v] || v + "px";
  },
  "max-w": (el, v) => (el.style.maxWidth = spacing[v] || v + "px"),
  "min-h": (el, v) =>
    (el.style.minHeight = v === "screen" ? "100vh" : spacing[v] || v + "px"),
  "min-w": (el, v) =>
    (el.style.minWidth = v === "full" ? "100%" : spacing[v] || v + "px"),

  // ── display ───────────────────────────────────────────────────────────────
  flex: (el) => (el.style.display = "flex"),
  grid: (el) => (el.style.display = "grid"),
  block: (el) => (el.style.display = "block"),
  "inline-block": (el) => (el.style.display = "inline-block"),
  inline: (el) => (el.style.display = "inline"),
  hidden: (el) => (el.style.display = "none"),

  // ── flexbox ───────────────────────────────────────────────────────────────
  "flex-col": (el) => (el.style.flexDirection = "column"),
  "flex-row": (el) => (el.style.flexDirection = "row"),
  "flex-wrap": (el) => (el.style.flexWrap = "wrap"),
  "flex-1": (el) => (el.style.flex = "1"),
  items: (el, v) => {
    const map = {
      center: "center",
      start: "flex-start",
      end: "flex-end",
      stretch: "stretch",
    };
    el.style.alignItems = map[v] || v;
  },
  justify: (el, v) => {
    const map = {
      center: "center",
      start: "flex-start",
      end: "flex-end",
      between: "space-between",
      around: "space-around",
      evenly: "space-evenly",
    };
    el.style.justifyContent = map[v] || v;
  },

  // ── grid ──────────────────────────────────────────────────────────────────
  "grid-cols": (el, v) => (el.style.gridTemplateColumns = `repeat(${v}, 1fr)`),
  "col-span": (el, v) => (el.style.gridColumn = `span ${v}`),

  // ── position ──────────────────────────────────────────────────────────────
  relative: (el) => (el.style.position = "relative"),
  absolute: (el) => (el.style.position = "absolute"),
  fixed: (el) => (el.style.position = "fixed"),
  sticky: (el) => {
    el.style.position = "sticky";
    el.style.top = "0";
  },

  // ── overflow ──────────────────────────────────────────────────────────────
  overflow: (el, v) => (el.style.overflow = v || "hidden"),
  "overflow-x": (el, v) => (el.style.overflowX = v || "auto"),
  "overflow-y": (el, v) => (el.style.overflowY = v || "auto"),

  // ── z-index ───────────────────────────────────────────────────────────────
  z: (el, v) => (el.style.zIndex = v),

  // ── typography ────────────────────────────────────────────────────────────
  uppercase: (el) => (el.style.textTransform = "uppercase"),
  lowercase: (el) => (el.style.textTransform = "lowercase"),
  capitalize: (el) => (el.style.textTransform = "capitalize"),
  italic: (el) => (el.style.fontStyle = "italic"),
  underline: (el) => (el.style.textDecoration = "underline"),
  "line-through": (el) => (el.style.textDecoration = "line-through"),
  "no-underline": (el) => (el.style.textDecoration = "none"),
  truncate: (el) => {
    el.style.overflow = "hidden";
    el.style.textOverflow = "ellipsis";
    el.style.whiteSpace = "nowrap";
  },
  leading: (el, v) => {
    const map = {
      none: "1",
      tight: "1.25",
      snug: "1.375",
      normal: "1.5",
      relaxed: "1.625",
      loose: "2",
    };
    el.style.lineHeight = map[v] || v;
  },
  tracking: (el, v) => {
    const map = {
      tight: "-0.05em",
      normal: "0",
      wide: "0.05em",
      wider: "0.1em",
      widest: "0.2em",
    };
    el.style.letterSpacing = map[v] || v;
  },

  // ── cursor ────────────────────────────────────────────────────────────────
  cursor: (el, v) => (el.style.cursor = v),

  // ── misc ──────────────────────────────────────────────────────────────────
  transition: (el, v) =>
    (el.style.transition = v === "none" ? "none" : "all 150ms ease"),
  "select-none": (el) => (el.style.userSelect = "none"),
  "object-cover": (el) => (el.style.objectFit = "cover"),
  "object-contain": (el) => (el.style.objectFit = "contain"),
  "mx-auto": (el) => {
    el.style.marginLeft = "auto";
    el.style.marginRight = "auto";
  },
};
