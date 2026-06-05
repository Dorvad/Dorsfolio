// =============================================================================
// SkinSelectionScreen — minimal entry screen
// One question. Five choices. No long copy.
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
    // brief delay so the press state registers
    setTimeout(() => setSkin(real), reduced ? 0 : 220);
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
        fontFamily: 'ui-monospace, Menlo, monospace'
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
          textWrap: "balance"
        }}>
          What kind of person are you?
        </h1>

        <ul style={{
          listStyle: "none",
          padding: 0,
          margin: "clamp(36px, 6vw, 56px) 0 0",
          display: "grid",
          gap: "10px",
          width: "100%",
          maxWidth: "440px"
        }}>
          {choices.map((c, i) => (
            <li key={c.id}>
              <ChoiceButton
                id={c.id}
                label={c.label}
                onPick={() => pick(c.id)}
                pressed={picked === c.id}
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

function ChoiceButton({ id, label, onPick, pressed, reduced, index }) {
  const [hover, setHover] = React.useState(false);

  return (
    <button
      type="button"
      onClick={onPick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: "18px",
        padding: "18px 22px",
        background: pressed ? "rgba(15,23,42,0.04)" : "rgba(255,255,255,0.7)",
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
        boxShadow: hover
          ? "0 10px 30px rgba(15,23,42,0.12), 0 2px 6px rgba(15,23,42,0.04)"
          : "0 2px 8px rgba(15,23,42,0.04)",
        transform: hover && !reduced ? "translateY(-1px)" : "none",
        transition: reduced
          ? "none"
          : "transform 180ms cubic-bezier(.2,.8,.2,1), box-shadow 180ms ease, background 120ms ease",
        opacity: 0,
        animation: reduced ? "none" : `fadeUp 360ms cubic-bezier(.2,.8,.2,1) ${index * 60}ms both`
      }}
    >
      <ChoiceMark id={id} />
      <span style={{ flex: 1, letterSpacing: "-0.005em" }}>{label}</span>
      <span aria-hidden="true" style={{
        fontSize: "16px",
        color: "#6c6c70",
        transition: reduced ? "none" : "transform 180ms ease",
        transform: hover ? "translateX(3px)" : "none"
      }}>→</span>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
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
        width: 52, height: 52, borderRadius: "14px",
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
      style={{
        width: 52, height: 52,
        objectFit: "contain",
        display: "block",
        flexShrink: 0
      }}
    />
  );
}

window.SkinSelectionScreen = SkinSelectionScreen;
