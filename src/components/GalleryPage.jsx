// =============================================================================
// GalleryPage — masonry image grid, opens the shared lightbox
// Images sourced from window.galleryImages (src/data/gallery.js)
// =============================================================================

function GalleryPage() {
  const { skin } = window.useSkin();
  const tokens = window.skinTokens.get(skin);
  const images = window.galleryImages || [];
  const reduced = window.useReducedMotion();

  // Filter state — the lightbox navigates within the current filter
  const projects = ["All", ...Array.from(new Set(images.map((img) => img.project).filter(Boolean)))];
  const [activeProject, setActiveProject] = React.useState("All");
  const filtered = activeProject === "All"
    ? images
    : images.filter((img) => img.project === activeProject);

  const open = (i) => {
    if (!window.lightboxOpen) return;
    const items = filtered.map((img) => ({
      src: window.resolveAsset(img.src),
      alt: [img.project, img.caption].filter(Boolean).join(" — ")
    }));
    window.lightboxOpen(items, i);
  };

  return (
    <div data-screen-label="Gallery">
      <window.SectionHeader level={1} title="Gallery" hint="Project screenshots and visual work." tokens={tokens} />

      {/* Project filter — only shown when there are tagged images */}
      {projects.length > 1 && (
        <window.FilterChips options={projects} active={activeProject} onChange={setActiveProject} label="Filter gallery by project" tokens={tokens} skin={skin} />
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
          <div style={{ marginBottom: "12px", color: tokens.muted }}><window.Icon name="image" size={32} /></div>
          <div style={{ fontWeight: 600, marginBottom: "6px", color: tokens.text }}>No images yet</div>
          <div style={{ fontSize: "14px", maxWidth: "38ch", margin: "0 auto", lineHeight: 1.5 }}>
            Drop image files into the <code style={{ background: tokens.surfaceAlt || tokens.surface, padding: "1px 5px", borderRadius: "4px" }}>gallery/</code> folder,
            then add entries to <code style={{ background: tokens.surfaceAlt || tokens.surface, padding: "1px 5px", borderRadius: "4px" }}>src/data/gallery.js</code>.
          </div>
        </div>
      )}

      {/* Masonry grid — re-keyed per filter so the set re-enters together */}
      {filtered.length > 0 && (
        <div key={activeProject} style={{
          columns: "3 280px",
          columnGap: "12px",
          animation: (reduced || skin === "win95") ? "none" : "fadeIn 320ms ease both"
        }}>
          {filtered.map((img, i) => (
            <GalleryThumb
              key={img.src + i}
              img={img}
              tokens={tokens}
              skin={skin}
              onClick={() => open(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function GalleryThumb({ img, tokens, skin, onClick }) {
  const isWin95 = skin === "win95";
  const label = [img.project, img.caption].filter(Boolean).join(" — ") || "image";
  return (
    <button
      type="button"
      onClick={onClick}
      className="ds-thumb"
      aria-label={`View larger: ${label}`}
      style={{
        display: "block", width: "100%", padding: isWin95 ? "3px" : 0,
        border: isWin95 ? "none" : `1px solid ${tokens.border}`,
        breakInside: "avoid",
        marginBottom: "12px",
        borderRadius: tokens.radius,
        overflow: "hidden",
        // Transparent PNGs (VFX sheets, cut-out sprites) can wash out against a
        // light skin — `bg` gives those entries a fixed backdrop of their own.
        background: img.bg || (isWin95 ? "#fff" : tokens.surfaceAlt || tokens.surfaceSolid),
        boxShadow: isWin95
          ? "inset 1px 1px 0 #808080, inset -1px -1px 0 #ffffff, inset 2px 2px 0 #000000, inset -2px -2px 0 #dfdfdf"
          : skin === "carbon" ? "none" : "0 2px 8px rgba(0,0,0,0.07)",
        cursor: "zoom-in",
        position: "relative",
        font: "inherit", color: "inherit", textAlign: "left"
      }}
    >
      <window.ProjectImage
        src={img.src}
        slug={img.project || "gallery"}
        label={img.caption || img.project || "image"}
        accent={tokens.accent}
        alt=""
        style={{ width: "100%", display: "block" }}
      />
      {/* Caption overlay on hover / focus */}
      {(img.caption || img.project) && (
        <span className="ds-thumb-cap" style={{
          position: "absolute", bottom: isWin95 ? 3 : 0, left: isWin95 ? 3 : 0, right: isWin95 ? 3 : 0,
          padding: "22px 12px 10px",
          background: "linear-gradient(transparent, rgba(0,0,0,0.62))",
          color: "#fff",
          fontSize: "12px",
          fontFamily: tokens.font,
          lineHeight: 1.35,
          opacity: 0,
          display: "block",
          pointerEvents: "none"
        }}>
          {img.project && (
            <span style={{
              display: "inline-block",
              padding: "2px 7px",
              borderRadius: isWin95 || skin === "carbon" ? 0 : "999px",
              background: "rgba(255,255,255,0.22)",
              fontSize: "10px",
              fontWeight: 600,
              marginBottom: "3px",
              marginRight: "6px",
              letterSpacing: "0.02em"
            }}>{img.project}</span>
          )}
          {img.caption && <span>{img.caption}</span>}
        </span>
      )}
    </button>
  );
}

window.GalleryPage = GalleryPage;
