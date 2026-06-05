// =============================================================================
// CaseStudyPage — picks project by slug, routes to skin-specific layout
// =============================================================================

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
  const tokens = window.skinTokens.get(skin);
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
    <div style={{ display: "grid", gap: "8px" }}>
      {/* Summary */}
      <section style={{ margin: "16px 0 24px" }}>
        <div style={{
          fontFamily: tokens.displayFont || tokens.font,
          fontSize: "clamp(20px, 2.6vw, 26px)",
          lineHeight: 1.4,
          fontWeight: 500,
          color: tokens.text,
          textWrap: "pretty",
          maxWidth: "70ch"
        }}>{project.summary}</div>
      </section>

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
        <window.CaseStudyBlockRenderer key={i} block={block} ctx={ctx} />
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

Object.assign(window, { CaseStudyPage, NotFound, CaseStudySections, CaseStudyMeta, RelatedProjects });
