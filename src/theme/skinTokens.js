// =============================================================================
// Skin tokens — colors, type, spacing, radii for each skin
// Exposed via window.skinTokens[skinId]
// =============================================================================

window.skinTokens = {
  mac: {
    name: "Mac / iOS",
    font: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", system-ui, sans-serif',
    monoFont: '"SF Mono", ui-monospace, Menlo, monospace',
    bg: "linear-gradient(135deg, #f3f1ef 0%, #e8e4f2 35%, #d9e6f2 70%, #e9e7e2 100%)",
    surface: "rgba(255,255,255,0.62)",
    surfaceSolid: "#fbfaf9",
    border: "rgba(15, 23, 42, 0.12)",
    text: "#1c1c1e",
    muted: "#6c6c70",
    accent: "#0a84ff",
    accent2: "#bf5af2",
    radius: "14px",
    radiusLg: "20px",
    shadow: "0 10px 30px rgba(15, 23, 42, 0.12), 0 2px 8px rgba(15, 23, 42, 0.06)",
    blur: "saturate(180%) blur(24px)"
  },
  win95: {
    name: "Windows 95",
    font: '"Tahoma", "MS Sans Serif", "Microsoft Sans Serif", "Geneva", sans-serif',
    monoFont: '"Courier New", "Courier", monospace',
    bg: "#008080",
    surface: "#c0c0c0",
    surfaceSolid: "#c0c0c0",
    surfaceAlt: "#ffffff",
    border: "#000000",
    bevelLight: "#ffffff",
    bevelDark: "#808080",
    bevelDarker: "#000000",
    text: "#000000",
    muted: "#404040",
    accent: "#000080",
    accent2: "#008080",
    radius: "0px",
    radiusLg: "0px",
    shadow: "none"
  },
  material: {
    name: "Material You",
    font: '"Google Sans Text", "Roboto", "Inter", system-ui, sans-serif',
    displayFont: '"Google Sans", "Roboto", "Inter", system-ui, sans-serif',
    monoFont: '"Roboto Mono", ui-monospace, monospace',
    bg: "#fef7ff",
    surface: "#ffffff",
    surfaceSolid: "#ffffff",
    surfaceAlt: "#f7f2fa",
    border: "rgba(28, 27, 31, 0.12)",
    text: "#1d1b20",
    muted: "#49454f",
    accent: "#6750a4",
    accent2: "#7d5260",
    accent3: "#006a6a",
    radius: "16px",
    radiusLg: "28px",
    shadow: "0 1px 3px rgba(0,0,0,0.08), 0 6px 16px rgba(0,0,0,0.06)"
  },
  carbon: {
    name: "IBM Carbon",
    font: '"IBM Plex Sans", "Inter", system-ui, sans-serif',
    monoFont: '"IBM Plex Mono", ui-monospace, monospace',
    bg: "#161616",
    surface: "#262626",
    surfaceSolid: "#262626",
    surfaceAlt: "#393939",
    border: "#525252",
    text: "#f4f4f4",
    muted: "#c6c6c6",
    accent: "#78a9ff",
    accent2: "#42be65",
    danger: "#fa4d56",
    radius: "0px",
    radiusLg: "0px",
    shadow: "none"
  }
};

window.skinTokens.get = function (id) {
  return window.skinTokens[id] || window.skinTokens.mac;
};
