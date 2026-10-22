// =============================================================================
// Skin global styles — the parts of each world that inline styles cannot own:
// hover / press / focus feedback, text selection, scrollbars, route and
// arrival choreography, dropdown and lightbox motion, reduced-motion fallbacks.
//
// Scoped by the `data-skin` attribute SkinProvider sets on <html>.
// Motion vocabulary per skin:
//   mac       soft exponential ease-out, blur-to-sharp arrivals
//   win95     no easing at all — stepped, instant, authentic
//   material  Material 3 emphasized / standard curves, state layers, ripple
//   carbon    IBM productive motion: short, decisive, entrance/exit curves
// =============================================================================

const SKIN_GLOBAL_CSS = `
:root {
  --ds-accent: #0a84ff;
  --ds-focus: #0a84ff;
  --ds-sel-bg: rgba(10,132,255,0.28);
  --ds-sel-fg: inherit;
  --ds-ease: cubic-bezier(.2,.8,.2,1);
  --ds-ease-in: cubic-bezier(.4,0,1,1);
  --ds-route-anim: dsRouteMac 380ms cubic-bezier(.2,.8,.2,1) both;
}
:root[data-skin="mac"] {
  --ds-accent: #0a84ff; --ds-focus: #0a84ff;
  --ds-sel-bg: rgba(10,132,255,0.28);
  --ds-ease: cubic-bezier(.2,.8,.2,1);
  --ds-route-anim: dsRouteMac 380ms cubic-bezier(.2,.8,.2,1) both;
}
:root[data-skin="win95"] {
  --ds-accent: #000080; --ds-focus: #000000;
  --ds-sel-bg: #000080; --ds-sel-fg: #ffffff;
  --ds-ease: steps(1, end);
  --ds-route-anim: none;
}
:root[data-skin="material"] {
  --ds-accent: #6750a4; --ds-focus: #6750a4;
  --ds-sel-bg: #e8def8; --ds-sel-fg: #21005d;
  --ds-ease: cubic-bezier(0.2, 0, 0, 1);
  --ds-ease-in: cubic-bezier(0.3, 0, 0.8, 0.15);
  --ds-route-anim: dsRouteMaterial 340ms cubic-bezier(0.05, 0.7, 0.1, 1) both;
}
:root[data-skin="carbon"] {
  --ds-accent: #78a9ff; --ds-focus: #ffffff;
  --ds-sel-bg: #0f62fe; --ds-sel-fg: #ffffff;
  --ds-ease: cubic-bezier(0.2, 0, 0.38, 0.9);
  --ds-ease-in: cubic-bezier(0.2, 0, 1, 0.9);
  --ds-route-anim: dsRouteCarbon 200ms cubic-bezier(0, 0, 0.38, 0.9) both;
}

/* ---- Browser surfaces: selection, caret, focus, scrollbars ---------------- */
::selection { background: var(--ds-sel-bg); color: var(--ds-sel-fg); }
:root[data-skin="win95"] ::selection { text-shadow: none; }
body { caret-color: var(--ds-accent); }

:focus-visible { outline: 2px solid var(--ds-focus); outline-offset: 2px; border-radius: 6px; }
:root[data-skin="win95"] :focus-visible { outline: 1px dotted #000; outline-offset: -4px; border-radius: 0; }
:root[data-skin="carbon"] :focus-visible { outline: 2px solid #fff; outline-offset: -2px; border-radius: 0; }
:root[data-skin="material"] :focus-visible { outline-offset: 2px; border-radius: 999px; }

:root[data-skin="carbon"] { scrollbar-color: #525252 #161616; }
:root[data-skin="carbon"] ::-webkit-scrollbar { width: 12px; height: 12px; }
:root[data-skin="carbon"] ::-webkit-scrollbar-track { background: #161616; }
:root[data-skin="carbon"] ::-webkit-scrollbar-thumb { background: #525252; border: 3px solid #161616; }
:root[data-skin="carbon"] ::-webkit-scrollbar-thumb:hover { background: #6f6f6f; }

:root[data-skin="material"] { scrollbar-color: #cac4d0 transparent; scrollbar-width: thin; }
:root[data-skin="material"] ::-webkit-scrollbar { width: 10px; height: 10px; }
:root[data-skin="material"] ::-webkit-scrollbar-thumb { background: #cac4d0; border: 3px solid #fef7ff; border-radius: 999px; }
:root[data-skin="material"] ::-webkit-scrollbar-track { background: transparent; }

:root[data-skin="win95"] { scrollbar-color: #c0c0c0 #dfdfdf; }
:root[data-skin="win95"] ::-webkit-scrollbar { width: 16px; height: 16px; }
:root[data-skin="win95"] ::-webkit-scrollbar-track {
  background: #c0c0c0;
  background-image: repeating-conic-gradient(#ffffff 0 25%, #c0c0c0 0 50%);
  background-size: 2px 2px;
}
:root[data-skin="win95"] ::-webkit-scrollbar-thumb {
  background: #c0c0c0;
  box-shadow: inset 1px 1px 0 #ffffff, inset -1px -1px 0 #808080, inset 2px 2px 0 #dfdfdf, inset -2px -2px 0 #000000;
}
:root[data-skin="win95"] ::-webkit-scrollbar-button:single-button {
  background: #c0c0c0;
  box-shadow: inset 1px 1px 0 #ffffff, inset -1px -1px 0 #808080, inset 2px 2px 0 #dfdfdf, inset -2px -2px 0 #000000;
  height: 16px; width: 16px;
  background-repeat: no-repeat; background-position: center;
}
:root[data-skin="win95"] ::-webkit-scrollbar-button:single-button:vertical:decrement {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Cpath d='M4 10h8l-4-4z' fill='%23000'/%3E%3C/svg%3E");
}
:root[data-skin="win95"] ::-webkit-scrollbar-button:single-button:vertical:increment {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Cpath d='M4 6h8l-4 4z' fill='%23000'/%3E%3C/svg%3E");
}
:root[data-skin="win95"] ::-webkit-scrollbar-button:single-button:horizontal:decrement {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Cpath d='M10 4v8L6 8z' fill='%23000'/%3E%3C/svg%3E");
}
:root[data-skin="win95"] ::-webkit-scrollbar-button:single-button:horizontal:increment {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16'%3E%3Cpath d='M6 4v8l4-4z' fill='%23000'/%3E%3C/svg%3E");
}
:root[data-skin="win95"] ::-webkit-scrollbar-corner { background: #c0c0c0; }

/* ---- Images fade in once decoded (no pop-in) ------------------------------ */
.ds-img { transition: opacity 360ms ease; }
.ds-zoom { display: block; width: 100%; padding: 0; margin: 0; border: 0; background: transparent; cursor: zoom-in; font: inherit; color: inherit; line-height: 0; }
.ds-zoom:focus-visible { outline-offset: -3px; }

/* ---- Route transitions (per world) ---------------------------------------- */
.ds-route { animation: var(--ds-route-anim); }
@keyframes dsRouteMac {
  from { opacity: 0; transform: translateY(10px); filter: blur(6px); }
  to   { opacity: 1; transform: translateY(0);    filter: blur(0); }
}
@keyframes dsRouteMaterial {
  from { opacity: 0; transform: scale(0.96); }
  to   { opacity: 1; transform: scale(1); }
}
@keyframes dsRouteCarbon {
  from { opacity: 0; transform: translateY(-6px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ---- World switch: cross-document view transition ------------------------- */
::view-transition-old(root) { animation: dsVtOut 180ms cubic-bezier(.4,0,1,1) both; }
::view-transition-new(root) { animation: dsVtIn 280ms cubic-bezier(.2,.8,.2,1) both; }
:root[data-skin="win95"]::view-transition-old(root),
:root[data-skin="win95"]::view-transition-new(root) { animation: none; }
:root[data-skin="carbon"]::view-transition-old(root) { animation-duration: 110ms; }
:root[data-skin="carbon"]::view-transition-new(root) { animation-duration: 200ms; }
@keyframes dsVtOut { from { opacity: 1; } to { opacity: 0; } }
@keyframes dsVtIn  { from { opacity: 0; } to { opacity: 1; } }

/* ---- Arrivals: each world draws itself in its own way --------------------- */
/* Mac: menu bar drops, window rises from blur, dock slides up */
.mac-arrive-bar    { animation: macDrop 460ms cubic-bezier(.2,.8,.2,1) both; }
.mac-arrive-window { animation: macRise 560ms cubic-bezier(.2,.8,.2,1) 80ms both; }
.mac-arrive-dock   { animation: macDockUp 520ms cubic-bezier(.2,.8,.2,1) 200ms both; }
@keyframes macDrop   { from { opacity: 0; transform: translateY(-14px); } to { opacity: 1; transform: translateY(0); } }
@keyframes macRise   { from { opacity: 0; transform: translateY(26px) scale(0.985); filter: blur(10px); } to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); } }
@keyframes macDockUp { from { opacity: 0; transform: translate(-50%, 28px); } to { opacity: 1; transform: translate(-50%, 0); } }

/* Win95: the classic stepped zoom-rectangle, then the window simply exists */
.w95-arrive-window { position: relative; animation: w95Show 1ms steps(1, end) 200ms both; }
.w95-zoom {
  position: absolute; inset: 0; pointer-events: none; z-index: 5;
  outline: 2px dotted #000; outline-offset: -2px;
  transform-origin: 0% 100%;
  animation: w95Zoom 200ms steps(6, end) both, w95Gone 1ms linear 200ms forwards;
}
@keyframes w95Show { from { opacity: 0; } to { opacity: 1; } }
@keyframes w95Zoom { from { transform: scale(0.04); } to { transform: scale(1); } }
@keyframes w95Gone { to { opacity: 0; visibility: hidden; } }
.w95-arrive-icons { animation: w95Show 1ms steps(1, end) 60ms both; }
.w95-arrive-taskbar { animation: w95Show 1ms steps(1, end) 120ms both; }

/* Material: top bar settles, content grows in, FAB pops last */
.m3-arrive-bar     { animation: m3Drop 420ms cubic-bezier(0.05, 0.7, 0.1, 1) both; }
.m3-arrive-content { animation: m3Grow 520ms cubic-bezier(0.05, 0.7, 0.1, 1) 90ms both; }
.m3-arrive-fab     { animation: m3Pop 420ms cubic-bezier(0.05, 0.7, 0.1, 1) 360ms both; }
.m3-arrive-bottom  { animation: m3BottomUp 420ms cubic-bezier(0.05, 0.7, 0.1, 1) 240ms both; }
@keyframes m3Drop     { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
@keyframes m3Grow     { from { opacity: 0; transform: scale(0.94); } to { opacity: 1; transform: scale(1); } }
@keyframes m3Pop      { from { opacity: 0; transform: scale(0.4); } to { opacity: 1; transform: scale(1); } }
@keyframes m3BottomUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }

/* Carbon: header first, rail slides in, main fades — productive timing */
.cds-arrive-header { animation: cdsFade 160ms cubic-bezier(0, 0, 0.38, 0.9) both; }
.cds-arrive-side   { animation: cdsSlideIn 240ms cubic-bezier(0, 0, 0.38, 0.9) 70ms both; }
.cds-arrive-main   { animation: cdsFade 240ms cubic-bezier(0, 0, 0.38, 0.9) 140ms both; }
@keyframes cdsFade    { from { opacity: 0; } to { opacity: 1; } }
@keyframes cdsSlideIn { from { opacity: 0; transform: translateX(-16px); } to { opacity: 1; transform: translateX(0); } }

/* ---- Buttons ---------------------------------------------------------------- */
.ds-btn { transition: transform 160ms var(--ds-ease), box-shadow 200ms ease, filter 160ms ease, background 160ms ease, color 160ms ease; }
:root[data-skin="mac"] .ds-btn:hover { transform: translateY(-1px); }
:root[data-skin="mac"] .ds-btn-primary:hover { filter: brightness(1.06); box-shadow: 0 10px 24px rgba(10,132,255,0.28), 0 2px 6px rgba(15,23,42,0.08) !important; }
:root[data-skin="mac"] .ds-btn-ghost:hover { background: rgba(15,23,42,0.05) !important; }
:root[data-skin="mac"] .ds-btn:active { transform: scale(0.97); filter: brightness(0.96); }

:root[data-skin="material"] .ds-btn-primary:hover { box-shadow: 0 2px 6px rgba(103,80,164,0.3), 0 6px 18px rgba(103,80,164,0.25) !important; }
:root[data-skin="material"] .ds-btn:active { transform: scale(0.98); }

:root[data-skin="carbon"] .ds-btn { transition-duration: 110ms; }
:root[data-skin="carbon"] .ds-btn-primary:hover  { background: #0353e9 !important; }
:root[data-skin="carbon"] .ds-btn-primary:active { background: #002d9c !important; }
:root[data-skin="carbon"] .ds-btn-ghost:hover    { background: #353535 !important; }
:root[data-skin="carbon"] .ds-btn-ghost:active   { background: #4c4c4c !important; }

.w95-btn { transition: none; }
.w95-btn:active, .w95-btn[aria-pressed="true"] {
  box-shadow: inset 1px 1px 0 #000000, inset -1px -1px 0 #dfdfdf, inset 2px 2px 0 #808080, inset -2px -2px 0 #ffffff !important;
}
.w95-btn:active > * { transform: translate(1px, 1px); }

/* ---- Navigation links ----------------------------------------------------- */
.mac-nav-link { transition: background 160ms ease, color 160ms ease; }
.mac-nav-link:hover { background: rgba(15,23,42,0.07) !important; }
.mac-nav-link:active { background: rgba(15,23,42,0.11) !important; }

.cds-nav-link { transition: background 110ms cubic-bezier(0.2, 0, 0.38, 0.9), color 110ms cubic-bezier(0.2, 0, 0.38, 0.9), border-color 110ms; }
.cds-nav-link:hover { background: #353535 !important; color: #f4f4f4 !important; }
.cds-nav-link:active { background: #4c4c4c !important; }

.w95-menu-item:hover, .w95-menu-item:focus-visible { background: #000080; color: #ffffff; outline: none; }
.w95-link:hover { text-decoration: underline; }
.w95-desktop-icon { outline: none; }
.w95-desktop-icon .w95-icon-img { position: relative; }
.w95-desktop-icon:hover .w95-icon-img::after,
.w95-desktop-icon:focus-visible .w95-icon-img::after {
  content: ""; position: absolute; inset: 0;
  background: repeating-conic-gradient(#000080 0 25%, transparent 0 50%);
  background-size: 2px 2px;
}
.w95-desktop-icon:hover .w95-icon-label,
.w95-desktop-icon:focus-visible .w95-icon-label { background: #000080; outline: 1px dotted #ffffff; outline-offset: -1px; }
.w95-start-item:hover, .w95-start-item:focus-visible { background: #000080; color: #ffffff !important; outline: none; }

/* ---- Material state layer + ripple --------------------------------------- */
.m3-state { position: relative; overflow: hidden; isolation: isolate; -webkit-tap-highlight-color: transparent; }
.m3-state::before {
  content: ""; position: absolute; inset: 0; border-radius: inherit;
  background: currentColor; opacity: 0; pointer-events: none;
  transition: opacity 150ms cubic-bezier(0.2, 0, 0, 1);
}
.m3-state:hover::before { opacity: 0.08; }
.m3-state:focus-visible::before { opacity: 0.12; }
.m3-state:active::before { opacity: 0.12; }
.m3-ripple {
  position: absolute; border-radius: 50%; pointer-events: none;
  background: currentColor; opacity: 0.14; transform: scale(0);
  animation: m3Ripple 560ms cubic-bezier(0.2, 0, 0, 1) forwards;
}
@keyframes m3Ripple { to { transform: scale(1); opacity: 0; } }

/* ---- Project cards -------------------------------------------------------- */
.ds-card { transition: transform 260ms var(--ds-ease), box-shadow 260ms ease, background 180ms ease, border-color 180ms ease; }
.ds-card .ds-card-img { transition: transform 480ms cubic-bezier(.2,.8,.2,1), opacity 360ms ease; }
:root[data-skin="mac"] .ds-card:hover, :root[data-skin="mac"] .ds-card:focus-visible { transform: translateY(-4px); box-shadow: 0 22px 44px rgba(15,23,42,0.16), 0 4px 10px rgba(15,23,42,0.06) !important; }
:root[data-skin="mac"] .ds-card:hover .ds-card-img, :root[data-skin="mac"] .ds-card:focus-visible .ds-card-img { transform: scale(1.04); }
:root[data-skin="material"] .ds-card:hover, :root[data-skin="material"] .ds-card:focus-visible { transform: translateY(-3px); box-shadow: 0 12px 28px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.06) !important; }
:root[data-skin="material"] .ds-card:hover .ds-card-img, :root[data-skin="material"] .ds-card:focus-visible .ds-card-img { transform: scale(1.04); }
:root[data-skin="carbon"] .ds-card { transition-duration: 110ms; }
:root[data-skin="carbon"] .ds-card:hover, :root[data-skin="carbon"] .ds-card:focus-visible { background: #393939 !important; border-left-color: var(--card-accent) !important; }
:root[data-skin="carbon"] .ds-card:hover .ds-card-img, :root[data-skin="carbon"] .ds-card:focus-visible .ds-card-img { transform: scale(1.03); }
:root[data-skin="win95"] .w95-card:hover .w95-card-title, :root[data-skin="win95"] .w95-card:focus-visible .w95-card-title { background: linear-gradient(90deg, #000080 0%, #1084d0 100%) !important; }

/* ---- Tiles (related projects, contact links, link chips, gallery tiles) --- */
.ds-tile { transition: transform 220ms var(--ds-ease), box-shadow 220ms ease, background 160ms ease, border-color 160ms ease, color 160ms ease; }
:root[data-skin="mac"] .ds-tile:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(15,23,42,0.12); background: rgba(255,255,255,0.9) !important; }
:root[data-skin="material"] .ds-tile:hover { box-shadow: 0 6px 18px rgba(0,0,0,0.1); border-color: rgba(103,80,164,0.4) !important; }
:root[data-skin="carbon"] .ds-tile { transition-duration: 110ms; }
:root[data-skin="carbon"] .ds-tile:hover { background: #393939 !important; }
:root[data-skin="win95"] .ds-tile:hover .ds-tile-title { text-decoration: underline; }

/* ---- Filter chips ---------------------------------------------------------- */
.ds-chip { transition: background 140ms ease, color 140ms ease, border-color 140ms ease, transform 140ms var(--ds-ease); }
:root:not([data-skin="win95"]) .ds-chip[aria-selected="false"]:hover,
:root:not([data-skin="win95"]) .ds-chip[aria-pressed="false"]:hover { border-color: var(--ds-accent) !important; color: var(--ds-accent) !important; }
:root[data-skin="carbon"] .ds-chip[aria-selected="false"]:hover, :root[data-skin="carbon"] .ds-chip[aria-pressed="false"]:hover { background: #353535 !important; }
:root[data-skin="mac"] .ds-chip:active, :root[data-skin="material"] .ds-chip:active { transform: scale(0.97); }

/* ---- Gallery thumbnails --------------------------------------------------- */
.ds-thumb { transition: transform 220ms var(--ds-ease), box-shadow 220ms ease, outline-color 120ms; }
.ds-thumb .ds-thumb-cap { transition: opacity 180ms ease, transform 220ms var(--ds-ease); transform: translateY(4px); }
.ds-thumb:hover .ds-thumb-cap, .ds-thumb:focus-visible .ds-thumb-cap { opacity: 1 !important; transform: translateY(0); }
:root[data-skin="mac"] .ds-thumb:hover, :root[data-skin="material"] .ds-thumb:hover { transform: translateY(-2px) scale(1.01); box-shadow: 0 12px 28px rgba(0,0,0,0.18) !important; }
:root[data-skin="carbon"] .ds-thumb:hover { box-shadow: inset 0 0 0 1px #78a9ff !important; }

/* ---- Dropdown popovers ------------------------------------------------------ */
.ds-pop { transform-origin: top right; animation: dsPopIn 180ms var(--ds-ease) both; }
:root[data-skin="win95"] .ds-pop { animation: none; }
:root[data-skin="carbon"] .ds-pop { animation-duration: 110ms; }
@keyframes dsPopIn { from { opacity: 0; transform: translateY(-4px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
.ds-opt { transition: background 120ms ease; }
:root:not([data-skin="win95"]) .ds-opt:hover { background: color-mix(in srgb, var(--ds-accent) 12%, transparent) !important; }
.w95-pop { animation: none; }

/* ---- Lightbox ------------------------------------------------------------ */
.ds-lb { animation: dsLbIn 200ms ease both; }
.ds-lb-img { animation: dsLbImg 320ms cubic-bezier(.2,.8,.2,1) both; }
.ds-lb-btn { transition: background 140ms ease, transform 140ms var(--ds-ease); }
.ds-lb-btn:hover { background: rgba(255,255,255,0.24) !important; }
.ds-lb-btn:active { transform: scale(0.94); }
:root[data-skin="win95"] .ds-lb, :root[data-skin="win95"] .ds-lb-img { animation: none; }
@keyframes dsLbIn  { from { opacity: 0; } to { opacity: 1; } }
@keyframes dsLbImg { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }

/* ---- Skin picker (entry screen) ------------------------------------------- */
.ds-choice { transition: transform 200ms cubic-bezier(.2,.8,.2,1), box-shadow 200ms ease, background 140ms ease, border-color 140ms ease; }
.ds-choice:hover, .ds-choice:focus-visible { transform: translateY(-2px); box-shadow: 0 14px 34px rgba(15,23,42,0.13), 0 2px 6px rgba(15,23,42,0.05) !important; border-color: rgba(15,23,42,0.18) !important; }
.ds-choice:active { transform: scale(0.985); }
.ds-choice .ds-choice-preview { transition: transform 260ms cubic-bezier(.2,.8,.2,1), filter 260ms ease, opacity 200ms ease; filter: saturate(0.6); opacity: 0.82; }
.ds-choice:hover .ds-choice-preview, .ds-choice:focus-visible .ds-choice-preview { transform: scale(1.08) rotate(-1.5deg); filter: saturate(1); opacity: 1; }
.ds-choice .ds-choice-arrow { transition: transform 200ms cubic-bezier(.2,.8,.2,1), color 160ms ease; }
.ds-choice:hover .ds-choice-arrow, .ds-choice:focus-visible .ds-choice-arrow { transform: translateX(4px); color: #1c1c1e !important; }

/* ---- Text links ------------------------------------------------------------ */
.ds-link { transition: color 140ms ease, text-decoration-color 140ms ease; text-decoration: none; text-underline-offset: 3px; text-decoration-color: transparent; }
.ds-link:hover { text-decoration: underline; text-decoration-color: currentColor; }

/* ---- Reduced motion: keep opacity and colour, drop spatial movement ------- */
@media (prefers-reduced-motion: reduce) {
  .ds-route, .mac-arrive-bar, .mac-arrive-window, .mac-arrive-dock,
  .w95-arrive-window, .w95-zoom, .w95-arrive-icons, .w95-arrive-taskbar,
  .m3-arrive-bar, .m3-arrive-content, .m3-arrive-fab, .m3-arrive-bottom,
  .cds-arrive-header, .cds-arrive-side, .cds-arrive-main,
  .ds-pop, .ds-lb, .ds-lb-img, .m3-ripple { animation: none !important; }
  .w95-zoom { display: none; }
  ::view-transition-old(root), ::view-transition-new(root) { animation-duration: 0.001ms !important; }
  .ds-btn, .ds-card, .ds-card-img, .ds-tile, .ds-thumb, .ds-chip, .ds-choice, .ds-choice-preview, .ds-choice-arrow, .ds-lb-btn, .ds-thumb-cap {
    transition-property: background, color, border-color, box-shadow, opacity, outline-color !important;
  }
  .ds-btn:hover, .ds-btn:active, .ds-card:hover, .ds-card:focus-visible, .ds-card:hover .ds-card-img, .ds-card:focus-visible .ds-card-img,
  .ds-tile:hover, .ds-thumb:hover, .ds-chip:active, .ds-choice:hover, .ds-choice:focus-visible, .ds-choice:active,
  .ds-choice:hover .ds-choice-preview, .ds-choice:focus-visible .ds-choice-preview, .ds-choice:hover .ds-choice-arrow, .ds-lb-btn:active { transform: none !important; }
  .ds-thumb .ds-thumb-cap { transform: none; }
}
`;

function SkinGlobalStyles() {
  return <style id="ds-skin-global">{SKIN_GLOBAL_CSS}</style>;
}

// Material ripple: call from onPointerDown on any `.m3-state` element.
function m3Ripple(e) {
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  } catch (err) { /* ignore */ }
  const el = e.currentTarget;
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const size = Math.ceil(Math.max(rect.width, rect.height) * 2.2);
  const span = document.createElement("span");
  span.className = "m3-ripple";
  span.style.width = span.style.height = size + "px";
  span.style.left = (e.clientX - rect.left - size / 2) + "px";
  span.style.top  = (e.clientY - rect.top  - size / 2) + "px";
  span.addEventListener("animationend", () => span.remove());
  el.appendChild(span);
}

Object.assign(window, { SkinGlobalStyles, m3Ripple, SKIN_GLOBAL_CSS });
