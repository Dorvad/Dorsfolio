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

Object.assign(window, {
  TextBlock, ImageBlock, GalleryBlock, MetricsBlock, QuoteBlock,
  ProcessBlock, BeforeAfterBlock, InsightBlock, LinksBlock,
  FeatureListBlock, TimelineBlock
});
