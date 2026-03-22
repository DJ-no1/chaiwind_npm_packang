/**
 * engine.js
 * The core of chaiwind — 3 responsibilities:
 *
 *  1. parseClass(cls)      — breaks 'chai-bg-piyush' into { utility, value }
 *  2. applyClass(el, cls)  — applies inline style + removes the class
 *  3. init()               — scans DOM on load + watches live with MutationObserver
 */

import { handlers } from "./handlers.js";

// ─── 1. PARSER ────────────────────────────────────────────────────────────────
// Input:  'chai-bg-piyush-dark'
// Output: { utility: 'bg', value: 'piyush-dark' }
//
// Steps:
//  - slice(5)         removes the 'chai-' prefix  →  'bg-piyush-dark'
//  - indexOf('-')     finds the first dash         →  index 2
//  - slice(0, 2)      gets the utility             →  'bg'
//  - slice(3)         gets the value               →  'piyush-dark'
//
// Edge case: 'chai-flex' has no value
//  - indexOf('-') returns -1
//  - utility = 'flex', value = ''

function parseClass(cls) {
  const raw = cls.slice(5); // strip 'chai-'
  const dashIdx = raw.indexOf("-"); // find first dash

  const utility = dashIdx === -1 ? raw : raw.slice(0, dashIdx);
  const value = dashIdx === -1 ? "" : raw.slice(dashIdx + 1);

  return { utility, value };
}

// ─── 2. APPLY CLASS ───────────────────────────────────────────────────────────
// Takes one element and one class name
// Looks up the handler, calls it, removes the class

function applyClass(el, cls) {
  const { utility, value } = parseClass(cls);

  // look up the handler for this utility
  const handler = handlers[utility];

  if (handler) {
    handler(el, value); // e.g. handlers['bg'](el, 'piyush')
  }
  // unknown utility — silently skip, just remove the class

  // requirement: always remove chai- class after processing
  el.classList.remove(cls);
}

// ─── 3. PROCESS ELEMENT ───────────────────────────────────────────────────────
// Takes one element, finds all chai- classes on it, applies each one
// We snapshot classList into an Array first — important!
// Because we're removing classes inside the loop,
// iterating el.classList live would skip some classes

function processElement(el) {
  // only process actual HTML elements, skip text nodes / comment nodes
  if (el.nodeType !== 1) return;

  // snapshot into array so removals don't affect iteration
  const classes = Array.from(el.classList);

  classes.forEach((cls) => {
    if (cls.startsWith("chai-")) {
      applyClass(el, cls);
    }
  });
}

// ─── 4. SCAN ──────────────────────────────────────────────────────────────────
// Runs once — traverses the entire DOM
// Finds every element that has at least one chai- class

function scan() {
  // querySelectorAll('[class]') — grabs every element that has a class attribute
  // this is faster than grabbing ALL elements and checking each one
  const elements = document.querySelectorAll("[class]");
  elements.forEach((el) => processElement(el));
}

// ─── 5. MUTATIONOBSERVER ──────────────────────────────────────────────────────
// Watches the DOM live — any element added after page load also gets processed
// This handles: JS frameworks, dynamic content, setTimeout additions etc.
//
// mutation.addedNodes = list of nodes added in this mutation
// We process each added node + all its children (querySelectorAll inside it)

function watch() {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        // skip text nodes, comment nodes — only process elements
        if (node.nodeType !== 1) continue;

        // process the element itself
        processElement(node);

        // process any children inside it too
        // e.g. a whole section added at once — scan everything inside
        node
          .querySelectorAll("[class]")
          .forEach((child) => processElement(child));
      }
    }
  });

  // observe the entire document body
  // childList: true  → watch for elements being added or removed
  // subtree: true    → watch ALL descendants, not just direct children
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

// ─── 6. INIT ──────────────────────────────────────────────────────────────────
// Called from index.js
// Handles two cases:
//   - script in <head>  → HTML not parsed yet → wait for DOMContentLoaded
//   - script at <body>  → HTML already parsed  → run immediately

export function init() {
  if (document.readyState === "loading") {
    // DOM not ready yet — wait
    document.addEventListener("DOMContentLoaded", () => {
      scan();
      watch();
    });
  } else {
    // DOM already ready — run now
    scan();
    watch();
  }

  console.log(
    "%c☕ chaiwind ready",
    "color: #c8843a; font-weight: bold; font-size: 13px;",
  );
}
