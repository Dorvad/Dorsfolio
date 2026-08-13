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
//   bg       (optional) — CSS colour painted behind the thumbnail. Use it for
//                         transparent PNGs that would otherwise wash out against
//                         a light skin, e.g. pale VFX sheets: bg: "#17171b"
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

  // ---- ElmTrackr — app screens ----------------------------------------------
  { src: "projects/elmtrackr/dashboard-clock-in.jpg",       caption: "Desktop — clock widget and monthly hours distribution",      project: "ElmTrackr" },
  { src: "projects/elmtrackr/dashboard-idle.jpg",           caption: "Home screen — shift status and monthly summary",             project: "ElmTrackr" },
  { src: "projects/elmtrackr/reports-insights.jpg",         caption: "Reports — gross pay breakdown and daily insight card",       project: "ElmTrackr" },
  { src: "projects/elmtrackr/reports-travel-refunds.jpg",   caption: "Travel Refunds — reimbursements broken down by provider",    project: "ElmTrackr" },
  { src: "projects/elmtrackr/onboarding-welcome.png",       caption: "Onboarding — welcome and first-run setup",                   project: "ElmTrackr" },
  { src: "projects/elmtrackr/onboarding-clock-styles.png",  caption: "Clock style picker — eight widget styles",                   project: "ElmTrackr" },

  // ---- ElmTrackr — Google Play store listing --------------------------------
  { src: "projects/elmtrackr/store-clarity-tablet.png",     caption: "Store listing — tablet, “Track every shift with clarity”", project: "ElmTrackr" },
  { src: "projects/elmtrackr/store-features-tablet.png",    caption: "Store listing — tablet, feature toggles and clock styles",   project: "ElmTrackr" },
  { src: "projects/elmtrackr/store-refunds-tablet.png",     caption: "Store listing — tablet, travel refunds",                     project: "ElmTrackr" },
  { src: "projects/elmtrackr/store-glance-phone.png",       caption: "Store listing — phone, hours, overtime and pay",             project: "ElmTrackr" },
  { src: "projects/elmtrackr/store-features-phone.png",     caption: "Store listing — phone, Manage Features",                     project: "ElmTrackr" },
  { src: "projects/elmtrackr/store-refunds-phone.png",      caption: "Store listing — phone, travel refunds",                      project: "ElmTrackr" },

  // ---- ElmTrackr — campaign creative (English) ------------------------------
  { src: "projects/elmtrackr/promo-widgets-wide.png",       caption: "Campaign — home screen widgets in 1×1, 4×1 and 4×2", project: "ElmTrackr" },
  { src: "projects/elmtrackr/promo-widgets-3x2.png",        caption: "Campaign — widgets, 3:2 placement",                          project: "ElmTrackr" },
  { src: "projects/elmtrackr/promo-widgets-4x3.png",        caption: "Campaign — widgets, 4:3 placement",                          project: "ElmTrackr" },
  { src: "projects/elmtrackr/promo-one-time-purchase.png",  caption: "Campaign — one-time purchase, no subscription",              project: "ElmTrackr" },
  { src: "projects/elmtrackr/promo-wear-glance.png",        caption: "Wear OS — shift progress on the watch face",                 project: "ElmTrackr" },
  { src: "projects/elmtrackr/promo-wear-progress.png",      caption: "Wear OS — live shift progress against an 8h goal",           project: "ElmTrackr" },

  // ---- ElmTrackr — campaign creative (Hebrew) -------------------------------
  { src: "projects/elmtrackr/promo-widgets-he.png",         caption: "Hebrew campaign — “Widgets that work for you”, with Wear OS", project: "ElmTrackr" },
  { src: "projects/elmtrackr/promo-hourly-he.png",          caption: "Hebrew campaign — “Working hourly? Stop guessing.”", project: "ElmTrackr" },
  { src: "projects/elmtrackr/promo-one-time-purchase-he.png", caption: "Hebrew campaign — buy once, use it forever",               project: "ElmTrackr" },
  { src: "projects/elmtrackr/promo-every-hour-he.png",      caption: "Hebrew campaign — “Every hour is worth money”",     project: "ElmTrackr" },
  { src: "projects/elmtrackr/promo-every-hour-square-he.png", caption: "Hebrew campaign — “Every hour”, phone and Wear OS", project: "ElmTrackr" },
  { src: "projects/elmtrackr/promo-home-screen-he.png",     caption: "Hebrew campaign — “From the home screen”, phone and watch", project: "ElmTrackr" },
  { src: "projects/elmtrackr/promo-at-a-glance-he.png",     caption: "Hebrew campaign — “At a glance”, monthly hours and gross pay", project: "ElmTrackr" },

  // ---- Mortal Shontal (מורטל שונטל) — mobile fighting game -------------------
  // Key art
  { src: "projects/mortal-shontal/cover.png",                 caption: "Mortal Shontal — title key art",                          project: "Mortal Shontal" },
  { src: "projects/mortal-shontal/logo.png",                  caption: "Mortal Shontal — logo, earlier flat version",             project: "Mortal Shontal" },

  // In-game screens
  { src: "projects/mortal-shontal/ui-character-select.jpg",   caption: "Fighter select — four cards, live preview, stage thumbnails", project: "Mortal Shontal" },
  { src: "projects/mortal-shontal/ui-in-fight.jpg",           caption: "In-fight — health bars on the top edges, thumb zones bottom-left and bottom-right", project: "Mortal Shontal" },
  { src: "projects/mortal-shontal/ui-round-win.jpg",          caption: "Round result — combo counter in the corner, outcome in the centre", project: "Mortal Shontal" },

  // Character reveal cards
  { src: "projects/mortal-shontal/card-nahorai.jpg",          caption: "Nahorai — character reveal card",                         project: "Mortal Shontal" },
  { src: "projects/mortal-shontal/card-arava.jpg",            caption: "Arava — character reveal card",                           project: "Mortal Shontal" },
  { src: "projects/mortal-shontal/card-tomer.jpg",            caption: "Tomer — character reveal card",                           project: "Mortal Shontal" },
  { src: "projects/mortal-shontal/card-shontal.jpg",          caption: "Shontal — character reveal card",                         project: "Mortal Shontal" },
  { src: "projects/mortal-shontal/card-ido-fullstack.jpg",    caption: "Ido Fullstack — character reveal card",                   project: "Mortal Shontal" },

  // Portraits
  { src: "projects/mortal-shontal/portrait-nahorai.png",      caption: "Nahorai — versus-screen portrait",                        project: "Mortal Shontal" },
  { src: "projects/mortal-shontal/portrait-arava.png",        caption: "Arava — versus-screen portrait",                          project: "Mortal Shontal" },
  { src: "projects/mortal-shontal/portrait-tomer.png",        caption: "Tomer — versus-screen portrait",                          project: "Mortal Shontal" },
  { src: "projects/mortal-shontal/portrait-shontal.png",      caption: "Shontal — versus-screen portrait",                        project: "Mortal Shontal" },

  // Roster sprites
  { src: "projects/mortal-shontal/sprite-nahorai.png",        caption: "Nahorai — roster sprite",                                 project: "Mortal Shontal" },
  { src: "projects/mortal-shontal/sprite-arava.png",          caption: "Arava — roster sprite",                                   project: "Mortal Shontal" },
  { src: "projects/mortal-shontal/sprite-tomer.png",          caption: "Tomer — roster sprite",                                   project: "Mortal Shontal" },
  { src: "projects/mortal-shontal/sprite-shontal.png",        caption: "Shontal — roster sprite",                                 project: "Mortal Shontal" },

  // Idle animation sheets
  { src: "projects/mortal-shontal/idle-sheet-nahorai.png",    caption: "Nahorai — idle loop, 6 frames",                           project: "Mortal Shontal" },
  { src: "projects/mortal-shontal/idle-sheet-shontal.png",    caption: "Shontal — idle loop sheet, 8 frames",                     project: "Mortal Shontal" },
  { src: "projects/mortal-shontal/idle-sheet-tomer.png",      caption: "Tomer — idle loop, 8 frames",                             project: "Mortal Shontal" },
  { src: "projects/mortal-shontal/idle-strip-tomer.png",      caption: "Tomer — idle strip, 4 frames",                            project: "Mortal Shontal" },
  { src: "projects/mortal-shontal/idle-sheet-arava-6.png",    caption: "Arava — idle loop, 6 frames",                             project: "Mortal Shontal" },
  { src: "projects/mortal-shontal/idle-sheet-arava-9.png",    caption: "Arava — idle loop sheet, revised pass",                   project: "Mortal Shontal" },

  // Key poses
  { src: "projects/mortal-shontal/pose-arava-stance.png",     caption: "Arava — fighting stance",                                 project: "Mortal Shontal" },
  { src: "projects/mortal-shontal/pose-arava-action.png",     caption: "Arava — attack pose",                                     project: "Mortal Shontal" },

  // Nahorai chair attack sequence
  { src: "projects/mortal-shontal/nahorai-chair-pickup.png",  caption: "Nahorai — chair attack, idle and pick-up",                project: "Mortal Shontal" },
  { src: "projects/mortal-shontal/nahorai-chair-guard.png",   caption: "Nahorai — chair attack, guard",                           project: "Mortal Shontal" },
  { src: "projects/mortal-shontal/nahorai-chair-overhead.png",caption: "Nahorai — chair attack, overhead raise",                  project: "Mortal Shontal" },
  { src: "projects/mortal-shontal/nahorai-chair-swing.png",   caption: "Nahorai — chair attack, swing",                           project: "Mortal Shontal" },
  { src: "projects/mortal-shontal/nahorai-chair-impact.png",  caption: "Nahorai — chair attack, impact",                          project: "Mortal Shontal" },

  // Nahorai flying kick
  { src: "projects/mortal-shontal/nahorai-flying-kick.png",   caption: "Nahorai — flying kick",                                   project: "Mortal Shontal" },
  { src: "projects/mortal-shontal/nahorai-flying-kick-icon.png", caption: "Nahorai — flying kick, icon size",                     project: "Mortal Shontal" },

  // Hit VFX
  { src: "projects/mortal-shontal/fx-impact-ring.png",        caption: "Impact VFX — ringed burst, 6 frames",                     project: "Mortal Shontal", bg: "#17171b" },
  { src: "projects/mortal-shontal/fx-impact-star.png",        caption: "Impact VFX — star burst, 5 frames",                       project: "Mortal Shontal", bg: "#17171b" },

  // ---- Other / General ------------------------------------------------------
  { src: "gallery/freud-ai-logo.gif",            caption: "Freud.AI — brand logo",             project: "Freud.AI" },
  { src: "gallery/talentlms-dashboard.jpg",      caption: "TalentLMS — admin dashboard",       project: "L&D Work" },
  { src: "gallery/workshop-facilitation.jpg",    caption: "Workshop facilitation — live session" },
];
