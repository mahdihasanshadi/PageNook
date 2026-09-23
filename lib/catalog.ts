// The whole shop lives here: shelves (categories) and PDFs.
// To add a PDF: add an entry to `products`. To start selling one:
// set its status to "available" and paste its Lemon Squeezy checkout URL.

// Short PDFs cost $0.99; long guides (30+ pages) cost $1.49.
export const PRICE_SHORT = 0.99;
export const PRICE_LONG = 1.49;
export const LONG_PDF_PAGES = 30;
export const MIN_PRICE = PRICE_SHORT;

export function priceForPages(pages?: number) {
  return pages !== undefined && pages >= LONG_PDF_PAGES ? PRICE_LONG : PRICE_SHORT;
}

export type CategorySlug =
  | "parenting"
  | "kids-learning"
  | "study-exams"
  | "tech-coding"
  | "work-career"
  | "home-life"
  | "planners-templates";

export type Category = {
  slug: CategorySlug;
  name: string;
  blurb: string;
  color: string; // icon ink
  tint: string; // icon background
  icon: "parenting" | "kids" | "study" | "code" | "work" | "home" | "planner";
};

/** Shown as a wide highlighted card at the top of the shelf grid. */
export const FEATURED_CATEGORY: CategorySlug = "parenting";

export const categories: Category[] = [
  { slug: "parenting", name: "Parenting", blurb: "Calm, practical guides and printables for raising little ones, from routines and big feelings to screen time.", color: "#B8456F", tint: "#FBE4EC", icon: "parenting" },
  { slug: "kids-learning", name: "Kids & Learning", blurb: "Tracing, phonics, math practice and coloring pages.", color: "#B07A08", tint: "#FDF1D6", icon: "kids" },
  { slug: "study-exams", name: "Study & Exams", blurb: "Research writing, thesis help and exam game plans.", color: "#C74536", tint: "#FDE3E0", icon: "study" },
  { slug: "tech-coding", name: "Tech & Coding", blurb: "Hands-on guides for building real projects with modern tools.", color: "#2C68CF", tint: "#E1EDFE", icon: "code" },
  { slug: "work-career", name: "Work & Career", blurb: "Interview prep, CV templates and job-hunt checklists.", color: "#7A3DB8", tint: "#F1E6FB", icon: "work" },
  { slug: "home-life", name: "Home & Life", blurb: "Recipes, budgets, routines and handy printables.", color: "#258A66", tint: "#DDF3EA", icon: "home" },
  { slug: "planners-templates", name: "Planners & Templates", blurb: "Fill-in planners and trackers to print or use on a tablet.", color: "#2B2E6B", tint: "#E8E9F6", icon: "planner" },
];

export type Product = {
  slug: string;
  title: string;
  subtitle: string;
  category: CategorySlug;
  status: "available" | "coming-soon";
  price: number;
  pages?: number;
  format: string;
  author: string;
  /** Lemon Squeezy checkout link, e.g. https://pagenook.lemonsqueezy.com/buy/xxxx */
  checkoutUrl?: string;
  cover?: string; // image in /public; otherwise a drawn cover is used
  coverGradient: [string, string];
  previews?: { src: string; alt: string }[];
  freeSample?: string;
  summary: string;
  description: string[];
  inside: string[];
  forWho: string[];
  addedOn: string; // ISO date
  keywords: string[];
};

export const products: Product[] = [
  {
    slug: "ship-it-with-claude-code",
    title: "Ship It with Claude Code",
    subtitle: "Build one real project, every prompt shown",
    category: "tech-coding",
    status: "available",
    price: priceForPages(39),
    pages: 39,
    format: "PDF · 170 × 240 mm · screen & print friendly",
    author: "Mahdi Hasan Shadi",
    checkoutUrl: undefined,
    cover: "/covers/ship-it-with-claude-code.jpg",
    coverGradient: ["#2B2E6B", "#4C8DF6"],
    previews: [
      { src: "/previews/ship-it-contents.jpg", alt: "Contents page" },
      { src: "/previews/ship-it-plan.jpg", alt: "A page from the build chapters" },
      { src: "/previews/ship-it-prompts.jpg", alt: "A page from the prompt patterns chapter" },
      { src: "/previews/ship-it-cheatsheet.jpg", alt: "The one-page cheat sheet" },
    ],
    freeSample: "/free/ship-it-with-claude-code-sample.pdf",
    summary:
      "Go from an empty folder to a live website with an AI coding assistant, with the real prompts, plans, bugs and fixes along the way.",
    description: [
      "Most AI coding guides list features. This one shows a build. You follow along as a real storefront (the one you're looking at) goes from an empty folder to GitHub to a live site with a working Buy button.",
      "You see the actual prompts, the plan Claude Code proposed, a real bug and how it was traced to its cause, and the habits that keep an AI assistant fast without letting it run wild.",
    ],
    inside: [
      "13 chapters in three parts: Set up, The build, Level up",
      "The four-step loop: Explore → Plan → Build → Verify",
      "A CLAUDE.md project brief you can copy",
      "Debugging recipe built on a real bug from the build",
      "Git, free hosting and a real checkout button, step by step",
      "Ten prompt patterns with weak vs strong examples",
      "Custom commands, hooks, skills, subagents and MCP explained plainly",
      "Cheat sheet, prompt library and ship-day checklist",
    ],
    forWho: [
      "Students and beginners who can read a little code",
      "Solo builders with an idea and no team",
      "Developers who want a steadier AI workflow",
    ],
    addedOn: "2026-09-23",
    keywords: ["claude", "claude code", "ai", "coding", "programming", "website", "nextjs", "git", "github", "prompts", "developer"],
  },
  {
    slug: "thesis-to-journal-paper",
    title: "Thesis to Journal Paper",
    subtitle: "The CS & ML student edition",
    category: "study-exams",
    status: "coming-soon",
    price: PRICE_SHORT,
    format: "PDF",
    author: "Mahdi Hasan Shadi",
    coverGradient: ["#F26B5B", "#F5B82E"],
    summary:
      "How to cut, reshape and submit your thesis as a real journal paper: checklists, choosing a journal and reply-to-reviewer templates.",
    description: [
      "Your thesis is 80 pages; a journal wants 12. This guide walks through cutting it down without losing the contribution, picking the right journal, and handling reviewers.",
    ],
    inside: ["Thesis-to-paper cutting checklist", "Journal selection worksheet", "Cover letter and response-to-reviewers templates"],
    forWho: ["Undergrad and Master's students in CS/ML", "First-time authors without a big lab behind them"],
    addedOn: "2026-09-23",
    keywords: ["thesis", "journal", "paper", "research", "publication", "academic", "machine learning"],
  },
  {
    slug: "abc-tracing-adventure",
    title: "ABC Tracing Adventure",
    subtitle: "26 playful pages for ages 3–5",
    category: "kids-learning",
    status: "coming-soon",
    price: PRICE_SHORT,
    format: "Printable PDF · A4 & US Letter",
    author: "PageNook",
    coverGradient: ["#3FB68B", "#9BD86B"],
    summary: "Letter tracing with a friendly animal for every letter. Print at home, again and again.",
    description: ["One page per letter: big trace-along letters, a friendly animal to color, and a word to say out loud."],
    inside: ["26 letter pages, upper and lower case", "An animal to color on every page", "Printable at home on A4 or US Letter"],
    forWho: ["Parents of preschoolers", "Teachers and home-schoolers"],
    addedOn: "2026-09-23",
    keywords: ["kids", "abc", "alphabet", "tracing", "preschool", "worksheet", "printable", "letters"],
  },
];

export const site = {
  name: "PageNook",
  tagline: "Pages worth keeping.",
  description:
    "PageNook is a cozy corner of the internet for carefully made PDFs: kids' worksheets, study guides, coding guides, planners and more. PDFs from $0.99, with instant download.",
  url: process.env.SITE_URL ?? "https://pagenook.me",
  email: "hello@pagenook.me",
  owner: "Mahdi Hasan Shadi",
};

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function productsIn(category: CategorySlug) {
  return products.filter((p) => p.category === category);
}

export function newestProducts(limit = 6) {
  // Available PDFs first, then newest.
  return [...products]
    .sort((a, b) => Number(b.status === "available") - Number(a.status === "available") || b.addedOn.localeCompare(a.addedOn))
    .slice(0, limit);
}

export function searchProducts(query: string) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];
  return products
    .map((p) => {
      const cat = getCategory(p.category)?.name ?? "";
      const hay = [p.title, p.subtitle, p.summary, cat, ...p.keywords].join(" ").toLowerCase();
      const score = words.reduce((s, w) => s + (hay.includes(w) ? 1 : 0), 0);
      return { p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.p);
}

export function formatPrice(n: number) {
  return `$${n.toFixed(2)}`;
}
