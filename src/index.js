/**
 * index.js
 * Entry point for chaiwind
 *
 * Usage with a bundler (Vite, webpack):
 *   import { initChai } from 'chaiwind'
 *   initChai()
 *
 * Usage in plain HTML:
 *   <script type="module">
 *     import { initChai } from './node_modules/chaiwind/src/index.js'
 *     initChai()
 *   </script>
 */

import { init } from "./engine.js";

export function initChai() {
  init();
}
