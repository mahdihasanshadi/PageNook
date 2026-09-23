"""Add finished PDFs to the store from their listing.json.

For each slug: renders the cover and preview images into public/, copies the
PDFs into READY-TO-UPLOAD, and inserts a product entry into lib/catalog.ts
(before the "thesis-to-journal-paper" entry). Skips slugs already listed.

Usage: python add_listing.py <slug> [<slug> ...]
"""
import json
import shutil
import sys
from pathlib import Path

import pypdfium2 as pdfium

PDFS = Path(__file__).resolve().parent
ROOT = PDFS.parent
PUBLIC = ROOT / "public"
CATALOG = ROOT / "lib" / "catalog.ts"
READY = PDFS / "READY-TO-UPLOAD"
ANCHOR = '  {\n    slug: "thesis-to-journal-paper",'


def ts(value, indent=6):
    """Render a JSON-like value as a TypeScript literal."""
    if isinstance(value, list):
        pad = " " * indent
        inner = ",\n".join(pad + ts(v, indent + 2) for v in value)
        return "[\n" + inner + ",\n" + " " * (indent - 2) + "]"
    return json.dumps(value, ensure_ascii=False)


def add(slug: str) -> str:
    folder = PDFS / slug
    info = json.loads((folder / "listing.json").read_text(encoding="utf-8"))
    assert info["slug"] == slug, f"{slug}: listing slug mismatch"
    a4 = folder / f"{slug}-a4.pdf"
    letter = folder / f"{slug}-letter.pdf"
    doc = pdfium.PdfDocument(str(a4))

    doc[0].render(scale=1.3).to_pil().convert("RGB").save(PUBLIC / "covers" / f"{slug}.jpg", quality=86)
    previews = []
    for n, idx in enumerate(info["previewPages"], start=1):
        name = f"{slug}-{n}.jpg"
        doc[idx].render(scale=1.1).to_pil().convert("RGB").save(PUBLIC / "previews" / name, quality=82)
        previews.append({"src": f"/previews/{name}", "alt": f"Page {idx + 1} of {info['title']}"})

    READY.mkdir(exist_ok=True)
    shutil.copy(a4, READY / f"{info['title']} (A4).pdf")
    shutil.copy(letter, READY / f"{info['title']} (US Letter).pdf")

    preview_ts = "\n".join(f'      {{ src: "{p["src"]}", alt: {json.dumps(p["alt"], ensure_ascii=False)} }},' for p in previews)
    return f"""  {{
    slug: "{slug}",
    title: {ts(info["title"])},
    subtitle: {ts(info["subtitle"])},
    category: "{info["category"]}",
    status: "available",
    price: priceForPages({int(info["pages"])}),
    pages: {int(info["pages"])},
    format: {ts(info["format"])},
    author: "PageNook",
    cover: "/covers/{slug}.jpg",
    coverGradient: [{ts(info["coverGradient"][0])}, {ts(info["coverGradient"][1])}],
    previews: [
{preview_ts}
    ],
    summary: {ts(info["summary"])},
    description: {ts(info["description"])},
    inside: {ts(info["inside"])},
    forWho: {ts(info["forWho"])},
    addedOn: "2026-09-24",
    keywords: {ts(info["keywords"])},
  }},
"""


def main(slugs):
    catalog = CATALOG.read_text(encoding="utf-8")
    assert ANCHOR in catalog, "catalog anchor not found"
    for slug in slugs:
        if f'slug: "{slug}"' in catalog:
            print("already listed:", slug)
            continue
        entry = add(slug)
        catalog = catalog.replace(ANCHOR, entry + ANCHOR)
        print("listed:", slug)
    CATALOG.write_text(catalog, encoding="utf-8")


if __name__ == "__main__":
    main(sys.argv[1:])
