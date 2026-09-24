// Prints the catalog as JSON so Python tools (upload guide, marketing images) can use it.
// Run: node scripts/export-catalog.ts > catalog.json   (Node 23+ strips the types itself)
import { categories, products } from "../lib/catalog.ts";

console.log(JSON.stringify({ categories, products }, null, 2));
