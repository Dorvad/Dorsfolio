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
    display: "flex", flexDirection: "column"
  }
};

function MacPortfolioShell({ children, route }) {
  const tokens = window.skinTokens.get("mac");
  const navItems = window.portfolioInfo.nav;
  const isHome = route.name === "home";

  return (
    <div style={macStyles.wallpaper}>
      {/* Top menu bar */}
      <div style={{
        position: "sticky", top: 0, zIndex: 50,
        margin: "10px", padding: "6px 14px",
        background: "rgba(255,255,255,0.55)",
        backdropFilter: tokens.blur, WebkitBackdropFilter: tokens.blur,
        border: `1px solid ${tokens.border}`, borderRadius: "12px",
        display: "flex", alignItems: "center", gap: "16px",
        fontSize: "13px"
      }}>
        <a href="#/" style={{ display: "inline-flex", alignItems: "center", gap: "8px", textDecoration: "none", color: tokens.text }}>
          <span aria-hidden="true" style={{
            width: 14, height: 14, borderRadius: "3px",
            background: "conic-gradient(from 220deg, #0a84ff, #bf5af2, #28c840, #ff9f0a, #0a84ff)"
          }} />
          <span style={{ fontWeight: 600 }}>Dorsfolio</span>
        </a>
        <nav style={{ display: "flex", gap: "4px", marginLeft: "4px" }}>
          {navItems.slice(1).map((n) => {
            const active =
              (n.href === "#/projects" && (route.name === "projects" || route.name === "case-study")) ||
              (n.href === "#/" + route.name);
            return (
              <a key={n.href} href={n.href} style={{
                padding: "4px 10px", borderRadius: "6px",
                textDecoration: "none", color: tokens.text,
                background: active ? "rgba(15,23,42,0.07)" : "transparent",
                fontWeight: active ? 600 : 400
              }}>{n.label}</a>
            );
          })}
        </nav>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "10px", color: tokens.muted, fontFamily: tokens.monoFont, fontSize: "11px" }}>
          <span>{new Date().toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}</span>
          <window.SkinSwitcher inline />
        </div>
      </div>

      {/* Main content area — windowed */}
      <div data-skin-scroll style={{ flex: 1, padding: "12px clamp(10px, 2vw, 24px) 110px", overflow: "visible" }}>
        <div style={{
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
      <MacDock route={route} tokens={tokens} />
    </div>
  );
}

function macTitleFor(route) {
  if (route.name === "home") return "Dorsfolio — Home";
  if (route.name === "projects") return "Dorsfolio — Projects";
  if (route.name === "case-study") return `Dorsfolio — ${route.slug}`;
  if (route.name === "about") return "Dorsfolio — About";
  if (route.name === "contact") return "Dorsfolio — Contact";
  return "Dorsfolio";
}

function MacWindowChrome({ title }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "8px",
      padding: "12px 16px",
      borderBottom: "1px solid rgba(15,23,42,0.06)",
      background: "linear-gradient(180deg, rgba(255,255,255,0.5), rgba(255,255,255,0.15))"
    }}>
      <span style={{ display: "inline-flex", gap: "6px" }}>
        <span style={{ width: 12, height: 12, borderRadius: "999px", background: "#ff5f57", boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.15)" }} />
        <span style={{ width: 12, height: 12, borderRadius: "999px", background: "#febc2e", boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.15)" }} />
        <span style={{ width: 12, height: 12, borderRadius: "999px", background: "#28c840", boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.15)" }} />
      </span>
      <div style={{ flex: 1, textAlign: "center", fontSize: "12px", color: "#48484a", fontWeight: 500 }}>{title}</div>
      <span style={{ width: 50 }} aria-hidden="true" />
    </div>
  );
}

function MacDock({ route, tokens }) {
  const items = [
    { id: "home",     href: "#/",          label: "Home",    color: "#0a84ff", glyph: "◉" },
    { id: "projects", href: "#/projects",  label: "Projects",color: "#bf5af2", glyph: "▦" },
    { id: "about",    href: "#/about",     label: "About",   color: "#34c759", glyph: "✦" },
    { id: "contact",  href: "#/contact",   label: "Contact", color: "#ff9f0a", glyph: "✉" }
  ];
  return (
    <div style={{
      position: "fixed", left: "50%", bottom: "16px",
      transform: "translateX(-50%)",
      zIndex: 60,
      padding: "8px",
      background: "rgba(255,255,255,0.6)",
      backdropFilter: tokens.blur, WebkitBackdropFilter: tokens.blur,
      border: `1px solid ${tokens.border}`,
      borderRadius: "20px",
      boxShadow: "0 14px 40px rgba(15,23,42,0.15)"
    }}>
      <ul style={{ display: "flex", gap: "6px", padding: 0, margin: 0, listStyle: "none" }}>
        {items.map((it) => {
          const active =
            (it.id === "home" && route.name === "home") ||
            (it.id === "projects" && (route.name === "projects" || route.name === "case-study")) ||
            (it.id === route.name);
          return (
            <li key={it.id}>
              <a href={it.href} aria-label={it.label} title={it.label} style={{
                position: "relative",
                width: 48, height: 48,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: `linear-gradient(135deg, ${it.color} 0%, ${it.color}cc 100%)`,
                color: "#fff",
                borderRadius: "12px",
                textDecoration: "none",
                fontSize: "20px",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.4), 0 6px 14px rgba(15,23,42,0.18)"
              }}>{it.glyph}
              {active && (
                <span aria-hidden="true" style={{
                  position: "absolute", bottom: "-6px", left: "50%", transform: "translateX(-50%)",
                  width: 4, height: 4, borderRadius: "999px", background: "#1c1c1e"
                }} />
              )}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// ---- Project card --------------------------------------------------------
function MacProjectCard({ project, tokens }) {
  const [hover, setHover] = React.useState(false);
  const reduced = window.useReducedMotion();
  return (
    <a
      href={`#/projects/${project.slug}`}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: "block",
        textDecoration: "none",
        background: "rgba(255,255,255,0.7)",
        backdropFilter: tokens.blur, WebkitBackdropFilter: tokens.blur,
        border: `1px solid ${tokens.border}`,
        borderRadius: "16px",
        overflow: "hidden",
        color: tokens.text,
        boxShadow: hover
          ? "0 18px 38px rgba(15,23,42,0.16), 0 4px 10px rgba(15,23,42,0.06)"
          : "0 6px 18px rgba(15,23,42,0.08)",
        transform: hover && !reduced ? "translateY(-3px)" : "none",
        transition: reduced ? "none" : "transform 220ms cubic-bezier(.2,.8,.2,1), box-shadow 220ms ease"
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
      <div style={{ aspectRatio: "16/9", background: tokens.surfaceAlt || tokens.surfaceSolid }}>
        <window.ProjectImage
          src={project.coverImage}
          slug={project.slug}
          label={project.title}
          accent={project.accent}
          alt={project.title}
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
      <div style={{
        marginBottom: "24px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
          <a href="#/projects" style={{ fontSize: "13px", color: tokens.accent, textDecoration: "none" }}>← Projects</a>
          <span style={{ color: tokens.muted, fontSize: "13px" }}>/</span>
          <span style={{ fontFamily: tokens.monoFont, fontSize: "12px", color: tokens.muted }}>{project.slug}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
          <span style={{ width: 8, height: 8, borderRadius: "999px", background: project.accent || tokens.accent }} />
          <span style={{ fontFamily: tokens.monoFont, fontSize: "11px", color: tokens.muted, textTransform: "uppercase", letterSpacing: "0.12em" }}>
            {project.category} · {project.year} · {project.status}
          </span>
        </div>
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

        {/* hero image — glass window */}
        <div style={{
          marginTop: "28px",
          borderRadius: "16px",
          overflow: "hidden",
          border: `1px solid ${tokens.border}`,
          boxShadow: "0 24px 60px rgba(15,23,42,0.15)"
        }}>
          <window.ProjectImage
            src={project.coverImage}
            slug={project.slug}
            label={project.title}
            accent={project.accent}
            alt={project.title}
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
        backdropFilter: tokens.blur, WebkitBackdropFilter: tokens.blur,
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
