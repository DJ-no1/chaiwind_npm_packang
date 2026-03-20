(function () {

  // ---------------------------------------------------------------------------
  // tokens
  // ---------------------------------------------------------------------------

  var colors = {
    // chaicode brand
    'chaicode':      '#f97316',
    'chaicode-dark': '#1a1a2e',

    // hitesh sir
    'chai':    '#c8843a',
    'adrak':   '#d4a056',
    'masala':  '#8b4513',
    'kulhad':  '#b5651d',

    // piyush sir
    'piyush':      '#ec4899',
    'piyush-dark': '#be185d',

    // akash sir
    'midnight':  '#1d1d1f',
    'silver':    '#e8e8ed',

    // general
    'white': '#ffffff',
    'black': '#000000',
    'gray':  '#6b7280',
    'red':   '#ef4444',
    'green': '#22c55e',
    'blue':  '#3b82f6',
  }

  var spacing = {
    '0':  '0px',
    '1':  '4px',
    '2':  '8px',
    '3':  '12px',
    '4':  '16px',
    '6':  '24px',
    '8':  '32px',
    '10': '40px',
    '12': '48px',
  }

  var fontSizes = {
    'xs':   '12px',
    'sm':   '14px',
    'base': '16px',
    'lg':   '20px',
    'xl':   '24px',
    '2xl':  '32px',
  }

  var radii = {
    'none': '0px',
    'sm':   '4px',
    'md':   '8px',
    'lg':   '12px',
    'full': '9999px',
  }

  // ---------------------------------------------------------------------------
  // prefix map
  //
  // each entry: prefix -> { map: tokenMap, props: [cssProp, ...] }
  // multi-value props e.g. px- sets both paddingLeft and paddingRight
  //
  // FIX: stored as array of pairs (not object) so order is guaranteed
  // FIX: sorted longest-first so px- is checked before p-, mx- before m- etc.
  // ---------------------------------------------------------------------------

  var prefixEntries = [
    ['px-',       { map: spacing,   props: ['paddingLeft', 'paddingRight'] }],
    ['py-',       { map: spacing,   props: ['paddingTop', 'paddingBottom'] }],
    ['pt-',       { map: spacing,   props: ['paddingTop'] }],
    ['pb-',       { map: spacing,   props: ['paddingBottom'] }],
    ['pl-',       { map: spacing,   props: ['paddingLeft'] }],
    ['pr-',       { map: spacing,   props: ['paddingRight'] }],
    ['p-',        { map: spacing,   props: ['padding'] }],
    ['mx-',       { map: spacing,   props: ['marginLeft', 'marginRight'] }],
    ['my-',       { map: spacing,   props: ['marginTop', 'marginBottom'] }],
    ['mt-',       { map: spacing,   props: ['marginTop'] }],
    ['mb-',       { map: spacing,   props: ['marginBottom'] }],
    ['ml-',       { map: spacing,   props: ['marginLeft'] }],
    ['mr-',       { map: spacing,   props: ['marginRight'] }],
    ['m-',        { map: spacing,   props: ['margin'] }],
    ['gap-',      { map: spacing,   props: ['gap'] }],
    ['w-',        { map: spacing,   props: ['width'] }],
    ['h-',        { map: spacing,   props: ['height'] }],
    ['bg-',       { map: colors,    props: ['backgroundColor'] }],
    ['text-',     { map: colors,    props: ['color'] }],
    ['border-',   { map: colors,    props: ['borderColor'] }],
    ['fs-',       { map: fontSizes, props: ['fontSize'] }],
    ['rounded-',  { map: radii,     props: ['borderRadius'] }],
  ]

  // ---------------------------------------------------------------------------
  // statics map
  //
  // exact-match classes that do not follow the prefix+token pattern
  // one object lookup replaces 40+ individual if blocks
  // ---------------------------------------------------------------------------

  var statics = {
    // display
    'block':         { display: 'block' },
    'inline':        { display: 'inline' },
    'inline-block':  { display: 'inline-block' },
    'flex':          { display: 'flex' },
    'grid':          { display: 'grid' },
    'hidden':        { display: 'none' },

    // flexbox
    'flex-row':        { flexDirection: 'row' },
    'flex-col':        { flexDirection: 'column' },
    'flex-wrap':       { flexWrap: 'wrap' },
    'flex-1':          { flex: '1 1 0%' },
    'items-start':     { alignItems: 'flex-start' },
    'items-center':    { alignItems: 'center' },
    'items-end':       { alignItems: 'flex-end' },
    'justify-start':   { justifyContent: 'flex-start' },
    'justify-center':  { justifyContent: 'center' },
    'justify-end':     { justifyContent: 'flex-end' },
    'justify-between': { justifyContent: 'space-between' },

    // sizing
    'w-full':   { width: '100%' },
    'w-screen': { width: '100vw' },
    'w-auto':   { width: 'auto' },
    'h-full':   { height: '100%' },
    'h-screen': { height: '100vh' },
    'h-auto':   { height: 'auto' },

    // position
    'relative': { position: 'relative' },
    'absolute': { position: 'absolute' },
    'fixed':    { position: 'fixed' },
    'sticky':   { position: 'sticky', top: '0' },

    // text
    'text-left':    { textAlign: 'left' },
    'text-center':  { textAlign: 'center' },
    'text-right':   { textAlign: 'right' },
    'font-normal':  { fontWeight: '400' },
    'font-medium':  { fontWeight: '500' },
    'font-semibold':{ fontWeight: '600' },
    'font-bold':    { fontWeight: '700' },
    'uppercase':    { textTransform: 'uppercase' },
    'lowercase':    { textTransform: 'lowercase' },
    'capitalize':   { textTransform: 'capitalize' },
    'italic':       { fontStyle: 'italic' },
    'underline':    { textDecoration: 'underline' },
    'no-underline': { textDecoration: 'none' },
    'truncate':     { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },

    // border
    'border':        { border: '1px solid currentColor' },
    'border-2':      { border: '2px solid currentColor' },
    'border-none':   { border: 'none' },
    'border-dashed': { borderStyle: 'dashed' },

    // overflow
    'overflow-hidden': { overflow: 'hidden' },
    'overflow-auto':   { overflow: 'auto' },

    // cursor
    'cursor-pointer':     { cursor: 'pointer' },
    'cursor-not-allowed': { cursor: 'not-allowed' },

    // misc
    'select-none':  { userSelect: 'none' },
    'box-border':   { boxSizing: 'border-box' },
    'opacity-0':    { opacity: '0' },
    'opacity-50':   { opacity: '0.5' },
    'opacity-100':  { opacity: '1' },
  }

  // ---------------------------------------------------------------------------
  // parse(raw)
  //
  // raw = class suffix after stripping 'chai-'
  // returns a style object or null
  //
  // order of checks:
  //   1. statics exact match  (O1 hash lookup)
  //   2. prefix entries       (guaranteed longest-first — no partial match bug)
  // ---------------------------------------------------------------------------

  function parse(raw) {
    // 1. exact match
    if (statics[raw]) return statics[raw]

    // 2. prefix match — array order is longest-first, so px- beats p-
    for (var i = 0; i < prefixEntries.length; i++) {
      var prefix = prefixEntries[i][0]
      var entry  = prefixEntries[i][1]

      if (raw.indexOf(prefix) !== 0) continue

      var token = raw.slice(prefix.length)
      var value = entry.map[token]

      if (!value) continue

      var style = {}
      for (var j = 0; j < entry.props.length; j++) {
        style[entry.props[j]] = value
      }
      return style
    }

    return null
  }

  // ---------------------------------------------------------------------------
  // hasChai(el)
  //
  // FIX: early exit check — called before any processing
  // avoids running parse() on elements that have no chai- classes at all
  // critical for MutationObserver performance in JS-heavy apps
  // ---------------------------------------------------------------------------

  function hasChai(el) {
    if (!el || !el.classList) return false
    var list = el.classList
    for (var i = 0; i < list.length; i++) {
      if (list[i].indexOf('chai-') === 0) return true
    }
    return false
  }

  // ---------------------------------------------------------------------------
  // apply(el)
  //
  // runs parse() on each chai-* class of one element
  // applies inline styles and removes the processed class
  //
  // FIX: nodeType check — skips text nodes and comment nodes
  // FIX: stores processed classes in data-chaiwind attr before removing
  //      so other scripts can still read what was applied
  // ---------------------------------------------------------------------------

  function apply(el) {
    if (!el || el.nodeType !== 1) return
    if (!hasChai(el)) return

    var applied = []
    var toRemove = []
    var classes = Array.from(el.classList)

    for (var i = 0; i < classes.length; i++) {
      var cls = classes[i]
      if (cls.indexOf('chai-') !== 0) continue

      var styles = parse(cls.slice(5))
      if (!styles) continue

      Object.assign(el.style, styles)
      applied.push(cls)
      toRemove.push(cls)
    }

    // record what was applied before removing (FIX: class removed permanently)
    if (applied.length) {
      el.setAttribute('data-chaiwind', applied.join(' '))
    }

    for (var k = 0; k < toRemove.length; k++) {
      el.classList.remove(toRemove[k])
    }
  }

  // ---------------------------------------------------------------------------
  // scan()
  //
  // runs apply() on every element in the DOM at call time
  // ---------------------------------------------------------------------------

  function scan() {
    var elements = document.querySelectorAll('[class]')
    for (var i = 0; i < elements.length; i++) {
      apply(elements[i])
    }
  }

  // ---------------------------------------------------------------------------
  // watch()
  //
  // observes DOM for elements added after initial load
  //
  // FIX: hasChai() called first on every added node — skips nodes with no
  //      chai- classes immediately, near-zero cost in React/Vue apps
  // FIX: nodeType check inside apply() handles text/comment nodes safely
  // ---------------------------------------------------------------------------

  function watch() {
    var observer = new MutationObserver(function (mutations) {
      for (var i = 0; i < mutations.length; i++) {
        var added = mutations[i].addedNodes
        for (var j = 0; j < added.length; j++) {
          var node = added[j]

          // apply to the node itself
          apply(node)

          // apply to any children inside it
          if (node.querySelectorAll) {
            var children = node.querySelectorAll('[class]')
            for (var k = 0; k < children.length; k++) {
              apply(children[k])
            }
          }
        }
      }
    })

    observer.observe(document.body, { childList: true, subtree: true })
  }

  // ---------------------------------------------------------------------------
  // init
  //
  // FIX: readyState check handles script in <head> vs end of <body>
  // recommendation: place script at bottom of <body> to avoid timing edge cases
  // ---------------------------------------------------------------------------

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      scan()
      watch()
    })
  } else {
    scan()
    watch()
  }

})()