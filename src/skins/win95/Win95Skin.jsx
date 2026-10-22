// =============================================================================
// WINDOWS 95 skin — gray bevels, title bars, taskbar, Start menu
// Motion here is deliberately stepped and instant: the one authored moment is
// the classic zoom-rectangle a window drew when it opened (see .w95-zoom).
// =============================================================================

const W95 = {
  surface: "#c0c0c0",
  surfaceAlt: "#ffffff",
  textOnTitle: "#ffffff",
  titleActive: "linear-gradient(90deg, #000080 0%, #1084d0 100%)",
  titleInactive: "linear-gradient(90deg, #808080 0%, #b5b5b5 100%)",
  dither: "repeating-conic-gradient(#ffffff 0 25%, #c0c0c0 0 50%) 0 0 / 2px 2px",
  bevelOut: "inset 1px 1px 0 #ffffff, inset -1px -1px 0 #808080, inset 2px 2px 0 #dfdfdf, inset -2px -2px 0 #000000",
  bevelIn:  "inset 1px 1px 0 #808080, inset -1px -1px 0 #ffffff, inset 2px 2px 0 #000000, inset -2px -2px 0 #dfdfdf",
  buttonRaised: "inset 1px 1px 0 #ffffff, inset -1px -1px 0 #808080, inset 2px 2px 0 #dfdfdf, inset -2px -2px 0 #000000",
  buttonPressed: "inset 1px 1px 0 #000000, inset -1px -1px 0 #dfdfdf, inset 2px 2px 0 #808080, inset -2px -2px 0 #ffffff"
};

const W95_NAV = [
  { id: "home",     label: "Home",     href: "#/" },
  { id: "projects", label: "Projects", href: "#/projects" },
  { id: "writing",  label: "Writing",  href: "#/writing" },
  { id: "gallery",  label: "Gallery",  href: "#/gallery" },
  { id: "about",    label: "About",    href: "#/about" },
  { id: "contact",  label: "Contact",  href: "#/contact" }
];

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
    const onKey = (e) => { if (e.key === "Escape") setStartOpen(false); };
    window.addEventListener("click", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("click", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [startOpen]);

  const addressPath = (!route.path || route.path === "/")
    ? "\\Home"
    : route.path.replace(/\//g, "\\");

  return (
    <div style={{
      minHeight: "100vh", background: "#008080",
      fontFamily: tokens.font, color: tokens.text,
      display: "flex", flexDirection: "column",
      paddingBottom: "32px"
    }}>
      {/* Desktop icons (hidden on small screens) */}
      <nav aria-label="Desktop" className="w95-desktop-icons w95-arrive-icons" style={{
        position: "absolute", top: "12px", left: "12px",
        display: "grid", gap: "14px",
        gridTemplateColumns: "auto",
        zIndex: 3
      }}>
        {W95_NAV.filter((d) => d.id !== "home").map((d) => (
          <a key={d.href} href={d.href} className="w95-desktop-icon" style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: "4px",
            width: "72px", textDecoration: "none", color: "#fff"
          }}>
            <span className="w95-icon-img" style={{ display: "inline-flex", lineHeight: 0 }}>
              <window.PixelIcon name={window.NAV_PIXEL_ICONS[d.id]} size={32} />
            </span>
            <span className="w95-icon-label" style={{
              fontFamily: tokens.font, fontSize: "11px", textAlign: "center",
              padding: "1px 3px",
              textShadow: "1px 1px 0 #000",
              fontWeight: 700
            }}>{d.label}</span>
          </a>
        ))}
      </nav>

      {/* Main content window */}
      <div data-skin-scroll style={{
        flex: 1, padding: "20px clamp(12px, 3vw, 28px) 60px",
        marginLeft: "0",
        zIndex: 2,
        position: "relative",
        overflowX: "hidden"
      }}>
        <div className="w95-arrive-window" style={{
          maxWidth: "1080px", margin: "0 auto",
          background: W95.surface, boxShadow: W95.bevelOut, padding: "2px"
        }}>
          <div className="w95-zoom" aria-hidden="true" />
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
            display: "flex", gap: "12px", alignItems: "center",
            fontFamily: tokens.font, fontSize: "12px",
            borderBottom: "1px solid #808080"
          }}>
            {["File","Edit","View","Help"].map((m) => (
              <span key={m} className="w95-menu-item" style={{ padding: "1px 4px", cursor: "default", userSelect: "none" }}><u>{m[0]}</u>{m.slice(1)}</span>
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
            <span style={{ color: tokens.muted }}>A<u>d</u>dress</span>
            <div style={{ flex: 1, background: "#fff", boxShadow: W95.bevelIn, padding: "2px 6px", fontFamily: tokens.monoFont, fontSize: "11px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              C:\Dorsfolio{addressPath}
              <span aria-hidden="true" style={{ animation: "blink 1.1s step-start infinite" }}>_</span>
            </div>
          </div>

          {/* body */}
          <div style={{ padding: "16px clamp(14px, 2.5vw, 22px) 24px", background: "#ffffff" }}>
            {children}
          </div>

          {/* status bar */}
          <div style={{
            borderTop: "1px solid #808080",
            padding: "2px 4px",
            display: "flex", gap: "4px",
            fontFamily: tokens.font, fontSize: "11px",
            background: W95.surface
          }}>
            <div style={{ flex: 2, padding: "1px 6px", boxShadow: W95.bevelIn }}>Ready</div>
            <div style={{ flex: 1, padding: "1px 6px", boxShadow: W95.bevelIn, textAlign: "center" }}>{w95TitleFor(route)}</div>
            <div style={{ width: "70px", padding: "1px 6px", boxShadow: W95.bevelIn }} />
          </div>
        </div>

        <footer style={{
          maxWidth: "1080px", margin: "12px auto 0"
        }}><window.SkinFooter variant="win95-teal" /></footer>
      </div>

      {/* Taskbar */}
      <div className="w95-arrive-taskbar" style={{
        position: "fixed", left: 0, right: 0, bottom: 0,
        height: "32px",
        background: W95.surface,
        boxShadow: "inset 0 1px 0 #ffffff, 0 -1px 0 #c0c0c0",
        display: "flex", alignItems: "center", gap: "4px",
        padding: "2px 4px",
        zIndex: 100
      }}>
        <button
          data-start-button
          type="button"
          className="w95-btn"
          aria-haspopup="menu"
          aria-expanded={startOpen}
          onClick={() => setStartOpen((v) => !v)}
          style={{
            display: "inline-flex", alignItems: "center", gap: "5px",
            padding: "2px 7px 2px 5px", fontFamily: tokens.font, fontSize: "12px", fontWeight: 700,
            background: W95.surface, color: "#000",
            boxShadow: startOpen ? W95.buttonPressed : W95.buttonRaised,
            border: "none", cursor: "pointer", height: "24px"
          }}>
          <window.PixelIcon name="flag" size={16} />
          <span>Start</span>
        </button>

        <div style={{ width: 2, height: "70%", background: "#808080", boxShadow: "1px 0 0 #fff", margin: "0 4px" }} />

        {/* The open window's task button — pressed, dithered, like the active task in Win95 */}
        <button type="button" className="w95-btn" aria-pressed="true" onClick={() => {
          const dest = route.name === "case-study" ? "#/projects"
            : route.name === "writing-post" ? "#/writing"
            : route.name === "home" ? "#/" : `#/${route.name}`;
          window.navigate(dest);
        }} style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          padding: "2px 10px 2px 6px", fontFamily: tokens.font, fontSize: "12px", fontWeight: 700,
          background: W95.dither, color: "#000",
          boxShadow: W95.buttonPressed, border: "none", cursor: "pointer", height: "24px",
          maxWidth: "min(220px, 40vw)"
        }}>
          <window.PixelIcon name={route.name === "home" ? "home" : (window.NAV_PIXEL_ICONS[route.name === "case-study" ? "projects" : route.name === "writing-post" ? "writing" : route.name] || "folder")} size={16} />
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{w95TitleFor(route)}</span>
        </button>

        <div style={{ marginLeft: "auto", padding: "2px 8px", background: W95.surface, boxShadow: W95.bevelIn, fontFamily: tokens.font, fontSize: "11px", display: "flex", alignItems: "center", gap: "6px", height: "24px" }}>
          <window.PixelIcon name="speaker" size={16} />
          <span>{time}</span>
        </div>
      </div>

      {/* Start menu */}
      {startOpen && (
        <div data-start-menu role="menu" aria-label="Start menu" style={{
          position: "fixed", left: 4, bottom: 36, zIndex: 200,
          width: "240px",
          background: W95.surface, boxShadow: W95.bevelOut, padding: "2px",
          fontFamily: tokens.font, fontSize: "12px"
        }}>
          <div style={{ display: "flex" }}>
            <div aria-hidden="true" style={{
              writingMode: "vertical-rl", transform: "rotate(180deg)",
              background: W95.titleActive, color: "#fff",
              padding: "10px 4px", fontWeight: 700,
              fontSize: "16px", letterSpacing: "0.05em"
            }}>Dorsfolio<span style={{ color: "#fff" }}>95</span></div>
            <div style={{ flex: 1, padding: "4px 0" }}>
              {W95_NAV.map((it) => (
                <a key={it.href} href={it.href} role="menuitem" className="w95-start-item" onClick={() => setStartOpen(false)} style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "5px 12px",
                  textDecoration: "none", color: tokens.text,
                  fontSize: "12px"
                }}>
                  <window.PixelIcon name={window.NAV_PIXEL_ICONS[it.id]} size={20} />
                  <span><u>{it.label[0]}</u>{it.label.slice(1)}</span>
                </a>
              ))}
              <div style={{ height: 1, background: "#808080", boxShadow: "0 1px 0 #fff", margin: "4px 8px" }} />
              <button
                type="button"
                role="menuitem"
                className="w95-start-item"
                onClick={() => { setStartOpen(false); clearSkin(); }}
                style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  width: "100%", padding: "5px 12px",
                  background: "transparent", border: "none",
                  fontFamily: tokens.font, fontSize: "12px",
                  color: tokens.text, cursor: "pointer", textAlign: "left"
                }}
              >
                <window.PixelIcon name="palette" size={20} />
                <span>C<u>h</u>ange interface…</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Small screens: hide desktop icons, tighten window chrome */}
      <style>{`
        @media (max-width: 720px) {
          .w95-desktop-icons { display: none !important; }
        }
        @media (max-width: 480px) {
          [data-skin-scroll] { padding-left: 8px !important; padding-right: 8px !important; }
        }
      `}</style>
    </div>
  );
}

function w95TitleFor(route) {
  if (route.name === "home") return "Home";
  if (route.name === "projects") return "Projects";
  if (route.name === "case-study") return route.slug + ".prj";
  if (route.name === "about") return "About.txt";
  if (route.name === "contact") return "Contact.txt";
  if (route.name === "gallery") return "Gallery";
  if (route.name === "writing") return "Writing";
  if (route.name === "writing-post") return route.slug ? route.slug + ".txt" : "Writing";
  return "Window";
}

function Win95TitleButtons() {
  const btn = {
    width: 16, height: 14, background: W95.surface,
    boxShadow: W95.bevelOut,
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    color: "#000"
  };
  // Minimise / maximise / close glyphs drawn as crisp 8×7 pixel shapes
  const glyph = (d) => (
    <svg width="8" height="7" viewBox="0 0 8 7" shapeRendering="crispEdges" aria-hidden="true">
      <path d={d} fill="#000" />
    </svg>
  );
  return (
    <span style={{ display: "inline-flex", gap: "2px" }} aria-hidden="true">
      <span style={btn}>{glyph("M1 5h6v2H1z")}</span>
      <span style={btn}>{glyph("M0 0h8v2H0zM0 2h1v5H0zM7 2h1v5H7zM0 6h8v1H0z")}</span>
      <span style={btn}>{glyph("M0 0h2v1H0zM6 0h2v1H6zM1 1h2v1H1zM5 1h2v1H5zM2 2h4v1H2zM3 3h2v1H3zM2 4h4v1H2zM1 5h2v1H1zM5 5h2v1H5zM0 6h2v1H0zM6 6h2v1H6z")}</span>
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
    <a href={`#/projects/${project.slug}`}
      className="w95-card"
      style={{
        display: "block", textDecoration: "none", color: tokens.text,
        background: W95.surface, boxShadow: W95.bevelOut, padding: "2px"
      }}>
      <div className="w95-card-title" style={{
        background: W95.titleInactive, color: "#fff",
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
      <nav aria-label="Breadcrumb" style={{ marginBottom: "16px", display: "flex", gap: "8px", alignItems: "center", fontFamily: tokens.monoFont, fontSize: "11px" }}>
        <a href="#/projects" className="w95-link" style={{ color: tokens.accent, textDecoration: "underline" }}>Projects</a>
        <span aria-hidden="true">›</span>
        <span>{project.slug}.prj</span>
      </nav>

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
            <window.ProjectImage src={project.coverImage} slug={project.slug} label={project.title} accent={project.accent} alt={project.title} onClick={() => window.lightboxOpen && window.lightboxOpen([{ src: window.resolveAsset(project.coverImage), alt: project.title }], 0)} style={{ width: "100%", aspectRatio: "16/8", objectFit: "cover", display: "block" }} />
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

Object.assign(window, { Win95PortfolioShell, Win95ProjectCard, Win95CaseStudyLayout, W95 });
