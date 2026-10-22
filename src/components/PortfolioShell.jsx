// =============================================================================
// PortfolioShell — picks the active skin's shell and routes the current view
// =============================================================================

function PortfolioShell() {
  const { skin } = window.useSkin();
  const route = window.useRoute();
  const reduced = window.useReducedMotion();

  // Pick skin shell
  const shells = {
    mac:      window.MacPortfolioShell,
    win95:    window.Win95PortfolioShell,
    material: window.MaterialPortfolioShell,
    carbon:   window.CarbonPortfolioShell
  };
  const Shell = shells[skin] || shells.mac;

  // Pick route content
  let content;
  if (route.name === "home")        content = <window.HomeSection />;
  else if (route.name === "projects") content = <window.ProjectGridSection />;
  else if (route.name === "case-study") content = <window.CaseStudyPage slug={route.slug} />;
  else if (route.name === "about")  content = <window.AboutSection />;
  else if (route.name === "contact") content = <window.ContactSection />;
  else if (route.name === "gallery") content = <window.GalleryPage />;
  else if (route.name === "writing") content = <window.WritingPage />;
  else if (route.name === "writing-post") content = <window.WritingPostPage slug={route.slug} />;
  else content = <window.HomeSection />;

  // Route changes animate in the vocabulary of the active world
  // (see --ds-route-anim in skinStyles.jsx); Win95 cuts, the others arrive.
  return (
    <Shell route={route}>
      <div key={route.path} className={reduced ? undefined : "ds-route"}>
        {content}
      </div>
    </Shell>
  );
}

window.PortfolioShell = PortfolioShell;
