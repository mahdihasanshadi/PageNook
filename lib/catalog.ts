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
    slug: "newborn-survival-planner",
    title: "The Newborn Survival Planner",
    subtitle: "Track feeds, sleep and diapers in the first 3 months",
    category: "parenting",
    status: "available",
    price: priceForPages(15),
    pages: 15,
    format: "Printable PDF · A4 and US Letter versions included",
    author: "PageNook",
    cover: "/covers/newborn-survival-planner.jpg",
    coverGradient: ["#22606C", "#3A8C9A"],
    previews: [
      { src: "/previews/newborn-survival-planner-1.jpg", alt: "Page 5 of The Newborn Survival Planner" },
      { src: "/previews/newborn-survival-planner-2.jpg", alt: "Page 6 of The Newborn Survival Planner" },
      { src: "/previews/newborn-survival-planner-3.jpg", alt: "Page 10 of The Newborn Survival Planner" },
      { src: "/previews/newborn-survival-planner-4.jpg", alt: "Page 12 of The Newborn Survival Planner" },
    ],
    summary: "15 undated, printable pages for the first three months: a 24-hour daily tracker, feeding, sleep and diaper logs, checkup notes, growth record, firsts and self-care.",
    description: [
      "The first weeks with a newborn are a blur of feeds, naps and diaper changes. This planner gives tired parents one calm place to jot it all down, so you can see patterns and answer your health provider's questions from notes instead of memory.",
      "Every page is undated, so you can print the daily tracker and logs as often as you need. It is a note-keeping tool, not medical advice, and it leaves room for you too, with self-care and support pages.",
    ],
    inside: [
      "A grown-ups page on how to use the logs, and why notes help at checkups",
      "Before Baby Comes checklist and an Important Contacts page",
      "24-Hour Daily Tracker with feeds, sleep and diapers on one page",
      "Separate Feeding, Sleep and Diaper Logs",
      "Appointments, immunization record and Questions for the Next Checkup",
      "Growth record and a Firsts & Milestones page",
      "Parent Self-Care tracker, People Who Can Help, and a notes page",
      "Both A4 and US Letter versions",
    ],
    forWho: [
      "New and expecting parents who want everything in one place",
      "Partners, grandparents and caregivers sharing baby duties",
      "A thoughtful baby shower or new-parent gift",
    ],
    addedOn: "2026-09-24",
    keywords: [
      "newborn planner",
      "baby tracker",
      "feeding log",
      "sleep log",
      "diaper log",
      "new parent",
      "baby printable",
      "newborn checklist",
      "breastfeeding log",
      "baby shower gift",
    ],
  },
  {
    slug: "potty-training-starter-kit",
    title: "Potty Training Starter Kit",
    subtitle: "A calm, gentle plan with charts your toddler will love",
    category: "parenting",
    status: "available",
    price: priceForPages(12),
    pages: 12,
    format: "Printable PDF · A4 and US Letter versions included",
    author: "PageNook",
    cover: "/covers/potty-training-starter-kit.jpg",
    coverGradient: ["#3F2F8A", "#6A55C2"],
    previews: [
      { src: "/previews/potty-training-starter-kit-1.jpg", alt: "Page 4 of Potty Training Starter Kit" },
      { src: "/previews/potty-training-starter-kit-2.jpg", alt: "Page 6 of Potty Training Starter Kit" },
      { src: "/previews/potty-training-starter-kit-3.jpg", alt: "Page 8 of Potty Training Starter Kit" },
      { src: "/previews/potty-training-starter-kit-4.jpg", alt: "Page 9 of Potty Training Starter Kit" },
    ],
    summary: "12 printable pages for a calm start to potty training: a grown-ups guide, a gentle step-by-step plan, a daily log, three sticker charts, a picture guide for kids and a certificate.",
    description: [
      "Potty training goes best when it's calm, positive and at your child's pace. This kit gives grown-ups the common signs a child may be ready, a gentle six-step plan with no deadlines, and calm responses to the usual hiccups.",
      "For little ones there are three colorful sticker charts, a My Potty Steps picture guide to hang by the potty, and a Potty Pro certificate to celebrate. Print the log and charts as often as you like.",
    ],
    inside: [
      "A grown-ups guide: common readiness signs and keys to a calm start",
      "Getting Ready page with a gear checklist, your family's potty words and plan",
      "A gentle six-step plan, with no promised timeline",
      "Daily Potty Log to spot your child's rhythm",
      "Three sticker charts: space, under the sea and a dino egg hunt",
      "My Potty Steps picture guide for kids",
      "Troubleshooting page and a gentle when-to-talk-to-your-doctor note",
      "Potty Pro certificate, in A4 and US Letter",
    ],
    forWho: [
      "Parents and caregivers starting potty training with a toddler",
      "Grandparents and childcare providers who want everyone on the same plan",
      "Families who want a gentle, pressure-free approach",
    ],
    addedOn: "2026-09-24",
    keywords: [
      "potty training",
      "toilet training",
      "potty chart",
      "sticker chart",
      "reward chart",
      "toddler printable",
      "potty training log",
      "potty certificate",
      "toddler",
      "parenting printable",
    ],
  },
  {
    slug: "baby-first-year-memory-book",
    title: "Baby's First Year Memory Book",
    subtitle: "A fill-in keepsake from birth to first birthday",
    category: "parenting",
    status: "available",
    price: priceForPages(23),
    pages: 23,
    format: "Printable PDF · A4 and US Letter versions included",
    author: "PageNook",
    cover: "/covers/baby-first-year-memory-book.jpg",
    coverGradient: ["#557A66", "#87AE96"],
    previews: [
      { src: "/previews/baby-first-year-memory-book-1.jpg", alt: "Page 3 of Baby's First Year Memory Book" },
      { src: "/previews/baby-first-year-memory-book-2.jpg", alt: "Page 5 of Baby's First Year Memory Book" },
      { src: "/previews/baby-first-year-memory-book-3.jpg", alt: "Page 7 of Baby's First Year Memory Book" },
      { src: "/previews/baby-first-year-memory-book-4.jpg", alt: "Page 19 of Baby's First Year Memory Book" },
    ],
    summary: "23 gentle fill-in keepsake pages: your baby's birth story, name and family tree, twelve monthly pages with photo boxes, all the firsts, the first birthday, and letters to read one day.",
    description: [
      "The first year goes by so fast, and the little moments are the easiest to forget. This memory book gives you a simple place for them: a photo box and a few prompts each month, so a few words at a time adds up to a keepsake.",
      "Soft, gender-neutral colors suit any baby, and every page leaves room for your family's own words, with Mom / Dad / ___ wherever names appear. Print on thick paper, add photos, and keep it in a binder.",
    ],
    inside: [
      "How-to page with printing, photo and writing tips",
      "All About My Birth, My Name and a Welcome Home page",
      "A family tree page with room for siblings and special people",
      "12 month pages, each with a photo box, measurements, favorites, funny moments and a family note",
      "My Firsts: smile, laugh, roll, tooth, food, crawl, word and steps",
      "First Holidays & Celebrations and My First Birthday",
      "Letters to You, plus a handprint and footprint page",
      "Both A4 and US Letter versions",
    ],
    forWho: [
      "New and expecting parents who want an easy baby book",
      "Grandparents and family members looking for a heartfelt gift",
      "Families who like to print, paste photos and write by hand",
    ],
    addedOn: "2026-09-24",
    keywords: [
      "baby memory book",
      "baby book",
      "first year",
      "baby keepsake",
      "baby milestones",
      "baby journal",
      "newborn gift",
      "baby shower gift",
      "monthly baby photos",
      "gender neutral baby book",
    ],
  },
  {
    slug: "numbers-tracing-1-20",
    title: "Numbers 1–20 Tracing & Counting",
    subtitle: "Count, trace and write every number from 1 to 20",
    category: "kids-learning",
    status: "available",
    price: priceForPages(25),
    pages: 25,
    format: "Printable PDF · A4 and US Letter versions included",
    author: "PageNook",
    cover: "/covers/numbers-tracing-1-20.jpg",
    coverGradient: ["#1F5C73", "#3FB68B"],
    previews: [
      { src: "/previews/numbers-tracing-1-20-1.jpg", alt: "Page 7 of Numbers 1–20 Tracing & Counting" },
      { src: "/previews/numbers-tracing-1-20-2.jpg", alt: "Page 18 of Numbers 1–20 Tracing & Counting" },
      { src: "/previews/numbers-tracing-1-20-3.jpg", alt: "Page 3 of Numbers 1–20 Tracing & Counting" },
      { src: "/previews/numbers-tracing-1-20-4.jpg", alt: "Page 25 of Numbers 1–20 Tracing & Counting" },
    ],
    summary: "Twenty cheerful pages to count pictures, trace numerals and number words, and practice with ten-frames and circle-the-group games, from 1 all the way to 20.",
    description: [
      "Each number gets its own page: the numeral big and bold, its word (\"seven\"), a picture with exactly that many things to count, two rows of numeral tracing, a word to trace and a quick mini activity. Pictures are set out in rows of five and groups of ten, so 11 to 20 show up as \"10 and 3 more\".",
      "A number line and counting chart, a progress stars page and a Counting Champion certificate round it off. It's a friendly companion to our ABC Tracing Adventure, with the same tracing lines and clear handwriting font.",
    ],
    inside: [
      "20 number pages, one for each number from 1 to 20",
      "Counting pictures with exactly the right number of objects, grouped in fives and tens",
      "Dotted numeral tracing rows plus a number word to trace",
      "Count-and-color ten-frames and circle-the-right-group activities",
      "Number line and 1–20 counting chart with words and dots",
      "Progress stars chart to color as each number is finished",
      "Counting Champion certificate",
      "Grown-ups page with simple tips for short, fun sessions",
    ],
    forWho: [
      "Preschool and kindergarten children, about ages 3 to 6",
      "Parents looking for quick, screen-free number practice at home",
      "Teachers and homeschoolers who want ready-to-print math centers",
    ],
    addedOn: "2026-09-24",
    keywords: [
      "number tracing",
      "counting worksheets",
      "numbers 1-20",
      "preschool math",
      "kindergarten printable",
      "ten frames",
      "number words",
      "handwriting practice",
      "homeschool",
      "early math",
    ],
  },
  {
    slug: "first-words-flashcards",
    title: "First Words Flashcards",
    subtitle: "60 picture word cards for toddlers, ages 1–4",
    category: "kids-learning",
    status: "available",
    price: priceForPages(14),
    pages: 14,
    format: "Printable PDF · A4 and US Letter versions included",
    author: "PageNook",
    cover: "/covers/first-words-flashcards.jpg",
    coverGradient: ["#F08A4B", "#D6456A"],
    previews: [
      { src: "/previews/first-words-flashcards-1.jpg", alt: "Page 4 of First Words Flashcards" },
      { src: "/previews/first-words-flashcards-2.jpg", alt: "Page 9 of First Words Flashcards" },
      { src: "/previews/first-words-flashcards-3.jpg", alt: "Page 3 of First Words Flashcards" },
      { src: "/previews/first-words-flashcards-4.jpg", alt: "Page 14 of First Words Flashcards" },
    ],
    summary: "60 bright picture cards with big, friendly words for little talkers, plus simple tips for grown-ups, 8 easy games and a Words I Know checklist.",
    description: [
      "Each card pairs one clear, colorful picture with one simple word in a large, easy-to-read font. There are 10 cards in each of six everyday themes: animals, food, around the house, clothes, things that go, and nature & weather. Every theme has its own border color, so sorting and tidying up is easy.",
      "Print, cut along the dashed lines and play. A grown-ups page explains how to point and name, keep it playful and follow your child's lead, and a page of 8 quick games keeps the cards fresh for months.",
    ],
    inside: [
      "60 picture word cards, 6 to a page with dashed cut lines",
      "10 cards in each of 6 themes, each with its own border color",
      "Large, friendly lowercase words in a clear handwriting-style font",
      "Grown-ups page: how to use the cards in 5 playful minutes",
      "8 simple flashcard games, from Show Me to Hide and Seek",
      "Words I Know checklist to tick off all 60 words",
    ],
    forWho: [
      "Toddlers and little ones learning their first words, about ages 1 to 4",
      "Parents, grandparents and caregivers who want simple screen-free play",
      "Preschool, daycare and early-years teachers",
    ],
    addedOn: "2026-09-24",
    keywords: [
      "flashcards",
      "first words",
      "toddler flashcards",
      "picture cards",
      "vocabulary cards",
      "early learning",
      "preschool printable",
      "baby first words",
      "language games",
      "printable cards",
    ],
  },
  {
    slug: "family-meal-planner",
    title: "Family Meal Planner",
    subtitle: "Plan the week's meals and shop just once",
    category: "home-life",
    status: "available",
    price: priceForPages(13),
    pages: 13,
    format: "Printable PDF · A4 and US Letter versions included",
    author: "PageNook",
    cover: "/covers/family-meal-planner.jpg",
    coverGradient: ["#2F5E4B", "#D0643A"],
    previews: [
      { src: "/previews/family-meal-planner-1.jpg", alt: "Page 3 of Family Meal Planner" },
      { src: "/previews/family-meal-planner-2.jpg", alt: "Page 4 of Family Meal Planner" },
      { src: "/previews/family-meal-planner-3.jpg", alt: "Page 9 of Family Meal Planner" },
      { src: "/previews/family-meal-planner-4.jpg", alt: "Page 7 of Family Meal Planner" },
    ],
    summary: "Undated printable pages to plan a week of family meals in about 15 minutes, shop from one aisle-sorted list, and keep favorite recipes and the food budget in one place.",
    description: [
      "Answer \"what's for dinner?\" before anyone asks. Plan breakfast, lunch, dinner and snacks for the week, write one grocery list sorted by aisle, and check the pantry and freezer first so you use what you already have.",
      "Recipe cards, a family favorites index, a theme-night rotation, a leftovers and batch-cooking plan and a monthly meal-budget tracker keep everything together, plus 50 easy kid-friendly meal ideas for the weeks when inspiration runs out.",
    ],
    inside: [
      "How-to page: plan in 15 minutes a week, theme nights, cook once eat twice, getting kids involved",
      "Weekly meal plan for breakfast, lunch, dinner and snacks, with prep and notes",
      "Grocery list organized into 12 aisles",
      "Pantry and freezer inventory",
      "Family favorites recipe index and 8 fill-in recipe cards",
      "50 easy kid-friendly meal ideas to tick off as you try them",
      "Theme night rotation, leftovers and batch-cooking plan",
      "Monthly meal-budget tracker and a notes page",
    ],
    forWho: [
      "Busy parents who want fewer last-minute dinner decisions",
      "Families trying to shop once a week and use up what's in the fridge",
      "Anyone who likes to plan meals on paper and keep recipes in one folder",
    ],
    addedOn: "2026-09-24",
    keywords: [
      "meal planner",
      "family meal plan",
      "weekly menu",
      "grocery list",
      "printable planner",
      "recipe cards",
      "pantry inventory",
      "meal ideas for kids",
      "food budget",
      "batch cooking",
      "home organization",
    ],
  },
  {
    slug: "calm-mornings-bedtimes",
    title: "Calm Mornings & Bedtimes",
    subtitle: "Picture routine charts and cards for ages 2–6",
    category: "parenting",
    status: "available",
    price: priceForPages(13),
    pages: 13,
    format: "Printable PDF · A4 and US Letter versions included",
    author: "PageNook",
    cover: "/covers/calm-mornings-bedtimes.jpg",
    coverGradient: ["#F6B26B", "#6A6FB3"],
    previews: [
      { src: "/previews/calm-mornings-bedtimes-1.jpg", alt: "Page 4 of Calm Mornings & Bedtimes" },
      { src: "/previews/calm-mornings-bedtimes-2.jpg", alt: "Page 7 of Calm Mornings & Bedtimes" },
      { src: "/previews/calm-mornings-bedtimes-3.jpg", alt: "Page 11 of Calm Mornings & Bedtimes" },
      { src: "/previews/calm-mornings-bedtimes-4.jpg", alt: "Page 12 of Calm Mornings & Bedtimes" },
    ],
    summary: "Picture routine charts and 36 cut-out cards that show toddlers and preschoolers what comes next, for smoother mornings and calmer bedtimes.",
    description: [
      "Little ones can't read a clock or a to-do list, but they can follow pictures. This printable set turns your morning and bedtime routines into simple picture steps your child can see, follow and tick off, so the chart does the reminding instead of you.",
      "Use the ready-made morning and bedtime charts, or cut out the picture cards and build a routine that fits your family. A grown-ups guide, a First / Then board, a weekly star chart and practical tips for tricky transitions are all included.",
    ],
    inside: [
      "A grown-ups guide: why picture routines help and how to set them up",
      "Our Routine Plan page to choose steps and timings",
      "Ready-made morning and bedtime charts with weekly tick boxes",
      "Make My Routine page to build your own picture chart",
      "36 color-coded picture cards (morning, bedtime, any time) with cut lines",
      "12 blank cards to draw your own steps",
      "My Star Week sticker chart and a First / Then board",
      "10 tips for smooth transitions",
    ],
    forWho: [
      "Parents and caregivers of toddlers and preschoolers (ages 2–6)",
      "Families facing daily battles over getting dressed, leaving the house or going to bed",
      "Childminders and preschool teachers who use visual schedules",
    ],
    addedOn: "2026-09-24",
    keywords: [
      "visual routine chart",
      "toddler routine",
      "bedtime routine chart",
      "morning routine chart",
      "picture schedule",
      "preschool printable",
      "routine cards",
      "first then board",
      "sticker chart",
      "parenting printable",
    ],
  },
  {
    slug: "big-feelings-toolkit",
    title: "The Big Feelings Toolkit",
    subtitle: "Emotion coaching printables for ages 2–7",
    category: "parenting",
    status: "available",
    price: priceForPages(14),
    pages: 14,
    format: "Printable PDF · A4 and US Letter versions included",
    author: "PageNook",
    cover: "/covers/big-feelings-toolkit.jpg",
    coverGradient: ["#8E7CC3", "#F29A7E"],
    previews: [
      { src: "/previews/big-feelings-toolkit-1.jpg", alt: "Page 4 of The Big Feelings Toolkit" },
      { src: "/previews/big-feelings-toolkit-2.jpg", alt: "Page 5 of The Big Feelings Toolkit" },
      { src: "/previews/big-feelings-toolkit-3.jpg", alt: "Page 6 of The Big Feelings Toolkit" },
      { src: "/previews/big-feelings-toolkit-4.jpg", alt: "Page 9 of The Big Feelings Toolkit" },
    ],
    summary: "A feelings chart, feelings thermometer, 12 calm-down cards and gentle words for meltdowns, to help young children understand big emotions and find their calm.",
    description: [
      "Big feelings are a normal part of growing up, and little ones learn to handle them with our help. This toolkit gives you simple, warm tools for every stage: naming a feeling, noticing how big it is, calming down, and talking it through once the storm has passed.",
      "Start with the plain-language grown-ups guide to emotion coaching, then print the kid-friendly pages: a 16-face feelings chart, a 1–5 feelings thermometer, calm-down cards, a calm corner sign, a daily check-in and more.",
    ],
    inside: [
      "Grown-ups guide to emotion coaching in five simple steps",
      "Feelings chart with 16 faces and words",
      "\"How Big Is My Feeling?\" thermometer with body clues",
      "12 calm-down cards with cut lines, from balloon breathing to wall push",
      "Calm Corner sign to print and hang",
      "What to Say in the Storm scripts and an After the Storm repair page",
      "Daily feelings check-in, My Calm Plan and Draw the Feeling pages",
      "Feelings game cards with three easy games",
    ],
    forWho: [
      "Parents and caregivers of children aged 2–7",
      "Families working through tantrums, meltdowns and big emotions",
      "Preschool and early-years teachers setting up a calm corner",
    ],
    addedOn: "2026-09-24",
    keywords: [
      "feelings chart",
      "emotion coaching",
      "calm down cards",
      "calm corner",
      "toddler tantrums",
      "feelings thermometer",
      "social emotional learning",
      "big feelings",
      "preschool printable",
      "parenting printable",
    ],
  },
  {
    slug: "say-this-not-that",
    title: "Say This, Not That",
    subtitle: "50 phrase swaps for calmer, positive discipline",
    category: "parenting",
    status: "available",
    price: priceForPages(14),
    pages: 14,
    format: "Printable PDF · A4 and US Letter versions included",
    author: "PageNook",
    cover: "/covers/say-this-not-that.jpg",
    coverGradient: ["#2E8C82", "#F0B07E"],
    previews: [
      { src: "/previews/say-this-not-that-1.jpg", alt: "Page 2 of Say This, Not That" },
      { src: "/previews/say-this-not-that-2.jpg", alt: "Page 3 of Say This, Not That" },
      { src: "/previews/say-this-not-that-3.jpg", alt: "Page 6 of Say This, Not That" },
      { src: "/previews/say-this-not-that-4.jpg", alt: "Page 13 of Say This, Not That" },
    ],
    summary: "50 everyday phrase swaps for calmer, kinder parenting, each with what to say instead and why it works, plus a Top 10 cheat sheet for the fridge.",
    description: [
      "The words that slip out in busy moments (\"Hurry up!\", \"Stop crying!\", \"Because I said so!\") often make things harder. This guide gives you 50 simple swaps for the situations that come up every day, each with a one-line reason it works.",
      "Swaps are grouped by situation, from getting out the door to bedtime, screens and siblings, and built on five ideas: connection before correction, being specific, offering choices, naming feelings and setting limits kindly.",
    ],
    inside: [
      "The five ideas behind positive discipline, in plain language",
      "50 numbered swaps: Instead of…, Try… and Why it works",
      "10 situations: out the door, mealtimes, siblings, tantrums, bedtime and more",
      "Praise that encourages effort and is specific",
      "Kind, firm words for safety and limits",
      "Top 10 for the Fridge cheat sheet",
      "My Own Swaps page to write your own",
    ],
    forWho: [
      "Parents and caregivers of toddlers and school-age children",
      "Anyone who wants to yell less and connect more",
      "Teachers and childcare staff looking for positive language",
    ],
    addedOn: "2026-09-24",
    keywords: [
      "positive discipline",
      "gentle parenting",
      "positive parenting phrases",
      "what to say to kids",
      "calm parenting",
      "parenting cheat sheet",
      "toddler discipline",
      "tantrums",
      "praise effort",
      "parenting printable",
    ],
  },
  {
    slug: "screen-free-activities",
    title: "100 Screen-Free Activities for Ages 2–6",
    subtitle: "Cut-out activity cards for little ones, from things at home",
    category: "parenting",
    status: "available",
    price: priceForPages(23),
    pages: 23,
    format: "Printable PDF · A4 and US Letter versions included",
    author: "PageNook",
    cover: "/covers/screen-free-activities.jpg",
    coverGradient: ["#FF8A5B", "#F2587A"],
    previews: [
      { src: "/previews/screen-free-activities-1.jpg", alt: "Page 4 of 100 Screen-Free Activities for Ages 2–6" },
      { src: "/previews/screen-free-activities-2.jpg", alt: "Page 16 of 100 Screen-Free Activities for Ages 2–6" },
      { src: "/previews/screen-free-activities-3.jpg", alt: "Page 3 of 100 Screen-Free Activities for Ages 2–6" },
      { src: "/previews/screen-free-activities-4.jpg", alt: "Page 23 of 100 Screen-Free Activities for Ages 2–6" },
    ],
    summary: "100 simple, low-cost activity cards for ages 2 to 6, sorted into six themes. Print, cut, drop them in a jar and pull one out whenever someone says “I'm bored!”",
    description: [
      "Rainy afternoon? Dinner on the stove? Pull a card from the jar. Each of the 100 activities uses things most homes already have, like socks, cushions, cardboard boxes, crayons and pots and pans, and takes about 5 to 30 minutes.",
      "Every card shows a friendly picture, what you need, how to play in one or two short sentences, an age range and a rough time. Activities that need extra care carry a short safety note, and the grown-ups page covers supervision and choking hazards for under-3s.",
    ],
    inside: [
      "100 activity cards, 6 to a page, with dashed cut lines",
      "Six themes: Quiet Time, Wiggle Time, Outside Fun, Arts & Crafts, Kitchen Helpers, Learning Through Play",
      "Each card: picture, “You need”, “How”, ages and time, plus a “Tried it!” box",
      "One-page index of all 100 activities with tick boxes",
      "Grown-ups page: activity jar tips, rotating cards and safety notes",
      "Blank cards for your family's own ideas",
      "Printable Activity Jar labels, one big and six themed",
    ],
    forWho: [
      "Parents and carers of toddlers and preschoolers",
      "Grandparents, babysitters and nannies who want ready-made ideas",
      "Preschool and daycare teachers building a play corner",
    ],
    addedOn: "2026-09-24",
    keywords: [
      "screen-free activities",
      "toddler activities",
      "preschool activities",
      "activity jar",
      "boredom busters",
      "kids activity cards",
      "rainy day ideas",
      "indoor activities for kids",
      "printable for kids",
      "ages 2-6",
    ],
  },
  {
    slug: "family-screen-time-plan",
    title: "Our Family Screen-Time Plan",
    subtitle: "Agree on screens together, then fill the day with play",
    category: "parenting",
    status: "available",
    price: priceForPages(12),
    pages: 12,
    format: "Printable PDF · A4 and US Letter versions included",
    author: "PageNook",
    cover: "/covers/family-screen-time-plan.jpg",
    coverGradient: ["#2FA89A", "#1F6F7A"],
    previews: [
      { src: "/previews/family-screen-time-plan-1.jpg", alt: "Page 3 of Our Family Screen-Time Plan" },
      { src: "/previews/family-screen-time-plan-2.jpg", alt: "Page 9 of Our Family Screen-Time Plan" },
      { src: "/previews/family-screen-time-plan-3.jpg", alt: "Page 7 of Our Family Screen-Time Plan" },
      { src: "/previews/family-screen-time-plan-4.jpg", alt: "Page 5 of Our Family Screen-Time Plan" },
    ],
    summary: "A printable family media plan: an agreement everyone signs, screen-free zones and times, a weekly tracker, a kids' checklist, 40 screen-free ideas and dinner conversation cards.",
    description: [
      "This plan isn't about banning screens. It helps your family decide together when, where and how screens are used, so there's still plenty of time for sleep, play, being outside and each other.",
      "A short grown-ups page sums up widely shared guidance from health organizations such as the WHO and the American Academy of Pediatrics. The rest is hands-on: promises for kids and grown-ups, a plan for each child, trackers, a fridge checklist and cut-out cards that make screen-free dinners easy.",
    ],
    inside: [
      "Grown-ups page with general guidance and everyday habits",
      "Family media agreement with kids' and grown-ups' promises and signature lines",
      "Plan for each child: limits, places, approved shows and apps",
      "Screen-free zones and times planner",
      "Weekly screen-time tracker plus a screen-free wins tracker",
      "“Before screens” checklist for kids",
      "40 things to do instead of screens",
      "24 cut-out dinner conversation cards, a monthly check-in and optional screen-time tickets",
    ],
    forWho: [
      "Parents who want calmer, clearer rules about screens at home",
      "Families with kids of different ages who need one shared plan",
      "Carers and teachers starting a conversation about healthy screen habits",
    ],
    addedOn: "2026-09-24",
    keywords: [
      "screen time",
      "family media plan",
      "screen time rules",
      "media agreement",
      "screen-free activities",
      "digital wellbeing",
      "parenting printable",
      "dinner conversation cards",
      "screen time tracker",
      "healthy habits for kids",
    ],
  },
  {
    slug: "chores-rewards-by-age",
    title: "Chores & Rewards by Age (3–12)",
    subtitle: "Age-right chore lists, charts and simple rewards",
    category: "parenting",
    status: "available",
    price: priceForPages(13),
    pages: 13,
    format: "Printable PDF · A4 and US Letter versions included",
    author: "PageNook",
    cover: "/covers/chores-rewards-by-age.jpg",
    coverGradient: ["#8C6CE6", "#5446C9"],
    previews: [
      { src: "/previews/chores-rewards-by-age-1.jpg", alt: "Page 3 of Chores & Rewards by Age (3–12)" },
      { src: "/previews/chores-rewards-by-age-2.jpg", alt: "Page 6 of Chores & Rewards by Age (3–12)" },
      { src: "/previews/chores-rewards-by-age-3.jpg", alt: "Page 10 of Chores & Rewards by Age (3–12)" },
      { src: "/previews/chores-rewards-by-age-4.jpg", alt: "Page 11 of Chores & Rewards by Age (3–12)" },
    ],
    summary: "Realistic chore lists for ages 3–4, 5–6, 7–9 and 10–12, with charts, a family rota, a 30-star reward chart, a free-reward menu and a Super Helper certificate.",
    description: [
      "Not sure what your child can really do around the house? Each age group gets 12 realistic chores with a picture, a short tip and “Learning” / “I can do it!” tick boxes, so kids can see themselves grow.",
      "A friendly grown-ups guide shows how to teach any chore in four steps (show, do together, watch, let them fly), why praising effort matters and how to keep rewards simple. Charts, a family rota and a reward menu of free and low-cost treats make it easy to keep going.",
    ],
    inside: [
      "Grown-ups guide: why chores help, 4 steps to teach a chore, safety notes",
      "Chore lists for ages 3–4, 5–6, 7–9 and 10–12, with pictures and tips",
      "Picture helper chart for little ones",
      "Weekly chore chart to fill in for each child",
      "Family chore rota for the whole household",
      "30-star reward chart and a reward menu of free and cheap ideas",
      "Optional pocket-money tracker with spend, save and share jars",
      "Super Helper certificate",
    ],
    forWho: [
      "Parents who want kids to help at home without daily battles",
      "Families with several children of different ages",
      "Carers and teachers teaching responsibility and life skills",
    ],
    addedOn: "2026-09-24",
    keywords: [
      "chore chart",
      "chores by age",
      "age appropriate chores",
      "reward chart",
      "kids responsibilities",
      "family chore rota",
      "sticker chart",
      "pocket money tracker",
      "parenting printable",
      "life skills for kids",
    ],
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
