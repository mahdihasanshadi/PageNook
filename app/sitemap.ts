import type { MetadataRoute } from "next";
import { categories, products, site } from "@/lib/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/shelves", "/free", "/about", "/contact", "/refunds", "/terms", "/privacy"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}` })),
    ...categories.map((c) => ({ url: `${site.url}/shelves/${c.slug}` })),
    ...products.map((p) => ({ url: `${site.url}/pdf/${p.slug}`, lastModified: p.addedOn })),
  ];
}
