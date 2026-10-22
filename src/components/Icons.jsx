// =============================================================================
// Icons — one drawn icon system instead of Unicode glyphs and emoji.
//
//   <window.Icon name="mail" size={20} />        outline icon (Mac / Material / Carbon)
//   <window.PixelIcon name="folder" size={32} /> 16×16 pixel-art icon (Windows 95)
//
// Outline icons share a 24-unit grid, round joins on Mac/Material and square
// joins on Carbon, so the stroke reads as one family inside each skin.
// Pixel icons are authored as 16×16 character maps and rendered as crisp rects.
// =============================================================================

const ICON_PATHS = {
  home:         { d: "M3.5 11.5 12 4.5l8.5 7M5.5 10.3V20h13v-9.7M10 20v-5.5h4V20",
                  filled: "M12 3 2.5 11h2.8v9.5h5.2v-5.6h3v5.6h5.2V11h2.8z" },
  grid:         { d: "M4 4h6.5v6.5H4zM13.5 4H20v6.5h-6.5zM4 13.5h6.5V20H4zM13.5 13.5H20V20h-6.5z",
                  filled: "M3.5 3.5h7.3v7.3H3.5zM13.2 3.5h7.3v7.3h-7.3zM3.5 13.2h7.3v7.3H3.5zM13.2 13.2h7.3v7.3h-7.3z" },
  pen:          { d: "M4 20h4.2L19 9.2a2.2 2.2 0 0 0-3.1-3.1L5 16.9V20zM13.6 7.4l3 3",
                  filled: "M3 21v-4.3L14.4 5.3l4.3 4.3L7.3 21zm12.8-17.1 1.4-1.4a1.5 1.5 0 0 1 2.1 0l2.2 2.2a1.5 1.5 0 0 1 0 2.1l-1.4 1.4z" },
  image:        { d: "M4 5.5h16v13H4zM8.5 9.5h.01M20 15l-4.5-4.5L7 18",
                  filled: "M3.5 5h17v14h-17zM6 16.5h12l-4-5-3 3.5-2-2zM8.5 11a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" },
  user:         { d: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4.5 20.5a7.5 7.5 0 0 1 15 0",
                  filled: "M12 12.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9zM4 21a8 8 0 0 1 16 0z" },
  mail:         { d: "M3.5 5.5h17v13h-17zM3.5 7.5l8.5 6 8.5-6",
                  filled: "M3 5.5h18v2.1l-9 6.2-9-6.2zM3 9.9l9 6.2 9-6.2v8.6H3z" },
  chevronDown:  { d: "M6 9.5l6 6 6-6" },
  chevronLeft:  { d: "M15 5.5l-6.5 6.5L15 18.5" },
  chevronRight: { d: "M9 5.5l6.5 6.5L9 18.5" },
  arrowRight:   { d: "M4.5 12h15M13.5 6l6 6-6 6" },
  arrowLeft:    { d: "M19.5 12h-15M10.5 6l-6 6 6 6" },
  check:        { d: "M4.5 12.5l5 5 10-11" },
  close:        { d: "M6 6l12 12M18 6 6 18" },
  menu:         { d: "M4 7h16M4 12h16M4 17h16" },
  external:     { d: "M7 17 17 7M9.5 7H17v7.5" },
  play:         { d: "M8 5.5v13l10.5-6.5z", filled: "M8 5.5v13l10.5-6.5z" },
  monitor:      { d: "M3.5 5h17v11h-17zM9 20h6M12 16v4" },
  phone:        { d: "M7.5 3.5h9v17h-9zM11 18h2" },
  bulb:         { d: "M9.5 18.5h5M10.5 21h3M12 3.5a6 6 0 0 0-3.6 10.8c.8.6 1.1 1.3 1.1 2.2h5c0-.9.3-1.6 1.1-2.2A6 6 0 0 0 12 3.5z" },
  palette:      { d: "M12 3.5a8.5 8.5 0 1 0 0 17h1.2a2 2 0 0 0 1.3-3.5 1.6 1.6 0 0 1 1.2-2.7h1.5a3.3 3.3 0 0 0 3.3-3.3A7.5 7.5 0 0 0 12 3.5zM7.5 11.5h.01M10 7.5h.01M14.5 7.5h.01" },
  sparkle:      { d: "M12 3.5l1.8 5.2 5.2 1.8-5.2 1.8L12 17.5l-1.8-5.2L5 10.5l5.2-1.8zM19 17l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" },
  zoom:         { d: "M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM15.5 15.5 20 20M8 10.5h5M10.5 8v5" },
  sun:          { d: "M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" }
};

function Icon({ name, size = 20, filled = false, strokeWidth, style, className, skin: skinProp, title }) {
  let skin = skinProp;
  if (!skin) {
    try { skin = window.useSkin().skin; } catch (e) { skin = "mac"; }
  }
  const spec = ICON_PATHS[name];
  if (!spec) return null;
  const isCarbon = skin === "carbon";
  const sw = strokeWidth || (isCarbon ? 1.5 : 1.9);
  const useFill = filled && spec.filled;
  return (
    <svg
      width={size} height={size} viewBox="0 0 24 24"
      aria-hidden={title ? undefined : "true"}
      role={title ? "img" : undefined}
      focusable="false"
      className={className}
      style={{ display: "inline-block", flexShrink: 0, verticalAlign: "middle", ...style }}
      fill={useFill ? "currentColor" : "none"}
      stroke={useFill ? "none" : "currentColor"}
      strokeWidth={sw}
      strokeLinecap={isCarbon ? "square" : "round"}
      strokeLinejoin={isCarbon ? "miter" : "round"}
    >
      {title && <title>{title}</title>}
      <path d={useFill ? spec.filled : spec.d} />
    </svg>
  );
}

// ---- Windows 95 pixel icons --------------------------------------------
// 16×16 character maps. "." is transparent; every other char maps to a colour.
const PX = {
  k: "#000000", w: "#ffffff", g: "#c0c0c0", d: "#808080",
  y: "#ffff00", o: "#808000", b: "#000080", l: "#0000ff",
  c: "#55bbff", G: "#008000", r: "#ff0000", t: "#008080", p: "#ff00ff"
};

const PIXEL_ICONS = {
  folder: [
    "................",
    "................",
    "................",
    ".kkkkkk.........",
    "kyyyyyyk........",
    "kyyyyyyykkkkkkkk",
    "kyyyyyyyyyyyyyyk",
    "kyyyyyyyyyyyyyyk",
    "kyyyyyyyyyyyyyyk",
    "kyyyyyyyyyyyyyyk",
    "kyyyyyyyyyyyyyyk",
    "kyyyyyyyyyyyyyyk",
    "kyyyyyyyyyyyyyyk",
    "kooooooooooooook",
    ".kkkkkkkkkkkkkk.",
    "................"
  ],
  document: [
    "................",
    "..kkkkkkkkk.....",
    "..kwwwwwwwkk....",
    "..kwwwwwwwkwk...",
    "..kwwwwwwwkkkk..",
    "..kwwwwwwwwwwk..",
    "..kwdddddddwwk..",
    "..kwwwwwwwwwwk..",
    "..kwddddddwwwk..",
    "..kwwwwwwwwwwk..",
    "..kwdddddddwwk..",
    "..kwwwwwwwwwwk..",
    "..kwddddwwwwwk..",
    "..kwwwwwwwwwwk..",
    "..kkkkkkkkkkkk..",
    "................"
  ],
  picture: [
    "................",
    "kkkkkkkkkkkkkkkk",
    "kwwwwwwwwwwwwwwk",
    "kwccccccccccccwk",
    "kwccccccccyyccwk",
    "kwccccccccyyccwk",
    "kwccccccccccccwk",
    "kwccccGGccccccwk",
    "kwcccGGGGcccccwk",
    "kwccGGGGGGcccGwk",
    "kwcGGGGGGGGcGGwk",
    "kwGGGGGGGGGGGGwk",
    "kwwwwwwwwwwwwwwk",
    "kkkkkkkkkkkkkkkk",
    "................",
    "................"
  ],
  info: [
    "................",
    ".....kkkkkk.....",
    "...kkbbbbbbkk...",
    "..kbbbbbbbbbbk..",
    ".kbbbbbwwbbbbbk.",
    ".kbbbbbwwbbbbbk.",
    "kbbbbbbbbbbbbbbk",
    "kbbbbbwwwbbbbbbk",
    "kbbbbbbwwbbbbbbk",
    "kbbbbbbwwbbbbbbk",
    ".kbbbbbwwbbbbbk.",
    ".kbbbbwwwwbbbbk.",
    "..kbbbbbbbbbbk..",
    "...kkbbbbbbkk...",
    ".....kkkkkk.....",
    "................"
  ],
  mail: [
    "................",
    "................",
    "................",
    "kkkkkkkkkkkkkkkk",
    "kwwwwwwwwwwwwwwk",
    "kwkwwwwwwwwwwkwk",
    "kwwkwwwwwwwwkwwk",
    "kwwwkwwwwwwkwwwk",
    "kwwwwkwwwwkwwwwk",
    "kwwwwwkwwkwwwwwk",
    "kwwwwwwkkwwwwwwk",
    "kwwwwwwwwwwwwwwk",
    "kwwwwwwwwwwwwwwk",
    "kkkkkkkkkkkkkkkk",
    "................",
    "................"
  ],
  home: [
    "................",
    ".......kk.......",
    "......krrk......",
    ".....krrrrk.....",
    "....krrrrrrk....",
    "...krrrrrrrrk...",
    "..krrrrrrrrrrk..",
    ".kkkkkkkkkkkkkk.",
    "..kwwwwwwwwwwk..",
    "..kwkkkwwwkkwk..",
    "..kwkccwwwkokk..",
    "..kwkkkwwwkokk..",
    "..kwwwwwwwkokk..",
    "..kwwwwwwwkokk..",
    "..kkkkkkkkkkkk..",
    "................"
  ],
  speaker: [
    "................",
    "................",
    "........k.......",
    ".......kk...k...",
    "......kdk.k..k..",
    ".kkkkkkdk..k..k.",
    ".kddddddk.k.k.k.",
    ".kddddddk.k.k.k.",
    ".kddddddk.k.k.k.",
    ".kddddddk.k.k.k.",
    ".kkkkkkdk..k..k.",
    "......kdk.k..k..",
    ".......kk...k...",
    "........k.......",
    "................",
    "................"
  ],
  palette: [
    "................",
    "....kkkkkkkk....",
    "..kkwwwwwwwwkk..",
    ".kwwrrwwwwwwwwk.",
    ".kwrrrrwwwyywwk.",
    "kwwwrrwwwwyyywwk",
    "kwwwwwwwwwwyywwk",
    "kwwwwwwwwwwwwwwk",
    "kwllwwwwwwwkkkk.",
    "kwlllwwwwwwk....",
    ".kwllwwwwwwk....",
    ".kwwwwwwwwwk....",
    "..kkwwwGGwwk....",
    "....kkwGGwwk....",
    "......kkkkkk....",
    "................"
  ],
  flag: [
    "................",
    "..kk............",
    "..kkkkkkkkkkkk..",
    "..krrrrrkGGGGGk.",
    "..krrrrrkGGGGGk.",
    "..krrrrrkGGGGGk.",
    "..krrrrrkGGGGGk.",
    "..kkkkkkkkkkkkk.",
    "..klllllkyyyyyk.",
    "..klllllkyyyyyk.",
    "..klllllkyyyyyk.",
    "..klllllkyyyyyk.",
    "..kkkkkkkkkkkk..",
    "..kk............",
    "..kk............",
    "................"
  ]
};

// Merge horizontal runs into single rects so each icon is a few dozen nodes.
function pixelRects(rows) {
  const rects = [];
  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const ch = row[x];
      if (ch === "." || !PX[ch]) { x++; continue; }
      let w = 1;
      while (row[x + w] === ch) w++;
      rects.push({ x, y, w, fill: PX[ch] });
      x += w;
    }
  });
  return rects;
}

const PIXEL_CACHE = {};
function PixelIcon({ name, size = 16, style, className, title }) {
  const rows = PIXEL_ICONS[name];
  if (!rows) return null;
  if (!PIXEL_CACHE[name]) PIXEL_CACHE[name] = pixelRects(rows);
  return (
    <svg
      width={size} height={size} viewBox="0 0 16 16"
      shapeRendering="crispEdges"
      aria-hidden={title ? undefined : "true"}
      role={title ? "img" : undefined}
      focusable="false"
      className={className}
      style={{ display: "inline-block", flexShrink: 0, imageRendering: "pixelated", ...style }}
    >
      {title && <title>{title}</title>}
      {PIXEL_CACHE[name].map((r, i) => (
        <rect key={i} x={r.x} y={r.y} width={r.w} height={1} fill={r.fill} />
      ))}
    </svg>
  );
}

// Shared mapping from navigation ids to icon names — keeps every skin's nav
// on the same vocabulary.
const NAV_ICONS = {
  home: "home", projects: "grid", writing: "pen", gallery: "image", about: "user", contact: "mail"
};
const NAV_PIXEL_ICONS = {
  home: "home", projects: "folder", writing: "document", gallery: "picture", about: "info", contact: "mail"
};

Object.assign(window, { Icon, PixelIcon, NAV_ICONS, NAV_PIXEL_ICONS, ICON_PATHS });
