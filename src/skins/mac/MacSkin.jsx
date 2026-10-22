// =============================================================================
// MAC / iOS skin — glass, dock, soft gradients, window chrome
// =============================================================================

const macStyles = {
  wallpaper: {
    minHeight: "100vh",
    background:
      "radial-gradient(900px 600px at 10% -10%, #c7d9ec 0%, transparent 55%)," +
      "radial-gradient(900px 600px at 90% 10%, #e6d3ef 0%, transparent 55%)," +
      "radial-gradient(900px 700px at 50% 110%, #d9e9d5 0%, transparent 60%)," +
      "linear-gradient(180deg, #eef0f3 0%, #e8e3ec 100%)",
    color: "#1c1c1e",
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", system-ui, sans-serif',
    display: "flex", flexDirection: "column",
    overflowX: "hidden"
  }
};

// Responsive: compact dock on mobile instead of hiding it (dock = only nav on small screens)
const macResponsiveCSS = `
  @media (max-width: 640px) {
    [data-mac-date]       { display: none !important; }
    [data-mac-nav] a      { padding: 4px 7px !important; font-size: 12px !important; }
    [data-skin-scroll]    { padding-bottom: 84px !important; }
  }
  @media (max-width: 480px) {
    [data-mac-dock] ul    { gap: 4px !important; }
    [data-mac-dock] a     { width: 40px !important; height: 40px !important; border-radius: 10px !important; }
    [data-mac-dock] a svg { width: 20px !important; height: 20px !important; }
  }
  @media (max-width: 470px) {
    [data-mac-nav]        { display: none !important; }
  }
  [data-mac-dock] a:active { filter: brightness(0.85); }
  [data-mac-dock] li > a:focus-visible { outline-offset: 3px; }
`;

// Dock magnification — icons grow on hover and gently lift their neighbors,
// like the real macOS dock. Pure CSS (sibling selectors + transforms) so it
// stays smooth and layout-stable; skipped entirely when the user prefers
// reduced motion.
const macDockMagnifyCSS = `
  @media (prefers-reduced-motion: no-preference) {
    [data-mac-dock] li > a {
      transition: transform 240ms cubic-bezier(0.25, 1, 0.5, 1), filter 120ms ease;
      transform-origin: bottom center;
    }
    [data-mac-dock] li:hover > a, [data-mac-dock] li:focus-within > a {
      transform: scale(1.4) translateY(-14px);
      z-index: 3;
    }
    [data-mac-dock] li:has(+ li:hover) > a,
    [data-mac-dock] li:hover + li > a {
      transform: scale(1.18) translateY(-7px);
      z-index: 2;
    }
    [data-mac-dock] li:has(+ li + li:hover) > a,
    [data-mac-dock] li:hover + li + li > a {
      transform: scale(1.06) translateY(-3px);
    }
  }
  [data-mac-dock] .mac-dock-tip {
    position: absolute; bottom: calc(100% + 10px); left: 50%; transform: translate(-50%, 4px);
    padding: 4px 9px; border-radius: 7px; white-space: nowrap;
    background: rgba(28,28,30,0.88); color: #fff; font-size: 11px; font-weight: 500;
    opacity: 0; pointer-events: none;
    transition: opacity 140ms ease 60ms, transform 180ms cubic-bezier(.2,.8,.2,1) 60ms;
  }
  [data-mac-dock] li:hover .mac-dock-tip, [data-mac-dock] li:focus-within .mac-dock-tip { opacity: 1; transform: translate(-50%, 0); }
`;

function MacPortfolioShell({ children, route }) {
  const tokens = window.skinTokens.get("mac");
  const navItems = window.portfolioInfo.nav;
  const isHome = route.name === "home";

  return (
    <div style={macStyles.wallpaper}>
      <style>{macResponsiveCSS}</style>

      {/* Top menu bar */}
      <div className="mac-arrive-bar" style={{
        position: "sticky", top: 0, zIndex: 50,
        margin: "10px", padding: "6px 14px",
        background: "rgba(255,255,255,0.55)",
        backdropFilter: tokens.blur, WebkitBackdropFilter: tokens.blur,
        border: `1px solid ${tokens.border}`, borderRadius: "12px",
        display: "flex", alignItems: "center", gap: "16px",
        fontSize: "13px", flexWrap: "nowrap", minWidth: 0,
        boxShadow: "0 1px 2px rgba(15,23,42,0.04)"
      }}>
        <a href="#/" className="mac-nav-link" style={{ display: "inline-flex", alignItems: "center", gap: "8px", textDecoration: "none", color: tokens.text, flexShrink: 0, padding: "3px 8px", margin: "0 0 0 -8px", borderRadius: "6px" }}>
          <span aria-hidden="true" style={{
            width: 14, height: 14, borderRadius: "3px",
            background: "conic-gradient(from 220deg, #0a84ff, #bf5af2, #28c840, #ff9f0a, #0a84ff)"
          }} />
          <span style={{ fontWeight: 600 }}>Dorsfolio</span>
        </a>
        <nav data-mac-nav aria-label="Primary" style={{ display: "flex", gap: "2px", marginLeft: "4px", flexShrink: 0 }}>
          {navItems.slice(1).map((n) => {
            const active =
              (n.href === "#/projects" && (route.name === "projects" || route.name === "case-study")) ||
              (n.href === "#/writing" && (route.name === "writing" || route.name === "writing-post")) ||
              (n.href === "#/" + route.name);
            return (
              <a key={n.href} href={n.href} className="mac-nav-link" aria-current={active ? "page" : undefined} style={{
                padding: "4px 10px", borderRadius: "6px",
                textDecoration: "none", color: tokens.text,
                background: active ? "rgba(15,23,42,0.08)" : "transparent",
                fontWeight: active ? 600 : 400
              }}>{n.label}</a>
            );
          })}
        </nav>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "10px", color: tokens.muted, fontFamily: tokens.monoFont, fontSize: "11px", flexShrink: 0 }}>
          <span data-mac-date>{new Date().toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}</span>
          <window.SkinSwitcher inline />
        </div>
      </div>

      {/* Main content area — windowed */}
      <div data-skin-scroll style={{ flex: 1, padding: "12px clamp(10px, 2vw, 24px) 110px", overflowX: "hidden" }}>
        <div className="mac-arrive-window" style={{
          maxWidth: isHome ? "1100px" : "1080px",
          margin: "0 auto",
          background: "rgba(255,255,255,0.62)",
          backdropFilter: tokens.blur, WebkitBackdropFilter: tokens.blur,
          border: `1px solid ${tokens.border}`,
          borderRadius: "20px",
          boxShadow: "0 30px 80px rgba(15,23,42,0.12), 0 4px 12px rgba(15,23,42,0.06)",
          overflow: "hidden"
        }}>
          <MacWindowChrome title={macTitleFor(route)} />
          <div style={{ padding: "clamp(20px, 3vw, 36px) clamp(20px, 3vw, 40px) clamp(28px, 4vw, 48px)" }}>
            {children}
          </div>
        </div>

        <footer style={{
          maxWidth: "1080px", margin: "20px auto 0",
          padding: "0 8px"
        }}><window.SkinFooter /></footer>
      </div>

      {/* Bottom dock */}
      <div data-mac-dock>
        <MacDock route={route} tokens={tokens} />
      </div>
    </div>
  );
}

function macTitleFor(route) {
  if (route.name === "home") return "Dorsfolio — Home";
  if (route.name === "projects") return "Dorsfolio — Projects";
  if (route.name === "case-study") return `Dorsfolio — ${route.slug}`;
  if (route.name === "about") return "Dorsfolio — About";
  if (route.name === "contact") return "Dorsfolio — Contact";
  if (route.name === "gallery") return "Dorsfolio — Gallery";
  if (route.name === "writing") return "Dorsfolio — Writing";
  if (route.name === "writing-post") return `Dorsfolio — ${route.slug}`;
  return "Dorsfolio";
}

function MacWindowChrome({ title }) {
  const light = (bg) => ({
    width: 12, height: 12, borderRadius: "999px", background: bg,
    boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.18), inset 0 1px 1px rgba(255,255,255,0.35)"
  });
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "8px",
      padding: "12px 16px",
      borderBottom: "1px solid rgba(15,23,42,0.06)",
      background: "linear-gradient(180deg, rgba(255,255,255,0.5), rgba(255,255,255,0.15))"
    }}>
      <span aria-hidden="true" style={{ display: "inline-flex", gap: "6px" }}>
        <span style={light("#ff5f57")} />
        <span style={light("#febc2e")} />
        <span style={light("#28c840")} />
      </span>
      <div style={{ flex: 1, textAlign: "center", fontSize: "12px", color: "#48484a", fontWeight: 500, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{title}</div>
      <span style={{ width: 50 }} aria-hidden="true" />
    </div>
  );
}

function MacDock({ route, tokens }) {
  const items = [
    { id: "home",     href: "#/",          label: "Home",     color: "#0a84ff" },
    { id: "projects", href: "#/projects",  label: "Projects", color: "#bf5af2" },
    { id: "writing",  href: "#/writing",   label: "Writing",  color: "#5e5ce6" },
    { id: "gallery",  href: "#/gallery",   label: "Gallery",  color: "#ff6b6b" },
    { id: "about",    href: "#/about",     label: "About",    color: "#34c759" },
    { id: "contact",  href: "#/contact",   label: "Contact",  color: "#ff9f0a" }
  ];
  return (
    <nav aria-label="Dock" className="mac-arrive-dock" style={{
      position: "fixed", left: "50%", bottom: "16px",
      transform: "translateX(-50%)",
      maxWidth: "calc(100vw - 32px)",
      zIndex: 60,
      padding: "8px",
      background: "rgba(255,255,255,0.6)",
      backdropFilter: tokens.blur, WebkitBackdropFilter: tokens.blur,
      border: `1px solid ${tokens.border}`,
      borderRadius: "20px",
      boxShadow: "0 14px 40px rgba(15,23,42,0.15)"
    }}>
      <style>{macDockMagnifyCSS}</style>
      <ul style={{ display: "flex", gap: "6px", padding: 0, margin: 0, listStyle: "none" }}>
        {items.map((it) => {
          const active =
            (it.id === "home" && route.name === "home") ||
            (it.id === "projects" && (route.name === "projects" || route.name === "case-study")) ||
            (it.id === "writing" && (route.name === "writing" || route.name === "writing-post")) ||
            (it.id === route.name);
          return (
            <li key={it.id} style={{ position: "relative" }}>
              <a href={it.href} aria-label={it.label} aria-current={active ? "page" : undefined} style={{
                position: "relative",
                width: 48, height: 48,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: `linear-gradient(160deg, ${it.color} 0%, ${it.color}b8 100%)`,
                color: "#fff",
                borderRadius: "12px",
                textDecoration: "none",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.4), inset 0 -8px 12px rgba(0,0,0,0.08), 0 6px 14px rgba(15,23,42,0.18)"
              }}>
                <window.Icon name={window.NAV_ICONS[it.id]} size={24} filled skin="mac"
                  style={{ filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.18))" }} />
                {active && (
                  <span aria-hidden="true" style={{
                    position: "absolute", bottom: "-7px", left: "50%", transform: "translateX(-50%)",
                    width: 4, height: 4, borderRadius: "999px", background: "#1c1c1e"
                  }} />
                )}
              </a>
              <span className="mac-dock-tip" aria-hidden="true">{it.label}</span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

// ---- Project card --------------------------------------------------------
function MacProjectCard({ project, tokens }) {
  return (
    <a
      href={`#/projects/${project.slug}`}
      className="ds-card"
      style={{
        display: "block",
        textDecoration: "none",
        background: "rgba(255,255,255,0.78)",
        border: `1px solid ${tokens.border}`,
        borderRadius: "16px",
        overflow: "hidden",
        color: tokens.text,
        boxShadow: "0 6px 18px rgba(15,23,42,0.08)"
      }}
    >
      {/* mini window header */}
      <div style={{
        display: "flex", alignItems: "center", gap: "6px",
        padding: "10px 12px",
        background: "linear-gradient(180deg, rgba(255,255,255,0.5), rgba(255,255,255,0.05))",
        borderBottom: "1px solid rgba(15,23,42,0.06)"
      }}>
        <span style={{ width: 10, height: 10, borderRadius: "999px", background: "#ff5f57" }} />
        <span style={{ width: 10, height: 10, borderRadius: "999px", background: "#febc2e" }} />
        <span style={{ width: 10, height: 10, borderRadius: "999px", background: "#28c840" }} />
        <span style={{ marginLeft: "8px", fontSize: "11px", color: tokens.muted, fontFamily: tokens.monoFont }}>
          {project.slug}.app
        </span>
      </div>
      <div style={{ aspectRatio: "16/9", background: tokens.surfaceAlt || tokens.surfaceSolid, overflow: "hidden" }}>
        <window.ProjectImage
          src={project.coverImage}
          slug={project.slug}
          label={project.title}
          accent={project.accent}
          alt={project.title}
          className="ds-card-img"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>
      <div style={{ padding: "16px 18px 18px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
          <span style={{ width: 8, height: 8, borderRadius: "999px", background: project.accent || tokens.accent }} />
          <span style={{ fontFamily: tokens.monoFont, fontSize: "11px", color: tokens.muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            {project.category} · {project.year}
          </span>
        </div>
        <div style={{ fontFamily: tokens.displayFont || tokens.font, fontSize: "19px", fontWeight: 600, marginBottom: "6px", letterSpacing: "-0.01em" }}>
          {project.title}
        </div>
        <div style={{ fontFamily: tokens.font, fontSize: "14px", color: tokens.muted, lineHeight: 1.45, textWrap: "pretty" }}>
          {project.subtitle}
        </div>
      </div>
    </a>
  );
}

// ---- Case study layout ---------------------------------------------------
function MacCaseStudyLayout({ project }) {
  const tokens = window.skinTokens.get("mac");
  return (
    <article>
      <div style={{ marginBottom: "24px" }}>
        <nav aria-label="Breadcrumb" style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
          <a href="#/projects" className="ds-link" style={{ fontSize: "13px", color: tokens.accent, display: "inline-flex", alignItems: "center", gap: "4px" }}>
            <window.Icon name="arrowLeft" size={14} skin="mac" /> Projects
          </a>
          <span style={{ color: tokens.muted, fontSize: "13px" }}>/</span>
          <span style={{ fontFamily: tokens.monoFont, fontSize: "12px", color: tokens.muted }}>{project.slug}</span>
        </nav>
        <h1 style={{
          fontFamily: tokens.displayFont || tokens.font,
          fontSize: "clamp(34px, 5vw, 52px)",
          lineHeight: 1.05,
          letterSpacing: "-0.02em",
          fontWeight: 600,
          margin: "0 0 12px",
          color: tokens.text,
          textWrap: "balance"
        }}>{project.title}</h1>
        <div style={{ fontFamily: tokens.font, fontSize: "clamp(17px, 2vw, 19px)", color: tokens.muted, lineHeight: 1.5, maxWidth: "60ch", textWrap: "pretty" }}>
          {project.subtitle}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "14px" }}>
          <span style={{ width: 8, height: 8, borderRadius: "999px", background: project.accent || tokens.accent }} />
          <span style={{ fontFamily: tokens.monoFont, fontSize: "11px", color: tokens.muted, textTransform: "uppercase", letterSpacing: "0.12em" }}>
            {project.category} · {project.year} · {project.status}
          </span>
        </div>

        {/* hero image — glass window */}
        <div style={{
          marginTop: "28px",
          borderRadius: "16px",
          overflow: "hidden",
          border: `1px solid ${tokens.border}`,
          boxShadow: "0 24px 60px rgba(15,23,42,0.15)",
          background: tokens.surfaceSolid
        }}>
          <window.ProjectImage
            src={project.coverImage}
            slug={project.slug}
            label={project.title}
            accent={project.accent}
            alt={project.title}
            onClick={() => window.lightboxOpen && window.lightboxOpen([{ src: window.resolveAsset(project.coverImage), alt: project.title }], 0)}
            style={{ width: "100%", aspectRatio: "16/8", objectFit: "cover", display: "block" }}
          />
        </div>

        {/* tag pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "16px" }}>
          {(project.tags || []).map((t) => (
            <span key={t} style={{
              padding: "4px 10px", borderRadius: "999px",
              background: "rgba(15,23,42,0.06)",
              fontFamily: tokens.monoFont, fontSize: "11px", color: tokens.text
            }}>{t}</span>
          ))}
        </div>
      </div>

      {/* meta row */}
      <div style={{
        padding: "16px 18px",
        background: "rgba(255,255,255,0.55)",
        border: `1px solid ${tokens.border}`,
        borderRadius: "12px",
        marginBottom: "8px"
      }}>
        <window.CaseStudyMeta project={project} tokens={tokens} variant="row" />
      </div>

      <window.CaseStudySections project={project} tokens={tokens} />
      <window.RelatedProjects slug={project.slug} tokens={tokens} />
    </article>
  );
}

Object.assign(window, { MacPortfolioShell, MacProjectCard, MacCaseStudyLayout });
