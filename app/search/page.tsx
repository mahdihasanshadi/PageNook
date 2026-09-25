import { permanentRedirect } from "next/navigation";

// Search now lives in the explorer on the Shelves page.
export default async function SearchPage(props: PageProps<"/search">) {
  const sp = await props.searchParams;
  const q = (Array.isArray(sp.q) ? sp.q[0] : sp.q ?? "").trim().slice(0, 100);
  permanentRedirect(q ? `/shelves?q=${encodeURIComponent(q)}#browse` : "/shelves#browse");
}
