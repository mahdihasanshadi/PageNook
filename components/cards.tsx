import Link from "next/link";
import { FEATURED_CATEGORY, formatPrice, getCategory, productsIn, type Category, type Product } from "@/lib/catalog";
import { CategoryIcon } from "./icons";

export function CategoryCard({ category }: { category: Category }) {
  const items = productsIn(category.slug);
  const ready = items.filter((p) => p.status === "available").length;
  const label =
    ready > 0 ? `${ready} PDF${ready > 1 ? "s" : ""} ready` : items.length > 0 ? "First PDF in the works" : "Coming soon";
  return (
    <Link className={`cat${category.slug === FEATURED_CATEGORY ? " featured" : ""}`} href={`/shelves/${category.slug}`}>
      <CategoryIcon category={category} />
      <div>
        <h3>
          {category.name}
          {category.slug === FEATURED_CATEGORY && <span className="featured-tag">Featured shelf</span>}
        </h3>
        <p>{category.blurb}</p>
        <span className="count">{label}</span>
      </div>
    </Link>
  );
}

export function Cover({ product }: { product: Product }) {
  const cat = getCategory(product.category);
  if (product.cover) {
    return (
      <div className="cover has-image">
        <span className="tag">{cat?.name}</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.cover} alt={`Cover of ${product.title}`} loading="lazy" />
      </div>
    );
  }
  const [a, b] = product.coverGradient;
  return (
    <div className="cover" style={{ background: `linear-gradient(135deg, ${a}, ${b})` }}>
      <span className="tag">{cat?.name}</span>
      <div>
        <h3>{product.title}</h3>
        <small>{product.subtitle}</small>
      </div>
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const ready = product.status === "available";
  return (
    <Link className="product" href={`/pdf/${product.slug}`}>
      <Cover product={product} />
      <div className="body">
        <h3>{product.title}</h3>
        <p>{product.summary}</p>
        <div className="foot">
          <span className="price">{formatPrice(product.price)}</span>
          <span className={`badge ${ready ? "badge-ready" : "badge-soon"}`}>{ready ? "Instant download" : "Coming soon"}</span>
        </div>
      </div>
    </Link>
  );
}
