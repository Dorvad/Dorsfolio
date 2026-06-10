// =============================================================================
// CaseStudyBlockRenderer — maps a section object to the right block component
// =============================================================================

function CaseStudyBlockRenderer({ block, ctx }) {
  if (!block || !block.type) return null;
  switch (block.type) {
    case "text":         return <window.TextBlock        block={block} ctx={ctx} />;
    case "image":        return <window.ImageBlock       block={block} ctx={ctx} />;
    case "gallery":      return <window.GalleryBlock     block={block} ctx={ctx} />;
    case "metrics":      return <window.MetricsBlock     block={block} ctx={ctx} />;
    case "quote":        return <window.QuoteBlock       block={block} ctx={ctx} />;
    case "process":      return <window.ProcessBlock     block={block} ctx={ctx} />;
    case "beforeAfter":  return <window.BeforeAfterBlock block={block} ctx={ctx} />;
    case "insight":      return <window.InsightBlock     block={block} ctx={ctx} />;
    case "links":        return <window.LinksBlock       block={block} ctx={ctx} />;
    case "featureList":  return <window.FeatureListBlock block={block} ctx={ctx} />;
    case "timeline":        return <window.TimelineBlock         block={block} ctx={ctx} />;
    case "logoHero":        return <window.LogoHeroBlock         block={block} ctx={ctx} />;
    case "branchlabPlayer":    return <window.BranchlabPlayerBlock    block={block} ctx={ctx} />;
    case "video":              return <window.VideoBlock              block={block} ctx={ctx} />;
    case "caseStudyGallery":    return <window.CaseStudyGalleryBlock    block={block} ctx={ctx} />;
    case "imageComparison":    return <window.ImageComparisonBlock    block={block} ctx={ctx} />;
    default:
      return (
        <div style={{
          padding: "12px 16px",
          fontFamily: ctx.tokens.monoFont,
          fontSize: "12px",
          color: ctx.tokens.muted,
          border: `1px dashed ${ctx.tokens.border}`,
          borderRadius: ctx.tokens.radius,
          margin: "16px 0"
        }}>Unknown block type: {block.type}</div>
      );
  }
}

window.CaseStudyBlockRenderer = CaseStudyBlockRenderer;
