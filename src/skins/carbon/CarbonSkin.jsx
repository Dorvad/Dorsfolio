// =============================================================================
// IBM CARBON skin — dark, structured, sidebar nav, grid
// =============================================================================

function CarbonPortfolioShell({ children, route }) {
  const tokens = window.skinTokens.get("carbon");
  const [navOpen, setNavOpen] = React.useState(false);
  const navItems = [
    { id: "home",     href: "#/",         label: "Home" },
    { id: "projects", href: "#/projects", label: "Projects" },
    { id: "gallery",  href: "#/gallery",  label: "Gallery" },
    { id: "about",    href: "#/about",    label: "About" },
    { id: "contact",  href: "#/contact",  label: "Contact" }
  ];
  const isActive = (id) =>
    (id === "home" && route.name === "home") ||
    (id === "projects" && (route.name === "projects" || route.name === "case-study")) ||
    (id === route.name);

  return (
    <div style={{
      minHeight: "100vh", background: "#161616",
      color: tokens.text, fontFamily: tokens.font,
      display: "grid", gridTemplateRows: "48px 1fr"
    }}>
      {/* Header bar */}
      <header style={{
        position: "sticky", top: 0, zIndex: 60,
        height: "48px",
        background: "#161616",
        borderBottom: `1px solid ${tokens.border}`,
        display: "flex", alignItems: "center",
        padding: "0 0 0 0"
      }}>
        <button
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setNavOpen((v) => !v)}
          className="carbon-burger"
          style={{
            width: 48, height: 48,
            background: "transparent", color: tokens.text,
            border: "none", borderRight: `1px solid ${tokens.border}`,
            cursor: "pointer",
            display: "none",
            alignItems: "center", justifyContent: "center",
            fontSize: "18px"
          }}>≡</button>
        <a href="#/" style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          padding: "0 16px", height: "48px",
          color: tokens.text, textDecoration: "none"
        }}>
          <span style={{ fontFamily: tokens.monoFont, fontSize: "11px", color: tokens.muted }}>Dor</span>
          <span style={{ fontWeight: 600, fontSize: "15px" }}>Dorsfolio</span>
        </a>
        <nav className="carbon-top-nav" style={{ display: "flex", height: "48px", marginLeft: "8px" }}>
          {navItems.map((n) => (
            <a key={n.id} href={n.href} style={{
              padding: "0 16px", height: "48px",
              display: "inline-flex", alignItems: "center",
              color: isActive(n.id) ? tokens.text : tokens.muted,
              textDecoration: "none",
              fontSize: "14px",
              borderBottom: isActive(n.id) ? `3px solid ${tokens.accent}` : "3px solid transparent",
              fontWeight: isActive(n.id) ? 600 : 400
            }}>{n.label}</a>
          ))}
        </nav>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", height: "48px", paddingRight: "8px" }}>
          <window.SkinSwitcher inline />
        </div>
      </header>

      {/* Body row */}
      <div style={{ display: "grid", gridTemplateColumns: "240px 1fr" }} className="carbon-body">
        {/* Side rail */}
        <aside className="carbon-side" style={{
          background: "#161616",
          borderRight: `1px solid ${tokens.border}`,
          padding: "16px 0",
          height: "calc(100vh - 48px)",
          position: "sticky", top: "48px",
          overflowY: "auto"
        }}>
          <div style={{ padding: "0 16px 8px", fontFamily: tokens.monoFont, fontSize: "11px", color: tokens.muted, textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Navigate
          </div>
          {navItems.map((n) => (
            <a key={n.id} href={n.href} onClick={() => setNavOpen(false)} style={{
              display: "flex", alignItems: "center",
              padding: "10px 16px",
              borderLeft: isActive(n.id) ? `3px solid ${tokens.accent}` : "3px solid transparent",
              background: isActive(n.id) ? tokens.surface : "transparent",
              color: tokens.text,
              fontSize: "14px",
              textDecoration: "none"
            }}>{n.label}</a>
          ))}

          <div style={{ height: 1, background: tokens.border, margin: "16px 0" }} />

          <div style={{ padding: "0 16px 8px", fontFamily: tokens.monoFont, fontSize: "11px", color: tokens.muted, textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Projects
          </div>
          {(window.caseStudies || []).map((p) => {
            const active = route.name === "case-study" && route.slug === p.slug;
            return (
              <a key={p.slug} href={`#/projects/${p.slug}`} onClick={() => setNavOpen(false)} style={{
                display: "flex", alignItems: "center", gap: "10px",
                padding: "8px 16px",
                borderLeft: active ? `3px solid ${tokens.accent}` : "3px solid transparent",
                background: active ? tokens.surface : "transparent",
                color: active ? tokens.text : tokens.muted,
                fontSize: "13px",
                textDecoration: "none"
              }}>
                <span style={{ width: 6, height: 6, background: p.accent || tokens.accent }} />
                {p.title}
              </a>
            );
          })}
        </aside>

        {/* Main */}
        <main data-skin-scroll style={{
          padding: "clamp(20px, 3vw, 40px) clamp(16px, 3vw, 40px) 64px",
          minWidth: 0
        }}>
          <div style={{ maxWidth: "1080px" }}>{children}</div>

          <footer style={{
            marginTop: "60px", paddingTop: "16px",
            borderTop: `1px solid ${tokens.border}`
          }}><window.SkinFooter /></footer>
        </main>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .carbon-top-nav { display: none !important; }
          .carbon-burger { display: flex !important; }
          .carbon-body { grid-template-columns: 1fr !important; }
          .carbon-side { display: ${navOpen ? "block" : "none"} !important; position: fixed !important; top: 48px; left: 0; right: 0; height: auto !important; max-height: calc(100vh - 48px); width: 100% !important; z-index: 80; }
        }
      `}</style>
    </div>
  );
}

// ---- Project card --------------------------------------------------------
function CarbonProjectCard({ project, tokens }) {
  const [hover, setHover] = React.useState(false);
  const reduced = window.useReducedMotion();
  const accent = project.accent || tokens.accent;
  return (
    <a
      href={`#/projects/${project.slug}`}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: "grid", gridTemplateRows: "auto 1fr auto",
        textDecoration: "none", color: tokens.text,
        background: hover ? tokens.surfaceAlt : tokens.surface,
        border: `1px solid ${tokens.border}`,
        borderLeft: `3px solid ${hover ? accent : accent + "88"}`,
        transition: reduced ? "none" : "background 180ms ease, border-left-color 180ms ease",
        minHeight: "100%"
      }}
    >
      <div style={{ background: "#0c0c0c", overflow: "hidden" }}>
        <window.ProjectImage src={project.coverImage} slug={project.slug} label={project.title} accent={project.accent} alt={project.title} style={{
          width: "100%", aspectRatio: "16/9", objectFit: "cover", display: "block", opacity: 0.95,
          transform: hover && !reduced ? "scale(1.04)" : "scale(1)",
          transition: reduced ? "none" : "transform 350ms cubic-bezier(.2,.8,.2,1)"
        }} />
      </div>
      <div style={{ padding: "16px 18px" }}>
        <div style={{ fontFamily: tokens.monoFont, fontSize: "11px", color: tokens.muted, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px" }}>
          {project.year} / {project.category}
        </div>
        <div style={{ fontFamily: tokens.font, fontSize: "18px", fontWeight: 600, marginBottom: "6px", letterSpacing: "0" }}>
          {project.title}
        </div>
        <div style={{ fontFamily: tokens.font, fontSize: "13px", color: tokens.muted, lineHeight: 1.5, textWrap: "pretty" }}>
          {project.subtitle}
        </div>
      </div>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "12px 18px",
        borderTop: `1px solid ${tokens.border}`,
        fontFamily: tokens.monoFont, fontSize: "11px",
        color: tokens.muted,
        letterSpacing: "0.06em"
      }}>
        <span>{project.status}</span>
        <span style={{ color: tokens.accent }}>OPEN →</span>
      </div>
    </a>
  );
}

// ---- Case Study Layout ---------------------------------------------------
function CarbonCaseStudyLayout({ project }) {
  const tokens = window.skinTokens.get("carbon");
  return (
    <article>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" style={{
        fontFamily: tokens.monoFont, fontSize: "11px",
        color: tokens.muted, marginBottom: "16px",
        textTransform: "uppercase", letterSpacing: "0.08em",
        display: "flex", gap: "10px"
      }}>
        <a href="#/" style={{ color: tokens.muted, textDecoration: "none" }}>Home</a>
        <span>/</span>
        <a href="#/projects" style={{ color: tokens.muted, textDecoration: "none" }}>Projects</a>
        <span>/</span>
        <span style={{ color: tokens.text }}>{project.slug}</span>
      </nav>

      {/* Hero block with metadata column */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0", marginBottom: "0" }}>
        <div style={{
          background: tokens.surface,
          borderTop: `3px solid ${project.accent || tokens.accent}`,
          borderBottom: `1px solid ${tokens.border}`,
          padding: "clamp(20px, 3vw, 36px)"
        }}>
          <div style={{ fontFamily: tokens.monoFont, fontSize: "11px", color: project.accent || tokens.accent, marginBottom: "12px", letterSpacing: "0.12em", textTransform: "uppercase" }}>
            {project.category} · {project.year}
          </div>
          <h1 style={{
            fontFamily: tokens.font,
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 300,
            lineHeight: 1.1,
            margin: "0 0 12px",
            letterSpacing: "0",
            color: tokens.text,
            textWrap: "balance"
          }}>{project.title}</h1>
          <div style={{ fontFamily: tokens.font, fontSize: "clamp(16px, 1.8vw, 18px)", color: tokens.muted, lineHeight: 1.5, maxWidth: "60ch", textWrap: "pretty" }}>
            {project.subtitle}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0", marginTop: "20px" }}>
            {(project.tags || []).map((t) => (
              <span key={t} style={{
                padding: "4px 10px",
                background: "#393939", color: tokens.text,
                fontSize: "11px", fontFamily: tokens.monoFont,
                marginRight: "4px", marginBottom: "4px",
                letterSpacing: "0.04em"
              }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Cover image */}
        <div style={{ borderBottom: `1px solid ${tokens.border}` }}>
          <window.ProjectImage src={project.coverImage} slug={project.slug} label={project.title} accent={project.accent} alt={project.title} style={{ width: "100%", aspectRatio: "16/7", objectFit: "cover", display: "block" }} />
        </div>

        {/* Meta dashboard row */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          background: tokens.surface,
          borderBottom: `1px solid ${tokens.border}`
        }}>
          {[
            { k: "Role", v: project.role },
            { k: "Year", v: project.year },
            { k: "Category", v: project.category },
            { k: "Status", v: project.status }
          ].filter((r) => r.v).map((r, i) => (
            <div key={r.k} style={{
              padding: "16px 18px",
              borderRight: `1px solid ${tokens.border}`,
              minWidth: 0
            }}>
              <div style={{ fontFamily: tokens.monoFont, fontSize: "11px", color: tokens.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>{r.k}</div>
              <div style={{ fontFamily: tokens.font, fontSize: "14px", color: tokens.text, fontWeight: 500 }}>{r.v}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "clamp(20px, 3vw, 32px) 0 0" }}>
        <window.CaseStudySections project={project} tokens={tokens} />
        <window.RelatedProjects slug={project.slug} tokens={tokens} />
      </div>
    </article>
  );
}

Object.assign(window, { CarbonPortfolioShell, CarbonProjectCard, CarbonCaseStudyLayout });
