// =============================================================================
// MATERIAL YOU skin — soft cards, expressive color, pill nav, FAB
// =============================================================================

function MaterialPortfolioShell({ children, route }) {
  const tokens = window.skinTokens.get("material");
  const navItems = [
    { id: "home",     href: "#/",         label: "Home",     glyph: "⌂" },
    { id: "projects", href: "#/projects", label: "Projects", glyph: "▦" },
    { id: "gallery",  href: "#/gallery",  label: "Gallery",  glyph: "⊞" },
    { id: "about",    href: "#/about",    label: "About",    glyph: "★" },
    { id: "contact",  href: "#/contact",  label: "Contact",  glyph: "✉" }
  ];

  const isActive = (id) =>
    (id === "home" && route.name === "home") ||
    (id === "projects" && (route.name === "projects" || route.name === "case-study")) ||
    (id === route.name);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #fef7ff 0%, #f7f2fa 100%)",
      fontFamily: tokens.font, color: tokens.text,
      display: "flex", flexDirection: "column"
    }}>
      {/* Top bar */}
      <header style={{
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
            <a key={n.id} href={n.href} style={{
              padding: "8px 16px",
              borderRadius: "999px",
              textDecoration: "none",
              fontSize: "14px", fontWeight: 500,
              background: isActive(n.id) ? "#e8def8" : "transparent",
              color: isActive(n.id) ? "#21005d" : tokens.text
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
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>{children}</div>

        <footer style={{
          maxWidth: "1080px", margin: "60px auto 0"
        }}><window.SkinFooter /></footer>
      </div>

      {/* Mobile bottom nav */}
      <nav aria-label="Mobile" className="material-bottom-nav" style={{
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
        {navItems.map((n) => (
          <a key={n.id} href={n.href} style={{
            padding: "10px 6px",
            borderRadius: "999px",
            textDecoration: "none",
            textAlign: "center",
            fontSize: "12px", fontWeight: 600,
            background: isActive(n.id) ? "#e8def8" : "transparent",
            color: isActive(n.id) ? "#21005d" : tokens.text
          }}>
            <div style={{ fontSize: "16px", lineHeight: 1 }}>{n.glyph}</div>
            <div style={{ marginTop: "2px" }}>{n.label}</div>
          </a>
        ))}
      </nav>

      {/* FAB */}
      <a href="#/contact" aria-label="Contact" title="Contact" className="material-fab" style={{
        position: "fixed", right: "20px", bottom: "100px",
        width: 56, height: 56,
        background: "#7d5260", color: "#fff",
        borderRadius: "18px",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        textDecoration: "none",
        boxShadow: "0 6px 16px rgba(125,82,96,0.4)",
        fontSize: "22px",
        zIndex: 70
      }}>
        ✉
        <span aria-hidden="true" style={{
          position: "absolute", inset: 0,
          borderRadius: "18px",
          border: "2px solid #7d5260",
          animation: "pulseRing 2.4s ease-out 1.5s infinite",
          pointerEvents: "none"
        }} />
      </a>

      <style>{`
        @media (max-width: 720px) {
          .material-pill-nav { display: none !important; }
          .material-bottom-nav { display: grid !important; }
          .material-fab { bottom: 96px !important; }
          [data-skin-scroll] { padding-bottom: 190px !important; }
        }
        @media (max-width: 400px) {
          .material-bottom-nav a > div:last-child { display: none !important; }
          .material-bottom-nav a { padding: 14px 4px !important; }
        }
      `}</style>
    </div>
  );
}

// ---- Project card --------------------------------------------------------
function MaterialProjectCard({ project, tokens }) {
  const [hover, setHover] = React.useState(false);
  const reduced = window.useReducedMotion();
  const accent = project.accent || tokens.accent;
  return (
    <a
      href={`#/projects/${project.slug}`}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: "block", textDecoration: "none", color: tokens.text,
        borderRadius: "28px", overflow: "hidden",
        background: "#fff",
        border: `1px solid ${tokens.border}`,
        boxShadow: hover
          ? "0 10px 28px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.06)"
          : "0 1px 3px rgba(0,0,0,0.08)",
        transform: hover && !reduced ? "translateY(-2px)" : "none",
        transition: reduced ? "none" : "transform 220ms cubic-bezier(.2,.8,.2,1), box-shadow 220ms ease"
      }}
    >
      <div style={{
        background: `linear-gradient(135deg, ${accent}33 0%, ${accent}10 100%)`,
        padding: "16px"
      }}>
        <div style={{
          borderRadius: "20px", overflow: "hidden",
          aspectRatio: "16/10"
        }}>
          <window.ProjectImage src={project.coverImage} slug={project.slug} label={project.title} accent={accent} alt={project.title} style={{
            width: "100%", height: "100%", objectFit: "cover", display: "block",
            transform: hover && !reduced ? "scale(1.04)" : "scale(1)",
            transition: reduced ? "none" : "transform 350ms cubic-bezier(.2,.8,.2,1)"
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
          marginTop: "16px", display: "inline-flex", alignItems: "center", gap: "8px",
          padding: "8px 16px", borderRadius: "999px",
          background: "#e8def8", color: "#21005d",
          fontSize: "13px", fontWeight: 600
        }}>Open project →</div>
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
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px", fontSize: "13px" }}>
        <a href="#/projects" style={{ color: accent, textDecoration: "none", fontWeight: 500 }}>← Projects</a>
      </div>

      {/* Tall hero card */}
      <div style={{
        background: `linear-gradient(135deg, ${accent}30 0%, ${accent}10 60%, transparent 100%)`,
        borderRadius: "28px",
        padding: "clamp(20px, 3vw, 32px)",
        marginBottom: "24px",
        border: `1px solid ${accent}30`
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          padding: "4px 12px", borderRadius: "999px",
          background: "#fff", color: accent,
          fontSize: "11px", fontWeight: 600, letterSpacing: "0.04em",
          marginBottom: "16px",
          border: `1px solid ${accent}40`
        }}>{project.category} · {project.year} · {project.status}</div>

        <h1 style={{
          fontFamily: tokens.displayFont,
          fontSize: "clamp(34px, 5vw, 52px)",
          lineHeight: 1.05, letterSpacing: "-0.02em",
          fontWeight: 600, margin: "0 0 12px",
          color: tokens.text, textWrap: "balance"
        }}>{project.title}</h1>
        <div style={{ fontFamily: tokens.font, fontSize: "clamp(17px, 2vw, 19px)", color: tokens.muted, lineHeight: 1.5, maxWidth: "60ch", textWrap: "pretty", marginBottom: "20px" }}>
          {project.subtitle}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
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
          <window.ProjectImage src={project.coverImage} slug={project.slug} label={project.title} accent={accent} alt={project.title} onClick={() => window.lightboxOpen && window.lightboxOpen([{ src: project.coverImage, alt: project.title }], 0)} style={{ width: "100%", aspectRatio: "16/8", objectFit: "cover", display: "block" }} />
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
