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
  // 1. Ezer L’Chaim — volunteer ride service dashboard (4-month internship)
  // ---------------------------------------------------------------------------
  {
    slug: "ezer-lachaim",
    title: "Ezer L’Chaim",
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
      "Ezer L’Chaim is a volunteer-based transportation service that helps patients get to hospitals and medical appointments. I designed a dashboard that turns a phone-and-paper coordination process into a clear digital workflow — so managers can run the service with less stress and more certainty.",
    challenge:
      "The organization was doing important work, but coordination was almost entirely manual. Rides were arranged by phone; managers had to track drivers, patients, schedules, and updates across different channels. The work was hard to scale, and easy to drop.",
    outcome:
      "A dashboard concept that centralizes ride coordination — giving managers one place to view rides, volunteers, and service activity, while also helping the organization tell its impact story to donors and stakeholders.",
    metrics: [
      { label: "My role", value: "UX + PM", hint: "4-month internship" },
      { label: "User groups", value: "3", hint: "Managers · Volunteers · Patients" },
      { label: "Outcome", value: "Operational + strategic", hint: "Daily tool that also shows impact" }
    ],
    sections: [
      {
        type: "text",
        title: "The situation",
        body:
          "Ezer L’Chaim connects patients with volunteer drivers. It sounds simple, but in practice it involves many moving parts. Managers need to know which rides are scheduled, which volunteers are available, and whether each ride is being handled. Volunteers need to find relevant rides and understand where they need to go. Patients need to feel that their ride is reliable, clear, and safe. Before the dashboard, most of this depended on manual coordination — hard to scale, with too much room for confusion, delays, or missed information."
      },
      {
        type: "image",
        title: "The system at a glance",
        image: "/projects/ezer-lachaim/cover.png",
        caption: "A unified dashboard concept covering ride status, volunteer activity, and key metrics."
      },
      {
        type: "text",
        title: "The design challenge",
        body:
          "Give managers a clear overview of the entire operation — see upcoming rides, track volunteer availability, understand the status of each ride, access important data quickly, reduce repeated phone coordination, and present the organization’s activity in a clear and professional way. This was not only a design challenge. It was a service challenge: helping patients get to medical care with less stress and more certainty."
      },
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
        type: "text",
        title: "My role",
        body:
          "I worked on this project as a UX Designer and Product Manager during a four-month internship. My work covered understanding the users and their needs, researching similar systems and dashboard patterns, organizing the product structure, defining key features, designing the dashboard experience, and thinking about how the system could support both daily operations and long-term organizational goals."
      },
      {
        type: "image",
        title: "Overview — the manager’s starting point",
        image: "/projects/ezer-lachaim/dashboard-info.png",
        caption: "Top-line numbers, rides by city, and trends — so managers can read the day in seconds."
      },
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
          { title: "Make the dashboard useful at a glance", body: "Show the most important information first — ride status, volunteer activity, upcoming rides, and key numbers — so managers don’t have to search to understand what’s happening." },
          { title: "Organize around real user needs", body: "Structure the dashboard by what managers actually do, not by internal categories. What do they need to know right now? Which rides need attention? Where might something slip?" },
          { title: "Support both daily work and organizational growth", body: "The dashboard helps run today’s shift and helps tell the organization’s story — using real data about rides, volunteers, and activity to show donors and stakeholders the impact of the service." },
          { title: "Design for trust", body: "Patients trust that someone will arrive. Volunteers trust that the information is clear. Managers trust that the system reflects what is really happening. Every screen was designed to reduce uncertainty." }
        ]
      },
      {
        type: "image",
        title: "Volunteers — the operating list",
        image: "/projects/ezer-lachaim/volunteers-detail.png",
        caption: "Each row is one volunteer. Clear status pills make the queue scannable in a single pass."
      },
      {
        type: "image",
        title: "Volunteer profile — context in one place",
        image: "/projects/ezer-lachaim/volunteer-profile.png",
        caption: "Personal info, recent activity, performance, and notes — everything a manager needs without leaving the screen."
      },
      {
        type: "gallery",
        title: "Charts & analytics views",
        images: [
          { src: "/projects/ezer-lachaim/chart-vertical.jpg", caption: "New volunteers per month — vertical bars" },
          { src: "/projects/ezer-lachaim/chart-horizontal.jpg", caption: "Same data, horizontal — picked by the team for at-a-glance reading" },
          { src: "/projects/ezer-lachaim/satisfaction.jpg", caption: "Ride satisfaction & response time — performance view" }
        ]
      },
      {
        type: "beforeAfter",
        title: "What changed",
        before: { label: "Before", body: "Phone-based coordination across drivers, patients, and managers. Information scattered across calls, messages, and notes — hard to scale, easy to miss." },
        after:  { label: "After", body: "A single dashboard concept that brings rides, volunteers, and activity together. The same data also supports impact reporting and growth conversations." }
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
          "This project helped me understand how UX can support services that are deeply human. The challenge wasn’t just to design screens — it was to design a system that helps people coordinate care, reduce stress, and make important work easier to manage. Good UX isn’t only about making things look better. It’s about making meaningful services work better."
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
  // 3. ElmShiftr
  // ---------------------------------------------------------------------------
  {
    slug: "elmshiftr",
    title: "ElmShiftr",
    subtitle: "A shift management tool for escape room staff and managers.",
    category: "UX / Product",
    categories: ["UX / Product", "Internal Tools"],
    year: "2026",
    role: "Product design, UX, front-end concept",
    status: "Prototype",
    coverImage: "/projects/elmshiftr/cover.png",
    accent: "#5B8DEF",
    tags: ["UX", "Product", "Operations", "Internal Tool"],
    summary:
      "ElmShiftr helps escape room staff submit shifts, managers approve them, and everyone understand the weekly schedule with less friction.",
    challenge:
      "Existing workflow relied on scattered messages, manual coordination, and unclear visibility for both staff and managers. Mistakes were costly: a missed shift meant a locked-out customer.",
    outcome:
      "A focused internal tool that makes shift submission, approval, and the weekly overview a single, fast ritual — not a thread of messages.",
    metrics: [
      { label: "Primary users", value: "Staff + managers" },
      { label: "Platform", value: "Responsive web app" },
      { label: "Focus", value: "Operational clarity" }
    ],
    sections: [
      {
        type: "text",
        title: "The problem",
        body:
          "Staff needed a simpler way to submit availability and managers needed a clearer way to approve and organize shifts. The team was juggling WhatsApp, spreadsheets, and memory."
      },
      {
        type: "metrics",
        title: "Operational baseline",
        items: [
          { label: "Avg. approval time", value: "26h", hint: "Before redesign" },
          { label: "Shifts per week", value: "120+", hint: "Across 3 locations" },
          { label: "Conflicts per month", value: "8", hint: "Double-booked or missed" }
        ]
      },
      {
        type: "image",
        title: "Dashboard concept",
        image: "/projects/elmshiftr/dashboard.png",
        caption: "A clear overview of weekly shift submissions."
      },
      {
        type: "process",
        title: "Design process",
        steps: [
          { title: "Map", body: "Mapped the current manual workflow and surfaced where information broke down." },
          { title: "Define", body: "Defined the key user roles: staff, shift manager, owner." },
          { title: "Design", body: "Created a simple submit → approve → publish flow." },
          { title: "Refine", body: "Designed mobile-first screens for daily use." }
        ]
      },
      {
        type: "insight",
        title: "Key design decision",
        body:
          "The system should feel less like a form and more like a weekly work ritual. Submitting availability had to take under 30 seconds on a phone."
      },
      {
        type: "beforeAfter",
        title: "What changed",
        before: { label: "Before", body: "Group chat threads, manual spreadsheets, and last-minute calls to fill gaps." },
        after: { label: "After", body: "One weekly view, two taps to submit, one screen for managers to approve." }
      },
      {
        type: "gallery",
        title: "Screens",
        images: [
          { src: "/projects/elmshiftr/screen-1.png", caption: "Weekly availability" },
          { src: "/projects/elmshiftr/screen-2.png", caption: "Manager approval" },
          { src: "/projects/elmshiftr/screen-3.png", caption: "Published schedule" }
        ]
      },
      {
        type: "featureList",
        title: "What I shipped",
        items: [
          { title: "One-tap availability", body: "Submit a full week in under 30 seconds on mobile." },
          { title: "Approval queue", body: "Managers triage all pending shifts from a single screen." },
          { title: "Conflict detection", body: "Surfaces double-bookings before the schedule publishes." }
        ]
      },
      {
        type: "quote",
        body:
          "The first week we used it nobody asked 'who's working Saturday?' in the group chat. That was the goal.",
        attribution: "Operations lead, pilot location"
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // 2. OfekOS
  // ---------------------------------------------------------------------------
  {
    slug: "ofekos",
    title: "OfekOS",
    subtitle: "A digital learning operating system for management training programs.",
    category: "Learning & Development",
    categories: ["Learning & Development", "Product Management"],
    year: "2025",
    role: "Product strategy, learning design, UX",
    status: "Live",
    coverImage: "/projects/ofekos/cover.png",
    accent: "#9C7CF4",
    tags: ["L&D", "Product Strategy", "Learning Experience", "Platform Design"],
    summary:
      "OfekOS turns a management training program into a structured digital journey for participants, facilitators, and administrators.",
    challenge:
      "A multi-month management program was being delivered through scattered slides, PDFs, and emails. Participants lost the thread, facilitators repeated themselves, and admins had no visibility.",
    outcome:
      "A learning operating system where each cohort moves through modules together — with clear pathways for the three different roles using the platform.",
    metrics: [
      { label: "Cohorts run", value: "6" },
      { label: "Participants", value: "180+" },
      { label: "Roles supported", value: "3" }
    ],
    sections: [
      {
        type: "text",
        title: "Three users, one system",
        body:
          "Participants need momentum and clarity. Facilitators need session prep and live tools. Admins need a bird's-eye view across cohorts. The platform had to serve all three without compromise."
      },
      {
        type: "timeline",
        title: "Program rollout",
        items: [
          { date: "Q1", title: "Discovery", body: "Shadowed 4 facilitators across 2 cohorts." },
          { date: "Q2", title: "Prototype", body: "Built a single-module pilot." },
          { date: "Q3", title: "Full rollout", body: "Migrated 6 cohorts onto the platform." },
          { date: "Q4", title: "Iteration", body: "Added admin dashboard and analytics." }
        ]
      },
      {
        type: "image",
        title: "Participant journey",
        image: "/projects/ofekos/journey.png",
        caption: "Modules unlock progressively as the cohort moves through the program."
      },
      {
        type: "featureList",
        title: "Core modules",
        items: [
          { title: "Cohort hub", body: "Where participants land — what's now, what's next." },
          { title: "Session studio", body: "Facilitators prep, run, and debrief sessions in one place." },
          { title: "Admin console", body: "Cross-cohort visibility, content versioning, attendance." }
        ]
      },
      {
        type: "insight",
        title: "What I learned",
        body:
          "A learning platform isn't a content delivery tool — it's a coordination tool. The hardest design decisions were about visibility between roles, not about the content itself."
      },
      {
        type: "gallery",
        title: "Interface highlights",
        images: [
          { src: "/projects/ofekos/screen-1.png", caption: "Participant cohort hub" },
          { src: "/projects/ofekos/screen-2.png", caption: "Facilitator session view" },
          { src: "/projects/ofekos/screen-3.png", caption: "Admin cross-cohort dashboard" }
        ]
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // 4. AI Facilitation Tools
  // ---------------------------------------------------------------------------
  {
    slug: "ai-facilitation-tools",
    title: "AI Facilitation Tools",
    subtitle: "Lightweight AI-powered tools for workshops, reflection, and group facilitation.",
    category: "Learning & Development",
    categories: ["Learning & Development", "UX / Product"],
    year: "2025",
    role: "Product thinking, prompt design, prototyping",
    status: "Active",
    coverImage: "/projects/ai-facilitation-tools/cover.png",
    accent: "#E0744A",
    tags: ["AI", "L&D", "Facilitation", "Product Thinking"],
    summary:
      "A collection of small digital tools designed to make workshops more interactive, adaptive, and engaging.",
    challenge:
      "AI in L&D is usually framed as 'replace the facilitator' or 'auto-generate content.' Neither is what working facilitators actually want — they want a smart assistant in the room, not a substitute.",
    outcome:
      "A growing toolkit of focused, single-purpose AI tools that sit alongside a human facilitator. Each tool does one thing well, in under a minute.",
    metrics: [
      { label: "Tools shipped", value: "7" },
      { label: "Avg. interaction", value: "< 60s" },
      { label: "Posture", value: "Assist, don't replace" }
    ],
    sections: [
      {
        type: "text",
        title: "Design principle: tools, not assistants",
        body:
          "Every tool answers one question for one role at one moment in a workshop. No chat interfaces, no open-ended prompts. The facilitator stays in charge."
      },
      {
        type: "featureList",
        title: "The toolkit",
        items: [
          { title: "Warmup generator", body: "Three tailored warmups for your group, in 20 seconds." },
          { title: "Reflection mirror", body: "Summarizes a group's reflections back to them without flattening differences." },
          { title: "Tension finder", body: "Surfaces the disagreements hiding in a discussion transcript." },
          { title: "Closing prompt", body: "Generates a closing question matched to the session's energy." }
        ]
      },
      {
        type: "insight",
        title: "What I learned",
        body:
          "The fastest way to make AI useful in a workshop is to make it boring and predictable. Surprise is bad in a room of 20 people."
      },
      {
        type: "links",
        title: "Read more",
        items: [
          { label: "Design notes (Notion)", href: "#" },
          { label: "Tool demo", href: "#" }
        ]
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // 5. UX Case Study System
  // ---------------------------------------------------------------------------
  {
    slug: "ux-case-study-system",
    title: "UX Case Study System",
    subtitle: "A modular framework for presenting UX projects in a clear and engaging way.",
    category: "UX / Product",
    categories: ["UX / Product", "UI & Branding"],
    year: "2026",
    role: "System design, content design, front-end",
    status: "This site",
    coverImage: "/projects/ux-case-study-system/cover.png",
    accent: "#D49A2A",
    tags: ["UX", "Storytelling", "Interaction Design", "Content Design"],
    summary:
      "A reusable case study structure that helps complex projects become easier to understand, scan, and remember.",
    challenge:
      "Portfolios usually trade off depth for scannability. Long case studies don't get read. Short ones don't earn trust.",
    outcome:
      "A block-based case study system: same content, swappable presentation. This portfolio renders four entirely different interface skins on top of one content model.",
    metrics: [
      { label: "Skins", value: "4" },
      { label: "Block types", value: "11" },
      { label: "Source of truth", value: "1 data file" }
    ],
    sections: [
      {
        type: "text",
        title: "One model, many surfaces",
        body:
          "Every case study is a list of typed content blocks. Skins decide how those blocks look. Adding a new project means editing one file."
      },
      {
        type: "featureList",
        title: "Block types",
        items: [
          { title: "Narrative blocks", body: "text, quote, insight — for the story." },
          { title: "Visual blocks", body: "image, gallery, beforeAfter — for the work." },
          { title: "Structured blocks", body: "metrics, process, timeline, featureList, links — for the evidence." }
        ]
      },
      {
        type: "beforeAfter",
        title: "What the system replaces",
        before: { label: "Before", body: "One bespoke page per project. Each one a custom build." },
        after: { label: "After", body: "One data file. Eleven block components. Four skins. Auto-routed." }
      },
      {
        type: "insight",
        title: "Why four skins",
        body:
          "Each skin is a real design system worth knowing: Mac/iOS, Win95, Material You, IBM Carbon. Switching between them on the same content makes the design choices visible — which is the point of a portfolio."
      }
    ]
  }
];
