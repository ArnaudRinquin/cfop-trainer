// Shared rendering helpers (tagged template + simple HTML escaping).

export function esc(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Tagged template that escapes interpolated values. Use html`<div>${userInput}</div>`.
// Arrays are joined; objects with __html are inserted as raw HTML (used for nested templates).
export function html(strings, ...values) {
  let out = '';
  strings.forEach((s, i) => {
    out += s;
    if (i < values.length) {
      const v = values[i];
      if (v == null || v === false) {
        // skip
      } else if (Array.isArray(v)) {
        out += v
          .map((x) => (x && typeof x === 'object' && '__html' in x ? x.__html : esc(x)))
          .join('');
      } else if (typeof v === 'object' && '__html' in v) {
        out += v.__html;
      } else {
        out += esc(v);
      }
    }
  });
  return { __html: out };
}

// Mount an html template to a target element.
export function mount(target, tpl) {
  target.innerHTML = tpl.__html;
}

// Returns an object that html() will treat as raw HTML (no escaping).
export function raw(s) {
  return { __html: s };
}

// Render a top-layer sticker grid (3x3) used by algorithm cards.
// `face` is an array of arrays of color letters (W,Y,R,O,B,G,X)
export function renderFace(face) {
  return raw(
    `<div class="face-grid w-24 h-24">${face
      .flatMap((row) =>
        row.map((c) => `<div class="cube-cell cube-${esc(c)}"></div>`)
      )
      .join('')}</div>`
  );
}
