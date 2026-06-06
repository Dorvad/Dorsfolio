// =============================================================================
// Case study block components — 11 typed content blocks
// Each accepts (block, ctx) where ctx = { tokens, skin, project }
// =============================================================================

// ---- Small shared bits ---------------------------------------------------
function BlockTitle({ children, tokens, level = 3 }) {
  const H = `h${level}`;
  return (
    <H style={{
      fontFamily: tokens.displayFont || tokens.font,
      fontSize: level === 2 ? "clamp(24px, 3vw, 32px)" : "clamp(18px, 2.4vw, 22px)",
      fontWeight: 600,
      color: tokens.text,
      margin: "0 0 16px",
      letterSpacing: tokens.name === "Windows 95" ? 0 : "-0.01em"
    }}>{children}</H>
  );
}

function BlockBody({ children, tokens }) {
  return (
    <p style={{
      fontFamily: tokens.font,
      fontSize: "17px",
      lineHeight: 1.6,
      color: tokens.text,
      margin: 0,
      textWrap: "pretty",
      maxWidth: "68ch"
    }}>{children}</p>
  );
}

function Caption({ children, tokens }) {
  return (
    <div style={{
      fontFamily: tokens.monoFont,
      fontSize: "12px",
      color: tokens.muted,
      marginTop: "8px",
      letterSpacing: "0.02em",
      textTransform: "uppercase"
    }}>{children}</div>
  );
}

// ---- 1. TextBlock --------------------------------------------------------
function TextBlock({ block, ctx }) {
  const { tokens } = ctx;
  return (
    <section style={{ margin: "32px 0" }}>
      {block.title && <BlockTitle tokens={tokens}>{block.title}</BlockTitle>}
      <BlockBody tokens={tokens}>{block.body}</BlockBody>
    </section>
  );
}

// ---- 2. ImageBlock -------------------------------------------------------
function ImageBlock({ block, ctx }) {
  const { tokens, project } = ctx;
  return (
    <section style={{ margin: "40px 0" }}>
      {block.title && <BlockTitle tokens={tokens}>{block.title}</BlockTitle>}
      <div style={{
        background: tokens.surfaceAlt || tokens.surfaceSolid,
        border: `1px solid ${tokens.border}`,
        borderRadius: tokens.radius,
        overflow: "hidden",
        boxShadow: tokens.shadow
      }}>
        <window.ProjectImage
          src={block.image}
          slug={project?.slug}
          label={block.title || "image"}
          accent={project?.accent}
          alt={block.caption || block.title || ""}
          style={{ width: "100%", height: "auto", display: "block", aspectRatio: "16/10", objectFit: "cover" }}
        />
      </div>
      {block.caption && <Caption tokens={tokens}>{block.caption}</Caption>}
    </section>
  );
}

// ---- 3. GalleryBlock -----------------------------------------------------
function GalleryBlock({ block, ctx }) {
  const { tokens, project } = ctx;
  return (
    <section style={{ margin: "40px 0" }}>
      {block.title && <BlockTitle tokens={tokens}>{block.title}</BlockTitle>}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "16px"
      }}>
        {block.images.map((img, i) => (
          <figure key={i} style={{ margin: 0 }}>
            <div style={{
              background: tokens.surfaceAlt || tokens.surfaceSolid,
              border: `1px solid ${tokens.border}`,
              borderRadius: tokens.radius,
              overflow: "hidden",
              boxShadow: tokens.shadow
            }}>
              <window.ProjectImage
                src={img.src}
                slug={project?.slug}
                label={img.caption || `image ${i + 1}`}
                accent={project?.accent}
                alt={img.caption || ""}
                style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block" }}
              />
            </div>
            {img.caption && <Caption tokens={tokens}>{img.caption}</Caption>}
          </figure>
        ))}
      </div>
    </section>
  );
}

// ---- 4. MetricsBlock -----------------------------------------------------
function MetricsBlock({ block, ctx }) {
  const { tokens } = ctx;
  return (
    <section style={{ margin: "40px 0" }}>
      {block.title && <BlockTitle tokens={tokens}>{block.title}</BlockTitle>}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: tokens.name === "Windows 95" ? "2px" : "12px",
        border: tokens.name === "Windows 95" ? `1px solid ${tokens.border}` : "none",
        background: tokens.name === "Windows 95" ? tokens.border : "transparent"
      }}>
        {block.items.map((m, i) => (
          <div key={i} style={{
            background: tokens.surfaceAlt || tokens.surfaceSolid,
            border: tokens.name === "Windows 95" ? "none" : `1px solid ${tokens.border}`,
            borderRadius: tokens.radius,
            padding: "20px",
            boxShadow: tokens.name === "Mac / iOS" ? tokens.shadow : "none"
          }}>
            <div style={{
              fontFamily: tokens.monoFont,
              fontSize: "11px",
              color: tokens.muted,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "8px"
            }}>{m.label}</div>
            <div style={{
              fontFamily: tokens.displayFont || tokens.font,
              fontSize: "clamp(24px, 3vw, 32px)",
              fontWeight: 600,
              color: tokens.text,
              lineHeight: 1.1
            }}>{m.value}</div>
            {m.hint && <div style={{
              fontFamily: tokens.font,
              fontSize: "12px",
              color: tokens.muted,
              marginTop: "6px"
            }}>{m.hint}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}

// ---- 5. QuoteBlock -------------------------------------------------------
function QuoteBlock({ block, ctx }) {
  const { tokens, project } = ctx;
  const accent = project?.accent || tokens.accent;
  return (
    <section style={{ margin: "48px 0" }}>
      <blockquote style={{
        margin: 0,
        padding: tokens.name === "Windows 95" ? "20px" : "28px 32px",
        background: tokens.name === "Windows 95" ? tokens.surfaceAlt : `${accent}10`,
        borderLeft: `4px solid ${accent}`,
        borderRadius: tokens.radius,
        border: tokens.name === "Windows 95" ? `1px solid ${tokens.border}` : `1px solid ${accent}25`
      }}>
        <div style={{
          fontFamily: tokens.displayFont || tokens.font,
          fontSize: "clamp(20px, 2.6vw, 26px)",
          lineHeight: 1.4,
          color: tokens.text,
          fontWeight: 500,
          textWrap: "pretty"
        }}>"{block.body}"</div>
        {block.attribution && (
          <div style={{
            fontFamily: tokens.monoFont,
            fontSize: "12px",
            color: tokens.muted,
            marginTop: "16px",
            textTransform: "uppercase",
            letterSpacing: "0.08em"
          }}>— {block.attribution}</div>
        )}
      </blockquote>
    </section>
  );
}

// ---- 6. ProcessBlock -----------------------------------------------------
function ProcessBlock({ block, ctx }) {
  const { tokens, project } = ctx;
  const accent = project?.accent || tokens.accent;
  return (
    <section style={{ margin: "40px 0" }}>
      {block.title && <BlockTitle tokens={tokens}>{block.title}</BlockTitle>}
      <ol style={{
        listStyle: "none",
        padding: 0,
        margin: 0,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "12px"
      }}>
        {block.steps.map((s, i) => {
          const step = typeof s === "string" ? { title: s, body: "" } : s;
          return (
            <li key={i} style={{
              background: tokens.surfaceAlt || tokens.surfaceSolid,
              border: `1px solid ${tokens.border}`,
              borderRadius: tokens.radius,
              padding: "16px"
            }}>
              <div style={{
                fontFamily: tokens.monoFont,
                fontSize: "11px",
                color: accent,
                marginBottom: "8px",
                letterSpacing: "0.1em"
              }}>STEP {String(i + 1).padStart(2, "0")}</div>
              <div style={{
                fontFamily: tokens.font,
                fontSize: "15px",
                fontWeight: 600,
                color: tokens.text,
                marginBottom: step.body ? "6px" : 0
              }}>{step.title}</div>
              {step.body && (
                <div style={{ fontFamily: tokens.font, fontSize: "14px", color: tokens.muted, lineHeight: 1.5 }}>
                  {step.body}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}

// ---- 7. BeforeAfterBlock -------------------------------------------------
function BeforeAfterBlock({ block, ctx }) {
  const { tokens } = ctx;
  return (
    <section style={{ margin: "40px 0" }}>
      {block.title && <BlockTitle tokens={tokens}>{block.title}</BlockTitle>}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "12px"
      }}>
        {[
          { ...block.before, kind: "before" },
          { ...block.after,  kind: "after"  }
        ].map((item, i) => (
          <div key={i} style={{
            background: item.kind === "after" ? (tokens.accent + "10") : (tokens.surfaceAlt || tokens.surfaceSolid),
            border: `1px solid ${item.kind === "after" ? tokens.accent + "40" : tokens.border}`,
            borderRadius: tokens.radius,
            padding: "20px"
          }}>
            <div style={{
              fontFamily: tokens.monoFont,
              fontSize: "11px",
              color: item.kind === "after" ? tokens.accent : tokens.muted,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "10px"
            }}>{item.label}</div>
            <div style={{ fontFamily: tokens.font, fontSize: "15px", color: tokens.text, lineHeight: 1.5 }}>
              {item.body}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---- 8. InsightBlock -----------------------------------------------------
function InsightBlock({ block, ctx }) {
  const { tokens, project } = ctx;
  const accent = project?.accent || tokens.accent;
  return (
    <section style={{ margin: "40px 0" }}>
      <div style={{
        background: `${accent}08`,
        border: `1px solid ${accent}30`,
        borderRadius: tokens.radius,
        padding: tokens.name === "Windows 95" ? "16px" : "28px",
        position: "relative"
      }}>
        <div style={{
          fontFamily: tokens.monoFont,
          fontSize: "11px",
          color: accent,
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          marginBottom: "12px"
        }}>★ Insight</div>
        {block.title && (
          <div style={{
            fontFamily: tokens.displayFont || tokens.font,
            fontSize: "20px",
            fontWeight: 600,
            color: tokens.text,
            marginBottom: "10px"
          }}>{block.title}</div>
        )}
        <div style={{
          fontFamily: tokens.font,
          fontSize: "16px",
          color: tokens.text,
          lineHeight: 1.6,
          textWrap: "pretty"
        }}>{block.body}</div>
      </div>
    </section>
  );
}

// ---- 9. LinksBlock -------------------------------------------------------
function LinksBlock({ block, ctx }) {
  const { tokens } = ctx;
  return (
    <section style={{ margin: "40px 0" }}>
      {block.title && <BlockTitle tokens={tokens}>{block.title}</BlockTitle>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {block.items.map((l, i) => (
          <a key={i} href={l.href} style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: tokens.name === "Windows 95" ? "6px 12px" : "10px 16px",
            background: tokens.surfaceAlt || tokens.surfaceSolid,
            color: tokens.accent,
            border: `1px solid ${tokens.border}`,
            borderRadius: tokens.radius,
            textDecoration: "none",
            fontFamily: tokens.font,
            fontSize: "14px",
            fontWeight: 500
          }}>
            <span>{l.label}</span>
            <span aria-hidden="true">→</span>
          </a>
        ))}
      </div>
    </section>
  );
}

// ---- 10. FeatureListBlock ------------------------------------------------
function FeatureListBlock({ block, ctx }) {
  const { tokens, project } = ctx;
  const accent = project?.accent || tokens.accent;
  return (
    <section style={{ margin: "40px 0" }}>
      {block.title && <BlockTitle tokens={tokens}>{block.title}</BlockTitle>}
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "10px" }}>
        {block.items.map((f, i) => (
          <li key={i} style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: "16px",
            padding: "16px 20px",
            background: tokens.surfaceAlt || tokens.surfaceSolid,
            border: `1px solid ${tokens.border}`,
            borderRadius: tokens.radius
          }}>
            <div style={{
              width: "32px", height: "32px",
              borderRadius: tokens.radius === "0px" ? "0px" : "8px",
              background: `${accent}20`,
              color: accent,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: tokens.monoFont,
              fontSize: "13px",
              fontWeight: 600
            }}>{String(i + 1).padStart(2, "0")}</div>
            <div>
              <div style={{
                fontFamily: tokens.font, fontSize: "15px", fontWeight: 600, color: tokens.text, marginBottom: "4px"
              }}>{f.title}</div>
              <div style={{ fontFamily: tokens.font, fontSize: "14px", color: tokens.muted, lineHeight: 1.5 }}>
                {f.body}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

// ---- 11. TimelineBlock ---------------------------------------------------
function TimelineBlock({ block, ctx }) {
  const { tokens, project } = ctx;
  const accent = project?.accent || tokens.accent;
  return (
    <section style={{ margin: "40px 0" }}>
      {block.title && <BlockTitle tokens={tokens}>{block.title}</BlockTitle>}
      <ol style={{ listStyle: "none", padding: 0, margin: 0, position: "relative" }}>
        {block.items.map((t, i) => (
          <li key={i} style={{
            display: "grid",
            gridTemplateColumns: "80px 1fr",
            gap: "20px",
            padding: "16px 0",
            borderBottom: i < block.items.length - 1 ? `1px solid ${tokens.border}` : "none"
          }}>
            <div style={{
              fontFamily: tokens.monoFont,
              fontSize: "12px",
              color: accent,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              paddingTop: "2px"
            }}>{t.date}</div>
            <div>
              <div style={{
                fontFamily: tokens.font, fontSize: "16px", fontWeight: 600, color: tokens.text, marginBottom: "4px"
              }}>{t.title}</div>
              <div style={{ fontFamily: tokens.font, fontSize: "14px", color: tokens.muted, lineHeight: 1.5 }}>
                {t.body}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

// ---- 12. LogoHeroBlock ---------------------------------------------------
// Animated branching SVG logo + project tagline + external CTA.
// Used as the first section of the Branchlab case study.

function BranchlabLogoAnim({ accent }) {
  return (
    <div style={{ lineHeight: 0 }}>
      <style>{`
        @keyframes bl-line { from { stroke-dashoffset: var(--l); } to { stroke-dashoffset: 0; } }
        @keyframes bl-dot  { from { opacity: 0; } to   { opacity: 1; } }
      `}</style>
      <svg viewBox="0 0 200 110" width="200" aria-hidden="true"
        style={{ maxWidth: "100%", display: "block", margin: "0 auto", overflow: "visible" }}>
        {/* lines drawn first */}
        <line x1="100" y1="22" x2="46" y2="76" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeDasharray="74" style={{ "--l": "74", animation: "bl-line 0.5s ease both 0.2s" }} />
        <line x1="100" y1="22" x2="154" y2="76" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeDasharray="74" style={{ "--l": "74", animation: "bl-line 0.5s ease both 0.28s" }} />
        <line x1="46" y1="76" x2="18" y2="104" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="38" strokeOpacity="0.45" style={{ "--l": "38", animation: "bl-line 0.35s ease both 0.84s" }} />
        <line x1="46" y1="76" x2="74" y2="104" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeDasharray="38" strokeOpacity="0.45" style={{ "--l": "38", animation: "bl-line 0.35s ease both 0.92s" }} />
        {/* labels */}
        <text x="100" y="11" textAnchor="middle" fontSize="6.5" fill={accent} fontFamily="ui-monospace,monospace" letterSpacing="0.08em" style={{ animation: "bl-dot 0.3s ease both 0s" }}>ENTRY</text>
        <text x="154" y="89" textAnchor="middle" fontSize="5.5" fill={accent} fontFamily="ui-monospace,monospace" opacity="0.6" style={{ animation: "bl-dot 0.3s ease both 0.85s" }}>ENDING</text>
        <text x="46" y="110" textAnchor="middle" fontSize="5.5" fill={accent} fontFamily="ui-monospace,monospace" opacity="0.5" style={{ animation: "bl-dot 0.3s ease both 1.18s" }}>ENDINGS</text>
        {/* nodes */}
        <circle cx="100" cy="22" r="8" fill={accent} style={{ animation: "bl-dot 0.35s ease both 0.1s" }} />
        <circle cx="46"  cy="76" r="6" fill={accent} opacity="0.85" style={{ animation: "bl-dot 0.35s ease both 0.68s" }} />
        <circle cx="154" cy="76" r="6" fill={accent} opacity="0.85" style={{ animation: "bl-dot 0.35s ease both 0.72s" }} />
        <circle cx="18"  cy="104" r="5" fill={accent} opacity="0.38" style={{ animation: "bl-dot 0.3s ease both 1.12s" }} />
        <circle cx="74"  cy="104" r="5" fill={accent} opacity="0.38" style={{ animation: "bl-dot 0.3s ease both 1.18s" }} />
      </svg>
    </div>
  );
}

function LogoHeroBlock({ block, ctx }) {
  const { tokens, project } = ctx;
  const accent = project?.accent || tokens.accent;
  const isWin95   = tokens.name === "Windows 95";
  const isCarbon  = tokens.name === "IBM Carbon";

  return (
    <section style={{ margin: "40px 0 32px" }}>
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        gap: "20px", padding: isWin95 ? "28px 20px" : "44px 24px", textAlign: "center",
        background: isWin95 ? tokens.surfaceSolid : isCarbon ? `${accent}09` : `${accent}07`,
        border: isWin95 ? `2px solid ${tokens.border}` : `1px solid ${accent}28`,
        borderRadius: isWin95 ? 0 : (tokens.radiusLg || tokens.radius),
        boxShadow: isWin95
          ? `inset 1px 1px 0 ${tokens.bevelLight}, inset -1px -1px 0 ${tokens.bevelDark}`
          : "none"
      }}>
        <BranchlabLogoAnim accent={accent} />

        <div style={{
          fontFamily: tokens.displayFont || tokens.font,
          fontSize: "clamp(24px, 3.5vw, 32px)", fontWeight: 700,
          color: tokens.text, letterSpacing: isWin95 ? 0 : "-0.02em", lineHeight: 1
        }}>Branchlab</div>

        <div style={{
          fontFamily: tokens.font, fontSize: "14px", color: tokens.muted,
          maxWidth: "36ch", lineHeight: 1.5
        }}>A tool for creating interactive branching video scenarios</div>

        {block.websiteUrl && (
          <a href={block.websiteUrl} target="_blank" rel="noopener noreferrer"
            aria-label="View Branchlab marketing website (opens in new tab)"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: isWin95 ? "4px 14px" : "11px 20px",
              background: isWin95 ? tokens.surface : accent,
              color: isWin95 ? tokens.text : "#fff",
              border: isWin95 ? "none" : `1px solid ${accent}`,
              borderRadius: isWin95 ? 0 : (tokens.radius === "0px" ? 0 : "10px"),
              textDecoration: "none", fontFamily: tokens.font,
              fontSize: isWin95 ? "12px" : "14px", fontWeight: 600, cursor: "pointer",
              boxShadow: isWin95
                ? `inset 1px 1px 0 ${tokens.bevelLight}, inset -1px -1px 0 ${tokens.bevelDark}, 1px 1px 0 ${tokens.bevelDarker}`
                : "none"
            }}>
            <span>{block.websiteLabel || "View website"}</span>
            <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </section>
  );
}

// ---- 13. BranchlabPlayerBlock -------------------------------------------
// Embeds the official Branchlab player via <branchlab-player> web component.
// Scenarios: Wild West + Teen rom-com. Supports desktop/mobile toggle.

const _BLAB_SCENARIOS = [
  { id: "wildwest", title: "Wild West" },
  { id: "teenrom",  title: "Teen rom-com" }
];

// Mounts a <branchlab-player slug="..."> web component into a ref'd div.
// Stable component (defined outside BranchlabPlayerBlock) so React doesn't
// remount it on every parent render — only when slug changes.
function BranchlabEmbed({ slug }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!ref.current) return;
    const el = document.createElement("branchlab-player");
    el.setAttribute("slug", slug);
    el.style.cssText = "width:100%;height:100%;display:block;";
    ref.current.innerHTML = "";
    ref.current.appendChild(el);
  }, [slug]);
  return <div ref={ref} style={{ width: "100%", height: "100%" }} />;
}

function BranchlabPlayerBlock({ block, ctx }) {
  const { tokens, project } = ctx;
  const accent     = project?.accent || "#2dc08b";
  const isWin95    = tokens.name === "Windows 95";
  const isCarbon   = tokens.name === "IBM Carbon";
  const isMaterial = tokens.name === "Material You";

  const [scenarioIdx, setScenarioIdx] = React.useState(0);
  const [device,      setDevice]      = React.useState("desktop");
  const scenario  = _BLAB_SCENARIOS[scenarioIdx];
  const isDesktop = device === "desktop";

  // Lazy-inject the Branchlab embed script once per page load
  React.useEffect(() => {
    const EMBED_SRC = "https://www.branchlab.online/api/embed";
    if (!document.querySelector(`script[src="${EMBED_SRC}"]`)) {
      const s = Object.assign(document.createElement("script"), { src: EMBED_SRC, defer: true });
      document.head.appendChild(s);
    }
  }, []);

  const chipStyle = (active) => ({
    padding: isWin95 ? "3px 10px" : (isMaterial ? "7px 16px" : "7px 14px"),
    fontFamily: tokens.font, fontSize: "13px", fontWeight: active ? 600 : 400,
    cursor: "pointer",
    border: isWin95 ? "none" : `1px solid ${active ? accent : tokens.border}`,
    borderRadius: isWin95 ? 0 : "999px",
    background: active
      ? (isWin95 ? tokens.surface : `${accent}18`)
      : (isWin95 ? tokens.surface : "transparent"),
    color: active ? accent : tokens.muted,
    boxShadow: isWin95
      ? (active
          ? `inset 1px 1px 0 ${tokens.bevelDark}, inset -1px -1px 0 ${tokens.bevelLight}`
          : `inset 1px 1px 0 ${tokens.bevelLight}, inset -1px -1px 0 ${tokens.bevelDark}`)
      : "none",
    transition: isWin95 ? "none" : "background 120ms, color 120ms, border-color 120ms"
  });

  const DesktopFrame = () => (
    <div style={{
      width: "100%", overflow: "hidden", borderRadius: "8px",
      boxShadow: "0 12px 40px rgba(0,0,0,0.28), 0 2px 8px rgba(0,0,0,0.18)"
    }}>
      <div style={{
        background: "#1c1c1c", padding: "8px 12px",
        display: "flex", alignItems: "center", gap: "8px"
      }}>
        <div style={{ display: "flex", gap: "5px", flexShrink: 0 }}>
          {["#ff5f57","#febc2e","#28c840"].map((c, i) => (
            <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
          ))}
        </div>
        <div style={{
          flex: 1, background: "#2c2c2c", borderRadius: "4px",
          padding: "3px 10px", fontFamily: "ui-monospace,monospace",
          fontSize: "10px", color: "#aaa",
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
        }}>branchlab.online · {scenario.title}</div>
      </div>
      <div style={{ aspectRatio: "16/9", position: "relative", overflow: "hidden" }}>
        <BranchlabEmbed slug={scenario.id} />
      </div>
    </div>
  );

  const MobileFrame = () => (
    <div style={{
      margin: "0 auto", maxWidth: "260px",
      background: "#1a1a1a", borderRadius: "38px",
      padding: "12px 8px",
      boxShadow: "0 16px 48px rgba(0,0,0,0.42), 0 0 0 1px rgba(255,255,255,0.07)"
    }}>
      <div style={{
        width: "80px", height: "20px", background: "#0d0d0d",
        borderRadius: "0 0 14px 14px", margin: "0 auto 8px",
        display: "flex", alignItems: "center", justifyContent: "center", gap: "6px"
      }}>
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#282828" }} />
        <div style={{ width: 28, height: 5, borderRadius: "999px", background: "#282828" }} />
      </div>
      <div style={{ aspectRatio: "9/16", position: "relative", overflow: "hidden", borderRadius: "16px" }}>
        <BranchlabEmbed slug={scenario.id} />
      </div>
      <div style={{
        width: "80px", height: "4px", background: "rgba(255,255,255,0.28)",
        borderRadius: "999px", margin: "10px auto 0"
      }} />
    </div>
  );

  return (
    <section style={{ margin: "48px 0" }}>
      <div style={{
        fontFamily: tokens.monoFont, fontSize: "11px", color: accent,
        textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "14px"
      }}>▶ Try it yourself</div>

      <div style={{
        display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center",
        justifyContent: "space-between", marginBottom: "16px"
      }}>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {_BLAB_SCENARIOS.map((s, i) => (
            <button key={s.id} type="button" onClick={() => setScenarioIdx(i)}
              style={chipStyle(scenarioIdx === i)}>{s.title}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: "4px" }}>
          {[["desktop","🖥","Desktop"],["mobile","📱","Mobile"]].map(([mode,icon,label]) => (
            <button key={mode} type="button" onClick={() => setDevice(mode)}
              aria-label={`${label} preview`} aria-pressed={device === mode}
              style={{ ...chipStyle(device === mode), padding: isWin95 ? "2px 8px" : "6px 10px", fontSize: "14px" }}>
              {icon}
            </button>
          ))}
        </div>
      </div>

      <div style={{
        background: tokens.surfaceAlt || tokens.surfaceSolid,
        border: `1px solid ${tokens.border}`,
        borderRadius: tokens.radius,
        padding: isWin95 ? "8px" : "28px 24px",
        display: "flex", justifyContent: "center",
        boxShadow: isCarbon || isWin95 ? "none" : tokens.shadow
      }}>
        <div style={{
          width: "100%",
          maxWidth: isDesktop ? "620px" : "280px",
          transition: isWin95 ? "none" : "max-width 0.25s cubic-bezier(.4,0,.2,1)"
        }}>
          {isDesktop ? <DesktopFrame /> : <MobileFrame />}
        </div>
      </div>
    </section>
  );
}

// ---- 14. YouTubeBlock -------------------------------------------------------
function YouTubeBlock({ block, ctx }) {
  const { tokens } = ctx;
  const isWin95 = tokens.name === "Windows 95";
  const { title, videoId, caption } = block;
  return (
    <section style={{ margin: "48px 0" }}>
      {title && <BlockTitle tokens={tokens}>{title}</BlockTitle>}
      <div style={{
        borderRadius: isWin95 ? 0 : tokens.radiusLg || tokens.radius,
        overflow: "hidden",
        border: isWin95
          ? `2px solid ${tokens.border}`
          : `1px solid ${tokens.border}`,
        boxShadow: isWin95 ? "none" : tokens.shadow,
        aspectRatio: "16/9",
        position: "relative"
      }}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
          title={title || "Demo video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none", display: "block" }}
        />
      </div>
      {caption && (
        <div style={{
          fontFamily: tokens.monoFont || tokens.font,
          fontSize: "12px", color: tokens.muted,
          marginTop: "10px", lineHeight: 1.4
        }}>{caption}</div>
      )}
    </section>
  );
}

Object.assign(window, {
  TextBlock, ImageBlock, GalleryBlock, MetricsBlock, QuoteBlock,
  ProcessBlock, BeforeAfterBlock, InsightBlock, LinksBlock,
  FeatureListBlock, TimelineBlock,
  BranchlabLogoAnim, LogoHeroBlock, BranchlabPlayerBlock,
  YouTubeBlock
});
