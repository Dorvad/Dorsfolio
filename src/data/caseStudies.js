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
//   image        { type, title?, image, caption? }
//   gallery      { type, title?, images: [{src, caption?}] }
//   metrics      { type, title?, items: [{label, value, hint?}] }
//   quote        { type, body, attribution? }
//   process      { type, title?, steps: [string | {title, body}] }
//   beforeAfter  { type, title?, before: {label, body}, after: {label, body} }
//   insight      { type, title?, body }
//   links        { type, title?, items: [{label, href}] }
//   featureList  { type, title?, items: [{title, body}] }
//   timeline     { type, title?, items: [{date, title, body}] }
//
// CATEGORIES used for filters:
//   "UX / Product", "UI & Branding", "Learning & Development",
//   "Product Management", "Internal Tools"
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
      }
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
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // 3. ElmTrackr — personal shift-tracking app for hourly workers
  // ---------------------------------------------------------------------------
  {
    slug: "elmtrackr",
    title: "ElmTrackr",
    subtitle: "A personal shift-tracking app for hourly workers.",
    category: "UX / Product",
    categories: ["UX / Product", "Internal Tools"],
    year: "2025",
    role: "Product design, UX, UI, front-end product thinking",
    status: "Functional prototype",
    coverImage: "/projects/elmtrackr/dashboard-home.jpg",
    accent: "#5b35d5",
    tags: ["UX", "Mobile", "Productivity", "Internal Tool", "Next.js"],
    summary:
      "ElmTrackr is a mobile-first shift-tracking app designed for hourly workers who need a simple way to clock in, clock out, review their shifts, and understand how much they are earning.",
    challenge:
      "Hourly workers rely on memory, messages, and spreadsheets to track their time. Monthly salary expectations stay unclear until payday, overtime and special rates are hard to calculate, and small reimbursements like travel refunds are easy to forget.",
    outcome:
      "A lightweight personal tool that answers three questions fast: Am I working right now? How much did I work this month? What should I review before payroll?",
    metrics: [
      { label: "Platform", value: "Mobile-first", hint: "Next.js · React · Supabase" },
      { label: "Sections", value: "5", hint: "Home · Shifts · Reports · Projects · Settings" },
      { label: "Status", value: "Prototype", hint: "Functional end-to-end" }
    ],
    recruiterInsight: {
      headline: "A pocket-sized tool that tells hourly workers what they're owed — without waiting for payday to find out.",
      problem: "Hourly workers track their time with memory, messages, and spreadsheets, so monthly pay stays unclear and small reimbursements are easy to forget.",
      users: "Hourly workers who want a fast, personal way to clock in and out and understand what they've earned so far.",
      role: "Product design, UX, UI, and front-end product thinking.",
      contribution: "Designed the core flows around three everyday questions, then built a working prototype end-to-end with Next.js and Supabase to test it with real data.",
      outcome: "A functional prototype that answers 'Am I working now? How much have I earned this month? What should I check before payday?' in a few taps."
    },
    sections: [
      {
        type: "text",
        title: "The situation",
        body:
          "ElmTrackr started from a very practical need: shift work creates small but persistent moments of uncertainty. Did I clock in? How many hours did I work this month? What is my estimated gross pay? Did I remember to report travel refunds? Instead of building a heavy HR system, the goal was a lightweight personal tool that gives workers clarity in the moments they actually need it."
      },
      {
        type: "image",
        title: "Home dashboard",
        image: "/projects/elmtrackr/dashboard-idle.jpg",
        caption: "The home screen — work status front and center, monthly summary below."
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
          { title: "Build", body: "Built as a Next.js web app with Supabase, which allowed testing real flows — active shifts, month switching, pay calculations, reminders — rather than only static prototypes." }
        ]
      },
      {
        type: "image",
        title: "Initial wireframes",
        image: "/projects/elmtrackr/wireframe-figma.png",
        caption: "Early wireframes in Figma — four core screens laid out before building: Home Dashboard, Shifts List, Reports, and New Shift Form."
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
          { src: "/projects/elmtrackr/reports-basic.jpg", caption: "Reports view on a lighter month" }
        ]
      },
      {
        type: "image",
        title: "Desktop view",
        image: "/projects/elmtrackr/dashboard-desktop.jpg",
        caption: "The same data model renders in a wider layout on desktop."
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
        type: "beforeAfter",
        title: "What changed",
        before: { label: "Before", body: "Memory, WhatsApp threads, and spreadsheets. Monthly pay unclear until the employer sends it. Easy to forget overtime rates or travel refunds." },
        after:  { label: "After",  body: "One app to clock in, review the month, see estimated pay, and check refunds — all before payday. A personal record the worker owns and controls." }
      },
      {
        type: "metrics",
        title: "Prototype scope",
        items: [
          { label: "Core flow", value: "End-to-end", hint: "Clock in → review → report → export" },
          { label: "Pay types", value: "4 tracked", hint: "Regular · Overtime · Weekend · Holiday" },
          { label: "Export", value: "CSV + PDF", hint: "Monthly reports exportable" }
        ]
      },
      {
        type: "insight",
        title: "What I learned",
        body:
          "Small operational tools can still require deep product thinking. The hardest part was not designing a clock-in button — it was deciding what information should appear around it, what should wait for reports, and how much complexity the user should see at any moment. I also learned that 'simple' tools become valuable when they respect messy real-life behavior: forgetting, correcting, reviewing, and checking. A good shift tracker should not only record time. It should help the user feel calm and in control."
      }
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
      }
    ]
  }
];
