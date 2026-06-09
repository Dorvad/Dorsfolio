// =============================================================================
// CaseStudyPage — picks project by slug, routes to skin-specific layout
// =============================================================================

// Splits a one-paragraph summary into a strong opening line ("lede") and the
// remaining context, so the intro reads as a hook plus supporting detail
// rather than one dense block. Falls back to lede-only when the summary is a
// single sentence — no second field to maintain in the data file.
function splitLede(text) {
  if (!text) return { lede: "", rest: "" };
  const match = text.match(/^([^.!?]*[.!?]+)\s*([\s\S]*)$/);
  if (!match) return { lede: text, rest: "" };
  return { lede: match[1].trim(), rest: match[2].trim() };
}

function CaseStudyPage({ slug }) {
  const { skin } = window.useSkin();
  const project = window.getProject(slug);

  if (!project) {
    return <window.NotFound slug={slug} />;
  }

  const layouts = {
    mac:      window.MacCaseStudyLayout,
    win95:    window.Win95CaseStudyLayout,
    material: window.MaterialCaseStudyLayout,
    carbon:   window.CarbonCaseStudyLayout
  };
  const Layout = layouts[skin] || layouts.mac;
  return <Layout project={project} />;
}

// Shared "not found" message rendered in skin-neutral form
function NotFound({ slug }) {
  const { skin } = window.useSkin();
  const tokens = window.skinTokens.get(skin) || window.skinTokens.get("mac");
  return (
    <div style={{
      padding: "60px 24px", textAlign: "center", color: tokens.text, fontFamily: tokens.font
    }}>
      <div style={{ fontFamily: tokens.monoFont, fontSize: "12px", color: tokens.muted, marginBottom: "8px" }}>404</div>
      <h2 style={{ fontFamily: tokens.displayFont || tokens.font, fontSize: "28px", margin: "0 0 12px" }}>Project not found</h2>
      <p style={{ color: tokens.muted, marginBottom: "24px" }}>No case study with the slug "{slug}".</p>
      <a href="#/projects" style={{ color: tokens.accent, textDecoration: "underline" }}>← Back to projects</a>
    </div>
  );
}

// =============================================================================
// Shared case study body — used inside each skin's case study layout
// Renders: meta panel, summary, challenge, sections (via renderer), outcome,
// related projects. The skin's layout component handles hero + chrome.
// =============================================================================
function CaseStudySections({ project, tokens }) {
  const ctx = { tokens, project, skin: window.useSkin().skin };
  return (
    <div style={{ display: "grid", gap: "8px", gridTemplateColumns: "minmax(0, 1fr)" }}>
      {/* Summary — a strong lede sentence followed by softer supporting context */}
      <section style={{ margin: "16px 0 24px" }}>
        {(() => {
          const { lede, rest } = splitLede(project.summary);
          return (
            <React.Fragment>
              <div style={{
                fontFamily: tokens.displayFont || tokens.font,
                fontSize: "clamp(21px, 2.8vw, 28px)",
                lineHeight: 1.35,
                fontWeight: 600,
                letterSpacing: "-0.01em",
                color: tokens.text,
                textWrap: "pretty",
                maxWidth: "60ch"
              }}>{lede}</div>
              {rest && (
                <div style={{
                  marginTop: "10px",
                  fontFamily: tokens.font,
                  fontSize: "clamp(15px, 1.7vw, 17px)",
                  lineHeight: 1.6,
                  fontWeight: 400,
                  color: tokens.muted,
                  textWrap: "pretty",
                  maxWidth: "66ch"
                }}>{rest}</div>
              )}
            </React.Fragment>
          );
        })()}
      </section>

      {/* At a glance — recruiter-friendly snapshot */}
      <CaseStudyRecruiterInsight recruiterInsight={project.recruiterInsight} tokens={tokens} />

      {/* Challenge */}
      {project.challenge && (
        <section style={{ margin: "12px 0 8px" }}>
          <div style={{
            fontFamily: tokens.monoFont, fontSize: "11px", color: tokens.muted,
            textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "8px"
          }}>Challenge</div>
          <div style={{ fontFamily: tokens.font, fontSize: "16px", color: tokens.text, lineHeight: 1.6, maxWidth: "70ch", textWrap: "pretty" }}>
            {project.challenge}
          </div>
        </section>
      )}

      {/* Top-line metrics row */}
      {project.metrics && project.metrics.length > 0 && (
        <window.MetricsBlock block={{ items: project.metrics }} ctx={ctx} />
      )}

      {/* Sections from data */}
      {(project.sections || []).map((block, i) => (
        <window.CaseStudyBlockRenderer key={`${block.type}-${i}`} block={block} ctx={ctx} />
      ))}

      {/* Outcome */}
      {project.outcome && (
        <section style={{ margin: "32px 0 8px" }}>
          <div style={{
            fontFamily: tokens.monoFont, fontSize: "11px", color: tokens.accent,
            textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "8px"
          }}>Outcome</div>
          <div style={{
            fontFamily: tokens.displayFont || tokens.font,
            fontSize: "clamp(18px, 2.2vw, 22px)",
            color: tokens.text,
            lineHeight: 1.5,
            maxWidth: "70ch",
            textWrap: "pretty"
          }}>{project.outcome}</div>
        </section>
      )}
    </div>
  );
}

// "At a glance" recruiter insight — uniform, scannable snapshot rendered near
// the top of every case study. Data-driven via project.recruiterInsight; the
// section quietly disappears if the field is absent so older/future entries
// never crash. Styled like MetricsBlock/CaseStudyMeta so it inherits each
// skin's tokens (surfaces, borders, radius, fonts) rather than one fixed look.
function CaseStudyRecruiterInsight({ recruiterInsight, tokens }) {
  if (!recruiterInsight) return null;
  const { headline, problem, users, role, contribution, outcome } = recruiterInsight;
  const rows = [
    { k: "Problem", v: problem },
    { k: "Who it's for", v: users },
    { k: "My role", v: role },
    { k: "What I did", v: contribution },
    { k: "Outcome", v: outcome }
  ].filter((r) => r.v);

  if (!headline && rows.length === 0) return null;
  const isWin95 = tokens.name === "Windows 95";

  return (
    <section aria-label="At a glance" style={{ margin: "8px 0 28px" }}>
      <div style={{
        fontFamily: tokens.monoFont, fontSize: "11px", color: tokens.accent,
        textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "10px"
      }}>At a glance</div>

      {headline && (
        <div style={{
          fontFamily: tokens.displayFont || tokens.font,
          fontSize: "clamp(19px, 2.4vw, 23px)",
          fontWeight: 600,
          color: tokens.text,
          lineHeight: 1.4,
          marginBottom: rows.length > 0 ? "18px" : 0,
          maxWidth: "62ch",
          textWrap: "pretty"
        }}>{headline}</div>
      )}

      {rows.length > 0 && (
        <dl style={{
          margin: 0,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: isWin95 ? "2px" : "10px",
          ...(isWin95 ? { background: tokens.border, border: `1px solid ${tokens.border}` } : {})
        }}>
          {rows.map((r) => (
            <div key={r.k} style={{
              padding: "14px 16px",
              background: tokens.surfaceAlt || tokens.surfaceSolid,
              border: isWin95 ? "none" : `1px solid ${tokens.border}`,
              borderRadius: tokens.radius
            }}>
              <dt style={{
                fontFamily: tokens.monoFont, fontSize: "11px",
                color: tokens.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px"
              }}>{r.k}</dt>
              <dd style={{ margin: 0, fontFamily: tokens.font, fontSize: "14px", color: tokens.text, lineHeight: 1.5 }}>
                {r.v}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}

// Meta key/value panel — small label/value list used in every skin
function CaseStudyMeta({ project, tokens, variant = "default" }) {
  const rows = [
    { k: "Role", v: project.role },
    { k: "Year", v: project.year },
    { k: "Category", v: project.category },
    { k: "Status", v: project.status }
  ].filter((r) => r.v);

  return (
    <dl style={{
      margin: 0,
      display: "grid",
      gap: "10px",
      gridTemplateColumns: variant === "row" ? "repeat(auto-fit, minmax(140px, 1fr))" : "1fr",
      padding: variant === "row" ? "16px 0" : "0"
    }}>
      {rows.map((r) => (
        <div key={r.k} style={{ display: "grid", gap: "4px" }}>
          <dt style={{
            fontFamily: tokens.monoFont, fontSize: "11px",
            color: tokens.muted, textTransform: "uppercase", letterSpacing: "0.08em"
          }}>{r.k}</dt>
          <dd style={{ margin: 0, fontFamily: tokens.font, fontSize: "14px", color: tokens.text, fontWeight: 500 }}>
            {r.v}
          </dd>
        </div>
      ))}
    </dl>
  );
}

// Related projects strip
function RelatedProjects({ slug, tokens, onOpen }) {
  const related = window.getRelatedProjects(slug, 3);
  if (related.length === 0) return null;
  return (
    <section style={{ marginTop: "60px", paddingTop: "32px", borderTop: `1px solid ${tokens.border}` }}>
      <div style={{
        fontFamily: tokens.monoFont, fontSize: "11px", color: tokens.muted,
        textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "16px"
      }}>Related projects</div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "12px"
      }}>
        {related.map((p) => (
          <a
            key={p.slug}
            href={`#/projects/${p.slug}`}
            style={{
              display: "block",
              textDecoration: "none",
              padding: "16px",
              border: `1px solid ${tokens.border}`,
              borderRadius: tokens.radius,
              background: tokens.surfaceAlt || tokens.surfaceSolid
            }}
          >
            <div style={{ fontFamily: tokens.monoFont, fontSize: "11px", color: p.accent || tokens.accent, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              {p.category}
            </div>
            <div style={{ fontFamily: tokens.font, fontSize: "16px", fontWeight: 600, color: tokens.text, marginBottom: "4px" }}>
              {p.title}
            </div>
            <div style={{ fontFamily: tokens.font, fontSize: "13px", color: tokens.muted, lineHeight: 1.4 }}>
              {p.subtitle}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { CaseStudyPage, NotFound, CaseStudySections, CaseStudyRecruiterInsight, CaseStudyMeta, RelatedProjects });
