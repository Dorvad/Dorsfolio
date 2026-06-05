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
    setSkinState(next);
    try { localStorage.setItem(SKIN_STORAGE_KEY, next); } catch (e) {}
  }, []);

  const clearSkin = useCallback(() => {
    setSkinState(null);
    try { localStorage.removeItem(SKIN_STORAGE_KEY); } catch (e) {}
  }, []);

  const value = useMemo(() => ({ skin, setSkin, clearSkin }), [skin, setSkin, clearSkin]);
  return <SkinContext.Provider value={value}>{children}</SkinContext.Provider>;
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
  return { name: "home", path: "/" };
}

function useRoute() {
  const [route, setRoute] = useState(() => parseHash(window.location.hash));
  useEffect(() => {
    const onChange = () => setRoute(parseHash(window.location.hash));
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

// Wraps a real-but-likely-missing image with the placeholder
function ProjectImage({ src, alt, slug, label, accent, style, className }) {
  const [errored, setErrored] = useState(false);
  const fallback = getPlaceholderImage(slug || "project", label || alt || "image", accent || "#8b8b8b");
  const resolved = resolveAsset(src);
  return (
    <img
      src={errored ? fallback : (resolved || fallback)}
      alt={alt || label || ""}
      loading="lazy"
      onError={() => setErrored(true)}
      style={style}
      className={className}
    />
  );
}

// ---------- exports ----------
Object.assign(window, {
  SkinProvider, useSkin, useRoute, useReducedMotion, parseHash, navigate,
  getProject, getRelatedProjects, getPlaceholderImage, ProjectImage, resolveAsset,
  VALID_SKINS,
});
