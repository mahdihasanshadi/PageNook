import Link from "next/link";
import { CategoryCard, ProductCard } from "@/components/cards";
import { SearchIcon } from "@/components/icons";
import { SignupForm } from "@/components/signup-form";
import { categories, newestProducts, MIN_PRICE, formatPrice, productsIn } from "@/lib/catalog";

const spines = [
  { label: "Parents", href: "/shelves/parenting" },
  { label: "Kids", href: "/shelves/kids-learning" },
  { label: "Study", href: "/shelves/study-exams" },
  { label: "Home", href: "/shelves/home-life" },
  { label: "Tech", href: "/shelves/tech-coding" },
  { label: "Career", href: "/shelves/work-career" },
  { label: "Plan", href: "/shelves/planners-templates" },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <div>
            <span className="kicker">Your cozy corner for good PDFs</span>
            <h1>
              Pages <em>worth keeping.</em>
            </h1>
            <p className="lead">
              Gentle guides for parents, worksheets for little learners, playbooks for builders. Every PDF on PageNook is
              carefully made, clearly explained and ready to download the moment you buy.
            </p>
            <form className="search" action="/search" role="search">
              <label htmlFor="q" className="sr-only">Search PDFs</label>
              <input id="q" name="q" type="search" placeholder="Search worksheets, guides, planners…" />
              <button className="btn btn-sun" type="submit"><SearchIcon /> Search</button>
            </form>
            <div className="price-pill">PDFs from just <b>{formatPrice(MIN_PRICE)}</b></div>
            <div className="trust">
              <span>Instant download</span>
              <span>Secure checkout</span>
              <span>Print or read on any device</span>
            </div>
          </div>
          <div className="shelf-art">
            <div className="note"><b>Something for everyone</b>From bedtime routines to APIs.</div>
            <div className="books">
              {spines.map((s) => (
                <Link key={s.label} className="book" href={s.href} aria-label={`${s.label} shelf`}>{s.label}</Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="shelves">
        <div className="container">
          <div className="section-head">
            <h2>Browse the shelves</h2>
            <Link href="/shelves">All shelves →</Link>
          </div>
          <div className="cats">
            {categories.map((c) => <CategoryCard key={c.slug} category={c} />)}
          </div>
        </div>
      </section>

      <section className="section" id="parents">
        <div className="container">
          <div className="section-head">
            <h2>For parents</h2>
            <Link href="/shelves/parenting">All parenting PDFs →</Link>
          </div>
          <div className="products">
            {[...productsIn("parenting")].sort((x, y) => Number(Boolean(y.bundle)) - Number(Boolean(x.bundle))).slice(0, 6).map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        </div>
      </section>

      <section className="section" id="new">
        <div className="container">
          <div className="section-head">
            <h2>More from the nook</h2>
            <Link href="/shelves">Every PDF →</Link>
          </div>
          <div className="products">
            {newestProducts(20).filter((p) => p.category !== "parenting").slice(0, 6).map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        </div>
      </section>

      <section className="section" id="how">
        <div className="container">
          <div className="section-head"><h2>How it works</h2></div>
          <div className="how">
            <div><b>1</b><h3>Pick a PDF</h3><p>Browse the shelves and preview real pages before you buy.</p></div>
            <div><b>2</b><h3>Pay securely</h3><p>Check out by card or PayPal through our payment partner. We never see your card details.</p></div>
            <div><b>3</b><h3>Download instantly</h3><p>Your PDF arrives on screen and by email right away. Keep it forever.</p></div>
          </div>
        </div>
      </section>

      <section className="section" id="free">
        <div className="container">
          <div className="band">
            <div>
              <h2>Get a free PDF from the nook</h2>
              <p>
                Join the list and download a free PDF right away (a Big Feelings starter pack for parents, or a coding
                sample), plus a short note whenever a new PDF lands on the shelves.
              </p>
            </div>
            <SignupForm id="home" source="home" />
          </div>
        </div>
      </section>
    </>
  );
}
