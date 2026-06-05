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

function HomeSection() {
  const { skin } = window.useSkin();
  const tokens = window.skinTokens.get(skin);
  const info = window.portfolioInfo;
  const projects = (window.caseStudies || []).slice(0, 3);

  return (
    <div data-screen-label="Home">
      <section style={{ padding: "8px 0 24px" }}>
        <div style={{
          fontFamily: tokens.monoFont, fontSize: "11px", color: tokens.muted,
          textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "16px"
        }}>{info.brand} · {info.skins.find((s) => s.id === skin)?.name}</div>
        <h1 style={{
          fontFamily: tokens.displayFont || tokens.font,
          fontSize: "clamp(34px, 5.4vw, 56px)",
          lineHeight: 1.05,
          letterSpacing: "-0.02em",
          fontWeight: 600,
          color: tokens.text,
          margin: "0 0 20px",
          maxWidth: "22ch",
          textWrap: "balance"
        }}>{info.tagline}</h1>
        <p style={{
          fontFamily: tokens.font,
          fontSize: "clamp(16px, 1.8vw, 19px)",
          lineHeight: 1.55,
          color: tokens.muted,
          margin: 0,
          maxWidth: "60ch",
          textWrap: "pretty"
        }}>{info.intro}</p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "28px" }}>
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
      </section>

      <section style={{ marginTop: "48px" }}>
        <SectionHeader title="Selected projects" hint="A few representative pieces" link={{ label: "All projects", href: "#/projects" }} tokens={tokens} />
        <SkinProjectGrid projects={projects} tokens={tokens} skin={skin} compact />
      </section>
    </div>
  );
}

// ---- Buttons ------------------------------------------------------------
function SkinButton({ children, href, onClick, variant = "primary", tokens, skin }) {
  const isPrimary = variant === "primary";
  const baseStyle = {
    display: "inline-flex", alignItems: "center", gap: "8px",
    padding: skin === "win95" ? "4px 14px" : "12px 20px",
    fontFamily: tokens.font, fontSize: "14px", fontWeight: 600,
    textDecoration: "none", cursor: "pointer",
    borderRadius: tokens.radius === "0px" ? 0 : (skin === "material" ? "999px" : "10px"),
    color: isPrimary ? (skin === "win95" ? tokens.text : "#fff") : tokens.text,
    background: isPrimary
      ? (skin === "win95" ? tokens.surface : tokens.accent)
      : (skin === "win95" ? tokens.surface : "transparent"),
    border:
      skin === "win95" ? "none" :
      isPrimary ? `1px solid ${tokens.accent}` : `1px solid ${tokens.border}`,
    boxShadow:
      skin === "win95"
        ? `inset 1px 1px 0 ${tokens.bevelLight}, inset -1px -1px 0 ${tokens.bevelDark}, 1px 1px 0 ${tokens.bevelDarker}`
        : (isPrimary && skin !== "carbon" ? tokens.shadow : "none")
  };
  const Comp = href ? "a" : "button";
  const props = href ? { href } : { type: "button", onClick };
  return <Comp {...props} style={baseStyle}>{children}</Comp>;
}

// ---- Section header ----------------------------------------------------
function SectionHeader({ title, hint, link, tokens }) {
  return (
    <div style={{
      display: "flex", alignItems: "baseline", justifyContent: "space-between",
      gap: "16px", flexWrap: "wrap", marginBottom: "16px"
    }}>
      <div>
        <h2 style={{
          fontFamily: tokens.displayFont || tokens.font,
          fontSize: "clamp(20px, 2.6vw, 26px)",
          fontWeight: 600,
          color: tokens.text,
          margin: 0,
          letterSpacing: "-0.01em"
        }}>{title}</h2>
        {hint && <div style={{ fontFamily: tokens.font, fontSize: "13px", color: tokens.muted, marginTop: "4px" }}>{hint}</div>}
      </div>
      {link && (
        <a href={link.href} style={{
          fontFamily: tokens.font, fontSize: "13px", fontWeight: 500,
          color: tokens.accent, textDecoration: "none"
        }}>{link.label} →</a>
      )}
    </div>
  );
}

// ---- Skin-aware ProjectGrid (delegates to skin's ProjectCard) -----------
function SkinProjectGrid({ projects, tokens, skin, compact = false }) {
  const cardComponents = {
    mac:      window.MacProjectCard,
    win95:    window.Win95ProjectCard,
    material: window.MaterialProjectCard,
    carbon:   window.CarbonProjectCard
  };
  const Card = cardComponents[skin] || cardComponents.mac;
  return (
    <div style={{
      display: "grid",
      gap: skin === "win95" ? "10px" : "18px",
      gridTemplateColumns: compact
        ? "repeat(auto-fit, minmax(260px, 1fr))"
        : "repeat(auto-fit, minmax(280px, 1fr))"
    }}>
      {projects.map((p) => <Card key={p.slug} project={p} tokens={tokens} />)}
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
      <SectionHeader title="Projects" hint="Case studies across product, learning, and brand work" tokens={tokens} />
      <div role="tablist" aria-label="Filter projects" style={{
        display: "flex", flexWrap: "wrap", gap: "8px",
        margin: "0 0 24px"
      }}>
        {filters.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={active === f}
            type="button"
            onClick={() => setActive(f)}
            style={{
              padding: skin === "win95" ? "3px 10px" : "8px 14px",
              fontFamily: tokens.font, fontSize: "13px", fontWeight: 500,
              cursor: "pointer",
              borderRadius: tokens.radius === "0px" ? 0 : "999px",
              border:
                skin === "win95" ? "none" :
                `1px solid ${active === f ? tokens.accent : tokens.border}`,
              background: active === f
                ? (skin === "win95" ? tokens.surface : `${tokens.accent}1a`)
                : (skin === "win95" ? tokens.surface : "transparent"),
              color: active === f ? tokens.accent : tokens.text,
              boxShadow: skin === "win95"
                ? (active === f
                    ? `inset 1px 1px 0 ${tokens.bevelDark}, inset -1px -1px 0 ${tokens.bevelLight}`
                    : `inset 1px 1px 0 ${tokens.bevelLight}, inset -1px -1px 0 ${tokens.bevelDark}`)
                : "none"
            }}
          >{f}</button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div style={{ padding: "40px 12px", textAlign: "center", color: tokens.muted, fontFamily: tokens.font }}>
          No projects in <strong>{active}</strong> yet.
        </div>
      ) : (
        <SkinProjectGrid projects={filtered} tokens={tokens} skin={skin} />
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
      <SectionHeader title={a.headline} tokens={tokens} />
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
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "12px"
      }}>
        {a.pillars.map((p, i) => (
          <div key={i} style={{
            padding: "18px", background: tokens.surfaceAlt || tokens.surfaceSolid,
            border: `1px solid ${tokens.border}`, borderRadius: tokens.radius
          }}>
            <div style={{
              fontFamily: tokens.monoFont, fontSize: "11px",
              color: tokens.accent, marginBottom: "10px",
              textTransform: "uppercase", letterSpacing: "0.1em"
            }}>0{i + 1}</div>
            <div style={{ fontFamily: tokens.font, fontSize: "16px", fontWeight: 600, color: tokens.text, marginBottom: "6px" }}>
              {p.title}
            </div>
            <div style={{ fontFamily: tokens.font, fontSize: "14px", color: tokens.muted, lineHeight: 1.5 }}>
              {p.body}
            </div>
          </div>
        ))}
      </div>
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
      <SectionHeader title={c.headline} tokens={tokens} />
      <p style={{
        fontFamily: tokens.font, fontSize: "17px", lineHeight: 1.55,
        color: tokens.muted, margin: "0 0 28px", maxWidth: "60ch", textWrap: "pretty"
      }}>{c.lead}</p>
      <div style={{ display: "grid", gap: "10px", maxWidth: "560px" }}>
        {c.links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target={l.href?.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
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
            <span style={{ fontSize: "15px", fontWeight: 500 }}>{l.value}</span>
            <span aria-hidden="true" style={{ color: tokens.accent }}>→</span>
          </a>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, {
  HomeSection, ProjectGridSection, AboutSection, ContactSection,
  SkinProjectGrid, SkinButton, SectionHeader
});
