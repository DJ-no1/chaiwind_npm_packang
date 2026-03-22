(function () {
  // ─── TOKENS ───────────────────────────────────────────────────────────────
  // same tokens as before — just used for lookup, not for building CSS strings

  const colors = {
    // chaicode brand
    chaicode: "#f97316",
    "chaicode-dark": "#1a1a2e",

    //  hitesh sir
    chai: "#c8843a",
    adrak: "#d4a056",
    masala: "#8b4513",
    kulhad: "#b5651d",
    tapri: "#6b3a2a",
    dudh: "#f5f0e8",

    //  piyush sir
    piyush: "#ec4899",
    "piyush-light": "#f9a8d4",
    "piyush-dark": "#be185d",
    rose: "#fb7185",
    blush: "#fce7f3",
    fuschia: "#d946ef",

    //  akash sir
    midnight: "#1d1d1f",
    spacegray: "#86868b",
    silver: "#e8e8ed",
    starlight: "#f5f1eb",
    "macos-blue": "#0071e3",
    "macos-green": "#34c759",
    "macos-red": "#ff3b30",
    aluminum: "#d1d1d6",

    // basics
    white: "#ffffff",
    black: "#000000",
    gray: "#6b7280",
    red: "#ef4444",
    green: "#22c55e",
    blue: "#3b82f6",
    yellow: "#eab308",
    purple: "#a855f7",
    orange: "#f97316",
    pink: "#ec4899",
    teal: "#14b8a6",
    indigo: "#6366f1",
  };

  const spacing = {
    0: "0px",
    1: "4px",
    2: "8px",
    3: "12px",
    4: "16px",
    5: "20px",
    6: "24px",
    7: "28px",
    8: "32px",
    9: "36px",
    10: "40px",
    12: "48px",
    16: "64px",
    20: "80px",
    24: "96px",
  };

  const fontSizes = {
    xs: "11px",
    sm: "13px",
    base: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "30px",
    "4xl": "36px",
    "5xl": "48px",
  };

  const radii = {
    none: "0px",
    sm: "4px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    "2xl": "24px",
    full: "9999px",
  };

  const shadows = {
    sm: "0 1px 3px rgba(0,0,0,0.10)",
    md: "0 4px 12px rgba(0,0,0,0.12)",
    lg: "0 8px 24px rgba(0,0,0,0.15)",
    xl: "0 16px 48px rgba(0,0,0,0.20)",
    chai: "0 4px 20px rgba(200,132,58,0.35)",
    piyush: "0 4px 20px rgba(236,72,153,0.30)",
    mac: "0 8px 32px rgba(29,29,31,0.25)",
    none: "none",
  };

  // ─── PARSER ─────────────────────────────────
  // takes one element + one class name
  // parses the class → applies inline style → removes class

  function applyClass(el, cls) {
    // strip 'chai-' prefix → 'p-4' or 'bg-chai' or 'text-center' etc
    const raw = cls.slice(5); // removes 'chai-'
    const dashIndex = raw.indexOf("-"); // find first dash

    // if no dash → single word utility like 'chai-flex', 'chai-block'
    const utility = dashIndex === -1 ? raw : raw.slice(0, dashIndex);
    const value = dashIndex === -1 ? "" : raw.slice(dashIndex + 1);

    // resolve color token or fall back to raw value (e.g. 'red', '#fff')
    const color = colors[value] || value;
    const space = spacing[value] || value;
    const size = fontSizes[value];
    const radius = radii[value] || value;
    const shadow = shadows[value] || value;

    switch (utility) {
      // ── spacing ───────────────────────────────────────────────────────────
      case "p":
        el.style.padding = space;
        break;
      case "px":
        el.style.paddingLeft = space;
        el.style.paddingRight = space;
        break;
      case "py":
        el.style.paddingTop = space;
        el.style.paddingBottom = space;
        break;
      case "pt":
        el.style.paddingTop = space;
        break;
      case "pb":
        el.style.paddingBottom = space;
        break;
      case "pl":
        el.style.paddingLeft = space;
        break;
      case "pr":
        el.style.paddingRight = space;
        break;
      case "m":
        el.style.margin = space;
        break;
      case "mx":
        el.style.marginLeft = space;
        el.style.marginRight = space;
        break;
      case "my":
        el.style.marginTop = space;
        el.style.marginBottom = space;
        break;
      case "mt":
        el.style.marginTop = space;
        break;
      case "mb":
        el.style.marginBottom = space;
        break;
      case "ml":
        el.style.marginLeft = space;
        break;
      case "mr":
        el.style.marginRight = space;
        break;
      case "gap":
        el.style.gap = space;
        break;

      // ── colors ────────────────────────────────────────────────────────────
      case "bg":
        el.style.backgroundColor = color;
        break;
      case "border":
        el.style.border = "1px solid " + color;
        break;
      case "outline":
        el.style.outline = "2px solid " + color;
        break;

      // ── text ──────────────────────────────────────────────────────────────
      // chai-text-red → color
      // chai-text-sm  → font size
      // chai-text-center / left / right / justify → alignment
      case "text":
        if (colors[value]) el.style.color = color;
        else if (fontSizes[value]) el.style.fontSize = size;
        else el.style.textAlign = value;
        break;

      // ── font ──────────────────────────────────────────────────────────────
      case "font":
        if (value === "bold") el.style.fontWeight = "700";
        else if (value === "semibold") el.style.fontWeight = "600";
        else if (value === "medium") el.style.fontWeight = "500";
        else if (value === "normal") el.style.fontWeight = "400";
        else if (value === "light") el.style.fontWeight = "300";
        else if (value === "italic") el.style.fontStyle = "italic";
        break;

      // ── sizing ────────────────────────────────────────────────────────────
      case "w":
        if (value === "full") el.style.width = "100%";
        else if (value === "screen") el.style.width = "100vw";
        else if (value === "auto") el.style.width = "auto";
        else el.style.width = spacing[value] || value;
        break;
      case "h":
        if (value === "full") el.style.height = "100%";
        else if (value === "screen") el.style.height = "100vh";
        else if (value === "auto") el.style.height = "auto";
        else el.style.height = spacing[value] || value;
        break;
      case "min":
        // chai-min-h-screen etc — value = 'h-screen'
        if (value === "h-screen") el.style.minHeight = "100vh";
        if (value === "w-full") el.style.minWidth = "100%";
        break;
      case "max":
        if (value === "w-full") el.style.maxWidth = "100%";
        break;

      // ── border radius ─────────────────────────────────────────────────────
      case "rounded":
        el.style.borderRadius = radius;
        break;

      // ── shadow ────────────────────────────────────────────────────────────
      case "shadow":
        el.style.boxShadow = shadow;
        break;

      // ── opacity ───────────────────────────────────────────────────────────
      case "opacity":
        el.style.opacity = String(Number(value) / 100);
        break;

      // ── display ───────────────────────────────────────────────────────────
      case "flex":
        el.style.display = "flex";
        break;
      case "grid":
        el.style.display = "grid";
        break;
      case "block":
        el.style.display = "block";
        break;
      case "hidden":
        el.style.display = "none";
        break;
      case "inline":
        el.style.display = "inline";
        break;

      // ── flex helpers ──────────────────────────────────────────────────────
      case "items":
        if (value === "center") el.style.alignItems = "center";
        if (value === "start") el.style.alignItems = "flex-start";
        if (value === "end") el.style.alignItems = "flex-end";
        break;
      case "justify":
        if (value === "center") el.style.justifyContent = "center";
        if (value === "start") el.style.justifyContent = "flex-start";
        if (value === "end") el.style.justifyContent = "flex-end";
        if (value === "between") el.style.justifyContent = "space-between";
        if (value === "around") el.style.justifyContent = "space-around";
        break;
      case "flex-col":
        el.style.flexDirection = "column";
        break;
      case "flex-row":
        el.style.flexDirection = "row";
        break;
      case "flex-wrap":
        el.style.flexWrap = "wrap";
        break;

      // ── position ──────────────────────────────────────────────────────────
      case "relative":
        el.style.position = "relative";
        break;
      case "absolute":
        el.style.position = "absolute";
        break;
      case "fixed":
        el.style.position = "fixed";
        break;
      case "sticky":
        el.style.position = "sticky";
        break;

      // ── overflow ──────────────────────────────────────────────────────────
      case "overflow":
        el.style.overflow = value;
        break;

      // ── cursor ────────────────────────────────────────────────────────────
      case "cursor":
        el.style.cursor = value;
        break;

      // ── misc ──────────────────────────────────────────────────────────────
      case "uppercase":
        el.style.textTransform = "uppercase";
        break;
      case "lowercase":
        el.style.textTransform = "lowercase";
        break;
      case "capitalize":
        el.style.textTransform = "capitalize";
        break;
      case "underline":
        el.style.textDecoration = "underline";
        break;
      case "line-through":
        el.style.textDecoration = "line-through";
        break;
      case "italic":
        el.style.fontStyle = "italic";
        break;
      case "truncate":
        el.style.overflow = "hidden";
        el.style.textOverflow = "ellipsis";
        el.style.whiteSpace = "nowrap";
        break;
      case "transition":
        el.style.transition = "all 150ms ease";
        break;
      case "select-none":
        el.style.userSelect = "none";
        break;

      default:
        // unknown class — silently skip
        break;
    }

    // requirement: remove the chai- class after applying
    el.classList.remove(cls);
  }

  // ─── SCANNER ──────────────────────────────────────────────────────────────
  // traverses the full DOM once
  // finds every element that has at least one chai- class
  // applies all chai- classes on that element

  function scan() {
    const elements = document.querySelectorAll("[class]");

    elements.forEach(function (el) {
      // snapshot classList into array first
      // because we're removing classes mid-loop
      const classes = Array.from(el.classList);

      classes.forEach(function (cls) {
        if (cls.startsWith("chai-")) {
          applyClass(el, cls);
        }
      });
    });

    console.log(
      "%c☕ chaiwind done — DOM scanned",
      "color: #c8843a; font-weight: bold; font-size: 13px;",
    );
  }

  // ─── INIT ─────────────────────────────────────────────────────────────────
  // run scan() only after HTML is fully parsed
  // handles both cases: script in head vs script at end of body

  if (document.readyState === "loading") {
    // HTML not done parsing yet — wait for it
    document.addEventListener("DOMContentLoaded", scan);
  } else {
    // HTML already parsed (script is at bottom of body)
    scan();
  }
})();