// =============================================================================
// PortfolioShell — picks the active skin's shell and routes the current view
// =============================================================================

function PortfolioShell() {
  const { skin } = window.useSkin();
  const route = window.useRoute();

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
  else content = <window.HomeSection />;

  return <Shell route={route}>{content}</Shell>;
}

window.PortfolioShell = PortfolioShell;
