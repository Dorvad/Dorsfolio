// =============================================================================
// Writing / Blog section — newsletter front door + post list + native post view
// =============================================================================

const { useState, useEffect, useRef } = React;

function formatPostDate(dateStr) {
  if (!dateStr) return "";
  const [year, month] = dateStr.split("-");
  const d = new Date(+year, +month - 1, 1);
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

// ---------------------------------------------------------------------------
// Newsletter signup card
// ---------------------------------------------------------------------------
function NewsletterSignup({ tokens }) {
  const embedRef = useRef(null);
  const isCarbon = tokens && tokens.font && tokens.font.includes("IBM");
  const isWin95  = tokens && tokens.font && tokens.font.includes("px");

  useEffect(() => {
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
    borderRadius: isWin95 ? 0 : isCarbon ? 0 : "16px",
    padding: "clamp(24px, 5vw, 40px)",
    marginBottom: "48px",
    background: isCarbon
      ? "#262626"
      : isWin95
        ? "#c0c0c0"
        : "linear-gradient(135deg, #f0f4ff 0%, #faf0fe 100%)",
    border: isCarbon
      ? "1px solid #393939"
      : isWin95
        ? "inset 1px 1px 0 #ffffff, inset -1px -1px 0 #808080, inset 2px 2px 0 #dfdfdf, inset -2px -2px 0 #000000"
        : "1.5px solid rgba(99,102,241,0.15)",
    boxShadow: isWin95
      ? "inset 1px 1px 0 #ffffff, inset -1px -1px 0 #808080, inset 2px 2px 0 #dfdfdf, inset -2px -2px 0 #000000"
      : isCarbon
        ? "none"
        : "0 4px 24px rgba(99,102,241,0.07)"
  };

  const headlineStyle = {
    fontSize: isCarbon ? "20px" : isWin95 ? "14px" : "22px",
    fontWeight: isWin95 ? 700 : 600,
    letterSpacing: isCarbon ? "0.01em" : isWin95 ? "0" : "-0.02em",
    fontFamily: tokens ? tokens.displayFont || tokens.font : "inherit",
    marginBottom: "8px",
    color: isCarbon ? "#f4f4f4" : isWin95 ? "#000" : "#1e1b4b",
    lineHeight: 1.25
  };

  const subStyle = {
    fontSize: isCarbon ? "14px" : isWin95 ? "12px" : "15px",
    color: isCarbon ? "#c6c6c6" : isWin95 ? "#444" : "#64748b",
    marginBottom: "24px",
    lineHeight: 1.6
  };

  return (
    <div style={cardStyle}>
      <div style={headlineStyle}>Notes from the work — in your inbox</div>
      <div style={subStyle}>
        Short, occasional dispatches on AI, learning design, product thinking,
        and things I'm building. No noise, no schedule pressure.
      </div>
      <div ref={embedRef} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Single post row
// ---------------------------------------------------------------------------
function WritingPostRow({ post, tokens }) {
  const [hovered, setHovered] = useState(false);
  const isCarbon = tokens && tokens.font && tokens.font.includes("IBM");
  const isWin95  = tokens && tokens.font && tokens.font.includes("px");

  const isExternal = post.source === "beehiiv";
  const href = isExternal ? (post.externalUrl || "#") : `#/writing/${post.slug}`;

  const rowStyle = {
    display: "block",
    textDecoration: "none",
    color: "inherit",
    padding: isCarbon ? "20px 0" : isWin95 ? "12px 0" : "20px 0",
    borderBottom: isCarbon ? `1px solid #393939` : `1px solid ${tokens ? tokens.border : "#e5e7eb"}`,
    cursor: "pointer"
  };

  const metaStyle = {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: "6px",
    fontSize: isCarbon ? "11px" : isWin95 ? "11px" : "12px",
    fontFamily: tokens ? tokens.monoFont || tokens.font : "monospace",
    color: tokens ? tokens.muted : "#9ca3af",
    letterSpacing: "0.03em"
  };

  const titleStyle = {
    fontSize: isCarbon ? "18px" : isWin95 ? "13px" : "19px",
    fontWeight: isWin95 ? 700 : 600,
    letterSpacing: isCarbon ? "0.01em" : isWin95 ? "0" : "-0.02em",
    fontFamily: tokens ? tokens.displayFont || tokens.font : "inherit",
    marginBottom: "6px",
    lineHeight: 1.25,
    color: hovered ? (tokens ? tokens.accent : "#6366f1") : (isCarbon ? "#f4f4f4" : tokens ? tokens.text : "#1e1b4b"),
    transition: "color 0.15s"
  };

  const excerptStyle = {
    fontSize: isCarbon ? "14px" : isWin95 ? "12px" : "14px",
    color: tokens ? tokens.muted : "#64748b",
    lineHeight: 1.6,
    marginBottom: 0
  };

  const badgeStyle = {
    display: "inline-flex",
    alignItems: "center",
    padding: isWin95 ? "1px 6px" : "2px 8px",
    borderRadius: isWin95 ? 0 : isCarbon ? 0 : "999px",
    fontSize: "11px",
    fontFamily: tokens ? tokens.monoFont || tokens.font : "monospace",
    fontWeight: 600,
    background: isCarbon ? "#393939" : isWin95 ? "#000080" : "rgba(99,102,241,0.1)",
    color: isCarbon ? "#a6c8ff" : isWin95 ? "#fff" : "#6366f1",
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
      style={rowStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={metaStyle}>
            <span style={{
              padding: "1px 6px",
              borderRadius: isWin95 ? 0 : isCarbon ? 0 : "4px",
              background: isCarbon ? "#393939" : isWin95 ? "#c0c0c0" : "rgba(0,0,0,0.06)",
              color: isCarbon ? "#c6c6c6" : tokens ? tokens.text : "#374151",
              border: isWin95 ? "inset 1px 1px 0 #808080, inset -1px -1px 0 #fff" : "none",
              fontWeight: 600
            }}>{post.category}</span>
            <span>{formatPostDate(post.date)}</span>
            <span>{post.readingTime}</span>
          </div>
          <div style={titleStyle}>{post.title}</div>
          <div style={excerptStyle}>{post.excerpt}</div>
        </div>
        {isExternal && (
          <div style={badgeStyle}>Newsletter ↗</div>
        )}
      </div>
    </a>
  );
}

// ---------------------------------------------------------------------------
// Empty state
// ---------------------------------------------------------------------------
function WritingEmptyState({ tokens }) {
  const isCarbon = tokens && tokens.font && tokens.font.includes("IBM");
  const isWin95  = tokens && tokens.font && tokens.font.includes("px");

  return (
    <div style={{
      padding: "64px 0",
      textAlign: "center",
      color: tokens ? tokens.muted : "#9ca3af"
    }}>
      <div style={{
        fontSize: isCarbon ? "13px" : isWin95 ? "12px" : "14px",
        fontFamily: tokens ? tokens.monoFont || tokens.font : "monospace",
        letterSpacing: "0.05em",
        marginBottom: "12px"
      }}>— —</div>
      <div style={{
        fontSize: isCarbon ? "18px" : isWin95 ? "13px" : "20px",
        fontWeight: 600,
        color: isCarbon ? "#f4f4f4" : tokens ? tokens.text : "#1e1b4b",
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
  const route = window.useRoute ? window.useRoute() : { name: "writing" };
  const tokens = window.skinTokens
    ? (() => {
        const { skin } = window.useSkin ? window.useSkin() : { skin: "mac" };
        return window.skinTokens.get(skin || "mac");
      })()
    : null;

  const isCarbon = tokens && tokens.font && tokens.font.includes("IBM");
  const isWin95  = tokens && tokens.font && tokens.font.includes("px");

  const posts = (window.writingPosts || []).slice().sort((a, b) => b.date.localeCompare(a.date));

  const pageStyle = {
    maxWidth: "700px",
    margin: "0 auto",
    padding: isCarbon ? "40px 0 80px" : isWin95 ? "20px 0 60px" : "48px 0 96px"
  };

  const heroLabelStyle = {
    fontSize: "11px",
    fontFamily: tokens ? tokens.monoFont || tokens.font : "monospace",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: isCarbon ? "#8d8d8d" : tokens ? tokens.muted : "#9ca3af",
    marginBottom: "12px"
  };

  const heroTitleStyle = {
    fontSize: isCarbon ? "clamp(28px,5vw,40px)" : isWin95 ? "clamp(16px,3vw,22px)" : "clamp(32px,6vw,52px)",
    fontWeight: isWin95 ? 700 : 700,
    letterSpacing: isCarbon ? "0.01em" : isWin95 ? "0" : "-0.04em",
    fontFamily: tokens ? tokens.displayFont || tokens.font : "inherit",
    lineHeight: 1.1,
    marginBottom: "16px",
    color: isCarbon ? "#f4f4f4" : tokens ? tokens.text : "#0f172a"
  };

  const heroBodyStyle = {
    fontSize: isCarbon ? "15px" : isWin95 ? "12px" : "16px",
    lineHeight: 1.7,
    color: isCarbon ? "#c6c6c6" : tokens ? tokens.muted : "#475569",
    marginBottom: isCarbon ? "40px" : isWin95 ? "20px" : "48px",
    maxWidth: "560px"
  };

  const sectionHeadStyle = {
    fontSize: isCarbon ? "11px" : isWin95 ? "11px" : "12px",
    fontFamily: tokens ? tokens.monoFont || tokens.font : "monospace",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: isCarbon ? "#8d8d8d" : tokens ? tokens.muted : "#9ca3af",
    marginBottom: isCarbon ? "0" : isWin95 ? "8px" : "0",
    paddingBottom: "12px",
    borderBottom: isCarbon ? `1px solid #393939` : `1px solid ${tokens ? tokens.border : "#e5e7eb"}`
  };

  return (
    <div style={pageStyle}>
      {/* Hero */}
      <div style={heroLabelStyle}>Writing</div>
      <h1 style={heroTitleStyle}>Notes from the work</h1>
      <p style={heroBodyStyle}>
        I write about AI, learning design, product thinking, creative tools,
        and things I'm building. Sometimes polished, sometimes half-formed.
        Always trying to say one thing well.
      </p>

      {/* Newsletter */}
      <NewsletterSignup tokens={tokens} />

      {/* Post list */}
      <div style={sectionHeadStyle}>All posts</div>
      {posts.length === 0
        ? <WritingEmptyState tokens={tokens} />
        : posts.map((post) => (
            <WritingPostRow key={post.slug || post.title} post={post} tokens={tokens} />
          ))
      }
    </div>
  );
}

// ---------------------------------------------------------------------------
// Native post page
// ---------------------------------------------------------------------------
function WritingPostPage({ slug }) {
  const tokens = window.skinTokens
    ? (() => {
        const { skin } = window.useSkin ? window.useSkin() : { skin: "mac" };
        return window.skinTokens.get(skin || "mac");
      })()
    : null;

  const isCarbon = tokens && tokens.font && tokens.font.includes("IBM");
  const isWin95  = tokens && tokens.font && tokens.font.includes("px");

  const post = (window.writingPosts || []).find((p) => p.slug === slug) || null;

  const pageStyle = {
    maxWidth: "680px",
    margin: "0 auto",
    padding: isCarbon ? "40px 0 80px" : isWin95 ? "20px 0 60px" : "48px 0 96px"
  };

  const backStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "13px",
    textDecoration: "none",
    color: isCarbon ? "#8d8d8d" : tokens ? tokens.muted : "#94a3b8",
    marginBottom: "40px",
    fontFamily: tokens ? tokens.monoFont || tokens.font : "monospace",
    letterSpacing: "0.03em"
  };

  if (!post) {
    return (
      <div style={pageStyle}>
        <a href="#/writing" style={backStyle}>← Writing</a>
        <p style={{ color: tokens ? tokens.muted : "#94a3b8", fontSize: "15px" }}>Post not found.</p>
      </div>
    );
  }

  const categoryStyle = {
    fontSize: "11px",
    fontFamily: tokens ? tokens.monoFont || tokens.font : "monospace",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: tokens ? tokens.accent : "#6366f1",
    marginBottom: "12px"
  };

  const titleStyle = {
    fontSize: isCarbon ? "clamp(24px,4vw,36px)" : isWin95 ? "clamp(14px,3vw,20px)" : "clamp(28px,5vw,44px)",
    fontWeight: 700,
    letterSpacing: isCarbon ? "0.01em" : isWin95 ? "0" : "-0.03em",
    fontFamily: tokens ? tokens.displayFont || tokens.font : "inherit",
    lineHeight: 1.1,
    marginBottom: "16px",
    color: isCarbon ? "#f4f4f4" : tokens ? tokens.text : "#0f172a"
  };

  const metaStyle = {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
    alignItems: "center",
    fontSize: "12px",
    fontFamily: tokens ? tokens.monoFont || tokens.font : "monospace",
    color: tokens ? tokens.muted : "#94a3b8",
    letterSpacing: "0.03em",
    paddingBottom: "32px",
    borderBottom: isCarbon ? `1px solid #393939` : `1px solid ${tokens ? tokens.border : "#e5e7eb"}`,
    marginBottom: "32px"
  };

  const ledeStyle = {
    fontSize: isCarbon ? "16px" : isWin95 ? "13px" : "18px",
    lineHeight: 1.7,
    color: isCarbon ? "#c6c6c6" : tokens ? tokens.text : "#374151",
    fontStyle: "italic",
    marginBottom: "32px"
  };

  const placeholderStyle = {
    padding: "40px 24px",
    textAlign: "center",
    borderRadius: isWin95 ? 0 : isCarbon ? 0 : "12px",
    border: isCarbon ? "1px dashed #525252" : `1.5px dashed ${tokens ? tokens.border : "#e5e7eb"}`,
    color: tokens ? tokens.muted : "#9ca3af",
    fontSize: "14px",
    fontFamily: tokens ? tokens.monoFont || tokens.font : "monospace"
  };

  return (
    <div style={pageStyle}>
      <a href="#/writing" style={backStyle}>← Writing</a>

      <div style={categoryStyle}>{post.category}</div>
      <h1 style={titleStyle}>{post.title}</h1>

      <div style={metaStyle}>
        <span>{formatPostDate(post.date)}</span>
        <span>·</span>
        <span>{post.readingTime} read</span>
      </div>

      <p style={ledeStyle}>{post.excerpt}</p>

      <div style={placeholderStyle}>
        Full post content goes here.
      </div>

      <div style={{ marginTop: "64px", paddingTop: "32px", borderTop: isCarbon ? `1px solid #393939` : `1px solid ${tokens ? tokens.border : "#e5e7eb"}` }}>
        <a href="#/writing" style={backStyle}>← Back to Writing</a>
      </div>
    </div>
  );
}

Object.assign(window, { WritingPage, WritingPostPage, NewsletterSignup });
