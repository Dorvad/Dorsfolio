// =============================================================================
// CASE STUDIES — single source of truth for all project content
// =============================================================================
//
// HOW TO ADD A NEW CASE STUDY:
//   1. Drop your images in projects/<slug>/   (cover.png, plus any used below)
//   2. Copy one of the objects below, give it a unique `slug`
//   3. Fill in title, subtitle, category, year, role, status, tags, summary, etc.
//   4. Build the story by adding section blocks (see SUPPORTED BLOCK TYPES below)
//   5. Save — the projects grid and case study route render automatically
//
// HOW TO EDIT AN EXISTING CASE STUDY:
//   - Edit any field in this file. Nothing is hardcoded in the skins.
//   - To swap an image, just replace the file at the same path in projects/<slug>/
//
// SUPPORTED BLOCK TYPES (see components/case-study-blocks/):
//   text         { type, title?, body }
//   image        { type, title?, image, caption?, fit?, bg? }
//   gallery      { type, title?, images: [{src, caption?, fit?, bg?}] }
//     fit — objectFit for the tile. Defaults to "cover", which crops to the
//           block's frame. Use "contain" for tall, square or very wide art
//           (sprite sheets, frame strips, portrait cards) so nothing is cut off.
//     bg  — CSS colour behind the image. Use it for transparent art that would
//           otherwise wash out against a light skin, e.g. bg: "#17171b"
//   metrics      { type, title?, items: [{label, value, hint?}] }
//   quote        { type, body, attribution? }
//   process      { type, title?, steps: [string | {title, body}] }
//   beforeAfter  { type, title?, before: {label, body}, after: {label, body} }
//   insight      { type, title?, body }
//   links        { type, title?, items: [{label, href}] }
//   featureList  { type, title?, items: [{title, body}] }
//   timeline     { type, title?, items: [{date, title, body}] }
//
// CATEGORIES used for filters (must also exist in data/portfolioInfo.js `filters`):
//   "UX / Product", "UI & Branding", "Interaction Design",
//   "Learning & Development", "Product Management", "Internal Tools"
// =============================================================================

window.caseStudies = [
  // ---------------------------------------------------------------------------
  // 1. Ezer L'Chaim — volunteer ride service dashboard (4-month internship)
  // ---------------------------------------------------------------------------
  {
    slug: "ezer-lachaim",
    title: "Ezer L'Chaim",
    subtitle: "Designing a dashboard for a volunteer ride service.",
    category: "UX / Product",
    categories: ["UX / Product", "Internal Tools", "Product Management"],
    year: "2024",
    role: "UX Designer & Product Manager (4-month internship)",
    status: "Concept delivered",
    coverImage: "/projects/ezer-lachaim/cover.png",
    accent: "#1E6FA8",
    tags: ["UX", "Product Management", "Dashboard", "Nonprofit", "Service Design"],
    summary:
      "Ezer L'Chaim is a volunteer-based transportation service that helps patients get to hospitals and medical appointments. I designed a dashboard that turns a phone-and-paper coordination process into a clear digital workflow — so managers can run the service with less stress and more certainty.",
    challenge:
      "The organization was doing important work, but coordination was almost entirely manual. Rides were arranged by phone; managers had to track drivers, patients, schedules, and updates across different channels. The work was hard to scale, and easy to drop.",
    outcome:
      "A dashboard concept that centralizes ride coordination — giving managers one place to view rides, volunteers, and service activity, while also helping the organization tell its impact story to donors and stakeholders.",
    metrics: [
      { label: "My role", value: "UX + PM", hint: "4-month internship" },
      { label: "User groups", value: "3", hint: "Managers · Volunteers · Patients" },
      { label: "Outcome", value: "Operational + strategic", hint: "Daily tool that also shows impact" }
    ],
    recruiterInsight: {
      headline: "A volunteer ride service that ran on phone calls — redesigned as a dashboard managers can actually see and trust.",
      problem: "Ride coordination was almost entirely manual — phone calls and scattered notes, with no shared view of who was driving whom, or when.",
      users: "Service managers coordinating rides day to day, the volunteer drivers carrying them out, and the patients who depend on them.",
      role: "UX Designer & Product Manager during a 4-month internship.",
      contribution: "Researched all three user groups, mapped the coordination workflow, defined the product structure, and designed the dashboard end to end.",
      outcome: "A dashboard concept that gives managers one place to see rides, volunteers, and activity — clarifying a process that used to live in phone calls and notes."
    },
    sections: [

      // ── Context ────────────────────────────────────────────────────────────
      {
        type: "text",
        title: "The situation",
        body:
          "Ezer L'Chaim connects patients with volunteer drivers. It sounds simple, but in practice it involves many moving parts. Managers need to know which rides are scheduled, which volunteers are available, and whether each ride is being handled. Volunteers need to find relevant rides and understand where they need to go. Patients need to feel that their ride is reliable, clear, and safe. Before the dashboard, most of this depended on manual coordination — hard to scale, with too much room for confusion, delays, or missed information."
      },
      {
        type: "image",
        title: "Information architecture",
        image: "/projects/ezer-lachaim/ia-diagram.jpg",
        caption: "Five core sections mapped before any screen was drawn: Settings, Volunteers, Main Dashboard, Rides, and Performance — each serving a distinct operational need, all connected through a single login."
      },

      // ── Research ───────────────────────────────────────────────────────────
      {
        type: "featureList",
        title: "Three user groups, three different needs",
        items: [
          { title: "Managers", body: "Needed control, visibility, and quick access to the information that drives daily decisions." },
          { title: "Volunteers", body: "Needed a simple way to find rides that fit their location, availability, and preferences." },
          { title: "Patients", body: "Needed reliability, clear communication, and trust in the service." }
        ]
      },
      {
        type: "gallery",
        title: "Key user journeys",
        images: [
          { src: "/projects/ezer-lachaim/journey-volunteers.jpg", caption: "Journey A — Manager navigates to Volunteers, filters the table by day of service, and opens a volunteer profile to review details." },
          { src: "/projects/ezer-lachaim/journey-rides.jpg", caption: "Journey B — Manager explores ride statistics by city and month, switches between chart types, then reviews performance data before logging out." }
        ]
      },

      // ── Design Challenge & Role ────────────────────────────────────────────
      {
        type: "text",
        title: "The design challenge",
        body:
          "Give managers a clear overview of the entire operation — see upcoming rides, track volunteer availability, understand the status of each ride, access important data quickly, reduce repeated phone coordination, and present the organization's activity in a clear and professional way. This was not only a design challenge. It was a service challenge: helping patients get to medical care with less stress and more certainty."
      },
      {
        type: "text",
        title: "My role",
        body:
          "I worked on this project as a UX Designer and Product Manager during a four-month internship. My work covered understanding the users and their needs, researching similar systems and dashboard patterns, organizing the product structure, defining key features, designing the dashboard experience, and thinking about how the system could support both daily operations and long-term organizational goals."
      },

      // ── Process ────────────────────────────────────────────────────────────
      {
        type: "image",
        title: "Feature prioritization",
        image: "/projects/ezer-lachaim/process-moscow.webp",
        caption: "MoSCoW prioritization separated must-have daily tools from enhancements and stretch goals — keeping the first version focused on what managers needed to run every shift."
      },
      {
        type: "image",
        title: "Dashboard design principles",
        image: "/projects/ezer-lachaim/process-dashboard-principles.webp",
        caption: "Three principles guided every layout decision: consolidate all key metrics onto one screen, make everything readable at a glance, and apply F and Z reading patterns to the information hierarchy."
      },
      {
        type: "gallery",
        title: "Applying F & Z layout patterns",
        images: [
          { src: "/projects/ezer-lachaim/process-fz-scanning.webp", caption: "F-pattern research: users scan across the top row first, then down the left — so highest-priority data anchors to those positions." },
          { src: "/projects/ezer-lachaim/process-fz-wireframe.webp", caption: "Applying the pattern to the grid: KPI tiles top-left, trending charts top-right, detailed data below — aligned with natural reading flow." }
        ]
      },

      // ── Approach & Decisions ───────────────────────────────────────────────
      {
        type: "insight",
        title: "My approach",
        body:
          "After understanding the three user groups, I focused on turning a complex coordination process into a clear digital workflow. The goal was not to add features. The goal was to make the most important information easier to see and act on."
      },
      {
        type: "featureList",
        title: "Key design decisions",
        items: [
          { title: "Make the dashboard useful at a glance", body: "Show the most important information first — ride status, volunteer activity, upcoming rides, and key numbers — so managers don't have to search to understand what's happening." },
          { title: "Organize around real user needs", body: "Structure the dashboard by what managers actually do, not by internal categories. What do they need to know right now? Which rides need attention? Where might something slip?" },
          { title: "Support both daily work and organizational growth", body: "The dashboard helps run today's shift and helps tell the organization's story — using real data about rides, volunteers, and activity to show donors and stakeholders the impact of the service." },
          { title: "Design for trust", body: "Patients trust that someone will arrive. Volunteers trust that the information is clear. Managers trust that the system reflects what is really happening. Every screen was designed to reduce uncertainty." }
        ]
      },

      // ── Solution Screens ───────────────────────────────────────────────────
      {
        type: "image",
        title: "Overview — the manager's starting point",
        image: "/projects/ezer-lachaim/main-info.jpg",
        caption: "Top-line KPIs, rides by city, and trend data — managers can read the state of the service in seconds from a single screen."
      },
      {
        type: "image",
        title: "Volunteers — activity and availability",
        image: "/projects/ezer-lachaim/volunteers-overview.jpg",
        caption: "The volunteer hub: active count, new volunteers this week, average rides per volunteer, and a geographic distribution — the full picture before opening the table."
      },
      {
        type: "image",
        title: "Volunteer table — the operating list",
        image: "/projects/ezer-lachaim/volunteers-table.jpg",
        caption: "Full volunteer table with filters by time period and category. Each row is one volunteer; area, vehicle, ride count, and status make the list scannable in a single pass."
      },
      {
        type: "image",
        title: "Volunteer profile — context in one place",
        image: "/projects/ezer-lachaim/volunteer-profile.png",
        caption: "Personal info, recent activity, performance, and notes — everything a manager needs without leaving the screen."
      },
      {
        type: "gallery",
        title: "Charts and analytics views",
        images: [
          { src: "/projects/ezer-lachaim/chart-line-yearly.jpg", caption: "New volunteers per year — trend line view (2016–2021)" },
          { src: "/projects/ezer-lachaim/chart-vertical.jpg", caption: "New volunteers per month — vertical bar chart" },
          { src: "/projects/ezer-lachaim/chart-horizontal.jpg", caption: "Same data, horizontal bars — selected by the team for at-a-glance reading" },
          { src: "/projects/ezer-lachaim/satisfaction.jpg", caption: "Performance view — ride satisfaction, average response time, and average arrival time" }
        ]
      },
      {
        type: "image",
        title: "The full system",
        image: "/projects/ezer-lachaim/showcase.png",
        caption: "Multiple views of the Ezer L'Chaim dashboard — a unified system for ride coordination, volunteer management, and organizational reporting."
      },

      // ── Reflection ─────────────────────────────────────────────────────────
      {
        type: "beforeAfter",
        title: "What changed",
        before: { label: "Before", body: "Phone-based coordination across drivers, patients, and managers. Information scattered across calls, messages, and notes — hard to scale, easy to miss." },
        after:  { label: "After",  body: "A single dashboard concept that brings rides, volunteers, and activity together. The same data also supports impact reporting and growth conversations." }
      },
      {
        type: "text",
        title: "Outcome",
        body:
          "The final result was a dashboard concept that centralizes the ride coordination process. It gave managers a clearer way to view rides, volunteers, and service activity in one place — and showed how a digital product could make a volunteer-based service easier to manage, more scalable, and more professional."
      },
      {
        type: "insight",
        title: "Reflection",
        body:
          "This project helped me understand how UX can support services that are deeply human. The challenge wasn't just to design screens — it was to design a system that helps people coordinate care, reduce stress, and make important work easier to manage. Good UX isn't only about making things look better. It's about making meaningful services work better."
      },
      { type: "caseStudyGallery" }
    ]
  },

  // ---------------------------------------------------------------------------
  // 2. Branchlab — interactive branching video scenario tool
  // ---------------------------------------------------------------------------
  {
    slug: "branchlab",
    title: "Branchlab",
    subtitle: "Designing a tool for creating interactive branching video scenarios.",
    category: "UX / Product",
    categories: ["UX / Product", "Learning & Development", "Product Management"],
    year: "2026",
    role: "Product strategy, UX design, interaction design",
    status: "In development",
    coverImage: "/projects/branchlab/cover.jpg",
    accent: "#2dc08b",
    tags: ["UX", "Product Design", "Interactive Video", "Learning Technology", "Product Strategy"],
    summary:
      "Branchlab is a product concept for creating interactive video experiences — where viewers make choices that change what happens next. The format is useful for training, simulations, onboarding, and educational scenarios. The goal was to build a tool where teams can create, edit, preview, and share branching video scenarios in a clear and visual way.",
    challenge:
      "Branching content can quickly become messy. A simple scenario turns into a complicated tree of scenes, choices, outcomes, and conditions. If the tool is not designed well, creators easily lose track of the structure. The challenge was to design a product that makes a complex format feel simple.",
    outcome:
      "A clear product concept defining the main structure, core user flows, editor experience, player experience, and future roadmap. Branchlab helps teams turn video into active learning experiences, without managing the complexity manually.",
    metrics: [
      { label: "My role", value: "Solo", hint: "Strategy · UX · Interaction" },
      { label: "Use cases", value: "6+", hint: "Training · Onboarding · Simulations" },
      { label: "Status", value: "MVP", hint: "In development" }
    ],
    recruiterInsight: {
      headline: "A tool for building branching video stories — designed so a complex format stays easy to create, edit, and share.",
      problem: "Branching video is powerful for training and simulations, but the format gets messy fast — a simple scenario quickly turns into a tangle of scenes, choices, and outcomes that's hard to track.",
      users: "Teams creating training, onboarding, or simulation content who need to build, preview, and share branching scenarios without losing track of the structure.",
      role: "Product strategy, UX design, and interaction design — solo.",
      contribution: "Defined the product's core structure, designed the visual node-map editor and the immersive player experience, and planned the roadmap beyond the first version.",
      outcome: "A clear product concept — structure, core flows, editor, and player — that turns a complicated format into something a team could realistically build and use."
    },
    sections: [
      {
        type: "logoHero",
        websiteUrl: "https://branchlab-website.vercel.app/",
        websiteLabel: "View marketing website"
      },
      {
        type: "text",
        title: "The situation",
        body:
          "Interactive video is powerful because it turns passive watching into active decision-making. A learner can watch a workplace scenario, choose how to respond, and immediately see the result of that decision. But there is a problem: branching content can quickly become messy. A simple scenario can turn into a complicated tree of scenes, choices, outcomes, and conditions. The challenge was to design a product that makes a complex format feel simple."
      },
      {
        type: "image",
        title: "The scenario editor",
        image: "/projects/branchlab/editor-node-map.jpg",
        caption: "The visual node map — creators see how every scene connects in the branching structure."
      },
      {
        type: "text",
        title: "The design challenge",
        body:
          "The main challenge was to help users create branching video scenarios without feeling overwhelmed. The product needed to serve two fundamentally different experiences: a creator workspace for building and editing, and a focused video player for the learner. Both needed to feel simple, but they had very different needs."
      },
      {
        type: "beforeAfter",
        title: "Two experiences, two modes",
        before: { label: "Creator mode", body: "A workspace for building and editing scenarios. Needs control, structure, and a clear view of the entire branching structure at all times." },
        after:  { label: "Player mode",  body: "A video player for the learner. Needs focus, clarity, and immersion — not a form or a technical system." }
      },
      {
        type: "featureList",
        title: "What the product needed to support",
        items: [
          { title: "Uploading and organizing video clips", body: "Built-in asset management with support for stock video from Pexels, Coverr, and Pixabay." },
          { title: "Visual branching structure", body: "A node map where scenes, choices, and outcomes are laid out spatially — easy to navigate, read, and update." },
          { title: "Previewing the learner experience", body: "A real-time preview so creators can experience the scenario from the learner's perspective before publishing." },
          { title: "Collaborating and sharing", body: "Invite editors and viewers, set permissions, and share published scenarios via a public URL." }
        ]
      },
      {
        type: "text",
        title: "My role",
        body:
          "Branchlab is my own product concept. I worked on the product strategy, UX structure, interaction design, and feature planning. This meant thinking not only as a designer, but also as a product owner — asking not just 'Is this usable?' but also 'Is this valuable, scalable, and clear enough to become a real product?'"
      },
      {
        type: "image",
        title: "Initial wireframes",
        image: "/projects/branchlab/wireframe-figma.png",
        caption: "Early Figma exploration — mapping the branching node structure and editor layout before high-fidelity design."
      },
      {
        type: "text",
        title: "The scenario editor",
        body:
          "The editor needed to help users understand the structure of the scenario at all times. The most important design decision was to treat the branching scenario as a map — instead of hiding the logic behind menus, the product helps creators see how scenes connect to each other. The core question that became central to the design: where does each choice lead?"
      },
      {
        type: "gallery",
        title: "Inside the editor",
        images: [
          { src: "/projects/branchlab/scene-editor.jpg",       caption: "Scene panel — identity, video clip, description, and branches to next scenes" },
          { src: "/projects/branchlab/editor-with-library.jpg", caption: "Full editor — node map, scene panel, and stock video library open side by side" }
        ]
      },
      {
        type: "text",
        title: "The interactive player",
        body:
          "In the player, the video stays at the center. The interface should not feel like a form, a quiz, or a technical system — it should feel like an interactive moment inside the story. Choices appear directly over the video, unnecessary chrome is hidden, and all player text is editable. The goal was to make the viewer feel like they are inside the scenario, not inside a learning management system."
      },
      {
        type: "featureList",
        title: "Key design decisions",
        items: [
          { title: "Make the structure visible", body: "A node map lets creators see the entire scenario at once — how scenes connect, where each choice leads, and where the story ends. This reduces cognitive load and makes it easier to find and fix problems." },
          { title: "Separate editing from viewing", body: "Editor mode is for building. Player mode is for experiencing. Keeping them separate keeps each experience clean and focused." },
          { title: "Keep the player immersive", body: "Choices are placed directly over the video. Navigation chrome is hidden. Everything reinforces the feeling of being inside the scenario, not a learning management system." },
          { title: "Design for teams", body: "Branching scenarios are rarely made by one person. The product supports inviting editors and viewers, setting permissions, and collaborative review." },
          { title: "Think beyond the MVP", body: "The first version needs to be buildable. But the product also needs a clear direction: analytics, LMS integrations, templates, version history, and team workspaces." }
        ]
      },
      {
        type: "image",
        title: "Clip editor",
        image: "/projects/branchlab/clip-editor.jpg",
        caption: "The clip editor lets creators trim video clips precisely, with start and end point controls."
      },
      {
        type: "image",
        title: "Analytics dashboard",
        image: "/projects/branchlab/analytics.jpg",
        caption: "Analytics show total plays, completion rates, choice breakdowns by scene, and drop-off points."
      },
      {
        type: "branchlabPlayer"
      },
      {
        type: "insight",
        title: "Reflection",
        body:
          "Branchlab represents how I think as a product designer. The most interesting challenge was not designing a beautiful interface — it was designing a system that makes a complicated creative process feel understandable. Branching scenarios are naturally complex: every choice creates another path, and every path creates more decisions for the creator. The design challenge was to reduce that complexity without reducing the creative possibilities. It is not just a tool for making videos. It is a tool for designing decisions."
      },
      { type: "caseStudyGallery" }
    ]
  },

  // ---------------------------------------------------------------------------
  // 3. ElmTrackr — personal shift-tracking app for hourly workers
  // ---------------------------------------------------------------------------
  {
    slug: "elmtrackr",
    title: "ElmTrackr",
    subtitle: "A shift-tracking and pay app for hourly workers — live on Google Play.",
    category: "UX / Product",
    categories: ["UX / Product", "Internal Tools"],
    year: "2025–2026",
    role: "Product design, UX, UI, product ownership — from prototype to shipped app",
    status: "Live on Google Play",
    coverImage: "/projects/elmtrackr/dashboard-home.jpg",
    accent: "#5b35d5",
    tags: ["UX", "Mobile", "Android", "Wear OS", "Productivity", "Shipped"],
    summary:
      "ElmTrackr is a shift-tracking and pay-estimation app for hourly workers: clock in, review the month, and know what those hours should be worth under your real pay rules. What began as a web prototype is now a native Android app with a Wear OS companion, published on Google Play in Hebrew and English.",
    challenge:
      "Hourly workers rely on memory, messages, and spreadsheets to track their time. Monthly pay stays unclear until payday, overtime and rest-day premiums are hard to calculate by hand, and small reimbursements like travel refunds are easy to forget. The deeper challenge: earning enough trust that someone keeps a personal work log in your app every single day.",
    outcome:
      "A shipped product. ElmTrackr tells a worker, at any moment and without a network connection, how many hours they have worked and what those hours should be worth — including the overtime and weekend-rest premiums their real payslip uses.",
    metrics: [
      { label: "Platform", value: "Android + Wear OS", hint: "Native app · widgets · watch tile" },
      { label: "Pay rules", value: "5 regions", hint: "Israel · US · California · UK · EU" },
      { label: "Status", value: "v1.2 live", hint: "Google Play · Hebrew + English" }
    ],
    recruiterInsight: {
      headline: "A personal pay tracker for hourly workers — designed, built, and shipped to Google Play as a solo product.",
      problem: "Hourly workers track their time with memory, messages, and spreadsheets, so monthly pay stays unclear, premium rates go unchecked, and small reimbursements are forgotten.",
      users: "Hourly and shift workers — students, retail, security, healthcare — whose payslips involve overtime and rest-day premium ladders most people can't verify by hand.",
      role: "Product design, UX, UI, and product ownership across the full journey from prototype to store release.",
      contribution: "Designed the core flows around three everyday questions, validated them in a working web prototype, then drove the product to a native Android + Wear OS release — pay-rule engine, offline-first privacy posture, and a bilingual RTL interface included.",
      outcome: "A live Google Play app, now on version 1.2 — with a watch app, home-screen widgets, travel-refund tracking, and pay estimates workers can check against their payslip."
    },
    sections: [
      {
        type: "text",
        title: "The situation",
        body:
          "ElmTrackr started from a very practical need: shift work creates small but persistent moments of uncertainty. Did I clock in? How many hours did I work this month? What is my estimated gross pay? Did I remember to report travel refunds? Instead of building a heavy HR system, the goal was a lightweight personal tool that gives workers clarity in the moments they actually need it. That idea has since traveled the full distance — from wireframes, to a working web prototype, to a native Android app published on Google Play."
      },
      {
        type: "links",
        title: "See it live",
        items: [
          { label: "ElmTrackr on Google Play", href: "https://play.google.com/store/apps/details?id=com.elmlaunch.myapp" }
        ]
      },
      {
        type: "gallery",
        title: "Home dashboard",
        images: [
          { src: "/projects/elmtrackr/dashboard-idle.jpg", caption: "The home screen — work status front and center, monthly summary below." },
          { src: "/projects/elmtrackr/dashboard-clock-in.jpg", caption: "Clock In is the primary action — one tap to start tracking. The June summary updates in real time as shifts are logged." }
        ]
      },
      {
        type: "text",
        title: "The problem",
        body:
          "Hourly workers often rely on a mix of memory, WhatsApp messages, spreadsheets, notes, and employer systems to track their work. People forget exact start and end times. Monthly salary expectations stay unclear until payday. Overtime, weekend hours, and special rates are hard to calculate manually. Small reimbursements like travel refunds are easy to miss. Existing tools often feel too complex for everyday use. The core challenge was to design something simple enough to use during a real shift, but detailed enough to become useful at the end of the month."
      },
      {
        type: "featureList",
        title: "Three questions the app had to answer",
        items: [
          { title: "Am I currently working?", body: "The clock widget sits at the center of the home screen. Work status is always visible and the primary action — clock in or out — is always one tap away." },
          { title: "How much did I work this month?", body: "Monthly hours, recent shifts, and estimated gross pay are visible on the home screen without navigating to reports." },
          { title: "What should I review before payroll?", body: "Reports provide a clear breakdown of regular, overtime, and weekend hours, plus contextual reminders for pending travel refunds." }
        ]
      },
      {
        type: "image",
        title: "Monthly summary",
        image: "/projects/elmtrackr/dashboard-home.jpg",
        caption: "Monthly hour distribution — regular vs. overtime breakdown visible on the home screen."
      },
      {
        type: "text",
        title: "Product structure",
        body:
          "ElmTrackr is built around five screens, each with a clear purpose. Home shows current shift status, monthly summary, gross pay, and recent shifts. Shifts shows the full monthly history and lets users add shifts manually. Reports shows totals, breakdowns, insights, and export options. Projects supports tracking work by client or task. Settings handles personal configuration: hourly rates, overtime rules, weekend days, and optional features."
      },
      {
        type: "image",
        title: "A busy month",
        image: "/projects/elmtrackr/dashboard-breakdown.jpg",
        caption: "93.4 hours across regular, overtime, and weekend work — the distribution visible at a glance."
      },
      {
        type: "process",
        title: "UX process",
        steps: [
          { title: "Discover", body: "Mapped the small moments of uncertainty around shift work: starting a shift, ending it, reconstructing the month, checking pay, realizing a mistake." },
          { title: "Define", body: "Organized the product around three layers — immediate action, monthly review, and payroll confidence — to keep every feature focused." },
          { title: "Design", body: "Chose a soft, mobile-first, card-based visual direction. The app should feel like a personal utility, not a corporate HR tool." },
          { title: "Prototype", body: "Built first as a Next.js web app with Supabase, which allowed testing real flows — active shifts, month switching, pay calculations, reminders — rather than only static prototypes." },
          { title: "Ship", body: "Rebuilt the product natively for Android with a Wear OS companion, hardened the pay engine against real labor-law rules, localized it for Hebrew and English, and released it on Google Play." }
        ]
      },
      {
        type: "image",
        title: "Initial wireframes",
        image: "/projects/elmtrackr/wireframe-figma.png",
        caption: "Early wireframes in Figma — four core screens laid out before building: Home Dashboard, Shifts List, Reports, and New Shift Form."
      },
      {
        type: "imageComparison",
        label: "Design evolution",
        title: "From wireframe to shipped",
        body: "The app started as simple grayscale wireframes focused on structure and information hierarchy, then evolved into a soft, gradient-accented visual language that feels personal rather than corporate.",
        before: {
          src: "/projects/elmtrackr/comparison-wireframe.png",
          alt: "Early wireframe — grayscale home screen with basic clock widget",
          caption: "Wireframe"
        },
        after: {
          src: "/projects/elmtrackr/comparison-final.jpg",
          alt: "Final design — polished home screen with gradient accents",
          caption: "Final design"
        }
      },
      {
        type: "featureList",
        title: "Key product decisions",
        items: [
          { title: "Make the home screen action-based", body: "The app answers 'What do I do now?' before 'What happened before?' — work status is always on the first screen, and the primary action is always one tap away." },
          { title: "Show monthly progress without it feeling like accounting", body: "Estimated gross pay and hour summaries appear before month-end. The goal is not to replace payroll software — it's to give workers a personal estimate so they feel more in control." },
          { title: "Design for corrections, not perfection", body: "People forget to clock in. They clock in late. The app supports manual shift creation and editing start times — making the product forgiving and realistic for normal work conditions." },
          { title: "Use contextual reminders, not permanent warnings", body: "Travel refund reminders appear near month-end when unresolved refunds exist. The interface is quiet most of the time, but helpful when it matters." },
          { title: "Keep reporting visual and scannable", body: "Reports use cards and summaries first, detailed data second. Insight cards give the pay data a human, readable layer." }
        ]
      },
      {
        type: "gallery",
        title: "Reports and pay breakdown",
        images: [
          { src: "/projects/elmtrackr/reports-insights.jpg", caption: "Reports — overtime, weekend, gross pay, and insight cards" },
          { src: "/projects/elmtrackr/reports-road-trip.jpg", caption: "Monthly report — pay summary and contextual insight" },
          { src: "/projects/elmtrackr/reports-basic.jpg", caption: "Reports view on a lighter month" },
          { src: "/projects/elmtrackr/reports-travel-refunds.jpg", caption: "Travel refunds report — ₪475.10 reclaimed across 20 rides, broken down by provider (Lime and Dott)" }
        ]
      },
      {
        type: "image",
        title: "Desktop view (web prototype)",
        image: "/projects/elmtrackr/dashboard-desktop.jpg",
        caption: "The prototype phase — the same data model rendered in a wider desktop layout before the product went native."
      },
      {
        type: "gallery",
        title: "Configuration and features",
        images: [
          { src: "/projects/elmtrackr/settings-payroll.jpg", caption: "Payroll settings — weekend days and hourly base rates by time of day" },
          { src: "/projects/elmtrackr/settings-features.jpg", caption: "Manage Features — toggles for travel refunds, paid projects, insights, and clock styles" }
        ]
      },
      {
        type: "text",
        title: "From prototype to shipped product",
        body:
          "The web prototype proved the flows, but a tool people are meant to open every working day belongs on the device in their pocket — working offline, on the lock screen, and on their wrist. So ElmTrackr was rebuilt as a native Android app (Kotlin + Jetpack Compose) with a Wear OS companion, home-screen widgets, and a notification clock-out action. The moment of clocking in had to be available wherever the user already is — not behind a browser tab."
      },
      {
        type: "featureList",
        title: "What shipping demanded",
        items: [
          { title: "A pay engine that matches real payslips", body: "The heart of the product is a region-aware pay engine: Israeli labor-law overtime ladders and weekly-rest premiums with correct stacking, plus presets for US federal, California, UK, and EU rules. An estimate a worker can't reconcile with a payslip is worse than no estimate." },
          { title: "A trust posture worth keeping a work log in", body: "Offline-first, encrypted local storage, fully functional without an account, and in-app data export and deletion. A worker-side tool is valuable precisely because it belongs to the worker — not the employer." },
          { title: "Clock-in surfaces everywhere", body: "Watch app with a tile and complication, five widget styles, a notification action, and app shortcuts. Habit is the retention engine for a daily utility, so the primary action lives on every surface." },
          { title: "Two languages, one experience", body: "Full Hebrew and English localization with right-to-left layout throughout — screens, reports, exports, and the watch." },
          { title: "The unglamorous ground game", body: "Cross-device sync that survives conflicts, receipt capture with on-device OCR for travel refunds, CSV and PDF exports, and an onboarding cut from eleven screens to four." }
        ]
      },
      {
        type: "video",
        title: "Version 1.2 release film",
        src: "/projects/elmtrackr/release-1-2-promo.mp4",
        poster: "/projects/elmtrackr/release-1-2-poster.jpg",
        aspect: "478/850",
        caption: "The v1.2 release promo (Hebrew) — Paid Projects with a live effective hourly rate, and three new clock faces: Metro, Vinyl, and Luna."
      },
      {
        type: "text",
        title: "Still evolving",
        body:
          "Version 1.2 added Paid Projects — tracking freelance and fixed-fee work alongside shifts, with a live effective hourly rate — plus a growing gallery of native clock faces that make a utility feel like a personal object. Each release ships with the same discipline: every pay figure on a stated accounting basis, every screen reading from the same rates, and a plain-language change record."
      },
      {
        type: "beforeAfter",
        title: "What changed",
        before: { label: "Before", body: "Memory, WhatsApp threads, and spreadsheets. Monthly pay unclear until the employer sends it. Easy to forget overtime rates or travel refunds." },
        after:  { label: "After",  body: "A published app that clocks in from phone, watch, or widget, estimates pay under real labor-law rules, and keeps the record in the worker's own hands — all before payday." }
      },
      {
        type: "metrics",
        title: "Shipped scope",
        items: [
          { label: "Release", value: "v1.2", hint: "Live on Google Play" },
          { label: "Surfaces", value: "8+", hint: "Phone · watch · tile · widgets · notification" },
          { label: "Pay rules", value: "5 regions", hint: "IL · US · CA · UK · EU + custom" },
          { label: "Languages", value: "2", hint: "Hebrew (RTL) + English" }
        ]
      },
      {
        type: "insight",
        title: "What I learned",
        body:
          "Small operational tools can still require deep product thinking. The hardest part was never the clock-in button — it was deciding what information should appear around it, and how much complexity the user should see at any moment. Shipping taught a second lesson: a prototype earns interest, but a product earns trust. Getting to Google Play meant caring about things no mockup surfaces — pay figures that reconcile with a payslip, data that survives a lost phone, an interface that reads naturally in two directions. That distance, from a promising demo to something strangers rely on for their income, is where the real product work lives."
      },
      { type: "caseStudyGallery" }
    ]
  },

  // ---------------------------------------------------------------------------
  // 4. JAFI VR — guided VR journey through Israel for The Jewish Agency
  // ---------------------------------------------------------------------------
  {
    slug: "jafi-vr",
    title: "JAFI VR",
    subtitle: "Turning a donated VR experience into a guided educational journey.",
    category: "Learning & Development",
    categories: ["Learning & Development", "UX / Product"],
    year: "2024",
    role: "Product design, UX, content design, educational design",
    status: "Delivered to stakeholders",
    coverImage: "/projects/jafi-vr/user-testing.jpg",
    accent: "#0C6FD4",
    tags: ["VR", "UX", "Educational Design", "Immersive Learning", "The Jewish Agency", "Content Design"],
    summary:
      "The Jewish Agency received a VR experience as a donation. Users could move through scenes in Israel, play small interactive games, and explore Israeli culture. The challenge: it existed as a VR demo, not a complete educational experience. My role was to turn it into a guided journey that educators and emissaries could actually use.",
    challenge:
      "The VR experience had strong visual and interactive potential, but it needed structure. Without guidance, users could enjoy the scenes but miss the educational meaning behind them. And since the experience was donated, there was no development team available for major changes — the solution had to be realistic, lightweight, and creative.",
    outcome:
      "A narrative-driven, scene-by-scene educational journey that gave the VR experience context, story, and clear user guidance — without rebuilding the core software. Delivered as a structured product for The Jewish Agency stakeholders.",
    metrics: [
      { label: "My role", value: "Product + Content + UX" },
      { label: "Scenes", value: "8", hint: "Airport → Market → Beach → Jaffa" },
      { label: "Constraint", value: "No dev team", hint: "Design around existing product" }
    ],
    recruiterInsight: {
      headline: "A donated VR demo, turned into a guided educational journey — without a development team or a rebuild.",
      problem: "The Jewish Agency had a visually striking VR experience, but it was a loose demo — users could move through scenes without knowing where they were, why it mattered, or how it connected to the next moment.",
      users: "Educators and emissaries who needed to present the experience to real audiences, and the participants moving through it.",
      role: "Product design, UX, content design, and educational design.",
      contribution: "Worked within the existing software to add narrative structure, scene-by-scene guidance, and clear instructions — connecting eight scenes into one continuous journey.",
      outcome: "A structured, narrated educational experience delivered to stakeholders — the same VR product, now usable and meaningful for an audience."
    },
    sections: [
      {
        type: "text",
        title: "The situation",
        body:
          "The Jewish Agency received a VR experience as a donation. The experience allowed users to move through different scenes in Israel, play small interactive games, and get a taste of Israeli culture through immersive environments. The challenge was that it existed as a VR product, but did not yet work as a complete educational experience. Users could explore the scenes, but they lacked context, guidance, and a clear story connecting everything together."
      },
      {
        type: "image",
        title: "The experience in action",
        image: "/projects/jafi-vr/user-testing.jpg",
        caption: "A user navigating the VR world — the monitor shows the scene the user sees inside the headset."
      },
      {
        type: "featureList",
        title: "Five questions the experience needed to answer",
        items: [
          { title: "Where am I?", body: "Each scene needed to clearly establish the location and what it represents in Israel." },
          { title: "What am I supposed to do?", body: "Interactive elements needed clear instructions — users had to understand the action before taking it." },
          { title: "Why is this scene important?", body: "The educational meaning behind each location had to be surfaced, not assumed." },
          { title: "How does this connect to Israel?", body: "Cultural context needed to be woven into the narrative without interrupting the immersive feeling." },
          { title: "What should I take from this?", body: "Each scene and the full journey needed a sense of progression and emotional closure." }
        ]
      },
      {
        type: "text",
        title: "The constraint that shaped everything",
        body:
          "Because the experience was donated, we did not have a full development team available to make major changes to the software. That meant the solution had to be realistic, lightweight, and creative. Instead of rebuilding the experience, I focused on improving the experience around it — treating the narration and facilitation layer as the UX."
      },
      {
        type: "text",
        title: "My role",
        body:
          "I led the product and content thinking for the experience. My work included mapping the full user journey, identifying moments of confusion, creating a narrative concept for each scene, writing guidance and narration, thinking through how educators could use the experience in real settings, and preparing it for stakeholder presentation. The goal was not only to make the VR experience more enjoyable, but to make it easier to understand, facilitate, and use."
      },
      {
        type: "text",
        title: "The product idea",
        body:
          "Instead of asking users to explore Israel alone inside VR, we turned the experience into a guided journey. The user would move through a sequence of Israeli locations, each with a short narrative introduction, clear instructions, and a light educational connection. The tone needed to be friendly, fun, and accessible — not formal, not museum-like. The narration became the main layer that connected the product together, creating a sense of progression: almost like being accompanied by a guide throughout a visit to Israel."
      },
      {
        type: "process",
        title: "Experience flow",
        steps: [
          { title: "Arrival in Israel", body: "The experience opens at the airport. This scene sets the tone — the user has just arrived and is starting a journey. Its job is orientation: establishing that these are not random mini-games, but scenes in a story." },
          { title: "Carmel Market", body: "Tel Aviv's Carmel Market: energy, color, noise, and cultural mix. Users feel the movement and atmosphere of everyday Israeli life. Narration adds context about food, people, languages, and daily life." },
          { title: "Falafel Game", body: "Inside the market, users play a falafel-making game. A playful, interactive moment — food as an entry point into culture." },
          { title: "The Beach", body: "The scene shifts. After the crowded market, the beach gives a more open, relaxed feeling — another side of Israeli life: informal, social, warm, close to the sea." },
          { title: "Beach Game", body: "An interaction tied to the beach environment. Designed to stay playful, simple, and intuitive. The game makes the scene more memorable by giving users a physical way to engage." },
          { title: "Jaffa", body: "Jaffa adds history, depth, and visual contrast — connecting modern Tel Aviv to an older, more layered part of the country. Ancient streets, different cultures, the feeling of walking through a place with many historical layers." },
          { title: "Word-Jumping Game", body: "In Jaffa, users play a word-based jumping game. This adds a language and meaning layer — connecting movement with words, making the interaction more educational without becoming heavy." },
          { title: "Ending Scene", body: "Instead of simply stopping, the conclusion gives users a moment of reflection. It reminds them that they have seen only a small piece of Israel — but that each place carries a different story. This ending turns the experience from a demo into a journey with emotional closure." }
        ]
      },
      {
        type: "gallery",
        title: "Inside the experience",
        images: [
          { src: "/projects/jafi-vr/airport-scene.jpg", caption: "Arrival in Israel — the airport scene with an Israeli passport at the border desk" },
          { src: "/projects/jafi-vr/falafel-game.jpg",  caption: "Falafel game — hands-on interaction inside the Carmel Market scene" },
          { src: "/projects/jafi-vr/beach-game.jpg",    caption: "Beach game — score overlay and interactive floating ring, Tel Aviv coastline" }
        ]
      },
      {
        type: "video",
        title: "Demo",
        src: "/projects/jafi-vr/demo.mp4",
        poster: "/projects/jafi-vr/user-testing.jpg",
        caption: "Full walkthrough of the guided VR journey — airport arrival through the Jaffa reflection."
      },
      {
        type: "gallery",
        title: "The hardware",
        images: [
          { src: "/projects/jafi-vr/headset-1.jpg", caption: "The Pico 4 Ultra Enterprise headset in use during a session" },
          { src: "/projects/jafi-vr/headset-2.jpg", caption: "Headset view — the experience running on the standalone device" },
          { src: "/projects/jafi-vr/pico-headset.jpg", caption: "Pico 4 Ultra Enterprise — the hardware used to run the experience" }
        ]
      },
      {
        type: "featureList",
        title: "Design principles",
        items: [
          { title: "Keep it simple", body: "VR can already be overwhelming, especially for first-time users. Language had to be short, clear, and easy to follow." },
          { title: "Guide without overexplaining", body: "The narration needed to help users without interrupting the feeling of being inside the experience. Support immersion — don't compete with it." },
          { title: "Educational but not academic", body: "The experience was designed for educational use, but it still needed to feel light and engaging. Meaningful content without becoming a lecture." },
          { title: "Work within real constraints", body: "Because we could not rebuild the product, the solution had to use what already existed. This required thinking creatively about product design, content design, and facilitation." },
          { title: "Connect scenes into a journey", body: "Each scene had to feel like part of one continuous experience. The narration created that connection — a thread that ran from the airport to the final reflection." }
        ]
      },
      {
        type: "beforeAfter",
        title: "What changed",
        before: { label: "Before", body: "A donated VR demo. Visually impressive, but structurally loose — users could explore scenes without understanding where they were, why it mattered, or how each scene connected to the next." },
        after:  { label: "After",  body: "A guided educational journey with narrative context, scene-by-scene structure, user instructions, and emotional closure. A product educators could present to real audiences." }
      },
      {
        type: "insight",
        title: "What I learned",
        body:
          "This project taught me that product work is not always about building new features. Sometimes the most important product decision is understanding what can realistically be changed — and then designing the best possible experience within those limits. The core VR product already existed. The real challenge was to make it usable, understandable, and meaningful. That required combining UX thinking, educational design, storytelling, and product strategy. It was a reminder that good experience design is not only about screens and interfaces. It is also about context, timing, emotion, and the way a user moves through an experience from beginning to end."
      },
      { type: "caseStudyGallery" }
    ]
  },

  // ---------------------------------------------------------------------------
  // 5. Mortal Shontal — mobile-first 2D arcade fighting game
  // ---------------------------------------------------------------------------
  {
    slug: "mortal-shontal",
    title: "Mortal Shontal",
    subtitle: "Designing a fighting game that actually feels playable on a phone.",
    category: "UX / Product",
    categories: ["UX / Product", "UI & Branding", "Interaction Design"],
    year: "2026",
    role: "UX design · Interaction design · Game design · Prototyping",
    status: "Playable prototype",
    coverImage: "/projects/mortal-shontal/cover.png",
    accent: "#C2871B",
    tags: ["Mobile UX", "Game UX", "Interaction Design", "Touch Controls", "Phaser", "Prototyping"],
    summary:
      "Mortal Shontal is a mobile-first 2D arcade fighting game built around a deceptively difficult UX problem: fighting games depend on fast, precise and often simultaneous input, while smartphones replace physical controls with a completely flat touchscreen. The goal was not simply to put virtual buttons on top of a fighting game. It was to rethink the experience around thumbs, limited screen space and the absence of tactile feedback, while preserving the immediacy and personality of an arcade fighter.",
    challenge:
      "On a controller, players never look at their hands — they feel where the buttons are, hold a direction while attacking, and build muscle memory around physical controls. A touchscreen removes almost all of that. There is no tactile separation between buttons, fingers cover part of the screen, and every control competes with the game for space. A missed input becomes indistinguishable from bad timing — and in a fighting game, that distinction decides matches.",
    outcome:
      "A touch-first combat system built around clear thumb zones, true multi-touch input, immediate visual feedback and a HUD that communicates what matters without pulling attention away from the fight.",
    metrics: [
      { label: "Combat actions", value: "6", hint: "Two thumb zones · no menus mid-fight" },
      { label: "Input model", value: "Multi-touch", hint: "Every finger tracked independently" },
      { label: "Status", value: "Playable prototype", hint: "Phaser · landscape phone and tablet" }
    ],
    recruiterInsight: {
      headline: "An arcade fighting game rebuilt around thumbs — where input design, not art direction, was the core UX problem.",
      problem: "Fighting games need fast, precise, simultaneous input; a touchscreen offers no tactile separation, covers the screen with fingers, and makes a missed tap feel identical to bad timing.",
      users: "Mobile players used to console-style fighters, playing in landscape on a phone with two thumbs and no physical buttons.",
      role: "UX design, interaction design, game design, and prototyping.",
      contribution: "Reduced the control surface to six actions across two spatial thumb zones, specified true multi-touch handling with edge detection so fast taps are never dropped, and designed a HUD that pushes status to the periphery so the centre of the screen stays gameplay.",
      outcome: "A playable prototype where the interface disappears once the fight starts — and when players lose, they understand it as a consequence of timing rather than a dropped input."
    },
    sections: [

      // ── Opening ────────────────────────────────────────────────────────────
      {
        type: "image",
        title: "Mortal Shontal",
        image: "/projects/mortal-shontal/cover.png",
        fit: "contain",
        bg: "#000",
        caption: "Title key art — arcade-fighter vocabulary built in Hebrew type, with the plastic chair, the falafel stand and the INSERT COIN cabinet placing the game somewhere specific."
      },
      {
        type: "text",
        title: "The situation",
        body:
          "Mortal Shontal is a mobile-first 2D arcade fighting game. The premise sounds like an art problem and turns out to be an input problem. Fighting games depend on fast, precise and often simultaneous input, while smartphones replace physical controls with a completely flat touchscreen. The goal was never to put virtual buttons on top of a fighting game — it was to rethink the experience around thumbs, limited screen space and the absence of tactile feedback, while preserving the immediacy and personality of an arcade fighter."
      },

      // ── The problem ────────────────────────────────────────────────────────
      {
        type: "text",
        title: "The challenge",
        body:
          "On a controller, players do not need to look at their hands. They can feel where the buttons are, hold a direction while attacking, react quickly and build muscle memory around physical controls. A touchscreen removes almost all of that. There is no tactile separation between buttons. Fingers cover part of the screen. Every control competes with the game for space. And a missed input can feel indistinguishable from bad timing. If a productivity app misses a tap, it feels annoying. If a fighting game misses a tap, the player may lose."
      },
      {
        type: "quote",
        body:
          "How can a touchscreen interface stay simple enough for a phone while still supporting the speed and simultaneous actions that make a fighting game feel responsive?",
        attribution: "The central UX question of the project"
      },

      // ── The principle ──────────────────────────────────────────────────────
      {
        type: "text",
        title: "The design principle",
        body:
          "The interface should disappear once the fight starts. I did not want players consciously operating a virtual controller. The goal was a layout that could quickly become muscle memory: movement lives under one thumb, combat under the other, and the game itself remains visually dominant. Instead of recreating a traditional gamepad button by button, the controls were reduced to the actions the game actually needs — six actions, two clear zones, no menus during combat."
      },
      {
        type: "featureList",
        title: "Six actions, two zones",
        items: [
          { title: "Left thumb — movement", body: "Move left · Move right · Jump. Everything that changes where the fighter is sits under one hand." },
          { title: "Right thumb — combat", body: "Light attack · Heavy attack · Block. Everything that changes what the fighter does sits under the other." }
        ]
      },
      {
        type: "video",
        title: "The prototype in motion",
        src: "/projects/mortal-shontal/demo.mp4",
        poster: "/projects/mortal-shontal/demo-poster.jpg",
        aspect: "1280/684",
        caption: "Fighter select through to a finished round — the two thumb zones, the health bars on the top edges, and the combo counter all working in a real match."
      },

      // ── 1. Thumbs ──────────────────────────────────────────────────────────
      {
        type: "text",
        title: "Designing around thumbs, not pixels",
        body:
          "The controls are deliberately split across the bottom corners of the display. Movement sits on the left, combat on the right, and secondary actions such as jump and heavy attack are positioned above the primary row rather than beside it. This creates two distinct interaction zones that can be learned spatially — the player does not need to read labels or search for a button during a fight. After a few interactions, location itself becomes the cue. The buttons are also intentionally large: on mobile, precision should come from the game, not from requiring the player to hit a tiny touch target."
      },
      {
        type: "image",
        title: "The two zones in play",
        image: "/projects/mortal-shontal/ui-in-fight.jpg",
        caption: "Movement bottom-left, combat bottom-right, each cluster inside its own thumb's reach. The direction control is lit here because it is being held — the control confirms the input before the fighter has finished moving."
      },
      {
        type: "insight",
        title: "Design decision — reachability over screen efficiency",
        body:
          "A slightly larger control occupies more visual space, but a missed input has a much higher cost than a few additional pixels of interface."
      },

      // ── 2. Simultaneous input ──────────────────────────────────────────────
      {
        type: "text",
        title: "Design for simultaneous input, not individual taps",
        body:
          "A fighting game is rarely controlled one action at a time. A player may need to move forward while attacking, jump while changing direction, or keep holding block while another finger reaches for an action. That makes standard tap-based mobile interaction insufficient. Mortal Shontal treats each finger as an independent active input, tracking multiple touch points simultaneously so that combinations like move-and-attack or direction-and-jump work the way the game naturally needs to be played. A mobile fighting game should not force the player to adapt their strategy to limitations in the interface."
      },

      // ── 3. Edge detection ──────────────────────────────────────────────────
      {
        type: "text",
        title: "Fast taps should never disappear",
        body:
          "Touchscreens introduce another problem: a quick tap can begin and end between two game frames. For actions such as attacking or jumping, missing that input would make the game feel inconsistent even if the underlying combat system was working correctly. To prevent this, one-shot actions use edge detection — a fast touch is remembered until the game consumes it, while actions that naturally require holding stay active for as long as the finger stays down."
      },
      {
        type: "featureList",
        title: "Two interaction behaviours",
        items: [
          { title: "Tap actions", body: "Jump · Light attack · Heavy attack. Registered on the edge of the touch and held until the game consumes them, so a fast tap between frames is never lost." },
          { title: "Hold actions", body: "Move · Block. Active for exactly as long as the finger stays down, matching what the player already expects the action to do." }
        ]
      },
      {
        type: "insight",
        title: "UX takeaway — consistency is not sameness",
        body:
          "Consistency does not always mean identical behaviour. Good interaction design makes controls behave consistently with what the user expects each action to do."
      },

      // ── 4. Feedback ────────────────────────────────────────────────────────
      {
        type: "text",
        title: "Every input needs an immediate response",
        body:
          "Physical buttons provide feedback automatically — you feel the button move. Glass does not, so the interface has to replace tactile feedback with visual feedback. Touch controls change appearance the moment they are pressed, confirming the game received the input before the resulting animation has even finished playing. Combat then adds another layer: successful attacks create brief hitstop, stronger attacks create more visual impact, health bars respond to damage, combos appear as they build, and critical health changes the atmosphere at the edges of the screen. These effects are not decoration — they continuously answer whether the touch registered, whether the attack connected, whether the hit was significant, and whether the player is in danger. The faster the game moves, the less time the player has to consciously look for those answers. Good game UX makes them felt."
      },
      {
        type: "gallery",
        title: "Hit feedback",
        images: [
          { src: "/projects/mortal-shontal/fx-impact-star.png", caption: "Impact VFX — the flash that confirms a connected attack, building and decaying across five frames", bg: "#17171b", fit: "contain" },
          { src: "/projects/mortal-shontal/fx-impact-ring.png", caption: "A heavier burst for stronger attacks — more impact reads as more damage without a number on screen", bg: "#17171b", fit: "contain" }
        ]
      },
      {
        type: "gallery",
        title: "Attack readability — Nahorai's chair",
        images: [
          { src: "/projects/mortal-shontal/nahorai-chair-pickup.png", caption: "Idle and pick-up — the tell that an attack is coming", fit: "contain" },
          { src: "/projects/mortal-shontal/nahorai-chair-guard.png", caption: "Guard — the chair held ready", fit: "contain" },
          { src: "/projects/mortal-shontal/nahorai-chair-overhead.png", caption: "Wind-up — the overhead raise gives the opponent a window to react", fit: "contain" },
          { src: "/projects/mortal-shontal/nahorai-chair-swing.png", caption: "Swing — motion trails carry the speed of the attack", fit: "contain" },
          { src: "/projects/mortal-shontal/nahorai-chair-impact.png", caption: "Impact — debris sells the weight of a heavy attack landing", fit: "contain" },
        ]
      },
      {
        type: "image",
        title: "Silhouette at speed",
        image: "/projects/mortal-shontal/nahorai-flying-kick.png",
        fit: "contain",
        caption: "The flying kick — poses are drawn to stay readable as a silhouette, because in a fight the player reads shape before detail."
      },
      {
        type: "gallery",
        title: "Neutral and committed — Arava",
        images: [
          { src: "/projects/mortal-shontal/pose-arava-stance.png", caption: "Stance — compact, guarded, weight centred. The pose a player returns to between exchanges.", fit: "contain" },
          { src: "/projects/mortal-shontal/pose-arava-action.png", caption: "Attack — open and extended. The two silhouettes have to be distinguishable at a glance, mid-fight.", fit: "contain" },
        ]
      },

      // ── 5. HUD ─────────────────────────────────────────────────────────────
      {
        type: "text",
        title: "Put important information in peripheral vision",
        body:
          "The player's attention should stay on the fighters, and that decided where combat information appears. Health bars sit along the top edges of the screen, mirroring the two fighters. The timer stays centred. Combo feedback appears briefly rather than occupying permanent space. When the timer reaches its final seconds it changes colour, and when the player's health becomes critical the warning moves beyond a number or a bar — a red vignette appears around the edges of the screen. That is deliberate. Instead of asking players to move their eyes away from the action and inspect a value, the interface communicates urgency through peripheral vision."
      },
      {
        type: "insight",
        title: "Design decision — where information lives",
        body:
          "Use location for status. Use the edges for urgency. Keep the centre for gameplay."
      },
      {
        type: "image",
        title: "The HUD at the end of a round",
        image: "/projects/mortal-shontal/ui-round-win.jpg",
        caption: "Health bars track the two fighters along the top edges, the combo counter appears in the corner as it builds rather than holding permanent space, and the round result takes the centre only once the fight is over."
      },

      // ── 6. Character select ────────────────────────────────────────────────
      {
        type: "text",
        title: "Make choices visual before the fight begins",
        body:
          "The UX challenge does not start when combat starts. Before a match, players choose a fighter and a stage. Rather than turning this into a series of menus, Mortal Shontal keeps the decisions visible on one screen. Four fighter cards form the main selection area, and selecting one immediately updates a larger preview with the character's artwork, name and identity. The active fighter receives a strong gold highlight and subtle animation, making selection state obvious without relying on explanatory text. Stages use visual thumbnails rather than a dropdown or a text list. Once both decisions are made, one high-salience action remains: Fight."
      },
      {
        type: "image",
        title: "One screen, every decision",
        image: "/projects/mortal-shontal/ui-character-select.jpg",
        caption: "Fighter select — the four cards sit in a single row with the gold highlight carrying selection state, the P1 preview on the left updates the moment a card is chosen, and the stages run as visual thumbnails along the bottom. No menu tree, no confirmation step."
      },
      {
        type: "gallery",
        title: "The fighter cards",
        images: [
          { src: "/projects/mortal-shontal/card-nahorai.jpg", caption: "Nahorai — every card places the fighter in the world they come from", fit: "contain" },
          { src: "/projects/mortal-shontal/card-arava.jpg", caption: "Arava", fit: "contain" },
          { src: "/projects/mortal-shontal/card-tomer.jpg", caption: "Tomer", fit: "contain" },
          { src: "/projects/mortal-shontal/card-shontal.jpg", caption: "Shontal", fit: "contain" },
        ]
      },
      {
        type: "gallery",
        title: "Selection preview portraits",
        images: [
          { src: "/projects/mortal-shontal/portrait-nahorai.png", caption: "Nahorai — the larger preview that updates the moment a card is selected", fit: "contain" },
          { src: "/projects/mortal-shontal/portrait-arava.png", caption: "Arava", fit: "contain" },
          { src: "/projects/mortal-shontal/portrait-tomer.png", caption: "Tomer", fit: "contain" },
          { src: "/projects/mortal-shontal/portrait-shontal.png", caption: "Shontal", fit: "contain" },
        ]
      },
      {
        type: "process",
        title: "The pre-fight flow",
        steps: [
          { title: "Explore", body: "All four fighters and the available stages are visible at once — no menu tree to descend." },
          { title: "Select", body: "Choosing a card updates the large preview immediately, with a gold highlight carrying the selection state." },
          { title: "Confirm", body: "The stage is chosen from visual thumbnails rather than a text list." },
          { title: "Fight", body: "One high-salience action closes the screen. No confirmation step, no hidden settings, no ambiguity about what happens next." }
        ]
      },

      // ── 7-9. Menu, pause, settings ─────────────────────────────────────────
      {
        type: "text",
        title: "Show unavailable features without creating dead ends",
        body:
          "The main menu establishes a clear hierarchy between actions. Single Player is the primary action. Settings is available but visually secondary. Multiplayer is visible as a future feature, but explicitly marked as coming soon and styled as disabled. This may seem like a small detail, but disabled states matter: a feature that looks interactive and does nothing feels broken, while a feature that visibly communicates its status becomes information about the product. The interface sets the correct expectation before the user attempts an action."
      },
      {
        type: "text",
        title: "Pausing should preserve the player's context",
        body:
          "Settings can be opened directly during combat. Instead of ending the match or navigating away from it, opening settings pauses the fight and places the controls over the existing experience. Players can adjust music volume, sound effects, timer behaviour or enemy AI and return to exactly where they were. There is also a deliberate escape route back to character selection. The principle is simple: temporary actions should not destroy permanent context. Changing a setting should feel like an interruption, not a navigation event."
      },
      {
        type: "text",
        title: "Give players control over the intensity of the experience",
        body:
          "Game settings are not treated as a generic preferences screen — they directly change how the game behaves. Players can choose a timed or unlimited match, enable or disable enemy AI, and independently control music and sound-effect volume. This also makes the prototype useful in different contexts: a player learning the controls can remove the timer, someone exploring movement can disable the opponent, and someone testing combat feedback can isolate sound effects. Settings therefore support both preference and mastery."
      },

      // ── Validation ─────────────────────────────────────────────────────────
      {
        type: "featureList",
        title: "Mobile-first validation",
        items: [
          { title: "Real device layouts", body: "Phone and tablet in landscape orientation, with responsive scaling across screen sizes rather than a scaled-down desktop build." },
          { title: "Touch targets and reach", body: "Large, reachable controls that stay clear of the fighters and the HUD." },
          { title: "Input fidelity", body: "Simultaneous multi-touch and very fast taps both had to survive on real hardware, not just in a desktop browser." },
          { title: "Browser behaviour", body: "Scrolling, bounce, zoom and text selection all suppressed during play, with full-screen behaviour handled." },
          { title: "iOS specifics", body: "iPhone safe areas and the bottom home indicator accounted for, so no control sits under a system gesture." }
        ]
      },

      // ── Visual language ────────────────────────────────────────────────────
      {
        type: "text",
        title: "The visual language",
        body:
          "Mortal Shontal deliberately borrows the visual vocabulary of classic arcade fighting games without recreating a specific title. Dark backgrounds keep the characters prominent. Gold and orange establish primary actions and selections. Heavy type, dramatic transitions, scanlines and arcade-style labels give the menus personality, and character artwork dominates the selection experience. The result is an interface where usability and theme reinforce each other — the UX communicates hierarchy, while the visual design makes every interaction feel like part of the game world."
      },
      {
        type: "gallery",
        title: "Idle loops",
        images: [
          { src: "/projects/mortal-shontal/idle-sheet-nahorai.png", caption: "Nahorai — idle loop, six frames. Even standing still, a fighter has to look ready.", fit: "contain" },
          { src: "/projects/mortal-shontal/idle-sheet-shontal.png", caption: "Shontal — idle loop sheet, eight frames", fit: "contain" },
          { src: "/projects/mortal-shontal/idle-sheet-tomer.png", caption: "Tomer — idle loop, eight frames", fit: "contain" },
          { src: "/projects/mortal-shontal/idle-sheet-arava-9.png", caption: "Arava — idle loop, revised pass with additional frames for a softer cycle", fit: "contain" },
        ]
      },
      {
        type: "gallery",
        title: "Roster sprites",
        images: [
          { src: "/projects/mortal-shontal/sprite-nahorai.png", caption: "Nahorai", fit: "contain" },
          { src: "/projects/mortal-shontal/sprite-arava.png", caption: "Arava", fit: "contain" },
          { src: "/projects/mortal-shontal/sprite-tomer.png", caption: "Tomer", fit: "contain" },
          { src: "/projects/mortal-shontal/sprite-shontal.png", caption: "Shontal — each fighter has to be identifiable at roster size, not just at full resolution", fit: "contain" },
        ]
      },
      {
        type: "image",
        title: "Beyond the current roster",
        image: "/projects/mortal-shontal/card-ido-fullstack.jpg",
        fit: "contain",
        caption: "Ido Fullstack — a character designed past the four playable fighters. The card format is built to extend, so adding a fighter is an art task rather than a layout problem."
      },

      // ── Reflection ─────────────────────────────────────────────────────────
      {
        type: "insight",
        title: "What this project taught me",
        body:
          "In most digital products, friction makes a task slower. In a game, friction can change the perceived rules. If a player presses a button and nothing happens, they do not think 'the interface missed my input' — they think 'the game didn't let me do that.' That makes responsiveness, feedback and input clarity part of perceived fairness. The most important design goal became making sure that when players lose, they understand why: it should feel like the consequence of a decision, a mistimed attack or a better opponent, never the interface. That is what good UX in a fighting game ultimately means to me — the controls stop being something the player uses, and become something the player trusts."
      },
      {
        type: "metrics",
        title: "At a glance",
        items: [
          { label: "Combat actions", value: "6", hint: "Three per thumb" },
          { label: "Interaction zones", value: "2", hint: "Movement left · combat right" },
          { label: "Input model", value: "Multi-touch", hint: "Every finger tracked independently" },
          { label: "Status", value: "Playable prototype", hint: "Phaser · landscape phone and tablet" }
        ]
      },
      { type: "caseStudyGallery" }
    ]
  },

  // ---------------------------------------------------------------------------
  // 6. Tiny Tempo — endless mobile rhythm game, one thumb, everyday acts
  // ---------------------------------------------------------------------------
  {
    slug: "tiny-tempo",
    title: "Tiny Tempo",
    subtitle: "A rhythm game you play with one thumb — watch a tiny everyday act, then tap it back.",
    category: "UX / Product",
    categories: ["UX / Product", "Interaction Design", "UI & Branding"],
    year: "2026",
    role: "Product, game and UX design · Development · Original score by Alon Attaly",
    status: "Pre-release · coming to Google Play",
    coverImage: "/projects/tiny-tempo/cover.png",
    accent: "#cf5134",
    tags: ["Game UX", "Mobile UX", "Interaction Design", "Audio & Timing", "Design System", "Phaser", "Android"],
    summary:
      "Tiny Tempo is an endless mobile rhythm game. A hammer, a squeegee, a doorbell: each act plays you a bar, and then it is your turn. There is one input, a tap anywhere, and one rule, be on time. The interesting problems were never about buttons. They were about making a player feel exactly when their turn begins, judging a tap honestly on hardware that delays sound by a fifth of a second, and keeping a road of levels fair when it never ends.",
    challenge:
      "Call-and-response sounds simple until you build it. The answer starts on the very bar line the demonstration ends on, so a cue that arrives on that downbeat arrives too late to wind up for. A phone's audio output lags its screen by anywhere from 20 ms on a speaker to 300 ms over Bluetooth, which is more than the whole Good window. And an endless game that only ever gets longer, faster, denser and stricter stops being fun long before it stops being possible.",
    outcome:
      "A playable, near-release game with 36 everyday acts, a turn block that puts the handover under the thumb a beat ahead, a judge that measures taps against what the player actually hears, and a road whose difficulty is choreographed inside every area rather than ramped in one line. All of it drawn at runtime from one small design system, with the original score woven into the tempo itself.",
    metrics: [
      { label: "Acts", value: "36", hint: "Everyday scenes, one per level, in rotation" },
      { label: "Judgement", value: "±55 ms", hint: "Perfect · Good inside ±130 ms" },
      { label: "Tempo", value: "120 → 150", hint: "BPM, ramped task by task" },
      { label: "Controls", value: "1 thumb", hint: "Tap anywhere · nothing to aim at" }
    ],
    recruiterInsight: {
      headline: "A rhythm game where the whole interface is a tap — so timing, feedback and fairness had to carry everything a button normally would.",
      problem: "In call-and-response the player's turn begins the instant the demonstration ends. Early builds announced it on that same downbeat, at the top of the screen, and players could not say when to act. Meanwhile every phone judges taps against sound it has not played yet.",
      users: "Mobile players who like rhythm games, playing in portrait with one thumb, often with Bluetooth earbuds that delay the beat.",
      role: "Product, game and UX design, and the build itself: a Phaser 4 and TypeScript game wrapped for Android with Capacitor, with an original score by Alon Attaly.",
      contribution: "Designed the turn block that moves the handover to the thumb and a beat ahead; a per-route tap-offset calibration so Bluetooth and speaker each keep their own; a difficulty system choreographed inside each ten-level area; a result screen that turns a percentage into advice; and the Workshop design system every screen is drawn from at runtime.",
      outcome: "A near-release game with 36 acts and an endless road that stays fair past level 100, plus a marketing site whose every moving thing is recorded from the build or ported from its code."
    },
    sections: [

      // ── Opening ────────────────────────────────────────────────────────────
      {
        type: "image",
        title: "Tiny Tempo",
        image: "/projects/tiny-tempo/icon.jpg",
        fit: "contain",
        bg: "#cf5134",
        caption: "The icon master — the one authored image in the whole project. Every other pixel in the game is geometry drawn at runtime."
      },
      {
        type: "text",
        title: "The situation",
        body:
          "Tiny Tempo is a portrait rhythm game built around a loop you already know from the playground: I play, you play. A hammer taps a nail three times; you tap it back. A squeegee wipes a window on the offbeat; you wipe it back. Each level is one everyday act and three to eight of these tasks, nothing waits between the two halves of a task, and nothing waits between one task and the next. The map is an endless road of levels grouped into ten-level areas, the acts rotate as the road goes on, and the tempo climbs from the music's own 120 BPM toward 150. The premise fits in a sentence. Making the sentence true on a phone took most of the design work."
      },

      // ── The problem ────────────────────────────────────────────────────────
      {
        type: "text",
        title: "The challenge",
        body:
          "Three things made this harder than it looks. First, the handover: the player's bar begins on the exact beat the demonstration's bar ends, so any cue that fires on that downbeat is already late, and the first beat is gone before it registers. Second, the clock: a phone's speaker lags the screen by about 20 ms and Bluetooth earbuds by 150 to 300 ms, which is wider than the entire Good window, so a judge that trusts the device's schedule calls honest players early on every tap. Third, the road: an endless game whose only move is 'more' becomes a grind. Every dimension of difficulty cannot rise together, every level, forever."
      },
      {
        type: "quote",
        body:
          "A word that arrives on the beat arrives too late to wind up for — and it arrives where the player is not looking.",
        attribution: "From the turn-cue design notes"
      },

      // ── The principle ──────────────────────────────────────────────────────
      {
        type: "text",
        title: "The design principle",
        body:
          "Get out of the act's way. The player is a thumb on a phone watching a tiny scene, and the interface's job is to make the scene legible, not to narrate it. Copy is sparse. Meaning is carried by composition, motion and the state of objects: a bead lights, a token crosses, a plank recesses into the bench. Text is reserved for the area, the act's name, the turn handover, the result, and settings a player can actually change. Everything that would normally be a label, a panel or a progress bar had to become a thing with weight under one light."
      },
      {
        type: "featureList",
        title: "What the player gets, and what they do not",
        items: [
          { title: "One input", body: "Tap anywhere. There is no second button, no swipe, no hold, and nothing on screen to aim at. Precision comes from timing, not from hitting a target." },
          { title: "Judged on time, honestly", body: "Perfect inside ±55 ms, Good inside ±130 ms, measured against the sample the player is hearing rather than the one the device scheduled." },
          { title: "Nothing written down", body: "Every task opens with the act playing its own bar. The rhythm is heard and seen, never read." },
          { title: "No account", body: "Progress lives on the device, travels as a checksummed save code, and restoring can only ever add." }
        ]
      },
      {
        type: "video",
        title: "Level one, as the game plays it",
        src: "/projects/tiny-tempo/level-one.mp4",
        poster: "/projects/tiny-tempo/level-one-poster.jpg",
        aspect: "540/1168",
        caption: "One whole task of the first level, recorded from the build on a virtual clock so every beat lands on its frame: the hammer's bar on the top row, the token crossing, the player's answer on the bottom row, and the table sliding on to the next."
      },

      // ── 1. The turn block ──────────────────────────────────────────────────
      {
        type: "text",
        title: "Moving the handover to the thumb, and a beat ahead",
        body:
          "The first version of the play screen flipped a headline from Watch to Your turn on the downbeat it announced, and recoloured a plaque at the top of the screen to match. Players kept missing their first beat, and when asked, they could not say when their turn had started. The redesign replaced the flip with a persistent object: the turn block, two rows at the bottom of the screen where the thumb already is. The top row is a shelf recessed into the bench, with a bead for each hit the act will play; the beads light as the act plays them. The bottom row is the player's, with sockets the player's taps fill. A single token travels from the shelf to the face across the last beats of the act's bar, and a count of three, two, one strikes under the player's row with Go on the downbeat. Nothing changes meaning between the two halves. Whose turn it is can be read at any moment rather than remembered from a flash."
      },
      {
        type: "image",
        title: "The turn block in the tutorial",
        image: "/projects/tiny-tempo/screens/tutorial.jpg",
        fit: "contain",
        bg: "#eee8d8",
        caption: "The lesson is taught on the same object every level uses: the hammer's row on top, the player's row below, the token between them, and a sign that names each moment only while the player is learning."
      },
      {
        type: "insight",
        title: "Design decision — anticipation beats announcement",
        body:
          "In a rhythm game the player has to be winding up a beat before the beat. A cue that is correct on the downbeat is still a failed cue. Every signal in the handover was moved to arrive early and to persist, and all of it was moved to where the thumb and the eyes already were."
      },
      {
        type: "text",
        title: "Rebuilding the tutorial twice",
        body:
          "The tutorial went through two rebuilds, and the reasons are instructive. The first taught a cue the game no longer had, used a row of beads labelled TAP TAP WAIT TAP that appears nowhere in a level, and paused at every tap, which taught players that the game waits for them when the whole point of the loop is that it does not. The second moved the lesson onto the turn block but still left out the count, said Get ready two beats out without saying when, and went from watching straight to performing. The third version teaches on the real block with the real count: one watched cycle at 72 BPM, then a try judged by the level's own controller, with a miss named rather than scored. Too early for a tap in the hammer's turn; That was your turn for a bar that went by."
      },

      // ── 2. The judge ───────────────────────────────────────────────────────
      {
        type: "text",
        title: "Judging the tap against what the player hears",
        body:
          "The judge is a pure function that knows nothing about presentation: a tap time, a target time, two windows. The engineering around it is where the honesty lives. The game maps each tap's DOM timestamp onto the audio output timeline, so a tap is compared to the beat the player heard rather than the beat the device scheduled. Where the device cannot report its own delay, the player measures it: a bare metronome, eight taps, the median gap between tap and nearest beat becomes the offset. That offset applies only to judged input, never to the cues or the visuals, so the game never looks out of time in order to feel in time. And because one phone is 20 ms through its speaker and 200 ms through earbuds, each audio route keeps its own offset and the active route chooses which one the judge uses."
      },
      {
        type: "image",
        title: "Tap offset",
        image: "/projects/tiny-tempo/screens/tap-offset.jpg",
        fit: "contain",
        bg: "#eee8d8",
        caption: "The calibration screen. Eight taps on a bare beat, a counter instead of a progress bar, and the early-to-late lane that will show the lean once it is measured."
      },
      {
        type: "insight",
        title: "UX takeaway — fairness is an engineering property",
        body:
          "A player who is called early on every tap does not conclude that Bluetooth is slow. They conclude that the game is wrong. Trust in a rhythm game is built entirely out of the gap between what was heard and what was judged, and that gap is a measurement, not a feeling."
      },

      // ── 3. The road ────────────────────────────────────────────────────────
      {
        type: "text",
        title: "An endless road that stays fair",
        body:
          "Difficulty comes from one curve, so no two knobs can ever contradict each other: tasks per level climb from three to eight, the tempo ceiling from 120 to 150 BPM, the pattern tier from plain quarter notes to dense eight-beat phrases, and the clear bar from 40 to 80 percent. Finer grids arrive as a second stage on the same curve, triplets from level 43 and sixteenths from level 59, and only where the tempo still leaves the thumb at least 110 ms between taps. Every level starts at the music's real tempo and ramps task by task toward its ceiling, and the backing track follows, so the beat grid and the music change speed together. Patterns are chosen with a per-level seed, so a level is identical on every attempt and can be learned."
      },
      {
        type: "process",
        title: "Choreography inside every ten-level area",
        steps: [
          { title: "Opener", body: "A way into the new area after the finale: one task shorter, a little slower." },
          { title: "Pattern", body: "Two levels where rhythm leads and tempo steps back." },
          { title: "Tempo", body: "Simpler rhythms, faster, no finer grid: speed for pattern." },
          { title: "Endurance", body: "Two tasks longer, for pressure." },
          { title: "Recovery", body: "Noticeably easier, mid-area." },
          { title: "Combination", body: "Two levels where the dimensions start to combine." },
          { title: "Challenge", body: "Everything up." },
          { title: "Finale", body: "The area's own material, reprised at the top of its range. Nothing the road has not already shown." }
        ]
      },
      {
        type: "gallery",
        title: "The map",
        images: [
          { src: "/projects/tiny-tempo/screens/map-pavement.jpg", caption: "Pavement — the second area. The frontier puck is cream with a dashed ring, cleared stops carry their stars, and the dock at the bottom names the next act with the map's one coral disc.", fit: "contain", bg: "#eee8d8" },
          { src: "/projects/tiny-tempo/screens/map-star-gate.jpg", caption: "A closed star gate. Stars are a bank, not a quota: the barrier says how many the road behind it has to give, and the loop it asks for is always 'go back and do a level better'.", fit: "contain", bg: "#eee8d8" },
          { src: "/projects/tiny-tempo/screens/map-dusk.jpg", caption: "Dusk — every area has an ink and a paper of its own, and the finale's plate names the act it closes on.", fit: "contain", bg: "#eee8d8" },
          { src: "/projects/tiny-tempo/screens/map-candy.jpg", caption: "Candy, past level 100. The same rules keep producing new ground; the road never ends and never repeats a level.", fit: "contain", bg: "#eee8d8" }
        ]
      },
      {
        type: "insight",
        title: "Design decision — a plateau, on purpose",
        body:
          "Past level 60 the parameters hold while the seeded patterns keep changing. The road stays endless without becoming unfair, and the gates in front of each area are tuned so a player averaging 1.4 stars a level is never stopped, while the player who scrapes every level is only ever a few replays short."
      },

      // ── 4. The result ──────────────────────────────────────────────────────
      {
        type: "text",
        title: "Turning a percentage into something a player can fix",
        body:
          "The first result screen said 72% and On the beat, and threw away everything the scorer knew. A rhythm game's most useful sentence is the one that turns 'I got 72%' into 'I am consistently early', because that is something a player can act on. The result now carries the medals, the stars with the thresholds they were earned against, a line that says what the run changed, and a Timing details tray: the counts of Perfect, Good and Miss, a hit-error bar with one tick per judged tap from early to late, the lean in milliseconds, and one piece of advice. The same fact is told during play, too: a Good says EARLY or LATE beside the verdict, a Perfect says nothing, because naming a side inside the Perfect window would send a player chasing milliseconds the game already calls right."
      },
      {
        type: "image",
        title: "A cleared level",
        image: "/projects/tiny-tempo/screens/result.jpg",
        fit: "contain",
        bg: "#eee8d8",
        caption: "The plaque hangs from the ceiling like the title sign. Three stars with their thresholds, the score, the Timing details control, the In the pocket mark for a flawless level, and a row that says what changed: a new best, up from 84%."
      },
      {
        type: "text",
        title: "Groove: shown by the room, not told by a meter",
        body:
          "Consecutive flawless tasks warm the room. The light shifts, the beat breathes, a brass stroke appears on the block, and a slip steps it back down without a word. It is not a combo, a multiplier or a currency, and nothing on screen counts it. The judge, the scorer, the stars, the hearts and the curve never read it, and a test fails the build if any of them so much as names it. A whole level played flawless is kept as a fact about the save: the map marks the stop for as long as the save exists."
      },

      // ── 5. Systems around the loop ─────────────────────────────────────────
      {
        type: "text",
        title: "Reasons to come back that are not a shop",
        body:
          "Three stars on a designated level earns that act's keepsake, and the Scrapbook keeps them: one page per act, a found keepsake mounted on a card, an unfound one as a silhouette with the level that earns it printed underneath. There is no currency, no drop, no roll and no pack; a keepsake is a fact about a level's stars. Three small objectives a day point at different parts of the game, and finishing all three stamps the day on a card. Clearing level 100 opens Endless Mode: one continuous session that cycles through the acts the road has introduced, tempo climbing from 130 to 150 BPM, three Groove Lives, and the time survived as the score."
      },
      {
        type: "gallery",
        title: "Scrapbook, Endless and the save code",
        images: [
          { src: "/projects/tiny-tempo/screens/scrapbook.jpg", caption: "The Scrapbook: area badges stamped as the road opens, then one page per act with its keepsakes and the level that earns each.", fit: "contain", bg: "#eee8d8" },
          { src: "/projects/tiny-tempo/screens/endless-door.jpg", caption: "Endless Mode at the start of a run: the clock, the tempo and bar, three Groove Lives, and the first act already on stage.", fit: "contain", bg: "#eee8d8" },
          { src: "/projects/tiny-tempo/screens/save-code.jpg", caption: "Progress leaves the device as a checksummed code rather than an account. Restoring merges, so a code can only ever add.", fit: "contain", bg: "#eee8d8" }
        ]
      },

      // ── 6. The Workshop ────────────────────────────────────────────────────
      {
        type: "text",
        title: "The Workshop: a design system drawn at runtime",
        body:
          "Three visual directions were built side by side in a style lab, a matte studio, a brass-and-stained-wood tavern and the Workshop, and the Workshop won: thick outlines, painted materials, heavy squash, every surface an object with thickness under one warm key light from the upper left. The title hangs from the ceiling on ropes. The one primary action is a coral block sitting on a bench. Utility controls are pucks. The only brass on screen is the thing for sale. Four colours key the whole game, paper, ink, muted ink and coral, and everything else derives from them or from an act's own palette. Two typefaces, Fredoka for display and Nunito for body, are bundled so nothing depends on a system font Android does not ship. The explicit anti-reference was a web page: Georgia headlines and letter-spaced monospace eyebrows were removed for exactly that reason."
      },
      {
        type: "gallery",
        title: "The system in use",
        images: [
          { src: "/projects/tiny-tempo/screens/title.jpg", caption: "The title screen is an object composition, not a menu: the sign on ropes, the hammer, the bench, and the one coral block.", fit: "contain", bg: "#eee8d8" },
          { src: "/projects/tiny-tempo/screens/settings.jpg", caption: "Settings: the same panels with thickness, the same pucks, and brass reserved for the store.", fit: "contain", bg: "#eee8d8" },
          { src: "/projects/tiny-tempo/screens/title-endless.jpg", caption: "The title once Endless is open: the row makes room, the first-visit label sits on the puck until it has been opened.", fit: "contain", bg: "#eee8d8" }
        ]
      },
      {
        type: "featureList",
        title: "Rules the system holds itself to",
        items: [
          { title: "Outlines are a dark shade of the fill, never black", body: "A letter that cannot carry an outline with 3:1 contrast is not given one; it lifts on cream instead." },
          { title: "One light for the whole game", body: "Everything that casts a shadow, catches a rim or shades a face derives it from the same light, so every surface agrees about where it is." },
          { title: "The thumb zone is absolute", body: "The turn block keeps a fixed distance from the bottom edge on every frame and grows in place, so it is anchored at the grip on a 16:9 phone and a 4:3 tablet alike." },
          { title: "Dimming is never a wash", body: "A room is dimmed with an edge vignette tinted from the act's own paper; a green-black wash over cream and timber reads as dirt." }
        ]
      },
      {
        type: "image",
        title: "Achievements",
        image: "/projects/tiny-tempo/achievements.png",
        fit: "contain",
        bg: "#eee8d8",
        caption: "The Play Games achievement set, drawn in the same vocabulary: bronze, silver and gold rings, each area's badge under its own sky, and the ribbon for a run that lasts."
      },

      // ── 7. The acts ────────────────────────────────────────────────────────
      {
        type: "text",
        title: "Thirty-six everyday acts",
        body:
          "Each act is a small cartoon with its own palette, its own synthesized sounds and three endings. A strong finish, a rough one and, where the act earned it, a middle one. Scissors cut a star, a heart or an angel, and at 70 percent or better the paper unfolds cleanly; below 40 it tears. A bug squashes like rubber under the shoe and springs onto the toe when the player does well, and is never hurt. Acts arrive on a schedule: nine in the first area, then two an area to level 100, then one an area to 171, each on an area's easiest step and never on a finale. Every sound but seven recorded beats is synthesised at runtime, so nothing is downloaded but one music track and the fonts."
      },
      {
        type: "gallery",
        title: "The first area",
        images: [
          { src: "/projects/tiny-tempo/acts/hammer.jpg", caption: "Hammer & nail — level 1. Make it stick.", fit: "contain", bg: "#eee8d8" },
          { src: "/projects/tiny-tempo/acts/window.jpg", caption: "Window cleaning — a tap is a squeegee stroke; clear glass reveals the view.", fit: "contain", bg: "#eee8d8" },
          { src: "/projects/tiny-tempo/acts/bug.jpg", caption: "Bug & shoe — the bug always survives.", fit: "contain", bg: "#eee8d8" },
          { src: "/projects/tiny-tempo/acts/saw.jpg", caption: "Saw & timber — accurate strokes deepen the kerf and throw sawdust.", fit: "contain", bg: "#eee8d8" },
          { src: "/projects/tiny-tempo/acts/tomato.jpg", caption: "Knife & tomato", fit: "contain", bg: "#eee8d8" },
          { src: "/projects/tiny-tempo/acts/curl.jpg", caption: "Bicep curl — one more rep.", fit: "contain", bg: "#eee8d8" },
          { src: "/projects/tiny-tempo/acts/cucumber.jpg", caption: "Knife & cucumber", fit: "contain", bg: "#eee8d8" },
          { src: "/projects/tiny-tempo/acts/banana.jpg", caption: "Knife & banana — easy does it.", fit: "contain", bg: "#eee8d8" },
          { src: "/projects/tiny-tempo/acts/paper.jpg", caption: "Scissors & paper — a star, a heart or an angel, unfolded cleanly or torn.", fit: "contain", bg: "#eee8d8" }
        ]
      },
      {
        type: "video",
        title: "DJ scratch, one task",
        src: "/projects/tiny-tempo/acts/scratch.mp4",
        poster: "/projects/tiny-tempo/acts/scratch.jpg",
        aspect: "432/532",
        maxWidth: "min(432px, 100%)",
        caption: "Recorded from the build like every clip on the site: the demonstration, a clean answer, the coda, and the slide to the next task, ending on its downbeat so the loop is seamless."
      },
      {
        type: "gallery",
        title: "Further down the road",
        images: [
          { src: "/projects/tiny-tempo/acts/egg.jpg", caption: "Egg cracking — level 11", fit: "contain", bg: "#eee8d8" },
          { src: "/projects/tiny-tempo/acts/bubble.jpg", caption: "Bubble wrap", fit: "contain", bg: "#eee8d8" },
          { src: "/projects/tiny-tempo/acts/light.jpg", caption: "Light switch — an elaborate room behind it", fit: "contain", bg: "#eee8d8" },
          { src: "/projects/tiny-tempo/acts/doorbell.jpg", caption: "Doorbell — a cat answers", fit: "contain", bg: "#eee8d8" },
          { src: "/projects/tiny-tempo/acts/fisherman.jpg", caption: "Fisherman — level 42", fit: "contain", bg: "#eee8d8" },
          { src: "/projects/tiny-tempo/acts/trombone.jpg", caption: "Trombone — a performed fanfare, and a performed wah-wah", fit: "contain", bg: "#eee8d8" },
          { src: "/projects/tiny-tempo/acts/clap.jpg", caption: "Clapping hands — the only act with a recording for the middle ending: a scattered few", fit: "contain", bg: "#eee8d8" },
          { src: "/projects/tiny-tempo/acts/snare.jpg", caption: "Snare drum", fit: "contain", bg: "#eee8d8" },
          { src: "/projects/tiny-tempo/acts/bongos.jpg", caption: "Bongos — find your groove", fit: "contain", bg: "#eee8d8" },
          { src: "/projects/tiny-tempo/acts/slushy.jpg", caption: "Slushy", fit: "contain", bg: "#eee8d8" },
          { src: "/projects/tiny-tempo/acts/barber.jpg", caption: "Barber — just a little off", fit: "contain", bg: "#eee8d8" },
          { src: "/projects/tiny-tempo/acts/toothbrush.jpg", caption: "Toothbrush — level 92, the last act before Endless opens", fit: "contain", bg: "#eee8d8" }
        ]
      },

      // ── 8. Shipping ────────────────────────────────────────────────────────
      {
        type: "text",
        title: "Built to ship, not to demo",
        body:
          "The game runs under a 720 by 1280 design box that expands to the device's real aspect ratio, so layout code asks a live viewport for its frames instead of hardcoding coordinates, and every scene splits building its objects from placing them, because on Android a resize is routine. Every screen is checked on three frames: a 20:9 phone, a 16:9 phone and a 4:3 tablet. Around the loop sit the things a store listing needs and a prototype never has: hearts and two daily restarts, rewarded ads and replay timers, crash reporting with sourcemaps uploaded and then deleted, analytics behind a settings switch, Play Games achievements, a privacy policy and terms that state the product as it is in code, and a save that survives a new phone without an account."
      },
      {
        type: "text",
        title: "A website whose motion is the game's",
        body:
          "The marketing site refuses to be an impression of the game. Every clip on it is recorded from the dev build by a script that opens each act's first level, lets a debug auto-player answer the task, and records one whole task at 30 frames a second on a virtual clock, ending on the next downbeat so each loop is seamless. The playable stage on the homepage is a port of level one from the same numbers the game uses, and the figures on the page are read from the configuration. Nothing on the page loops on a period of its own: the beat is half a second and the bar two, as at 120 BPM."
      },
      {
        type: "image",
        title: "The share card",
        image: "/projects/tiny-tempo/cover.png",
        caption: "Rendered from the site's own stylesheet so the two cannot drift: the hanging sign, the tempo beads, the handset playing level one, and the four numbers the game is built on."
      },

      // ── Reflection ─────────────────────────────────────────────────────────
      {
        type: "insight",
        title: "What this project taught me",
        body:
          "A game with one input has nowhere to hide. There is no layout to tidy, no control to relabel, no flow to shorten. Everything the player feels comes from timing, feedback and fairness, and all three turned out to be measurable: when a cue arrives relative to the beat, how far a tap lands from the sound that was heard, how often a decent player is stopped by a gate. The most useful habit I took from it is to write the rule down before drawing the screen, and to let a test hold the rule, so that a design decision stays a decision rather than drifting into whatever the last build happened to do."
      },
      {
        type: "metrics",
        title: "At a glance",
        items: [
          { label: "Acts", value: "36", hint: "Debuting from level 1 to level 171" },
          { label: "Perfect window", value: "±55 ms", hint: "Good ±130 ms · extras count as misses" },
          { label: "Levels per area", value: "10", hint: "Opener to finale, choreographed" },
          { label: "Endless opens", value: "Level 100", hint: "Three Groove Lives · time survived" }
        ]
      },
      { type: "caseStudyGallery" }
    ]
  }
];
