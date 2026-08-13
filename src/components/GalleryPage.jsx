// =============================================================================
// GalleryPage — masonry image grid with lightbox
// Images sourced from window.galleryImages (src/data/gallery.js)
// =============================================================================

const { useState, useEffect, useCallback } = React;

function GalleryPage() {
  const { skin } = window.useSkin();
  const tokens = window.skinTokens.get(skin);
  const images = window.galleryImages || [];

  // Filter state — computed before lightbox so prev/next stay in-filter
  const projects = ["All", ...Array.from(new Set(images.map((img) => img.project).filter(Boolean)))];
  const [activeProject, setActiveProject] = useState("All");
  const filtered = activeProject === "All"
    ? images
    : images.filter((img) => img.project === activeProject);

  // Lightbox index into `filtered` (not global images)
  const [lightbox, setLightbox] = useState(null);
  const open  = useCallback((i) => setLightbox(i), []);
  const close = useCallback(() => setLightbox(null), []);
  const prev  = useCallback(() => setLightbox((i) => (i - 1 + filtered.length) % filtered.length), [filtered.length]);
  const next  = useCallback(() => setLightbox((i) => (i + 1) % filtered.length), [filtered.length]);

  // Close lightbox when filter changes
  const handleFilterChange = useCallback((p) => {
    setActiveProject(p);
    setLightbox(null);
  }, []);

  // Keyboard nav for lightbox
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === "Escape")     close();
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, close, prev, next]);

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{
          fontFamily: tokens.displayFont || tokens.font,
          fontSize: "clamp(28px, 4vw, 42px)",
          fontWeight: 600,
          letterSpacing: "-0.02em",
          margin: "0 0 8px",
          color: tokens.text
        }}>Gallery</h1>
        <p style={{ fontFamily: tokens.font, fontSize: "15px", color: tokens.muted, margin: 0 }}>
          Project screenshots and visual work.
        </p>
      </div>

      {/* Project filter pills — only shown when there are tagged images */}
      {projects.length > 1 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px" }}>
          {projects.map((p) => (
            <button
              key={p}
              onClick={() => handleFilterChange(p)}
              style={{
                padding: "6px 14px",
                borderRadius: "999px",
                border: `1px solid ${activeProject === p ? tokens.accent : tokens.border}`,
                background: activeProject === p ? tokens.accent : "transparent",
                color: activeProject === p ? "#fff" : tokens.text,
                fontFamily: tokens.font,
                fontSize: "13px",
                cursor: "pointer",
                fontWeight: activeProject === p ? 600 : 400
              }}
            >{p}</button>
          ))}
        </div>
      )}

      {/* Empty state */}
      {filtered.length === 0 && (
        <div style={{
          padding: "60px 24px",
          textAlign: "center",
          border: `2px dashed ${tokens.border}`,
          borderRadius: tokens.radius,
          color: tokens.muted,
          fontFamily: tokens.font
        }}>
          <div style={{ fontSize: "32px", marginBottom: "12px" }}>🖼</div>
          <div style={{ fontWeight: 600, marginBottom: "6px", color: tokens.text }}>No images yet</div>
          <div style={{ fontSize: "14px", maxWidth: "38ch", margin: "0 auto", lineHeight: 1.5 }}>
            Drop image files into the <code style={{ background: tokens.surfaceAlt || tokens.surface, padding: "1px 5px", borderRadius: "4px" }}>gallery/</code> folder,
            then add entries to <code style={{ background: tokens.surfaceAlt || tokens.surface, padding: "1px 5px", borderRadius: "4px" }}>src/data/gallery.js</code>.
          </div>
        </div>
      )}

      {/* Masonry grid */}
      {filtered.length > 0 && (
        <div style={{
          columns: "3 280px",
          columnGap: "12px"
        }}>
          {filtered.map((img, i) => (
            <GalleryThumb
              key={img.src + i}
              img={img}
              tokens={tokens}
              onClick={() => open(i)}
            />
          ))}
        </div>
      )}

      {/* Lightbox — navigates within current filter */}
      {lightbox !== null && filtered[lightbox] && (
        <GalleryLightbox
          img={filtered[lightbox]}
          index={lightbox}
          total={filtered.length}
          tokens={tokens}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </div>
  );
}

function GalleryThumb({ img, tokens, onClick }) {
  const [hover, setHover] = useState(false);
  const reduced = window.useReducedMotion();
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        breakInside: "avoid",
        marginBottom: "12px",
        borderRadius: tokens.radius,
        overflow: "hidden",
        border: `1px solid ${tokens.border}`,
        // Transparent PNGs (VFX sheets, cut-out sprites) can wash out against a
        // light skin — `bg` gives those entries a fixed backdrop of their own.
        background: img.bg || "transparent",
        cursor: "zoom-in",
        position: "relative",
        transform: hover && !reduced ? "scale(1.015)" : "scale(1)",
        transition: reduced ? "none" : "transform 180ms ease",
        boxShadow: hover
          ? "0 8px 24px rgba(0,0,0,0.18)"
          : "0 2px 8px rgba(0,0,0,0.07)"
      }}
    >
      <window.ProjectImage
        src={img.src}
        slug={img.project || "gallery"}
        label={img.caption || img.project || "image"}
        accent={tokens.accent}
        alt={img.caption || ""}
        style={{ width: "100%", display: "block" }}
      />
      {/* Caption overlay on hover */}
      {(img.caption || img.project) && (
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "10px 12px",
          background: "linear-gradient(transparent, rgba(0,0,0,0.55))",
          color: "#fff",
          fontSize: "12px",
          opacity: hover ? 1 : 0,
          transition: reduced ? "none" : "opacity 180ms ease"
        }}>
          {img.project && (
            <span style={{
              display: "inline-block",
              padding: "2px 7px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.2)",
              fontSize: "10px",
              marginBottom: "3px",
              marginRight: "6px"
            }}>{img.project}</span>
          )}
          {img.caption && <span>{img.caption}</span>}
        </div>
      )}
    </div>
  );
}

function GalleryLightbox({ img, index, total, tokens, onClose, onPrev, onNext }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9000,
        background: "rgba(0,0,0,0.85)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "16px"
      }}
    >
      {/* Prev */}
      {total > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Previous"
          style={lightboxBtnStyle("left")}
        >‹</button>
      )}

      {/* Image panel */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "min(90vw, 1100px)",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px"
        }}
      >
        <img
          src={window.resolveAsset(img.src)}
          alt={img.caption || ""}
          style={{
            maxWidth: "100%",
            maxHeight: "calc(90vh - 60px)",
            borderRadius: "10px",
            objectFit: "contain",
            display: "block"
          }}
        />
        {(img.caption || img.project) && (
          <div style={{
            color: "#fff",
            fontFamily: tokens.font,
            fontSize: "14px",
            textAlign: "center",
            opacity: 0.85,
            display: "flex",
            gap: "8px",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "center"
          }}>
            {img.project && (
              <span style={{
                padding: "3px 10px",
                borderRadius: "999px",
                background: tokens.accent + "99",
                fontSize: "12px"
              }}>{img.project}</span>
            )}
            {img.caption && <span>{img.caption}</span>}
          </div>
        )}
        {total > 1 && (
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", fontFamily: tokens.monoFont }}>
            {index + 1} / {total}
          </div>
        )}
      </div>

      {/* Next */}
      {total > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Next"
          style={lightboxBtnStyle("right")}
        >›</button>
      )}

      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Close"
        style={{
          position: "fixed", top: "16px", right: "20px",
          background: "rgba(255,255,255,0.15)",
          border: "none",
          color: "#fff",
          fontSize: "24px",
          width: 40, height: 40,
          borderRadius: "999px",
          cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          lineHeight: 1
        }}
      >×</button>
    </div>
  );
}

function lightboxBtnStyle(side) {
  return {
    position: "fixed",
    top: "50%",
    [side]: "16px",
    transform: "translateY(-50%)",
    background: "rgba(255,255,255,0.15)",
    border: "none",
    color: "#fff",
    fontSize: "36px",
    width: 48, height: 48,
    borderRadius: "999px",
    cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    lineHeight: 1
  };
}

window.GalleryPage = GalleryPage;
