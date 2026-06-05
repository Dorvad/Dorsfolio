// =============================================================================
// Skin switcher — global control to swap skins from anywhere
// Renders with an authentic look per skin (Win95 has its own combo-box path).
// =============================================================================

function SkinSwitcher({ position = "top-right", inline = false }) {
  const { skin, setSkin } = window.useSkin();
  const tokens = window.skinTokens.get(skin);
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef(null);

  const skins = window.portfolioInfo.skins;
  const current = skins.find((s) => s.id === skin) || skins[0];

  const posStyle = inline ? { position: "relative" } : {
    position: "fixed",
    zIndex: 9000,
    top: position.includes("top") ? "12px" : "auto",
    bottom: position.includes("bottom") ? "12px" : "auto",
    right: position.includes("right") ? "12px" : "auto",
    left: position.includes("left") ? "12px" : "auto",
  };

  React.useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("mousedown", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const pick = (id) => { setSkin(id); setOpen(false); };

  if (skin === "win95") {
    return (
      <Win95SkinSwitcher
        rootRef={rootRef}
        posStyle={posStyle}
        open={open}
        setOpen={setOpen}
        skins={skins}
        current={current}
        pick={pick}
      />
    );
  }

  return (
    <div data-skin-switcher ref={rootRef} style={posStyle}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Current interface: ${current.name}. Click to change.`}
        onClick={() => setOpen((v) => !v)}
        style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          padding: "8px 14px",
          fontFamily: tokens.font,
          fontSize: "13px",
          color: tokens.text,
          background: tokens.surface || tokens.surfaceSolid,
          backdropFilter: skin === "mac" ? tokens.blur : "none",
          WebkitBackdropFilter: skin === "mac" ? tokens.blur : "none",
          border: `1px solid ${tokens.border}`,
          boxShadow: tokens.shadow,
          borderRadius: tokens.radius === "0px" ? 0 : "999px",
          cursor: "pointer"
        }}
      >
        <SkinDot id={current.id} />
        <span>{current.name}</span>
        <span aria-hidden="true" style={{ opacity: 0.6, fontSize: "10px" }}>▾</span>
      </button>

      {open && (
        <div
          role="listbox"
          style={{
            position: "absolute",
            top: position.includes("top") ? "calc(100% + 8px)" : "auto",
            bottom: position.includes("bottom") ? "calc(100% + 8px)" : "auto",
            right: position.includes("right") ? 0 : "auto",
            left: position.includes("left") ? 0 : "auto",
            width: "260px",
            background: tokens.surface || tokens.surfaceSolid,
            backdropFilter: skin === "mac" ? tokens.blur : "none",
            WebkitBackdropFilter: skin === "mac" ? tokens.blur : "none",
            border: `1px solid ${tokens.border}`,
            boxShadow: tokens.shadow,
            borderRadius: tokens.radius,
            padding: "6px",
            zIndex: 9001
          }}
        >
          {skins.map((s) => (
            <button
              key={s.id}
              role="option"
              aria-selected={s.id === skin}
              type="button"
              onClick={() => pick(s.id)}
              style={{
                display: "grid",
                gridTemplateColumns: "24px 1fr auto",
                gap: "10px",
                alignItems: "center",
                width: "100%",
                padding: "10px 12px",
                background: s.id === skin ? `${tokens.accent}1a` : "transparent",
                border: "none",
                borderRadius: tokens.radius === "0px" ? 0 : "8px",
                textAlign: "left",
                cursor: "pointer",
                color: tokens.text,
                fontFamily: tokens.font
              }}
            >
              <SkinDot id={s.id} />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: "14px", fontWeight: 600 }}>{s.name}</div>
                <div style={{ fontSize: "12px", color: tokens.muted, marginTop: "2px", overflow: "hidden", textOverflow: "ellipsis" }}>{s.tagline}</div>
              </div>
              {s.id === skin && <span style={{ color: tokens.accent, fontSize: "14px" }}>✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ---- Win95-specific switcher (looks like a real Win95 combo box) ----------
function Win95SkinSwitcher({ rootRef, posStyle, open, setOpen, skins, current, pick }) {
  const [hoverIdx, setHoverIdx] = React.useState(-1);
  const bevelRaised   = "inset 1px 1px 0 #ffffff, inset -1px -1px 0 #808080, inset 2px 2px 0 #dfdfdf, inset -2px -2px 0 #000000";
  const bevelInset    = "inset 1px 1px 0 #808080, inset -1px -1px 0 #ffffff, inset 2px 2px 0 #000000, inset -2px -2px 0 #dfdfdf";

  return (
    <div data-skin-switcher ref={rootRef} style={{ ...posStyle, display: "inline-flex" }}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Current interface: ${current.name}. Click to change.`}
        onClick={() => setOpen((v) => !v)}
        style={{
          display: "inline-flex", alignItems: "stretch",
          padding: 0,
          background: "transparent",
          border: "none",
          cursor: "pointer",
          fontFamily: '"MS Sans Serif", Tahoma, sans-serif',
          fontSize: "12px",
          color: "#000"
        }}
      >
        {/* "Field" portion — looks like a white inset input */}
        <span style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          padding: "3px 8px 3px 6px",
          background: "#ffffff",
          boxShadow: bevelInset,
          minWidth: "140px",
          height: "22px",
          lineHeight: 1
        }}>
          <SkinDot id={current.id} size={14} />
          <span style={{ flex: 1, textAlign: "left" }}>{current.name}</span>
        </span>
        {/* Arrow button — raised */}
        <span aria-hidden="true" style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          width: "18px", height: "22px",
          background: "#c0c0c0",
          boxShadow: open ? bevelInset : bevelRaised,
          fontSize: "9px",
          color: "#000"
        }}>▼</span>
      </button>

      {open && (
        <div
          role="listbox"
          style={{
            position: "absolute",
            top: "100%", right: 0,
            marginTop: "1px",
            width: "260px",
            background: "#c0c0c0",
            boxShadow: bevelRaised,
            padding: "2px",
            zIndex: 9001,
            fontFamily: '"MS Sans Serif", Tahoma, sans-serif'
          }}
        >
          {skins.map((s, i) => {
            const active = s.id === current.id;
            const hovered = hoverIdx === i;
            return (
              <button
                key={s.id}
                role="option"
                aria-selected={active}
                type="button"
                onClick={() => pick(s.id)}
                onMouseEnter={() => setHoverIdx(i)}
                onMouseLeave={() => setHoverIdx(-1)}
                style={{
                  display: "grid",
                  gridTemplateColumns: "20px 1fr auto",
                  gap: "8px", alignItems: "center",
                  width: "100%",
                  padding: "5px 8px",
                  background: hovered ? "#000080" : "transparent",
                  color: hovered ? "#ffffff" : "#000000",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: 'inherit', fontSize: "12px",
                  textAlign: "left"
                }}
              >
                <SkinDot id={s.id} size={14} />
                <span style={{ minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {active ? <strong>{s.name}</strong> : s.name}
                </span>
                <span style={{ fontSize: "11px" }}>{active ? "•" : ""}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Visual dot showing the skin's color signature
function SkinDot({ id, size = 16 }) {
  const palettes = {
    mac:      ["#0a84ff", "#bf5af2"],
    win95:    ["#000080", "#c0c0c0"],
    material: ["#6750a4", "#7d5260"],
    carbon:   ["#0f62fe", "#161616"]
  };
  const [a, b] = palettes[id] || palettes.mac;
  const radius = id === "win95" || id === "carbon" ? "0" : "999px";
  return (
    <span aria-hidden="true" style={{
      display: "inline-block",
      width: size, height: size,
      background: `linear-gradient(135deg, ${a} 50%, ${b} 50%)`,
      borderRadius: radius,
      border: id === "win95" ? "1px solid #000" : "1px solid rgba(0,0,0,0.18)",
      flexShrink: 0
    }} />
  );
}

// =============================================================================
// SkinFooter — shared footer w/ tagline + "Pick a different interface" button
// Returns visitor to the initial skin selection screen.
// =============================================================================
function SkinFooter({ variant = "default" }) {
  const { skin, clearSkin } = window.useSkin();
  const tokens = window.skinTokens.get(skin);

  // Per-skin button styling
  let btnStyle;
  if (skin === "win95") {
    btnStyle = {
      padding: "3px 12px",
      background: "#c0c0c0",
      color: "#000",
      fontFamily: tokens.font,
      fontSize: "12px",
      border: "none",
      boxShadow: "inset 1px 1px 0 #ffffff, inset -1px -1px 0 #808080, inset 2px 2px 0 #dfdfdf, inset -2px -2px 0 #000000",
      cursor: "pointer"
    };
  } else if (skin === "material") {
    btnStyle = {
      padding: "8px 16px",
      background: "transparent",
      color: tokens.accent,
      fontFamily: tokens.font,
      fontSize: "13px", fontWeight: 600,
      border: `1px solid ${tokens.accent}55`,
      borderRadius: "999px",
      cursor: "pointer"
    };
  } else if (skin === "carbon") {
    btnStyle = {
      padding: "8px 14px",
      background: "transparent",
      color: tokens.accent,
      fontFamily: tokens.font,
      fontSize: "13px",
      border: `1px solid ${tokens.border}`,
      borderRadius: 0,
      cursor: "pointer"
    };
  } else {
    // mac
    btnStyle = {
      padding: "7px 14px",
      background: "rgba(255,255,255,0.6)",
      backdropFilter: tokens.blur, WebkitBackdropFilter: tokens.blur,
      color: tokens.accent,
      fontFamily: tokens.font,
      fontSize: "13px", fontWeight: 500,
      border: `1px solid ${tokens.border}`,
      borderRadius: "999px",
      cursor: "pointer"
    };
  }

  const onPick = () => {
    if (typeof clearSkin === "function") clearSkin();
  };

  // Win95 footer text is light/teal — keep variant
  const textColor =
    variant === "win95-teal" ? "#cfeeee" :
    skin === "win95" ? "#cfeeee" :
    tokens.muted;
  const textShadow = (variant === "win95-teal" || skin === "win95") ? "1px 1px 0 #004444" : "none";
  const fontFamily = (skin === "mac" || skin === "carbon" || skin === "win95")
    ? tokens.monoFont : tokens.font;
  const fontSize = skin === "win95" ? "11px" : "12px";

  return (
    <div style={{
      display: "flex", flexWrap: "wrap",
      alignItems: "center", gap: "16px",
      justifyContent: "space-between"
    }}>
      <div style={{
        fontSize, fontFamily,
        color: textColor,
        textShadow,
        textWrap: "pretty",
        maxWidth: "60ch"
      }}>{window.portfolioInfo.footer}</div>
      <button
        type="button"
        onClick={onPick}
        style={btnStyle}
        aria-label="Return to the interface picker"
      >
        ← Pick a different interface
      </button>
    </div>
  );
}

Object.assign(window, { SkinSwitcher, Win95SkinSwitcher, SkinDot, SkinFooter });
