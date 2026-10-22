// =============================================================================
// SkinProvider — global skin state + hash router + helpers
// Exposes via window: useSkin, useRoute, useReducedMotion, navigate, getProject,
//                     getRelatedProjects, getPlaceholderImage
// =============================================================================

const { createContext, useContext, useState, useEffect, useCallback, useMemo } = React;

// ---------- Skin context ----------
const SkinContext = createContext(null);

const SKIN_STORAGE_KEY = "dorsfolio.skin";
const VALID_SKINS = ["mac", "win95", "material", "carbon"];

// Page-level colour per world: paints the overscroll area and the mobile
// browser chrome so the world extends past the edges of the document.
const SKIN_PAGE_BG = {
  mac: "#eceef2", win95: "#008080", material: "#fef7ff", carbon: "#161616", select: "#f4f3ef"
};

function prefersReducedMotion() {
  try { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; }
  catch (e) { return false; }
}

// Swapping worlds is the one moment this site owns outright. Where the
// browser supports it, the DOM swap runs inside a view transition so the old
// world dissolves into the new one instead of flashing; the per-skin arrival
// choreography (see skinStyles.jsx) then draws the new world in.
function withWorldTransition(update) {
  if (document.startViewTransition && !prefersReducedMotion()) {
    document.startViewTransition(() => { ReactDOM.flushSync(update); });
  } else {
    update();
  }
}

function SkinProvider({ children }) {
  const [skin, setSkinState] = useState(() => {
    try {
      const saved = localStorage.getItem(SKIN_STORAGE_KEY);
      return saved && VALID_SKINS.includes(saved) ? saved : null;
    } catch (e) {
      return null;
    }
  });

  const setSkin = useCallback((next) => {
    if (!VALID_SKINS.includes(next)) return;
    withWorldTransition(() => setSkinState(next));
    try { localStorage.setItem(SKIN_STORAGE_KEY, next); } catch (e) {}
  }, []);

  const clearSkin = useCallback(() => {
    withWorldTransition(() => setSkinState(null));
    try { localStorage.removeItem(SKIN_STORAGE_KEY); } catch (e) {}
  }, []);

  // Expose the active world to CSS (hover/focus/scrollbar/selection rules)
  // and to the browser chrome (theme-color, overscroll background).
  useEffect(() => {
    const id = skin || "select";
    document.documentElement.setAttribute("data-skin", id);
    document.body.style.background = SKIN_PAGE_BG[id] || SKIN_PAGE_BG.select;
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "theme-color");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", SKIN_PAGE_BG[id] || SKIN_PAGE_BG.select);
  }, [skin]);

  const value = useMemo(() => ({ skin, setSkin, clearSkin }), [skin, setSkin, clearSkin]);
  return (
    <SkinContext.Provider value={value}>
      {window.SkinGlobalStyles && <window.SkinGlobalStyles />}
      {children}
      <LightboxRoot />
    </SkinContext.Provider>
  );
}

function useSkin() {
  const ctx = useContext(SkinContext);
  if (!ctx) throw new Error("useSkin must be used inside SkinProvider");
  return ctx;
}

// ---------- Hash router ----------
// Routes: #/  #/projects  #/projects/:slug  #/about  #/contact
function parseHash(hash) {
  const clean = (hash || "").replace(/^#/, "") || "/";
  const segs = clean.split("/").filter(Boolean);
  if (segs.length === 0) return { name: "home", path: "/" };
  if (segs[0] === "projects" && segs.length === 1) return { name: "projects", path: "/projects" };
  if (segs[0] === "projects" && segs.length >= 2) return { name: "case-study", slug: segs[1], path: clean };
  if (segs[0] === "about")   return { name: "about",   path: "/about" };
  if (segs[0] === "contact") return { name: "contact", path: "/contact" };
  if (segs[0] === "gallery") return { name: "gallery", path: "/gallery" };
  if (segs[0] === "writing" && segs.length === 1) return { name: "writing", path: "/writing" };
  if (segs[0] === "writing" && segs.length >= 2)  return { name: "writing-post", slug: segs[1], path: clean };
  return { name: "home", path: "/" };
}

function useRoute() {
  const [route, setRoute] = useState(() => parseHash(window.location.hash));
  useEffect(() => {
    const onChange = () => {
      setRoute(parseHash(window.location.hash));
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
        const main = document.querySelector("[data-skin-scroll]");
        if (main) main.scrollTo({ top: 0, behavior: "auto" });
      });
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return route;
}

function navigate(path) {
  if (!path) return;
  if (path.startsWith("#")) {
    window.location.hash = path.slice(1);
  } else if (path.startsWith("/")) {
    window.location.hash = path;
  } else {
    window.location.hash = "/" + path;
  }
  // Scroll to top of content on nav
  requestAnimationFrame(() => {
    const main = document.querySelector("[data-skin-scroll]");
    if (main) main.scrollTo({ top: 0, behavior: "auto" });
    else window.scrollTo({ top: 0, behavior: "auto" });
  });
}

// ---------- Reduced motion ----------
function useReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    try { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; }
    catch (e) { return false; }
  });
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

// ---------- Data helpers ----------
function getProject(slug) {
  return (window.caseStudies || []).find((p) => p.slug === slug) || null;
}

function getRelatedProjects(slug, max = 3) {
  const all = window.caseStudies || [];
  const current = getProject(slug);
  if (!current) return all.slice(0, max);
  const shared = all.filter((p) => p.slug !== slug && p.categories?.some((c) => current.categories?.includes(c)));
  const others = all.filter((p) => p.slug !== slug && !shared.includes(p));
  return [...shared, ...others].slice(0, max);
}

// ---------- Placeholder imagery ----------
// We generate inline SVGs because we don't have real project images yet.
// When real images land in public/projects/<slug>/, they take over.
function getPlaceholderImage(slug, label = "image", accent = "#8b8b8b") {
  const stripes = `
    <defs>
      <pattern id="p-${slug}-${label.replace(/\W+/g, '')}" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <rect width="14" height="14" fill="${accent}22"/>
        <rect width="7" height="14" fill="${accent}11"/>
      </pattern>
    </defs>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice">
    ${stripes}
    <rect width="800" height="500" fill="url(#p-${slug}-${label.replace(/\W+/g, '')})"/>
    <rect x="20" y="20" width="760" height="460" fill="none" stroke="${accent}55" stroke-width="2" stroke-dasharray="6 6"/>
    <text x="400" y="255" text-anchor="middle" font-family="ui-monospace, Menlo, monospace" font-size="22" fill="${accent}" opacity="0.85">${label}</text>
    <text x="400" y="285" text-anchor="middle" font-family="ui-monospace, Menlo, monospace" font-size="14" fill="${accent}" opacity="0.6">${slug}</text>
  </svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

// Normalizes image paths so they resolve relative to wherever the HTML is
// served from — strips a leading "/" (which would otherwise resolve to the
// sandbox origin root, not the project root).
function resolveAsset(src) {
  if (!src) return src;
  if (/^(https?:|data:|blob:)/i.test(src)) return src;
  return src.replace(/^\/+/, "");
}

// Wraps a real-but-likely-missing image with the placeholder.
// Images fade in once decoded (no pop-in), and when `onClick` is supplied the
// image is wrapped in a real button so the zoom is reachable from the keyboard.
function ProjectImage({ src, alt, slug, label, accent, style, className, onClick }) {
  const [errored, setErrored] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const ref = React.useRef(null);
  const fallback = getPlaceholderImage(slug || "project", label || alt || "image", accent || "#8b8b8b");
  const resolved = resolveAsset(src);
  const current = errored ? fallback : (resolved || fallback);

  // Cached images may already be complete before onLoad can fire.
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth > 0) setLoaded(true);
  }, [current]);

  const baseOpacity = style && style.opacity !== undefined ? style.opacity : 1;
  const img = (
    <img
      ref={ref}
      src={current}
      alt={alt || label || ""}
      loading="lazy"
      decoding="async"
      onError={() => { setErrored(true); setLoaded(false); }}
      onLoad={() => setLoaded(true)}
      style={{ ...style, opacity: loaded ? baseOpacity : 0 }}
      className={["ds-img", className].filter(Boolean).join(" ")}
    />
  );
  if (!onClick) return img;
  return (
    <button
      type="button"
      className="ds-zoom"
      onClick={onClick}
      aria-label={`View larger: ${alt || label || "image"}`}
    >
      {img}
    </button>
  );
}

// Global image lightbox — renders at root, driven by window.lightboxOpen(items, index)
function LightboxRoot() {
  const [lb, setLb] = useState(null); // { items:[{src,alt}], index }
  const dialogRef = React.useRef(null);
  const closeBtnRef = React.useRef(null);
  const returnFocusRef = React.useRef(null);

  useEffect(() => {
    window.lightboxOpen = (items, index = 0) => {
      const arr = Array.isArray(items) ? items : [{ src: items, alt: "" }];
      setLb({ items: arr, index: Math.max(0, Math.min(index, arr.length - 1)) });
    };
    return () => { delete window.lightboxOpen; };
  }, []);

  // Lock body scroll while open
  useEffect(() => {
    if (!lb) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [!!lb]);

  // Keyboard navigation + a light focus trap (Tab cycles the dialog's controls)
  useEffect(() => {
    if (!lb) return;
    const onKey = (e) => {
      if (e.key === "Escape") { e.preventDefault(); setLb(null); }
      if (e.key === "ArrowLeft"  && lb.index > 0)                setLb(s => ({ ...s, index: s.index - 1 }));
      if (e.key === "ArrowRight" && lb.index < lb.items.length - 1) setLb(s => ({ ...s, index: s.index + 1 }));
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = Array.from(dialogRef.current.querySelectorAll("button"));
        if (focusables.length === 0) return;
        const first = focusables[0], last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lb]);

  // Move focus into the dialog on open, give it back on close.
  useEffect(() => {
    if (lb) {
      returnFocusRef.current = document.activeElement;
      requestAnimationFrame(() => closeBtnRef.current && closeBtnRef.current.focus());
    } else if (returnFocusRef.current && returnFocusRef.current.focus) {
      returnFocusRef.current.focus();
      returnFocusRef.current = null;
    }
  }, [!!lb]);

  if (!lb) return null;
  const { items, index } = lb;
  const curr = items[index];
  const hasPrev = index > 0;
  const hasNext = index < items.length - 1;
  const close = () => setLb(null);
  const go = (delta) => setLb(s => ({ ...s, index: s.index + delta }));

  const overlayNavStyle = (side) => ({
    position: "absolute", [side]: 8, top: "50%", transform: "translateY(-50%)",
    background: "rgba(0,0,0,0.45)",
    border: "1px solid rgba(255,255,255,0.2)",
    backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
    color: "#fff", borderRadius: "50%",
    width: 44, height: 44,
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", padding: 0
  });

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={curr.alt ? `Image: ${curr.alt}` : "Image viewer"}
      className="ds-lb"
      onClick={close}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.88)",
        backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "20px", cursor: "zoom-out"
      }}
    >
      {/* Close button */}
      <button
        ref={closeBtnRef}
        className="ds-lb-btn"
        onClick={(e) => { e.stopPropagation(); close(); }}
        aria-label="Close image viewer"
        style={{
          position: "fixed", top: 16, right: 16,
          background: "rgba(255,255,255,0.12)",
          border: "1px solid rgba(255,255,255,0.2)",
          backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
          color: "#fff", borderRadius: "50%",
          width: 40, height: 40, padding: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer"
        }}
      ><window.Icon name="close" size={18} skin="mac" /></button>

      {/* Image + prev/next overlaid on image edges */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ position: "relative", maxWidth: "min(88vw, 1200px)", cursor: "default" }}
      >
        <img
          key={curr.src}
          src={curr.src}
          alt={curr.alt || ""}
          className="ds-lb-img"
          style={{
            display: "block",
            maxWidth: "100%",
            maxHeight: "calc(100vh - 120px)",
            objectFit: "contain",
            borderRadius: 10,
            boxShadow: "0 24px 80px rgba(0,0,0,0.5)"
          }}
        />
        {hasPrev && (
          <button className="ds-lb-btn" onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Previous image"
            style={overlayNavStyle("left")}><window.Icon name="chevronLeft" size={22} skin="mac" /></button>
        )}
        {hasNext && (
          <button className="ds-lb-btn" onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Next image"
            style={overlayNavStyle("right")}><window.Icon name="chevronRight" size={22} skin="mac" /></button>
        )}
      </div>

      {/* Caption + counter */}
      {(curr.alt || items.length > 1) && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            marginTop: 14, textAlign: "center",
            color: "rgba(255,255,255,0.72)", fontSize: 13,
            fontFamily: "system-ui, sans-serif", lineHeight: 1.4,
            cursor: "default"
          }}
        >
          {curr.alt}
          {items.length > 1 && (
            <span style={{ marginLeft: curr.alt ? 8 : 0, opacity: 0.5 }}>
              {index + 1} / {items.length}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

// ---------- exports ----------
Object.assign(window, {
  SkinProvider, useSkin, useRoute, useReducedMotion, parseHash, navigate,
  getProject, getRelatedProjects, getPlaceholderImage, ProjectImage, resolveAsset,
  VALID_SKINS,
});
