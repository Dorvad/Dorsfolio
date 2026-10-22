// =============================================================================
// Writing / Blog section — newsletter front door + post list + native post view
// Read mode: structure for comprehension, then make the reading worth staying in.
// Every colour comes from the active skin's tokens so the section belongs to
// whichever world the visitor chose.
// =============================================================================

function formatPostDate(dateStr) {
  if (!dateStr) return "";
  const [year, month] = dateStr.split("-");
  const d = new Date(+year, +month - 1, 1);
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function useWritingSkin() {
  const { skin } = window.useSkin();
  const tokens = window.skinTokens.get(skin || "mac");
  return {
    skin: skin || "mac",
    tokens,
    isCarbon: skin === "carbon",
    isWin95: skin === "win95",
    isMaterial: skin === "material"
  };
}

// ---------------------------------------------------------------------------
// Newsletter signup card
// ---------------------------------------------------------------------------
function NewsletterSignup() {
  const embedRef = React.useRef(null);
  const { tokens, isCarbon, isWin95, isMaterial } = useWritingSkin();
  const accent = tokens.accent;

  React.useEffect(() => {
    const container = embedRef.current;
    if (!container) return;
    container.innerHTML = "";
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://subscribe-forms.beehiiv.com/v3/loader.js";
    script.setAttribute("data-beehiiv-form", "69276f9b-7c4c-4545-81c3-fbcd9eeee4b8");
    container.appendChild(script);
    return () => { container.innerHTML = ""; };
  }, []);

  const cardStyle = {
    borderRadius: isWin95 || isCarbon ? 0 : (tokens.radiusLg || tokens.radius),
    padding: "clamp(24px, 5vw, 40px)",
    marginBottom: "48px",
    background: isCarbon
      ? tokens.surface
      : isWin95
        ? "#c0c0c0"
        : isMaterial
          ? `linear-gradient(135deg, ${accent}14 0%, ${tokens.accent2}10 100%)`
          : `linear-gradient(135deg, ${accent}12 0%, ${tokens.accent2}0e 100%)`,
    border: isCarbon
      ? `1px solid ${tokens.border}`
      : isWin95
        ? "none"
        : `1px solid ${accent}2a`,
    boxShadow: isWin95
      ? "inset 1px 1px 0 #ffffff, inset -1px -1px 0 #808080, inset 2px 2px 0 #dfdfdf, inset -2px -2px 0 #000000"
      : "none"
  };

  const headlineStyle = {
    fontSize: isCarbon ? "20px" : isWin95 ? "14px" : "22px",
    fontWeight: isWin95 ? 700 : 600,
    letterSpacing: isCarbon || isWin95 ? "0" : "-0.02em",
    fontFamily: tokens.displayFont || tokens.font,
    margin: "0 0 8px",
    color: tokens.text,
    lineHeight: 1.25
  };

  const subStyle = {
    fontSize: isCarbon ? "14px" : isWin95 ? "12px" : "15px",
    color: tokens.muted,
    margin: "0 0 24px",
    lineHeight: 1.6,
    maxWidth: "52ch"
  };

  return (
    <aside aria-label="Newsletter" style={cardStyle}>
      <h2 style={headlineStyle}>Notes from the work — in your inbox</h2>
      <p style={subStyle}>
        Short, occasional dispatches on AI, learning design, product thinking,
        and things I'm building. No noise, no schedule pressure.
      </p>
      <div ref={embedRef} />
    </aside>
  );
}

// ---------------------------------------------------------------------------
// Single post row
// ---------------------------------------------------------------------------
function WritingPostRow({ post }) {
  const { tokens, isCarbon, isWin95, isMaterial } = useWritingSkin();

  const isExternal = post.source === "beehiiv";
  const href = isExternal ? (post.externalUrl || "#") : `#/writing/${post.slug}`;

  const rowStyle = {
    display: "block",
    textDecoration: "none",
    color: "inherit",
    padding: isWin95 ? "12px 0" : "20px 0",
    borderBottom: `1px solid ${tokens.border}`,
    cursor: "pointer"
  };

  const metaStyle = {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: "6px",
    fontSize: isCarbon || isWin95 ? "11px" : "12px",
    fontFamily: tokens.monoFont || tokens.font,
    color: tokens.muted,
    letterSpacing: "0.03em"
  };

  const titleStyle = {
    fontSize: isCarbon ? "18px" : isWin95 ? "13px" : "19px",
    fontWeight: isWin95 ? 700 : 600,
    letterSpacing: isCarbon || isWin95 ? "0" : "-0.02em",
    fontFamily: tokens.displayFont || tokens.font,
    marginBottom: "6px",
    lineHeight: 1.25,
    color: tokens.text,
    textWrap: "balance"
  };

  const excerptStyle = {
    fontSize: isWin95 ? "12px" : "14px",
    color: tokens.muted,
    lineHeight: 1.6,
    marginBottom: 0,
    maxWidth: "62ch",
    textWrap: "pretty"
  };

  const badgeStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    padding: isWin95 ? "1px 6px" : "3px 9px",
    borderRadius: isWin95 || isCarbon ? 0 : "999px",
    fontSize: "11px",
    fontFamily: tokens.monoFont || tokens.font,
    fontWeight: 600,
    background: isCarbon ? tokens.surfaceAlt : isWin95 ? "#000080" : isMaterial ? "#e8def8" : `${tokens.accent}14`,
    color: isCarbon ? tokens.accent : isWin95 ? "#fff" : isMaterial ? "#21005d" : tokens.accent,
    letterSpacing: "0.03em",
    marginLeft: "auto",
    flexShrink: 0,
    alignSelf: "flex-start",
    marginTop: isCarbon ? "4px" : "0"
  };

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="ds-post-row"
      style={rowStyle}
    >
      <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={metaStyle}>
            <span style={{
              padding: "1px 6px",
              borderRadius: isWin95 || isCarbon ? 0 : "4px",
              background: isCarbon ? tokens.surfaceAlt : isWin95 ? "#c0c0c0" : `${tokens.text}0f`,
              color: tokens.text,
              boxShadow: isWin95 ? "inset 1px 1px 0 #808080, inset -1px -1px 0 #fff" : "none",
              fontWeight: 600
            }}>{post.category}</span>
            <span>{formatPostDate(post.date)}</span>
            <span>{post.readingTime}</span>
          </div>
          <div className="ds-post-title" style={titleStyle}>{post.title}</div>
          <div style={excerptStyle}>{post.excerpt}</div>
        </div>
        {isExternal && (
          <div style={badgeStyle}>Newsletter <window.Icon name="external" size={12} /></div>
        )}
      </div>
    </a>
  );
}

// ---------------------------------------------------------------------------
// Empty state
// ---------------------------------------------------------------------------
function WritingEmptyState() {
  const { tokens, isCarbon, isWin95 } = useWritingSkin();
  return (
    <div style={{
      padding: "64px 0",
      textAlign: "center",
      color: tokens.muted
    }}>
      <div style={{ marginBottom: "12px", color: tokens.muted }}><window.Icon name="pen" size={28} /></div>
      <div style={{
        fontSize: isCarbon ? "18px" : isWin95 ? "13px" : "20px",
        fontWeight: 600,
        color: tokens.text,
        marginBottom: "8px"
      }}>Something's coming</div>
      <div style={{
        fontSize: "14px",
        maxWidth: "320px",
        margin: "0 auto"
      }}>Posts will appear here as they're published.</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Writing page (list view)
// ---------------------------------------------------------------------------
function WritingPage() {
  const { tokens, isCarbon, isWin95 } = useWritingSkin();

  const posts = (window.writingPosts || []).slice().sort((a, b) => b.date.localeCompare(a.date));

  const pageStyle = {
    maxWidth: "700px",
    margin: "0 auto",
    padding: isCarbon ? "24px 0 80px" : isWin95 ? "12px 0 60px" : "32px 0 96px"
  };

  const heroTitleStyle = {
    fontSize: isCarbon ? "clamp(28px,5vw,40px)" : isWin95 ? "clamp(20px,3vw,26px)" : "clamp(32px,6vw,52px)",
    fontWeight: isCarbon ? 300 : 700,
    letterSpacing: isCarbon || isWin95 ? "0" : "-0.03em",
    fontFamily: tokens.displayFont || tokens.font,
    lineHeight: 1.1,
    margin: "0 0 16px",
    color: tokens.text,
    textWrap: "balance"
  };

  const heroBodyStyle = {
    fontSize: isCarbon ? "15px" : isWin95 ? "12px" : "16px",
    lineHeight: 1.7,
    color: tokens.muted,
    margin: `0 0 ${isCarbon ? "40px" : isWin95 ? "20px" : "48px"}`,
    maxWidth: "56ch",
    textWrap: "pretty"
  };

  const sectionHeadStyle = {
    fontSize: isWin95 ? "13px" : "clamp(18px, 2.4vw, 22px)",
    fontWeight: isCarbon ? 400 : 600,
    fontFamily: tokens.displayFont || tokens.font,
    letterSpacing: isCarbon || isWin95 ? "0" : "-0.01em",
    color: tokens.text,
    margin: 0,
    paddingBottom: "12px",
    borderBottom: `1px solid ${tokens.border}`
  };

  return (
    <div style={pageStyle} data-screen-label="Writing">
      <style>{`
        .ds-post-row .ds-post-title { transition: color 150ms ease; }
        .ds-post-row:hover .ds-post-title, .ds-post-row:focus-visible .ds-post-title { color: ${tokens.accent}; }
        :root[data-skin="win95"] .ds-post-row:hover .ds-post-title { text-decoration: underline; }
      `}</style>
      {/* Hero */}
      <h1 style={heroTitleStyle}>Notes from the work</h1>
      <p style={heroBodyStyle}>
        I write about AI, learning design, product thinking, creative tools,
        and things I'm building. Sometimes polished, sometimes half-formed.
        Always trying to say one thing well.
      </p>

      {/* Newsletter */}
      <NewsletterSignup />

      {/* Post list */}
      <h2 style={sectionHeadStyle}>All posts</h2>
      {posts.length === 0
        ? <WritingEmptyState />
        : posts.map((post) => (
            <WritingPostRow key={post.slug || post.title} post={post} />
          ))
      }
    </div>
  );
}

// ---------------------------------------------------------------------------
// Native post page
// ---------------------------------------------------------------------------
function WritingPostPage({ slug }) {
  const { tokens, isCarbon, isWin95, isMaterial } = useWritingSkin();

  const post = (window.writingPosts || []).find((p) => p.slug === slug) || null;

  const pageStyle = {
    maxWidth: "680px",
    margin: "0 auto",
    padding: isCarbon ? "24px 0 80px" : isWin95 ? "12px 0 60px" : "32px 0 96px"
  };

  const backStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "13px",
    color: tokens.muted,
    marginBottom: "40px",
    fontFamily: tokens.monoFont || tokens.font,
    letterSpacing: "0.03em"
  };

  if (!post) {
    return (
      <div style={pageStyle}>
        <a href="#/writing" className="ds-link" style={backStyle}><window.Icon name="arrowLeft" size={14} /> Writing</a>
        <p style={{ color: tokens.muted, fontSize: "15px" }}>Post not found.</p>
      </div>
    );
  }

  const titleStyle = {
    fontSize: isCarbon ? "clamp(24px,4vw,36px)" : isWin95 ? "clamp(18px,3vw,24px)" : "clamp(28px,5vw,44px)",
    fontWeight: isCarbon ? 300 : 700,
    letterSpacing: isCarbon || isWin95 ? "0" : "-0.03em",
    fontFamily: tokens.displayFont || tokens.font,
    lineHeight: 1.1,
    margin: "0 0 16px",
    color: tokens.text,
    textWrap: "balance"
  };

  const metaStyle = {
    display: "flex",
    gap: "14px",
    flexWrap: "wrap",
    alignItems: "center",
    fontSize: "12px",
    fontFamily: tokens.monoFont || tokens.font,
    color: tokens.muted,
    letterSpacing: "0.03em",
    paddingBottom: "28px",
    borderBottom: `1px solid ${tokens.border}`,
    marginBottom: "32px"
  };

  const ledeStyle = {
    fontSize: isCarbon ? "17px" : isWin95 ? "13px" : "19px",
    lineHeight: 1.6,
    color: tokens.text,
    fontFamily: tokens.displayFont || tokens.font,
    fontWeight: isWin95 ? 400 : 500,
    margin: "0 0 32px",
    textWrap: "pretty"
  };

  const newsletterBannerStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "12px",
    fontFamily: tokens.monoFont || tokens.font,
    letterSpacing: "0.03em",
    textDecoration: "none",
    color: isMaterial ? "#21005d" : tokens.accent,
    background: isCarbon ? tokens.surface : isWin95 ? "#c0c0c0" : isMaterial ? "#e8def8" : `${tokens.accent}10`,
    border: isCarbon ? `1px solid ${tokens.border}` : isWin95 ? "none" : `1px solid ${tokens.accent}30`,
    boxShadow: isWin95 ? "inset 1px 1px 0 #fff, inset -1px -1px 0 #808080" : "none",
    borderRadius: isWin95 || isCarbon ? 0 : "6px",
    padding: isWin95 ? "2px 8px" : "5px 12px",
    marginBottom: "28px"
  };

  const textColor    = isCarbon ? "#e0e0e0" : tokens.text;
  const headingColor = tokens.text;
  const mutedColor   = tokens.muted;
  const accentColor  = tokens.accent;
  const bodyFont     = tokens.font;
  const displayFont  = tokens.displayFont || tokens.font;
  const bodySize     = isCarbon ? "16px" : isWin95 ? "13px" : "17px";
  const h2Size       = isCarbon ? "20px" : isWin95 ? "15px" : "22px";
  const h3Size       = isCarbon ? "16px" : isWin95 ? "13px" : "18px";
  const bqSize       = isCarbon ? "17px" : isWin95 ? "14px" : "19px";

  React.useEffect(() => {
    const styleId = "prose-content-styles";
    let el = document.getElementById(styleId);
    if (!el) {
      el = document.createElement("style");
      el.id = styleId;
      document.head.appendChild(el);
    }
    el.textContent = [
      `.prose-content { font-family: ${bodyFont}; font-size: ${bodySize}; line-height: 1.75; color: ${textColor}; text-wrap: pretty; }`,
      `.prose-content p { margin: 0 0 20px; }`,
      `.prose-content h2 { font-family: ${displayFont}; font-size: ${h2Size}; font-weight: ${isCarbon ? 400 : 700}; color: ${headingColor}; margin: 40px 0 12px; line-height: 1.25; letter-spacing: ${isCarbon || isWin95 ? "0" : "-0.02em"}; text-wrap: balance; }`,
      `.prose-content h3 { font-family: ${displayFont}; font-size: ${h3Size}; font-weight: 600; color: ${headingColor}; margin: 24px 0 8px; }`,
      `.prose-content blockquote { border-left: 1px solid ${accentColor}; padding-left: 20px; font-style: italic; color: ${mutedColor}; margin: 0 0 28px; font-size: ${bqSize}; }`,
      `.prose-content ol, .prose-content ul { padding-left: 24px; margin: 0 0 20px; }`,
      `.prose-content li { margin-bottom: 8px; }`,
      `.prose-content li::marker { color: ${accentColor}; }`,
      `.prose-content strong { font-weight: 700; color: ${headingColor}; }`,
      `.prose-content a { color: ${accentColor}; text-underline-offset: 3px; }`,
      `.prose-content img { border-radius: ${tokens.radius}; display: block; margin: 24px 0; }`,
    ].join("\n");
    return () => { const s = document.getElementById(styleId); if (s) s.remove(); };
  }, [bodyFont, displayFont, bodySize, h2Size, h3Size, bqSize, textColor, headingColor, mutedColor, accentColor, isCarbon, isWin95, tokens.radius]);

  const htmlContent = window.postContentHtml && window.postContentHtml[slug];

  return (
    <article style={pageStyle} data-screen-label="Writing post">
      <a href="#/writing" className="ds-link" style={backStyle}><window.Icon name="arrowLeft" size={14} /> Writing</a>

      <h1 style={titleStyle}>{post.title}</h1>

      <div style={metaStyle}>
        <span style={{ color: tokens.accent, textTransform: "uppercase", letterSpacing: "0.08em", fontSize: "11px" }}>{post.category}</span>
        <span aria-hidden="true">·</span>
        <span>{formatPostDate(post.date)}</span>
        <span aria-hidden="true">·</span>
        <span>{post.readingTime} read</span>
      </div>

      <p style={ledeStyle}>{post.excerpt}</p>

      {post.newsletterUrl && (
        <a href={post.newsletterUrl} target="_blank" rel="noopener noreferrer" className="ds-tile" style={newsletterBannerStyle}>
          Also published in my newsletter <window.Icon name="external" size={12} />
        </a>
      )}

      {htmlContent && (
        <div className="prose-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />
      )}

      <div style={{ marginTop: "64px", paddingTop: "32px", borderTop: `1px solid ${tokens.border}` }}>
        <a href="#/writing" className="ds-link" style={{ ...backStyle, marginBottom: 0 }}><window.Icon name="arrowLeft" size={14} /> Back to Writing</a>
      </div>
    </article>
  );
}

Object.assign(window, { WritingPage, WritingPostPage, NewsletterSignup });
