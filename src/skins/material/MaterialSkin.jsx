// =============================================================================
// MATERIAL YOU skin — soft cards, expressive color, pill nav, FAB
// Feedback follows Material 3: a state layer on hover/focus/press and a
// ripple from the pointer on press (window.m3Ripple), emphasized easing.
// =============================================================================

const M3_NAV = [
  { id: "home",     href: "#/",         label: "Home" },
  { id: "projects", href: "#/projects", label: "Projects" },
  { id: "writing",  href: "#/writing",  label: "Writing" },
  { id: "gallery",  href: "#/gallery",  label: "Gallery" },
  { id: "about",    href: "#/about",    label: "About" },
  { id: "contact",  href: "#/contact",  label: "Contact" }
];

function MaterialPortfolioShell({ children, route }) {
  const tokens = window.skinTokens.get("material");
  const navItems = M3_NAV;

  const isActive = (id) =>
    (id === "home" && route.name === "home") ||
    (id === "projects" && (route.name === "projects" || route.name === "case-study")) ||
    (id === "writing" && (route.name === "writing" || route.name === "writing-post")) ||
    (id === route.name);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #fef7ff 0%, #f7f2fa 100%)",
      fontFamily: tokens.font, color: tokens.text,
      display: "flex", flexDirection: "column"
    }}>
      {/* Top bar */}
      <header className="m3-arrive-bar" style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "#fef7ffd0",
        backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
        padding: "14px clamp(16px, 4vw, 32px)",
        display: "flex", alignItems: "center", gap: "16px",
        borderBottom: `1px solid ${tokens.border}`
      }}>
        <a href="#/" style={{ display: "inline-flex", alignItems: "center", gap: "10px", textDecoration: "none", color: tokens.text }}>
          <span aria-hidden="true" style={{
            width: 32, height: 32, borderRadius: "10px",
            background: "linear-gradient(135deg, #6750a4 0%, #7d5260 100%)",
            color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center",
            fontFamily: tokens.displayFont, fontWeight: 700, fontSize: "16px"
          }}>D</span>
          <div>
            <div style={{ fontFamily: tokens.displayFont, fontWeight: 600, fontSize: "18px", letterSpacing: "-0.01em" }}>Dorsfolio</div>
          </div>
        </a>
        <nav aria-label="Primary" className="material-pill-nav" style={{
          marginLeft: "auto",
          display: "flex", gap: "4px", padding: "4px",
          background: "#fff",
          borderRadius: "999px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          border: `1px solid ${tokens.border}`
        }}>
          {navItems.map((n) => (
            <a key={n.id} href={n.href} className="m3-state" onPointerDown={window.m3Ripple}
              aria-current={isActive(n.id) ? "page" : undefined}
              style={{
                padding: "8px 16px",
                borderRadius: "999px",
                textDecoration: "none",
                fontSize: "14px", fontWeight: 500,
                background: isActive(n.id) ? "#e8def8" : "transparent",
                color: isActive(n.id) ? "#21005d" : tokens.text,
                transition: "background 200ms cubic-bezier(0.2, 0, 0, 1), color 200ms cubic-bezier(0.2, 0, 0, 1)"
              }}>{n.label}</a>
          ))}
        </nav>
        <window.SkinSwitcher inline />
      </header>

      {/* Main content */}
      <div data-skin-scroll style={{
        flex: 1, padding: "clamp(20px, 4vw, 48px) clamp(16px, 4vw, 32px) 120px",
        overflowX: "hidden"
      }}>
        <div className="m3-arrive-content" style={{ maxWidth: "1080px", margin: "0 auto" }}>{children}</div>

        <footer style={{
          maxWidth: "1080px", margin: "60px auto 0"
        }}><window.SkinFooter /></footer>
      </div>

      {/* Mobile bottom nav */}
      <nav aria-label="Mobile" className="material-bottom-nav m3-arrive-bottom" style={{
        position: "fixed", left: "16px", right: "16px", bottom: "16px",
        background: "#fff",
        borderRadius: "28px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
        border: `1px solid ${tokens.border}`,
        padding: "6px",
        display: "none",
        gridTemplateColumns: `repeat(${navItems.length}, 1fr)`,
        gap: "4px",
        zIndex: 60
      }}>
        {navItems.map((n) => {
          const active = isActive(n.id);
          return (
            <a key={n.id} href={n.href} className="m3-state" onPointerDown={window.m3Ripple}
              aria-current={active ? "page" : undefined}
              aria-label={n.label}
              style={{
                padding: "8px 4px 6px",
                borderRadius: "20px",
                textDecoration: "none",
                textAlign: "center",
                fontSize: "11px", fontWeight: 600,
                color: active ? "#21005d" : tokens.muted,
                display: "flex", flexDirection: "column", alignItems: "center", gap: "4px",
                transition: "color 200ms cubic-bezier(0.2, 0, 0, 1)"
              }}>
              <span aria-hidden="true" style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                width: 48, height: 28, borderRadius: "999px",
                background: active ? "#e8def8" : "transparent",
                transition: "background 240ms cubic-bezier(0.2, 0, 0, 1)"
              }}>
                <window.Icon name={window.NAV_ICONS[n.id]} size={20} filled={active} skin="material" />
              </span>
              <span className="material-bottom-label">{n.label}</span>
            </a>
          );
        })}
      </nav>

      {/* FAB */}
      <a href="#/contact" aria-label="Contact" title="Contact" className="material-fab m3-state m3-arrive-fab" onPointerDown={window.m3Ripple} style={{
        position: "fixed", right: "20px", bottom: "100px",
        width: 56, height: 56,
        background: "#7d5260", color: "#fff",
        borderRadius: "18px",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        textDecoration: "none",
        boxShadow: "0 6px 16px rgba(125,82,96,0.4)",
        zIndex: 70,
        transition: "box-shadow 200ms cubic-bezier(0.2, 0, 0, 1), transform 200ms cubic-bezier(0.2, 0, 0, 1)"
      }}>
        <window.Icon name="mail" size={24} filled skin="material" />
      </a>

      <style>{`
        .material-fab:hover { box-shadow: 0 10px 24px rgba(125,82,96,0.45) !important; }
        .material-fab:active { transform: scale(0.96); }
        @media (max-width: 720px) {
          .material-pill-nav { display: none !important; }
          .material-bottom-nav { display: grid !important; }
          .material-fab { bottom: 96px !important; }
          [data-skin-scroll] { padding-bottom: 190px !important; }
        }
        @media (max-width: 400px) {
          .material-bottom-label { display: none !important; }
          .material-bottom-nav a { padding: 8px 2px !important; }
        }
      `}</style>
    </div>
  );
}

// ---- Project card --------------------------------------------------------
function MaterialProjectCard({ project, tokens }) {
  const accent = project.accent || tokens.accent;
  return (
    <a
      href={`#/projects/${project.slug}`}
      className="ds-card m3-state"
      onPointerDown={window.m3Ripple}
      style={{
        display: "block", textDecoration: "none", color: tokens.text,
        borderRadius: "28px", overflow: "hidden",
        background: "#fff",
        border: `1px solid ${tokens.border}`,
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)"
      }}
    >
      <div style={{
        background: `linear-gradient(135deg, ${accent}33 0%, ${accent}10 100%)`,
        padding: "16px"
      }}>
        <div style={{
          borderRadius: "20px", overflow: "hidden",
          aspectRatio: "16/10", background: "#fff"
        }}>
          <window.ProjectImage src={project.coverImage} slug={project.slug} label={project.title} accent={accent} alt={project.title} className="ds-card-img" style={{
            width: "100%", height: "100%", objectFit: "cover", display: "block"
          }} />
        </div>
      </div>
      <div style={{ padding: "16px 20px 20px" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          padding: "4px 10px", borderRadius: "999px",
          background: `${accent}1a`, color: accent,
          fontSize: "11px", fontWeight: 600, letterSpacing: "0.04em",
          marginBottom: "12px"
        }}>{project.category}</div>
        <div style={{ fontFamily: tokens.displayFont, fontSize: "20px", fontWeight: 600, marginBottom: "6px", letterSpacing: "-0.01em" }}>
          {project.title}
        </div>
        <div style={{ fontFamily: tokens.font, fontSize: "14px", color: tokens.muted, lineHeight: 1.5, textWrap: "pretty" }}>
          {project.subtitle}
        </div>
        <div style={{
          marginTop: "16px", display: "inline-flex", alignItems: "center", gap: "6px",
          padding: "8px 14px 8px 16px", borderRadius: "999px",
          background: "#e8def8", color: "#21005d",
          fontSize: "13px", fontWeight: 600
        }}>Open project <window.Icon name="arrowRight" size={16} skin="material" /></div>
      </div>
    </a>
  );
}

// ---- Case Study Layout ---------------------------------------------------
function MaterialCaseStudyLayout({ project }) {
  const tokens = window.skinTokens.get("material");
  const accent = project.accent || tokens.accent;
  return (
    <article>
      {/* breadcrumb */}
      <nav aria-label="Breadcrumb" style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px", fontSize: "13px" }}>
        <a href="#/projects" className="m3-state" onPointerDown={window.m3Ripple} style={{ color: accent, textDecoration: "none", fontWeight: 500, display: "inline-flex", alignItems: "center", gap: "4px", padding: "6px 12px 6px 8px", margin: "-6px 0 0 -8px", borderRadius: "999px" }}>
          <window.Icon name="arrowLeft" size={16} skin="material" /> Projects
        </a>
      </nav>

      {/* Tall hero card */}
      <div style={{
        background: `linear-gradient(135deg, ${accent}30 0%, ${accent}10 60%, transparent 100%)`,
        borderRadius: "28px",
        padding: "clamp(20px, 3vw, 32px)",
        marginBottom: "24px",
        border: `1px solid ${accent}30`
      }}>
        <h1 style={{
          fontFamily: tokens.displayFont,
          fontSize: "clamp(34px, 5vw, 52px)",
          lineHeight: 1.05, letterSpacing: "-0.02em",
          fontWeight: 600, margin: "0 0 12px",
          color: tokens.text, textWrap: "balance"
        }}>{project.title}</h1>
        <div style={{ fontFamily: tokens.font, fontSize: "clamp(17px, 2vw, 19px)", color: tokens.muted, lineHeight: 1.5, maxWidth: "60ch", textWrap: "pretty", marginBottom: "16px" }}>
          {project.subtitle}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px", alignItems: "center" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "4px 12px", borderRadius: "999px",
            background: "#fff", color: accent,
            fontSize: "11px", fontWeight: 600, letterSpacing: "0.04em",
            border: `1px solid ${accent}40`
          }}>{project.category} · {project.year} · {project.status}</span>
          {(project.tags || []).map((t) => (
            <span key={t} style={{
              padding: "4px 12px", borderRadius: "999px",
              background: "#fff", color: tokens.text,
              fontSize: "12px", fontWeight: 500,
              border: `1px solid ${tokens.border}`
            }}>{t}</span>
          ))}
        </div>

        <div style={{
          borderRadius: "20px", overflow: "hidden",
          background: "#fff",
          boxShadow: "0 6px 24px rgba(0,0,0,0.08)"
        }}>
          <window.ProjectImage src={project.coverImage} slug={project.slug} label={project.title} accent={accent} alt={project.title} onClick={() => window.lightboxOpen && window.lightboxOpen([{ src: window.resolveAsset(project.coverImage), alt: project.title }], 0)} style={{ width: "100%", aspectRatio: "16/8", objectFit: "cover", display: "block" }} />
        </div>
      </div>

      {/* Meta as chips row */}
      <div style={{
        background: "#fff",
        borderRadius: "24px",
        border: `1px solid ${tokens.border}`,
        padding: "18px 22px",
        marginBottom: "8px"
      }}>
        <window.CaseStudyMeta project={project} tokens={tokens} variant="row" />
      </div>

      <window.CaseStudySections project={project} tokens={tokens} />
      <window.RelatedProjects slug={project.slug} tokens={tokens} />
    </article>
  );
}

Object.assign(window, { MaterialPortfolioShell, MaterialProjectCard, MaterialCaseStudyLayout });
