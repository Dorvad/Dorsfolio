// =============================================================================
// SkinSelectionScreen — minimal entry screen
// One question. Five choices. No long copy. Each choice carries a miniature
// of the world it opens, so the pick is informed rather than blind.
// =============================================================================

function SkinSelectionScreen() {
  const { setSkin } = window.useSkin();
  const reduced = window.useReducedMotion();
  const [picked, setPicked] = React.useState(null);

  const choices = [
    { id: "mac",      label: "I'm an Apple person" },
    { id: "win95",    label: "I'm a Windows person" },
    { id: "material", label: "I'm a Google person" },
    { id: "carbon",   label: "I'm an IBM person" },
    { id: "surprise", label: "Surprise me" }
  ];

  const pick = (id) => {
    setPicked(id);
    const real = id === "surprise"
      ? window.VALID_SKINS[Math.floor(Math.random() * window.VALID_SKINS.length)]
      : id;
    // brief delay so the press state registers before the world switch
    setTimeout(() => setSkin(real), reduced ? 0 : 180);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background:
        "radial-gradient(900px 600px at 12% 0%, #d9e6f2 0%, transparent 55%)," +
        "radial-gradient(800px 500px at 100% 30%, #f1dff5 0%, transparent 55%)," +
        "radial-gradient(700px 500px at 50% 110%, #e2f0e5 0%, transparent 60%)," +
        "#f4f3ef",
      color: "#1c1c1e",
      fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", system-ui, sans-serif',
      display: "flex",
      flexDirection: "column",
      padding: "clamp(24px, 5vw, 48px)"
    }}>
      {/* Wordmark — tiny */}
      <div style={{
        display: "flex", alignItems: "center", gap: "10px",
        fontSize: "13px", color: "#6c6c70",
        fontFamily: 'ui-monospace, Menlo, monospace',
        animation: reduced ? "none" : "fadeIn 0.5s ease both"
      }}>
        <span aria-hidden="true" style={{
          width: 14, height: 14, borderRadius: "4px",
          background: "conic-gradient(from 220deg, #0a84ff, #bf5af2, #2bb673, #d49a2a, #0a84ff)"
        }} />
        Dorsfolio
      </div>

      {/* Centered question + choices */}
      <main style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "clamp(40px, 8vw, 80px) 0"
      }}>
        <h1 style={{
          fontSize: "clamp(34px, 6vw, 56px)",
          fontWeight: 600,
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
          margin: 0,
          textWrap: "balance",
          animation: reduced ? "none" : "fadeUp 0.5s cubic-bezier(.2,.8,.2,1) 0.1s both"
        }}>
          What kind of person are you?
        </h1>

        <p style={{
          fontSize: "clamp(15px, 2vw, 17px)",
          color: "#6c6c70",
          maxWidth: "44ch",
          lineHeight: 1.55,
          margin: "16px 0 0",
          textWrap: "balance",
          animation: reduced ? "none" : "fadeUp 0.5s cubic-bezier(.2,.8,.2,1) 0.18s both"
        }}>
          Your answer picks the interface for Dor Vadai's portfolio — same work, four different worlds.
        </p>

        <ul style={{
          listStyle: "none",
          padding: 0,
          margin: "clamp(36px, 6vw, 56px) 0 0",
          display: "grid",
          gap: "10px",
          width: "100%",
          maxWidth: "460px"
        }}>
          {choices.map((c, i) => (
            <li key={c.id}>
              <ChoiceButton
                id={c.id}
                label={c.label}
                onPick={() => pick(c.id)}
                pressed={picked === c.id}
                dimmed={picked !== null && picked !== c.id}
                reduced={reduced}
                index={i}
              />
            </li>
          ))}
        </ul>
      </main>

      <footer style={{
        fontSize: "12px",
        color: "#8a8a8e",
        fontFamily: 'ui-monospace, Menlo, monospace',
        textAlign: "center"
      }}>
        You can switch at any time.
      </footer>
    </div>
  );
}

function ChoiceButton({ id, label, onPick, pressed, dimmed, reduced, index }) {
  return (
    <button
      type="button"
      onClick={onPick}
      className="ds-choice"
      aria-pressed={pressed}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "14px 16px 14px 18px",
        background: pressed ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.7)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(15,23,42,0.1)",
        borderRadius: "14px",
        fontFamily: "inherit",
        fontSize: "17px",
        fontWeight: 500,
        color: "#1c1c1e",
        textAlign: "left",
        cursor: "pointer",
        boxShadow: pressed
          ? "0 0 0 2px #1c1c1e, 0 10px 30px rgba(15,23,42,0.12)"
          : "0 2px 8px rgba(15,23,42,0.04)",
        opacity: dimmed ? 0.55 : 1,
        transition: reduced ? "opacity 160ms ease" : undefined,
        animation: reduced ? "none" : `fadeUp 420ms cubic-bezier(.2,.8,.2,1) ${240 + index * 60}ms both`
      }}
    >
      <ChoiceMark id={id} />
      <span style={{ flex: 1, letterSpacing: "-0.005em" }}>{label}</span>
      <WorldPreview id={id} />
      <span aria-hidden="true" className="ds-choice-arrow" style={{ color: "#8a8a8e", display: "inline-flex" }}>
        <window.Icon name="arrowRight" size={18} skin="mac" />
      </span>
    </button>
  );
}

function ChoiceMark({ id }) {
  const logoSrc = {
    mac:      "brand/apple.png",
    win95:    "brand/windows.png",
    material: "brand/google.png",
    carbon:   "brand/ibm.png"
  }[id];

  // Surprise tile = colorful conic gradient
  if (id === "surprise") {
    return (
      <span aria-hidden="true" style={{
        width: 44, height: 44, borderRadius: "12px",
        background: "conic-gradient(from 0deg, #0a84ff, #bf5af2, #2bb673, #d49a2a, #0a84ff)",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.6), 0 2px 6px rgba(15,23,42,0.1)",
        flexShrink: 0
      }} />
    );
  }

  return (
    <img
      src={logoSrc}
      alt=""
      aria-hidden="true"
      width="44" height="44"
      style={{
        width: 44, height: 44,
        objectFit: "contain",
        display: "block",
        flexShrink: 0
      }}
    />
  );
}

// A 64×44 miniature of each world — drawn, not screenshotted, so it stays
// crisp and weighs nothing. Saturates and tilts on hover (see .ds-choice).
function WorldPreview({ id }) {
  const frame = {
    width: 64, height: 44, borderRadius: "7px", overflow: "hidden", position: "relative",
    flexShrink: 0, boxShadow: "0 1px 2px rgba(15,23,42,0.12), inset 0 0 0 1px rgba(15,23,42,0.08)"
  };
  const abs = (s) => ({ position: "absolute", ...s });

  let scene = null;
  if (id === "mac") {
    scene = (
      <div style={{ ...frame, background: "linear-gradient(135deg, #cfdcee 0%, #e7d7ee 60%, #dbe9d6 100%)" }}>
        <div style={abs({ top: 4, left: 4, right: 4, height: 5, borderRadius: 2, background: "rgba(255,255,255,0.75)" })} />
        <div style={abs({ top: 12, left: 8, right: 8, bottom: 9, borderRadius: 4, background: "rgba(255,255,255,0.82)", boxShadow: "0 3px 8px rgba(15,23,42,0.14)" })}>
          <span style={abs({ top: 3, left: 3, width: 3, height: 3, borderRadius: 99, background: "#ff5f57" })} />
          <span style={abs({ top: 3, left: 8, width: 3, height: 3, borderRadius: 99, background: "#febc2e" })} />
          <span style={abs({ top: 3, left: 13, width: 3, height: 3, borderRadius: 99, background: "#28c840" })} />
        </div>
        <div style={abs({ bottom: 3, left: "50%", transform: "translateX(-50%)", width: 30, height: 5, borderRadius: 3, background: "rgba(255,255,255,0.8)", boxShadow: "0 1px 3px rgba(15,23,42,0.15)" })} />
      </div>
    );
  } else if (id === "win95") {
    scene = (
      <div style={{ ...frame, background: "#008080", borderRadius: 0 }}>
        <div style={abs({ top: 5, left: 5, width: 6, height: 5, background: "#ffff00", outline: "1px solid #000" })} />
        <div style={abs({ top: 6, left: 16, right: 4, bottom: 10, background: "#c0c0c0", boxShadow: "inset 1px 1px 0 #fff, inset -1px -1px 0 #000" })}>
          <div style={abs({ top: 1, left: 1, right: 1, height: 5, background: "linear-gradient(90deg,#000080,#1084d0)" })} />
          <div style={abs({ top: 8, left: 3, right: 3, bottom: 2, background: "#fff" })} />
        </div>
        <div style={abs({ bottom: 0, left: 0, right: 0, height: 6, background: "#c0c0c0", boxShadow: "inset 0 1px 0 #fff" })}>
          <div style={abs({ top: 1, left: 1, width: 12, height: 4, background: "#c0c0c0", boxShadow: "inset 1px 1px 0 #fff, inset -1px -1px 0 #000" })} />
        </div>
      </div>
    );
  } else if (id === "material") {
    scene = (
      <div style={{ ...frame, background: "#fef7ff" }}>
        <div style={abs({ top: 4, left: 4, width: 8, height: 8, borderRadius: 3, background: "linear-gradient(135deg,#6750a4,#7d5260)" })} />
        <div style={abs({ top: 5, right: 4, width: 26, height: 6, borderRadius: 99, background: "#fff", boxShadow: "inset 0 0 0 1px rgba(28,27,31,0.12)" })}>
          <span style={abs({ top: 1, left: 1, width: 9, height: 4, borderRadius: 99, background: "#e8def8" })} />
        </div>
        <div style={abs({ top: 17, left: 5, width: 25, height: 20, borderRadius: 6, background: "#fff", boxShadow: "inset 0 0 0 1px rgba(28,27,31,0.1)" })}>
          <div style={abs({ top: 0, left: 0, right: 0, height: 10, borderRadius: "6px 6px 0 0", background: "#dbe9f2" })} />
        </div>
        <div style={abs({ top: 17, left: 34, width: 25, height: 20, borderRadius: 6, background: "#fff", boxShadow: "inset 0 0 0 1px rgba(28,27,31,0.1)" })}>
          <div style={abs({ top: 0, left: 0, right: 0, height: 10, borderRadius: "6px 6px 0 0", background: "#e6dff0" })} />
        </div>
        <div style={abs({ bottom: 4, right: 4, width: 9, height: 9, borderRadius: 3, background: "#7d5260" })} />
      </div>
    );
  } else if (id === "carbon") {
    scene = (
      <div style={{ ...frame, background: "#161616", borderRadius: 0 }}>
        <div style={abs({ top: 0, left: 0, right: 0, height: 8, background: "#161616", borderBottom: "1px solid #525252" })}>
          <span style={abs({ top: 2, left: 3, width: 8, height: 3, background: "#f4f4f4" })} />
          <span style={abs({ top: 7, left: 15, width: 8, height: 1, background: "#78a9ff" })} />
        </div>
        <div style={abs({ top: 9, left: 0, bottom: 0, width: 16, borderRight: "1px solid #525252" })}>
          <span style={abs({ top: 4, left: 0, width: 1, height: 4, background: "#78a9ff" })} />
          <span style={abs({ top: 4, left: 3, width: 9, height: 2, background: "#c6c6c6" })} />
          <span style={abs({ top: 9, left: 3, width: 7, height: 2, background: "#525252" })} />
          <span style={abs({ top: 14, left: 3, width: 8, height: 2, background: "#525252" })} />
        </div>
        <div style={abs({ top: 13, left: 21, width: 18, height: 23, background: "#262626", borderLeft: "2px solid #78a9ff" })} />
        <div style={abs({ top: 13, left: 42, width: 18, height: 23, background: "#262626", borderLeft: "2px solid #42be65" })} />
      </div>
    );
  } else {
    scene = (
      <div style={{ ...frame, display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 1, background: "rgba(15,23,42,0.08)" }}>
        <span style={{ background: "linear-gradient(135deg,#cfdcee,#e7d7ee)" }} />
        <span style={{ background: "#008080" }} />
        <span style={{ background: "#fef7ff" }} />
        <span style={{ background: "#161616" }} />
      </div>
    );
  }
  return <span aria-hidden="true" className="ds-choice-preview" style={{ display: "inline-flex", flexShrink: 0 }}>{scene}</span>;
}

window.SkinSelectionScreen = SkinSelectionScreen;
