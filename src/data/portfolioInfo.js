// =============================================================================
// PORTFOLIO INFO — global text, contact links, navigation labels
// Edit this file to change site-wide copy.
// =============================================================================

window.portfolioInfo = {
  name: "Dor Vadai",
  brand: "Dorsfolio",
  tagline: "Hi, I'm Dor Vadai.",
  intro:
    "Learning technology and digital product professional — I turn complex ideas into clear, usable, and engaging experiences.",
  footer:
    "Designed as one portfolio, explored through four interface worlds.",

  ctas: {
    primary:   { label: "View projects", href: "#/projects" },
    secondary: { label: "About me",      href: "#/about" },
    tertiary:  { label: "Contact",       href: "#/contact" }
  },

  nav: [
    { label: "Home",     href: "#/" },
    { label: "Projects", href: "#/projects" },
    { label: "Gallery",  href: "#/gallery" },
    { label: "About",    href: "#/about" },
    { label: "Contact",  href: "#/contact" }
  ],

  filters: [
    "All",
    "UX / Product",
    "UI & Branding",
    "Learning & Development",
    "Product Management",
    "Internal Tools"
  ],

  sections: [
    "Home",
    "Selected Projects",
    "UX / Product Case Studies",
    "UI & Branding Work",
    "Learning & Development Projects",
    "Product Management Work",
    "About",
    "Contact"
  ],

  about: {
    headline: "About Dor",
    lead:
      "I work at the intersection of learning, product, and design. I help organizations turn ambiguous needs into clear systems people can actually use.",
    paragraphs: [
      "My background spans learning technology, product design, and operations. I've built training platforms, internal tools, brand systems, and small AI utilities for facilitation work.",
      "Across all of it, the question is the same: what does this person need, at this moment, to keep moving? Everything else — the visuals, the framework, the stack — follows from that."
    ],
    pillars: [
      { title: "Learning technology", body: "Platforms and tools for cohort-based, facilitator-led learning." },
      { title: "Product & UX", body: "End-to-end product design, from discovery to working prototype." },
      { title: "Systems & brand", body: "Design systems, voice guides, and the connective tissue between them." }
    ]
  },

  contact: {
    headline: "Get in touch",
    lead: "Open to learning-tech roles, product design work, and interesting collaborations.",
    links: [
      { label: "Email",     value: "hello@dorsfolio.example", href: "mailto:hello@dorsfolio.example" },
      { label: "LinkedIn",  value: "linkedin.com/in/dor",     href: "https://linkedin.com/in/" },
      { label: "Portfolio", value: "dorsfolio.example",       href: "#/" },
      { label: "GitHub",    value: "github.com/dor",          href: "https://github.com/" }
    ]
  },

  skins: [
    {
      id: "mac",
      name: "Mac / iOS",
      tagline: "Smooth, polished, spacious, and cinematic.",
      visualHint: "Translucent windows, dock-style navigation, soft gradients."
    },
    {
      id: "win95",
      name: "Windows 95",
      tagline: "Retro, playful, nostalgic, and surprisingly usable.",
      visualHint: "Gray panels, beveled buttons, desktop icons, pixel details."
    },
    {
      id: "material",
      name: "Material You",
      tagline: "Colorful, adaptive, friendly, and mobile-first.",
      visualHint: "Rounded cards, expressive color, pill navigation."
    },
    {
      id: "carbon",
      name: "IBM Carbon",
      tagline: "Structured, precise, enterprise-ready, and systematic.",
      visualHint: "Dashboard layout, grid, technical clarity."
    }
  ]
};
