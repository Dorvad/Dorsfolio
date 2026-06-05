// =============================================================================
// GALLERY — project images shown on the #/gallery page
// =============================================================================
//
// HOW TO ADD IMAGES:
//   1. Drop your image file into the  gallery/  folder at the repo root
//   2. Add an entry below following the pattern:
//        { src: "gallery/your-file.jpg", caption: "Optional description", project: "Optional project name" }
//   3. Save — the gallery page updates automatically
//
// FIELDS:
//   src      (required) — path relative to the repo root, e.g. "gallery/hero.png"
//   caption  (optional) — short description shown under the image in the lightbox
//   project  (optional) — project label shown as a pill (e.g. "ElmTrackr")
// =============================================================================

window.galleryImages = [
  // ---- Barby ----------------------------------------------------------------
  { src: "gallery/barby-screens-overview.png",   caption: "App screens overview",              project: "Barby" },
  { src: "gallery/barby-home-artist.png",        caption: "Home feed and artist page",         project: "Barby" },
  { src: "gallery/barby-events-screen.png",      caption: "Featured events — mobile app",      project: "Barby" },
  { src: "gallery/barby-onboarding.png",         caption: "Onboarding — Be the First to Know", project: "Barby" },

  // ---- Shlichim Alumni Network ----------------------------------------------
  { src: "gallery/shlichim-alumni-network.jpg",  caption: "Responsive web platform — desktop, tablet, mobile", project: "Shlichim Alumni Network" },
  { src: "gallery/shlichimglobal-logo.png",      caption: "ShlichimGlobal — brand identity",   project: "Shlichim Alumni Network" },

  // ---- Klafei Shlichot (קלפי שליחות) ----------------------------------------
  { src: "gallery/klafei-shlichot-welcome.gif",  caption: "Welcome screen — animated intro",   project: "Klafei Shlichot" },
  { src: "gallery/klafei-shlichot-box.png",      caption: "Card deck product mockup",          project: "Klafei Shlichot" },
  { src: "gallery/klafei-shlichot-booklet.png",  caption: "Booklet product mockup",            project: "Klafei Shlichot" },
  { src: "gallery/klafei-shlichot-cover-kids.png", caption: "Ages 3–6 edition cover",          project: "Klafei Shlichot" },
  { src: "gallery/klafei-shlichot-quiz.jpg",     caption: "Interactive quiz screen",           project: "Klafei Shlichot" },

  // ---- Aliyah e-Learning Course ---------------------------------------------
  { src: "gallery/aliyah-course-welcome.gif",    caption: "Course welcome screen",             project: "Aliyah Course" },

  // ---- Noya's Bears ---------------------------------------------------------
  { src: "gallery/noyas-bears-booklets.jpg",     caption: "Printed booklets — Noya's Bears",  project: "Noya's Bears" },

  // ---- AI Facilitation Tools ------------------------------------------------
  { src: "gallery/4-days-escalation.jpg",        caption: "4 Days of Escalation — AI-generated timeline infographic", project: "AI Facilitation Tools" },
  { src: "gallery/israel-at-war-timeline.jpg",   caption: "Scrolling event timeline — June 2025", project: "AI Facilitation Tools" },
  { src: "gallery/israel-at-war-facilitation-1.jpg", caption: "Live facilitation session — Israel at War", project: "AI Facilitation Tools" },
  { src: "gallery/israel-at-war-facilitation-2.jpg", caption: "Zoom facilitation — dual-host format", project: "AI Facilitation Tools" },

  // ---- Other / General ------------------------------------------------------
  { src: "gallery/freud-ai-logo.gif",            caption: "Freud.AI — brand logo",             project: "Freud.AI" },
  { src: "gallery/talentlms-dashboard.jpg",      caption: "TalentLMS — admin dashboard",       project: "L&D Work" },
  { src: "gallery/workshop-facilitation.jpg",    caption: "Workshop facilitation — live session" },
];
