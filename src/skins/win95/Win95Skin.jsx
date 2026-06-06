// =============================================================================
// WINDOWS 95 skin — gray bevels, title bars, taskbar, Start menu
// =============================================================================

const W95 = {
  surface: "#c0c0c0",
  surfaceAlt: "#ffffff",
  textOnTitle: "#ffffff",
  titleActive: "linear-gradient(90deg, #000080 0%, #1084d0 100%)",
  titleInactive: "linear-gradient(90deg, #808080 0%, #b5b5b5 100%)",
  bevelOut: "inset 1px 1px 0 #ffffff, inset -1px -1px 0 #808080, inset 2px 2px 0 #dfdfdf, inset -2px -2px 0 #000000",
  bevelIn:  "inset 1px 1px 0 #808080, inset -1px -1px 0 #ffffff, inset 2px 2px 0 #000000, inset -2px -2px 0 #dfdfdf",
  buttonRaised: "inset 1px 1px 0 #ffffff, inset -1px -1px 0 #808080, inset 2px 2px 0 #dfdfdf, inset -2px -2px 0 #000000",
  buttonPressed: "inset 1px 1px 0 #000000, inset -1px -1px 0 #dfdfdf, inset 2px 2px 0 #808080, inset -2px -2px 0 #ffffff"
};

function Win95PortfolioShell({ children, route }) {
  const tokens = window.skinTokens.get("win95");
  const { clearSkin } = window.useSkin();
  const [startOpen, setStartOpen] = React.useState(false);
  const [time, setTime] = React.useState(() => formatTime());

  React.useEffect(() => {
    const t = setInterval(() => setTime(formatTime()), 60000);
    return () => clearInterval(t);
  }, []);

  React.useEffect(() => {
    if (!startOpen) return;
    const onClick = (e) => {
      if (!e.target.closest?.("[data-start-menu], [data-start-button]")) setStartOpen(false);
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [startOpen]);

  return (
    <div style={{
      minHeight: "100vh", background: "#008080",
      fontFamily: tokens.font, color: tokens.text,
      display: "flex", flexDirection: "column",
      paddingBottom: "32px"
    }}>
      {/* Desktop icons (hidden on small screens) */}
      <div style={{
        position: "absolute", top: "12px", left: "12px",
        display: "grid", gap: "16px",
        gridTemplateColumns: "auto",
        zIndex: 1
      }} className="w95-desktop-icons">
        {[
          { label: "Projects", href: "#/projects", glyph: "▦" },
          { label: "Gallery",  href: "#/gallery",  glyph: "⊞" },
          { label: "About",    href: "#/about",    glyph: "★" },
          { label: "Contact",  href: "#/contact",  glyph: "✉" }
        ].map((d) => (
          <a key={d.href} href={d.href} style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: "4px",
            width: "72px", textDecoration: "none", color: "#fff"
          }}>
            <div style={{
              width: 36, height: 36, background: W95.surface,
              boxShadow: W95.bevelOut,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#000080", fontSize: "20px"
            }}>{d.glyph}</div>
            <div style={{
              fontFamily: tokens.font, fontSize: "11px", textAlign: "center",
              padding: "1px 3px",
              textShadow: "1px 1px 0 #000",
              fontWeight: 700
            }}>{d.label}</div>
          </a>
        ))}
      </div>

      {/* Main content window */}
      <div data-skin-scroll style={{
        flex: 1, padding: "20px clamp(12px, 3vw, 28px) 60px",
        marginLeft: "0",
        zIndex: 2,
        position: "relative"
      }}>
        <div style={{
          maxWidth: "1080px", margin: "0 auto",
          background: W95.surface, boxShadow: W95.bevelOut, padding: "2px"
        }}>
          {/* title bar */}
          <div style={{
            background: W95.titleActive, color: "#fff",
            padding: "3px 4px 3px 6px",
            display: "flex", alignItems: "center", gap: "8px",
            fontFamily: tokens.font, fontSize: "12px", fontWeight: 700
          }}>
            <span aria-hidden="true" style={{ display: "inline-block", width: 16, height: 16, background: "#c0c0c0", boxShadow: W95.bevelOut, color: "#000080", fontSize: "11px", textAlign: "center", lineHeight: "14px" }}>D</span>
            <span style={{ flex: 1 }}>{w95TitleFor(route)} — Dorsfolio</span>
            <Win95TitleButtons />
          </div>

          {/* menu bar */}
          <div style={{
            padding: "2px 6px",
            display: "flex", gap: "12px",
            fontFamily: tokens.font, fontSize: "12px",
            borderBottom: "1px solid #808080"
          }}>
            {["File","Edit","View","Help"].map((m) => (
              <span key={m} style={{ padding: "1px 4px", cursor: "default", userSelect: "none" }}>{m}</span>
            ))}
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px" }}>
              <window.SkinSwitcher inline />
            </div>
          </div>

          {/* address bar */}
          <div style={{
            padding: "6px 8px",
            display: "flex", alignItems: "center", gap: "8px",
            borderBottom: "1px solid #808080",
            fontFamily: tokens.font, fontSize: "12px"
          }}>
            <span style={{ color: tokens.muted }}>Address</span>
            <div style={{ flex: 1, background: "#fff", boxShadow: W95.bevelIn, padding: "2px 6px", fontFamily: tokens.monoFont, fontSize: "11px" }}>
              C:\Dorsfolio{route.path === "/" ? "\\Home" : "\\" + route.path.replace(/\//g, "\\")}
              <span style={{ animation: "blink 1.1s step-start infinite" }}>_</span>
            </div>
          </div>

          {/* body */}
          <div style={{ padding: "16px clamp(14px, 2.5vw, 22px) 24px", background: W95.surface }}>
            {children}
          </div>
        </div>

        <footer style={{
          maxWidth: "1080px", margin: "12px auto 0"
        }}><window.SkinFooter variant="win95-teal" /></footer>
      </div>

      {/* Taskbar */}
      <div style={{
        position: "fixed", left: 0, right: 0, bottom: 0,
        height: "32px",
        background: W95.surface,
        boxShadow: "inset 0 1px 0 #ffffff",
        display: "flex", alignItems: "center", gap: "4px",
        padding: "2px 4px",
        zIndex: 100
      }}>
        <button
          data-start-button
          type="button"
          onClick={() => setStartOpen((v) => !v)}
          style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            padding: "2px 8px", fontFamily: tokens.font, fontSize: "12px", fontWeight: 700,
            background: W95.surface,
            boxShadow: startOpen ? W95.buttonPressed : W95.buttonRaised,
            border: "none", cursor: "pointer"
          }}>
          <span aria-hidden="true" style={{ display: "inline-block", width: 14, height: 14, background: "conic-gradient(from 0deg, #ff0 0deg, #f00 90deg, #0f0 180deg, #00f 270deg, #ff0 360deg)" }} />
          Start
        </button>

        <div style={{ width: 2, height: "70%", background: "#808080", boxShadow: "1px 0 0 #fff", margin: "0 4px" }} />

        <button type="button" onClick={() => {
          const dest = route.name === "case-study" ? "#/projects"
            : route.name === "home" ? "#/" : `#/${route.name}`;
          window.navigate(dest);
        }} style={{
          padding: "2px 8px", background: W95.surface, fontFamily: tokens.font, fontSize: "12px",
          boxShadow: W95.buttonRaised, border: "none", cursor: "pointer"
        }}>📁 {w95TitleFor(route)}</button>

        <div style={{ marginLeft: "auto", padding: "2px 8px", background: W95.surface, boxShadow: W95.bevelIn, fontFamily: tokens.font, fontSize: "11px", display: "flex", alignItems: "center", gap: "4px" }}>
          <span aria-hidden="true">🔊</span>
          <span>{time}</span>
        </div>
      </div>

      {/* Start menu */}
      {startOpen && (
        <div data-start-menu style={{
          position: "fixed", left: 4, bottom: 36, zIndex: 200,
          width: "240px",
          background: W95.surface, boxShadow: W95.bevelOut, padding: "2px",
          fontFamily: tokens.font, fontSize: "12px"
        }}>
          <div style={{ display: "flex" }}>
            <div style={{
              writingMode: "vertical-rl", transform: "rotate(180deg)",
              background: W95.titleActive, color: "#fff",
              padding: "10px 4px", fontWeight: 700,
              fontSize: "16px", letterSpacing: "0.05em"
            }}>Dorsfolio<span style={{ color: "#fff" }}>95</span></div>
            <div style={{ flex: 1, padding: "4px 0" }}>
              {[
                { label: "Home",     href: "#/",         glyph: "🏠" },
                { label: "Projects", href: "#/projects", glyph: "📁" },
                { label: "Gallery",  href: "#/gallery",  glyph: "🖼" },
                { label: "About",    href: "#/about",    glyph: "ℹ" },
                { label: "Contact",  href: "#/contact",  glyph: "✉" }
              ].map((it) => (
                <a key={it.href} href={it.href} onClick={() => setStartOpen(false)} style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "6px 12px",
                  textDecoration: "none", color: tokens.text,
                  fontSize: "12px"
                }}>
                  <span style={{ width: 20, textAlign: "center" }}>{it.glyph}</span>
                  <span><u>{it.label[0]}</u>{it.label.slice(1)}</span>
                </a>
              ))}
              <div style={{ height: 1, background: "#808080", boxShadow: "0 1px 0 #fff", margin: "4px 8px" }} />
              <button
                type="button"
                onClick={() => { setStartOpen(false); clearSkin(); }}
                style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  width: "100%", padding: "6px 12px",
                  background: "transparent", border: "none",
                  fontFamily: tokens.font, fontSize: "11px",
                  color: tokens.muted, cursor: "pointer", textAlign: "left"
                }}
              >
                <span style={{ width: 20, textAlign: "center" }}>🎨</span>
                <span>Change interface…</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Small screens: hide desktop icons (they overlap) */}
      <style>{`
        @media (max-width: 720px) {
          .w95-desktop-icons { display: none !important; }
        }
      `}</style>
    </div>
  );
}

function w95TitleFor(route) {
  if (route.name === "home") return "Dorsfolio";
  if (route.name === "projects") return "Projects";
  if (route.name === "case-study") return route.slug + ".prj";
  if (route.name === "about") return "About.txt";
  if (route.name === "contact") return "Contact.txt";
  if (route.name === "gallery") return "Gallery";
  return "Window";
}

function Win95TitleButtons() {
  const btn = {
    width: 16, height: 14, background: W95.surface,
    boxShadow: W95.bevelOut,
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    color: "#000", fontSize: "10px", fontFamily: 'Arial, sans-serif', fontWeight: 700
  };
  return (
    <span style={{ display: "inline-flex", gap: "2px" }}>
      <span style={btn} aria-hidden="true">_</span>
      <span style={btn} aria-hidden="true">□</span>
      <span style={btn} aria-hidden="true">×</span>
    </span>
  );
}

function formatTime() {
  const d = new Date();
  return d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
}

// ---- ProjectCard ---------------------------------------------------------
function Win95ProjectCard({ project, tokens }) {
  return (
    <a href={`#/projects/${project.slug}`} style={{
      display: "block", textDecoration: "none", color: tokens.text,
      background: W95.surface, boxShadow: W95.bevelOut, padding: "2px"
    }}>
      <div style={{
        background: W95.titleActive, color: "#fff",
        padding: "3px 4px 3px 6px",
        display: "flex", alignItems: "center", gap: "6px",
        fontFamily: tokens.font, fontSize: "11px", fontWeight: 700
      }}>
        <span aria-hidden="true" style={{ display: "inline-block", width: 14, height: 14, background: project.accent, boxShadow: W95.bevelOut }} />
        <span style={{ flex: 1 }}>{project.title}</span>
        <Win95TitleButtons />
      </div>
      <div style={{ padding: "10px" }}>
        <div style={{
          background: "#fff", boxShadow: W95.bevelIn, padding: "4px"
        }}>
          <window.ProjectImage src={project.coverImage} slug={project.slug} label={project.title} accent={project.accent} alt={project.title} style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", display: "block" }} />
        </div>
        <div style={{ marginTop: "10px", display: "flex", alignItems: "center", gap: "6px", fontFamily: tokens.monoFont, fontSize: "11px", color: tokens.muted }}>
          <span style={{ width: 8, height: 8, background: project.accent }} />
          {project.category} · {project.year}
        </div>
        <div style={{ fontFamily: tokens.font, fontSize: "14px", fontWeight: 700, marginTop: "6px" }}>{project.title}</div>
        <div style={{ fontFamily: tokens.font, fontSize: "12px", color: tokens.muted, marginTop: "4px", lineHeight: 1.4, textWrap: "pretty" }}>{project.subtitle}</div>
        <div style={{ marginTop: "10px", display: "inline-flex" }}>
          <span style={{
            padding: "2px 10px", fontFamily: tokens.font, fontSize: "12px",
            background: W95.surface, boxShadow: W95.buttonRaised
          }}>Open</span>
        </div>
      </div>
    </a>
  );
}

// ---- Case Study Layout ---------------------------------------------------
function Win95CaseStudyLayout({ project }) {
  const tokens = window.skinTokens.get("win95");
  return (
    <article>
      <div style={{ marginBottom: "16px", display: "flex", gap: "8px", alignItems: "center", fontFamily: tokens.monoFont, fontSize: "11px" }}>
        <a href="#/projects" style={{ color: tokens.accent, textDecoration: "underline" }}>Projects</a>
        <span>›</span>
        <span>{project.slug}.prj</span>
      </div>

      {/* "window" panel for hero */}
      <div style={{ background: W95.surface, boxShadow: W95.bevelOut, padding: "2px", marginBottom: "16px" }}>
        <div style={{
          background: W95.titleActive, color: "#fff",
          padding: "3px 4px 3px 6px",
          display: "flex", alignItems: "center", gap: "6px",
          fontSize: "12px", fontWeight: 700
        }}>
          <span aria-hidden="true" style={{ display: "inline-block", width: 14, height: 14, background: project.accent, boxShadow: W95.bevelOut }} />
          <span style={{ flex: 1 }}>{project.title} — {project.category}</span>
          <Win95TitleButtons />
        </div>
        <div style={{ padding: "10px" }}>
          <div style={{ background: "#fff", boxShadow: W95.bevelIn, padding: "4px" }}>
            <window.ProjectImage src={project.coverImage} slug={project.slug} label={project.title} accent={project.accent} alt={project.title} onClick={() => window.lightboxOpen && window.lightboxOpen([{ src: project.coverImage, alt: project.title }], 0)} style={{ width: "100%", aspectRatio: "16/8", objectFit: "cover", display: "block" }} />
          </div>
        </div>
      </div>

      <h1 style={{
        fontFamily: tokens.font, fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 700,
        margin: "0 0 8px", color: tokens.text
      }}>{project.title}</h1>
      <div style={{ fontFamily: tokens.font, fontSize: "16px", color: tokens.muted, marginBottom: "16px", maxWidth: "60ch", textWrap: "pretty" }}>
        {project.subtitle}
      </div>

      {/* meta as fieldset */}
      <fieldset style={{
        border: "1px solid",
        borderColor: "#808080 #fff #fff #808080",
        padding: "10px 14px",
        marginBottom: "20px",
        background: W95.surface
      }}>
        <legend style={{ padding: "0 6px", fontFamily: tokens.font, fontWeight: 700, fontSize: "12px" }}>Project info</legend>
        <window.CaseStudyMeta project={project} tokens={tokens} variant="row" />
      </fieldset>

      <window.CaseStudySections project={project} tokens={tokens} />
      <window.RelatedProjects slug={project.slug} tokens={tokens} />
    </article>
  );
}

Object.assign(window, { Win95PortfolioShell, Win95ProjectCard, Win95CaseStudyLayout });
