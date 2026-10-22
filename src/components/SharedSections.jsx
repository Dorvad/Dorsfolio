// =============================================================================
// Shared, skin-aware sections used inside each skin's PortfolioShell:
//   - HomeSection
//   - ProjectGrid (with filters)
//   - AboutSection
//   - ContactSection
//
// Each reads tokens from the active skin. Skin-specific decoration is layered
// in by the skin shells themselves; this is the content-level UI.
// =============================================================================

const HERO_PORTRAITS = {
  mac:      "src/assets/portraits/portrait-mac.png",
  material: "src/assets/portraits/portrait-material.png",
  win95:    "src/assets/portraits/portrait-win95.png",
  carbon:   "src/assets/portraits/portrait-carbon.png"
};

function HomeSection() {
  const { skin } = window.useSkin();
  const tokens = window.skinTokens.get(skin);
  const info = window.portfolioInfo;
  const projects = (window.caseStudies || []).slice(0, 3);
  const portrait = HERO_PORTRAITS[skin] || HERO_PORTRAITS.mac;
  const reduced = window.useReducedMotion();
  const isWin95 = skin === "win95";

  // Win95 has no easing: content simply appears. Everyone else gets a short,
  // staggered arrival that follows the world's own curve.
  const ease = skin === "material" ? "cubic-bezier(0.05, 0.7, 0.1, 1)"
    : skin === "carbon" ? "cubic-bezier(0, 0, 0.38, 0.9)"
    : "cubic-bezier(.2,.8,.2,1)";
  const dur = skin === "carbon" ? 0.3 : 0.5;
  const anim = (name, delay = 0) =>
    (reduced || isWin95) ? {} : { animation: `${name} ${dur}s ${ease} ${delay}ms both` };

  // Crop each themed portrait image to show only the face, not the app chrome
  const portraitPos = { mac: "center 35%", material: "center 22%", win95: "center 40%", carbon: "20% 28%" }[skin] || "center 30%";

  return (
    <div data-screen-label="Home">
      <section style={{ padding: "8px 0 24px" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: "clamp(24px, 4vw, 56px)",
          flexWrap: "wrap"
        }}>
          {/* Portrait — floats gently on Mac */}
          <div style={{
            flexShrink: 0,
            ...(!reduced && skin === "mac" ? { animation: "floatPortrait 6s ease-in-out 1s infinite" } : {})
          }}>
            <img
              src={portrait}
              alt="Dor Vadai"
              width="180" height="180"
              style={{
                width: "clamp(110px, 18vw, 180px)",
                height: "clamp(110px, 18vw, 180px)",
                objectFit: "cover",
                objectPosition: portraitPos,
                borderRadius: skin === "win95" ? "0" : skin === "carbon" ? "0" : "14px",
                display: "block",
                boxShadow: skin === "mac" ? "0 18px 40px rgba(15,23,42,0.14), 0 2px 6px rgba(15,23,42,0.06)"
                  : skin === "material" ? tokens.shadow
                  : skin === "win95" ? "inset 1px 1px 0 #808080, inset -1px -1px 0 #fff, 0 0 0 1px #000"
                  : "none",
                outline: skin === "carbon" ? `1px solid ${tokens.border}` : "none",
                ...anim("scaleIn", 0)
              }}
            />
          </div>

          {/* Text — staggered */}
          <div style={{ flex: "1 1 260px", minWidth: 0 }}>
            <h1 style={{
              fontFamily: tokens.displayFont || tokens.font,
              fontSize: "clamp(34px, 5.4vw, 56px)",
              lineHeight: 1.05,
              letterSpacing: isWin95 ? 0 : "-0.02em",
              fontWeight: skin === "carbon" ? 300 : 600,
              color: tokens.text,
              margin: "0 0 16px",
              textWrap: "balance",
              ...anim("fadeUp", 80)
            }}>{info.tagline}</h1>
            <p style={{
              fontFamily: tokens.font,
              fontSize: "clamp(15px, 1.6vw, 18px)",
              lineHeight: 1.55,
              color: tokens.muted,
              margin: 0,
              maxWidth: "52ch",
              textWrap: "pretty",
              ...anim("fadeUp", 160)
            }}>{info.intro}</p>

            <div style={{
              display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "24px",
              ...anim("fadeUp", 240)
            }}>
              {[info.ctas.primary, info.ctas.secondary, info.ctas.tertiary].map((cta, i) => (
                <SkinButton
                  key={cta.label}
                  href={cta.href}
                  variant={i === 0 ? "primary" : "ghost"}
                  tokens={tokens}
                  skin={skin}
                >{cta.label}</SkinButton>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ marginTop: "48px", ...anim("fadeUp", 320) }}>
        <SectionHeader title="Selected projects" hint="A few representative pieces" link={{ label: "All projects", href: "#/projects" }} tokens={tokens} />
        <SkinProjectGrid projects={projects} tokens={tokens} skin={skin} compact />
      </section>
    </div>
  );
}

// ---- Buttons ------------------------------------------------------------
function SkinButton({ children, href, onClick, variant = "primary", tokens, skin }) {
  const isPrimary = variant === "primary";
  // Carbon uses a darker blue for button BG (white text on #78a9ff fails contrast)
  const carbonPrimaryBg = "#0f62fe";
  const baseStyle = {
    display: "inline-flex", alignItems: "center", gap: "8px",
    padding: skin === "win95" ? "4px 14px" : "12px 20px",
    fontFamily: tokens.font, fontSize: "14px", fontWeight: 600,
    textDecoration: "none", cursor: "pointer",
    borderRadius: tokens.radius === "0px" ? 0 : (skin === "material" ? "999px" : "10px"),
    color: isPrimary ? (skin === "win95" ? tokens.text : "#fff") : tokens.text,
    background: isPrimary
      ? (skin === "win95" ? tokens.surface : skin === "carbon" ? carbonPrimaryBg : tokens.accent)
      : (skin === "win95" ? tokens.surface : "transparent"),
    border:
      skin === "win95" ? "none" :
      skin === "carbon" && isPrimary ? "none" :
      isPrimary ? `1px solid ${tokens.accent}` : `1px solid ${tokens.border}`,
    boxShadow:
      skin === "win95"
        ? `inset 1px 1px 0 ${tokens.bevelLight}, inset -1px -1px 0 ${tokens.bevelDark}, 1px 1px 0 ${tokens.bevelDarker}`
        : (isPrimary && skin !== "carbon" ? tokens.shadow : "none")
  };
  const className = [
    skin === "win95" ? "w95-btn" : "ds-btn",
    isPrimary ? "ds-btn-primary" : "ds-btn-ghost",
    skin === "material" ? "m3-state" : ""
  ].filter(Boolean).join(" ");
  const Comp = href ? "a" : "button";
  const props = href ? { href } : { type: "button", onClick };
  if (skin === "material") props.onPointerDown = window.m3Ripple;
  return <Comp {...props} className={className} style={baseStyle}>{children}</Comp>;
}

// ---- Section header ----------------------------------------------------
// `level` controls the heading element: 1 when the header names the page,
// 2 (default) when it names a section inside a page.
function SectionHeader({ title, hint, link, tokens, level = 2 }) {
  const H = `h${level}`;
  const isWin95 = tokens.name === "Windows 95";
  return (
    <div style={{
      display: "flex", alignItems: "baseline", justifyContent: "space-between",
      gap: "16px", flexWrap: "wrap", marginBottom: "16px"
    }}>
      <div>
        <H style={{
          fontFamily: tokens.displayFont || tokens.font,
          fontSize: level === 1 ? "clamp(28px, 4vw, 42px)" : "clamp(20px, 2.6vw, 26px)",
          fontWeight: tokens.name === "IBM Carbon" && level === 1 ? 300 : 600,
          color: tokens.text,
          margin: 0,
          lineHeight: 1.15,
          letterSpacing: isWin95 ? 0 : (level === 1 ? "-0.02em" : "-0.01em")
        }}>{title}</H>
        {hint && <div style={{ fontFamily: tokens.font, fontSize: level === 1 ? "15px" : "13px", color: tokens.muted, marginTop: "6px" }}>{hint}</div>}
      </div>
      {link && (
        <a href={link.href} className="ds-link" style={{
          fontFamily: tokens.font, fontSize: "13px", fontWeight: 500,
          color: tokens.accent, display: "inline-flex", alignItems: "center", gap: "4px"
        }}>{link.label} <window.Icon name="arrowRight" size={14} /></a>
      )}
    </div>
  );
}

// ---- Skin-aware ProjectGrid (delegates to skin's ProjectCard) -----------
function SkinProjectGrid({ projects, tokens, skin, compact = false }) {
  const reduced = window.useReducedMotion();
  const cardComponents = {
    mac:      window.MacProjectCard,
    win95:    window.Win95ProjectCard,
    material: window.MaterialProjectCard,
    carbon:   window.CarbonProjectCard
  };
  const Card = cardComponents[skin] || cardComponents.mac;
  const stagger = !reduced && skin !== "win95";
  const ease = skin === "material" ? "cubic-bezier(0.05, 0.7, 0.1, 1)"
    : skin === "carbon" ? "cubic-bezier(0, 0, 0.38, 0.9)"
    : "cubic-bezier(.2,.8,.2,1)";
  return (
    <div style={{
      display: "grid",
      gap: skin === "win95" ? "10px" : "18px",
      gridTemplateColumns: compact
        ? "repeat(auto-fit, minmax(260px, 1fr))"
        : "repeat(auto-fit, minmax(280px, 1fr))"
    }}>
      {projects.map((p, i) => (
        <div key={p.slug} style={{
          // Cap the stagger so long grids never wait on the last card.
          animation: stagger ? `fadeUp 0.45s ${ease} ${Math.min(i, 5) * 70}ms both` : "none",
          height: "100%", display: "flex", flexDirection: "column"
        }}>
          <Card project={p} tokens={tokens} />
        </div>
      ))}
    </div>
  );
}

// ---- Filter chips — shared by the projects grid and the gallery ---------
function FilterChips({ options, active, onChange, label, tokens, skin }) {
  const isWin95 = skin === "win95";
  return (
    <div role="tablist" aria-label={label} style={{
      display: "flex", flexWrap: "wrap", gap: "8px",
      margin: "0 0 24px"
    }}>
      {options.map((f) => {
        const isActive = active === f;
        return (
          <button
            key={f}
            role="tab"
            aria-selected={isActive}
            type="button"
            onClick={() => onChange(f)}
            onPointerDown={skin === "material" ? window.m3Ripple : undefined}
            className={isWin95 ? "w95-btn" : ("ds-chip" + (skin === "material" ? " m3-state" : ""))}
            style={{
              padding: isWin95 ? "3px 10px" : "8px 14px",
              fontFamily: tokens.font, fontSize: "13px", fontWeight: isActive ? 600 : 500,
              cursor: "pointer",
              borderRadius: tokens.radius === "0px" ? 0 : "999px",
              border:
                isWin95 ? "none" :
                `1px solid ${isActive ? tokens.accent : tokens.border}`,
              background: isActive
                ? (isWin95 ? tokens.surface : skin === "material" ? "#e8def8" : `${tokens.accent}1a`)
                : (isWin95 ? tokens.surface : "transparent"),
              color: isActive ? (skin === "material" ? "#21005d" : tokens.accent) : tokens.text,
              boxShadow: isWin95
                ? (isActive
                    ? `inset 1px 1px 0 ${tokens.bevelDark}, inset -1px -1px 0 ${tokens.bevelLight}`
                    : `inset 1px 1px 0 ${tokens.bevelLight}, inset -1px -1px 0 ${tokens.bevelDark}`)
                : "none"
            }}
          >{f}</button>
        );
      })}
    </div>
  );
}

// ---- Project grid with filter chips -------------------------------------
function ProjectGridSection() {
  const { skin } = window.useSkin();
  const tokens = window.skinTokens.get(skin);
  const [active, setActive] = React.useState("All");
  const filters = window.portfolioInfo.filters;
  const all = window.caseStudies || [];

  const filtered = active === "All"
    ? all
    : all.filter((p) => p.categories?.includes(active));

  return (
    <div data-screen-label="Projects">
      <SectionHeader level={1} title="Projects" hint="Case studies across product, learning, and brand work" tokens={tokens} />
      <FilterChips options={filters} active={active} onChange={setActive} label="Filter projects" tokens={tokens} skin={skin} />

      {filtered.length === 0 ? (
        <div style={{ padding: "40px 12px", textAlign: "center", color: tokens.muted, fontFamily: tokens.font }}>
          No projects in <strong>{active}</strong> yet.
        </div>
      ) : (
        // Re-key on the active filter so the grid re-enters as one list.
        <div key={active}>
          <SkinProjectGrid projects={filtered} tokens={tokens} skin={skin} />
        </div>
      )}
    </div>
  );
}

// ---- About ---------------------------------------------------------------
function AboutSection() {
  const { skin } = window.useSkin();
  const tokens = window.skinTokens.get(skin);
  const a = window.portfolioInfo.about;
  return (
    <div data-screen-label="About">
      <SectionHeader level={1} title={a.headline} tokens={tokens} />
      <p style={{
        fontFamily: tokens.displayFont || tokens.font,
        fontSize: "clamp(20px, 2.4vw, 26px)",
        lineHeight: 1.4,
        color: tokens.text,
        margin: "0 0 28px",
        maxWidth: "62ch",
        textWrap: "pretty"
      }}>{a.lead}</p>
      <div style={{ display: "grid", gap: "16px", maxWidth: "68ch", marginBottom: "32px" }}>
        {a.paragraphs.map((p, i) => (
          <p key={i} style={{
            fontFamily: tokens.font, fontSize: "16px", lineHeight: 1.6,
            color: tokens.muted, margin: 0, textWrap: "pretty"
          }}>{p}</p>
        ))}
      </div>
      <ul style={{
        listStyle: "none", padding: 0, margin: 0,
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "12px"
      }}>
        {a.pillars.map((p, i) => (
          <li key={i} className="ds-tile" style={{
            padding: "18px 18px 18px 20px",
            background: tokens.surfaceAlt || tokens.surfaceSolid,
            border: `1px solid ${tokens.border}`, borderRadius: tokens.radius,
            position: "relative", overflow: "hidden"
          }}>
            <span aria-hidden="true" style={{
              position: "absolute", left: 0, top: 0, bottom: 0, width: "1px",
              background: tokens.accent, opacity: 0.9
            }} />
            <div style={{ fontFamily: tokens.font, fontSize: "16px", fontWeight: 600, color: tokens.text, marginBottom: "6px" }}>
              {p.title}
            </div>
            <div style={{ fontFamily: tokens.font, fontSize: "14px", color: tokens.muted, lineHeight: 1.5 }}>
              {p.body}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---- Contact -------------------------------------------------------------
function ContactSection() {
  const { skin } = window.useSkin();
  const tokens = window.skinTokens.get(skin);
  const c = window.portfolioInfo.contact;
  return (
    <div data-screen-label="Contact">
      <style>{`
        @media (max-width: 540px) {
          .ds-contact-link { grid-template-columns: auto 1fr auto !important; gap: 10px !important; }
        }
      `}</style>
      <SectionHeader level={1} title={c.headline} tokens={tokens} />
      <p style={{
        fontFamily: tokens.font, fontSize: "17px", lineHeight: 1.55,
        color: tokens.muted, margin: "0 0 28px", maxWidth: "60ch", textWrap: "pretty"
      }}>{c.lead}</p>
      <div style={{ display: "grid", gap: "10px", maxWidth: "560px" }}>
        {c.links.map((l) => {
          const external = l.href?.startsWith("http");
          return (
            <a
              key={l.label}
              href={l.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className={"ds-contact-link ds-tile" + (skin === "material" ? " m3-state" : "")}
              onPointerDown={skin === "material" ? window.m3Ripple : undefined}
              style={{
                display: "grid", gridTemplateColumns: "100px 1fr auto",
                gap: "16px", alignItems: "center",
                padding: "14px 18px",
                background: tokens.surfaceAlt || tokens.surfaceSolid,
                border: `1px solid ${tokens.border}`,
                borderRadius: tokens.radius,
                textDecoration: "none",
                color: tokens.text,
                fontFamily: tokens.font
              }}
            >
              <span style={{
                fontFamily: tokens.monoFont, fontSize: "11px",
                color: tokens.muted, textTransform: "uppercase", letterSpacing: "0.1em"
              }}>{l.label}</span>
              <span className="ds-tile-title" style={{ fontSize: "15px", fontWeight: 500, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{l.value}</span>
              <span aria-hidden="true" style={{ color: tokens.accent, display: "inline-flex" }}>
                <window.Icon name={external ? "external" : "arrowRight"} size={16} />
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

Object.assign(window, {
  HomeSection, ProjectGridSection, AboutSection, ContactSection,
  SkinProjectGrid, SkinButton, SectionHeader, FilterChips
});
