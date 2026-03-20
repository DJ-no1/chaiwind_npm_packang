#!/usr/bin/env node

/**
 * scripts/postinstall.js
 *
 * Runs automatically after:  npm install chaiwind
 *
 * What it does:
 *   1. Walks up from node_modules/chaiwind/scripts/ to the project root
 *   2. Creates .vscode/ folder if it does not exist
 *   3. Reads existing .vscode/settings.json or starts with an empty object
 *   4. Adds css.customData pointing to chaiwind.css-data.json
 *   5. Writes the file back
 *
 * After this runs, VS Code gives autocomplete for all chai-* class names.
 * The user only needs to restart VS Code once.
 */

var fs   = require('fs')
var path = require('path')

// ---------------------------------------------------------------------------
// paths
// ---------------------------------------------------------------------------

// postinstall runs from inside node_modules/chaiwind/scripts/
// walking up 3 levels reaches the actual project root
var projectRoot  = path.resolve(__dirname, '..', '..', '..')
var vscodeDir    = path.join(projectRoot, '.vscode')
var settingsFile = path.join(vscodeDir, 'settings.json')
var dataFilePath = './node_modules/chaiwind/chaiwind.css-data.json'

// ---------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------

function printUsage() {
  console.log('')
  console.log('  Usage:')
  console.log('  ------')
  console.log('  1. Add the script tag to your HTML:')
  console.log('')
  console.log('     <script src="node_modules/chaiwind/chaiwind.js"></script>')
  console.log('')
  console.log('  2. Use chai-* classes on any element:')
  console.log('')
  console.log('     <div class="chai-bg-chai chai-p-4 chai-rounded-md">')
  console.log('       Haanji!')
  console.log('     </div>')
  console.log('')
  console.log('  Docs: https://www.npmjs.com/package/chaiwind')
  console.log('')
}

function printManualSetup() {
  console.log('')
  console.log('  [chaiwind] To enable VS Code autocomplete manually,')
  console.log('  add this to .vscode/settings.json:')
  console.log('')
  console.log('  {')
  console.log('    "css.customData": ["' + dataFilePath + '"]')
  console.log('  }')
  console.log('')
  console.log('  Then restart VS Code.')
  console.log('')
}

// ---------------------------------------------------------------------------
// step 1 — create .vscode folder if missing
// ---------------------------------------------------------------------------

if (!fs.existsSync(vscodeDir)) {
  try {
    fs.mkdirSync(vscodeDir)
  } catch (err) {
    console.warn('[chaiwind] Could not create .vscode folder:', err.message)
    printManualSetup()
    printUsage()
    process.exit(0)
  }
}

// ---------------------------------------------------------------------------
// step 2 — read existing settings or start fresh
// ---------------------------------------------------------------------------

var settings = {}

if (fs.existsSync(settingsFile)) {
  try {
    var raw = fs.readFileSync(settingsFile, 'utf8').trim()
    settings = raw.length > 0 ? JSON.parse(raw) : {}
  } catch (err) {
    // settings.json exists but is malformed — do not touch it
    console.warn('[chaiwind] Could not parse .vscode/settings.json:', err.message)
    console.warn('[chaiwind] File may be malformed. Skipping autocomplete setup.')
    printManualSetup()
    printUsage()
    process.exit(0)
  }
}

// ---------------------------------------------------------------------------
// step 3 — check if already configured
// ---------------------------------------------------------------------------

var existing = Array.isArray(settings['css.customData'])
  ? settings['css.customData']
  : []

if (existing.indexOf(dataFilePath) > -1) {
  console.log('')
  console.log('  [chaiwind] VS Code autocomplete already configured.')
  printUsage()
  process.exit(0)
}

// ---------------------------------------------------------------------------
// step 4 — add the entry and write back
// ---------------------------------------------------------------------------

settings['css.customData'] = existing.concat([dataFilePath])

try {
  fs.writeFileSync(settingsFile, JSON.stringify(settings, null, 2))
} catch (err) {
  console.warn('[chaiwind] Could not write .vscode/settings.json:', err.message)
  printManualSetup()
  printUsage()
  process.exit(0)
}

// ---------------------------------------------------------------------------
// done
// ---------------------------------------------------------------------------

console.log('')
console.log('  chaiwind installed successfully.')
console.log('')
console.log('  [✓] VS Code autocomplete configured.')
console.log('  [✓] Restart VS Code once to activate chai-* class suggestions.')
printUsage()