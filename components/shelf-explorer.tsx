"use client";

import { useMemo, useState } from "react";
import { categories, products, type CategorySlug } from "@/lib/catalog";
import { ProductCard } from "./cards";
import { CategoryGlyph, SearchIcon } from "./icons";

type Sort = "featured" | "newest" | "price-low" | "pages";
type Kind = "all" | "pdf" | "bundle";

const forSale = products.filter((p) => p.status === "available");

function matches(q: string, text: string) {
  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  const hay = text.toLowerCase();
  return words.every((w) => hay.includes(w));
}

export function ShelfExplorer({ initialQuery = "", initialShelf = "all", initialKind = "all" }: {
  initialQuery?: string;
  initialShelf?: CategorySlug | "all";
  initialKind?: Kind;
}) {
  const [q, setQ] = useState(initialQuery);
  const [shelf, setShelf] = useState<CategorySlug | "all">(initialShelf);
  const [kind, setKind] = useState<Kind>(initialKind);
  const [sort, setSort] = useState<Sort>("featured");

  const results = useMemo(() => {
    const list = forSale.filter((p) => {
      if (shelf !== "all" && p.category !== shelf) return false;
      if (kind === "pdf" && p.bundle) return false;
      if (kind === "bundle" && !p.bundle) return false;
      if (!q.trim()) return true;
      const cat = categories.find((c) => c.slug === p.category)?.name ?? "";
      return matches(q, [p.title, p.subtitle, p.summary, cat, ...p.keywords, ...p.inside].join(" "));
    });
    const sorted = [...list];
    if (sort === "newest") sorted.sort((a, b) => b.addedOn.localeCompare(a.addedOn));
    if (sort === "price-low") sorted.sort((a, b) => a.price - b.price);
    if (sort === "pages") sorted.sort((a, b) => (b.pages ?? 0) - (a.pages ?? 0));
    if (sort === "featured") sorted.sort((a, b) => Number(Boolean(b.bundle)) - Number(Boolean(a.bundle)));
    return sorted;
  }, [q, shelf, kind, sort]);

  const count = (slug: CategorySlug) => forSale.filter((p) => p.category === slug).length;
  const clear = () => {
    setQ("");
    setShelf("all");
    setKind("all");
  };

  return (
    <div className="explorer">
      <div className="explorer-bar">
        <label className="explorer-search">
          <SearchIcon size={20} />
          <span className="sr-only">Search all PDFs</span>
          <input
            id="explorer-q"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search: potty, tracing, budget, interview…"
            autoComplete="off"
          />
        </label>
        <div className="explorer-controls">
          <div className="seg" role="group" aria-label="Type">
            {(["all", "pdf", "bundle"] as Kind[]).map((k) => (
              <button key={k} type="button" aria-pressed={kind === k} onClick={() => setKind(k)}>
                {k === "all" ? "All" : k === "pdf" ? "Single PDFs" : "Bundles"}
              </button>
            ))}
          </div>
          <label className="sort">
            <span>Sort</span>
            <select id="explorer-sort" value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: low to high</option>
              <option value="pages">Most pages</option>
            </select>
          </label>
        </div>
      </div>

      <div className="chips" role="group" aria-label="Shelf">
        <button type="button" className="chip" aria-pressed={shelf === "all"} onClick={() => setShelf("all")}>
          All shelves <span>{forSale.length}</span>
        </button>
        {categories.filter((c) => count(c.slug) > 0).map((c) => (
          <button key={c.slug} type="button" className="chip" aria-pressed={shelf === c.slug} onClick={() => setShelf(c.slug)} style={{ ["--chip" as string]: c.color }}>
            <CategoryGlyph category={c} size={18} /> {c.name} <span>{count(c.slug)}</span>
          </button>
        ))}
      </div>

      <p className="explorer-count" aria-live="polite">
        {results.length} {results.length === 1 ? "result" : "results"}
        {(q || shelf !== "all" || kind !== "all") && (
          <button type="button" className="linkish" onClick={clear}>Clear filters</button>
        )}
      </p>

      {results.length > 0 ? (
        <div className="products">{results.map((p) => <ProductCard key={p.slug} product={p} />)}</div>
      ) : (
        <div className="empty">
          <h3>Nothing matches that yet</h3>
          <p>Try a different word or another shelf. New PDFs arrive regularly.</p>
          <button type="button" className="btn btn-primary" onClick={clear}>Show everything</button>
        </div>
      )}
    </div>
  );
}
