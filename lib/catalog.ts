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
    slug: "coding-interview-patterns",
    title: "Coding Interview Patterns",
    subtitle: "20 patterns, one page each, with tested Python code",
    category: "work-career",
    status: "available",
    price: priceForPages(26),
    pages: 26,
    format: "PDF · 170 × 240 mm · screen & print friendly",
    author: "Mahdi Hasan Shadi",
    cover: "/covers/coding-interview-patterns.jpg",
    coverGradient: ["#2B2E6B", "#9A5BD6"],
    previews: [
      { src: "/previews/cip-picker.jpg", alt: "Which pattern is it? cheat sheet" },
      { src: "/previews/cip-two-pointers.jpg", alt: "The Two Pointers page" },
      { src: "/previews/cip-dp.jpg", alt: "The dynamic programming page" },
      { src: "/previews/cip-plan.jpg", alt: "The 14-day practice plan" },
    ],
    freeSample: "/free/coding-interview-patterns-sample.pdf",
    summary:
      "The 20 patterns behind most coding interview questions, each on one page: when to use it, the idea in plain words, a tested Python template, common bugs and four practice problems.",
    description: [
      "Interview problems look endless, but most are the same 20 or so ideas in different clothes. This guide teaches you to spot the pattern from the clues in a problem, then gives you a short template you can write from memory.",
      "Every code sample in the book is run against tests before publishing, so you are not learning from buggy snippets. It finishes with a 5-step way to talk through any problem and a 14-day practice plan.",
    ],
    inside: [
      "A “Which pattern is it?” cheat sheet that maps clues to patterns",
      "20 one-page patterns, from Two Pointers to Dynamic Programming and Tries",
      "A tested Python template for every pattern",
      "The most common bugs for each one, and how to avoid them",
      "80 well-known practice problems, from easier to harder",
      "One sentence to say in the interview for each pattern",
      "A 5-step answer framework and a 14-day practice plan",
    ],
    forWho: ["Students preparing for internships and first developer jobs", "Developers brushing up before interviews", "Self-taught programmers who want structure"],
    addedOn: "2026-09-23",
    keywords: ["coding interview", "leetcode", "algorithms", "data structures", "python", "job", "career", "software engineer", "interview prep", "dsa"],
  },
  {
    slug: "monthly-budget-planner",
    title: "The Monthly Budget Planner",
    subtitle: "See where your money goes and grow your savings",
    category: "home-life",
    status: "available",
    price: priceForPages(16),
    pages: 16,
    format: "Printable PDF · A4 and US Letter versions included",
    author: "PageNook",
    cover: "/covers/monthly-budget-planner.jpg",
    coverGradient: ["#1B5E47", "#3FB68B"],
    previews: [
      { src: "/previews/budget-budget.jpg", alt: "The Monthly Budget page" },
      { src: "/previews/budget-bills.jpg", alt: "The Bill Tracker" },
      { src: "/previews/budget-goals.jpg", alt: "Savings Goals" },
      { src: "/previews/budget-review.jpg", alt: "Month in Review" },
    ],
    summary:
      "15 undated, printable pages to plan each month, pay every bill on time, track spending and savings goals, and pay down debt. Works in any currency.",
    description: [
      "Budgeting isn't about saying no to everything. It's about deciding ahead of time where your money should go, then checking in so there are no surprises. This planner walks you through a simple 20-minute monthly routine.",
      "Every page is undated, so you can print it again each month, and there's no currency symbol, so it works wherever you live.",
    ],
    inside: [
      "A how-to page with a simple 20-minute monthly routine",
      "Monthly Budget page with 12 ready-made spending categories",
      "Bill Tracker, two Expense Log pages and a Weekly Check-in",
      "Savings Goals with colour-in progress bars",
      "Sinking Funds, Debt Payoff and Subscriptions pages",
      "No-Spend Challenge, Net Worth Tracker and Month in Review",
      "Year at a Glance, plus a notes page",
      "Both A4 and US Letter versions",
    ],
    forWho: ["Anyone who wants to feel in control of their money", "Families managing a household budget", "Students and first-jobbers starting to budget"],
    addedOn: "2026-09-23",
    keywords: ["budget", "money", "finance", "savings", "planner", "printable", "bills", "expenses", "debt", "family", "household"],
  },
  {
    slug: "exam-study-planner",
    title: "Exam Season Study Planner",
    subtitle: "Plan your revision and study the way that works",
    category: "planners-templates",
    status: "available",
    price: priceForPages(15),
    pages: 15,
    format: "Printable PDF · A4 and US Letter versions included",
    author: "PageNook",
    cover: "/covers/exam-study-planner.jpg",
    coverGradient: ["#1E3A7A", "#4C8DF6"],
    previews: [
      { src: "/previews/study-timetable.jpg", alt: "Weekly Timetable" },
      { src: "/previews/study-daily.jpg", alt: "Daily Plan" },
      { src: "/previews/study-spaced.jpg", alt: "Spaced Review schedule" },
      { src: "/previews/study-checklist.jpg", alt: "Exam Day Checklist" },
    ],
    summary:
      "Printable pages to map every exam, plan revision week by week and day by day, and use proven study methods: active recall, spaced review, past papers and a mistake log.",
    description: [
      "Re-reading and highlighting feel productive, but research on learning keeps pointing to a few habits that work far better: testing yourself, spacing reviews out, practising past papers and learning from mistakes. Every page in this planner is built around one of them.",
      "It's undated, so it works for any exam season, and you can print as many copies of each page as you need.",
    ],
    inside: [
      "A one-page guide to five study methods that work",
      "My Exams overview and a Topic Tracker with confidence lights",
      "Weekly Timetable and Daily Plan with focus-session tracker",
      "Brain Dump (active recall) and Spaced Review schedule",
      "Past Paper Tracker and Mistake Log",
      "Key Facts sheet, Wellbeing Tracker and Exam Day Checklist",
      "After the Exam reflection page",
      "Both A4 and US Letter versions",
    ],
    forWho: ["High-school and college students", "University students in exam season", "Parents helping a teenager plan revision"],
    addedOn: "2026-09-23",
    keywords: ["study", "exam", "revision", "planner", "student", "timetable", "school", "university", "printable", "study plan"],
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
    subtitle: "Trace, say and learn every letter from A to Z",
    category: "kids-learning",
    status: "available",
    price: priceForPages(30),
    pages: 30,
    format: "Printable PDF · A4 and US Letter versions included",
    author: "PageNook",
    cover: "/covers/abc-tracing-adventure.jpg",
    coverGradient: ["#3FB68B", "#9BD86B"],
    previews: [
      { src: "/previews/abc-grownups.jpg", alt: "Tips for grown-ups" },
      { src: "/previews/abc-stars.jpg", alt: "My ABC Stars progress chart" },
      { src: "/previews/abc-letter-a.jpg", alt: "The letter A page" },
      { src: "/previews/abc-letter-m.jpg", alt: "The letter M page" },
    ],
    summary:
      "26 letter pages for ages 3–5: a friendly picture and word for every letter, big and little letters to trace on handwriting lines, and a certificate at the end.",
    description: [
      "Each page starts with a picture to look at and a word to say out loud (A is for Alligator, B is for Bear), then gives little hands plenty of practice: a model letter, dotted letters to trace on proper handwriting lines, the word to trace, and a row to try alone.",
      "A progress chart with a star for every letter and an “ABC Champion” certificate make finishing the alphabet feel like a big win. Print it as often as you like at home.",
    ],
    inside: [
      "26 letter pages, each with big and little letters to trace",
      "A friendly picture and a word to trace for every letter",
      "Handwriting guide lines that teach letter size and position",
      "“My ABC Stars” progress chart",
      "“ABC Champion” certificate to fill in",
      "A page of simple tips for parents and teachers",
      "Both A4 and US Letter versions",
    ],
    forWho: ["Parents of preschoolers (ages 3–5)", "Nursery and kindergarten teachers", "Home-schooling families"],
    addedOn: "2026-09-23",
    keywords: ["kids", "abc", "alphabet", "tracing", "preschool", "kindergarten", "worksheet", "printable", "letters", "handwriting", "toddler", "parents"],
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
