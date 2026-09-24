"""Write pdfs/READY-TO-UPLOAD/UPLOAD-GUIDE.md: copy-paste details for every Lemon Squeezy product.

Run from the repo root: python scripts/upload_guide.py
"""
import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
READY = ROOT / "pdfs" / "READY-TO-UPLOAD"

data = json.loads(subprocess.run(["node", "scripts/export-catalog.ts"], cwd=ROOT, capture_output=True, text=True, encoding="utf-8", check=True).stdout)
cats = {c["slug"]: c["name"] for c in data["categories"]}
by_slug = {p["slug"]: p for p in data["products"]}
files = sorted(p.name for p in READY.glob("*.pdf"))

out = [
    "# Lemon Squeezy upload guide",
    "",
    "One section per product. In Lemon Squeezy: **Store → Products → New product**, then copy each field below.",
    "",
    "For every product:",
    "- **Pricing:** single payment, the price shown here, in USD.",
    "- **Files:** upload the file(s) listed. Printables have two files (A4 and US Letter), so upload both to the same product.",
    "- **Confirmation email / receipt:** leave on, so buyers get their download link by email.",
    "- After saving, click **Share** and copy the checkout link. Send all the links to Claude to connect the Buy buttons.",
    "",
    "| # | Product | Price | Checkout link (paste here) |",
    "|---|---|---|---|",
]
available = [p for p in data["products"] if p["status"] == "available"]
for i, p in enumerate(available, 1):
    out.append(f"| {i} | {p['title']} | ${p['price']:.2f} | |")
out.append("")

for i, p in enumerate(available, 1):
    titles = [by_slug[s]["title"] for s in p["bundle"]] if p.get("bundle") else [p["title"]]
    mine = [f for f in files for t in titles if f.startswith(t + " (") or f == t + ".pdf"]
    out += [
        "---",
        "",
        f"## {i}. {p['title']}",
        "",
        f"- **Name:** {p['title']}",
        f"- **Price:** ${p['price']:.2f}",
        f"- **Shelf on the site:** {cats[p['category']]}",
        f"- **Files to upload:** {', '.join(mine) if mine else 'MISSING, tell Claude'}",
        "",
        "**Description** (paste into the product description):",
        "",
        f"> {p['subtitle']}.",
        ">",
        f"> {p['summary']}",
        ">",
        "> **What's inside:**",
    ]
    out += [f"> - {item}" for item in p["inside"]]
    size = f"{p['pages']} pages · " if p.get("pages") else ""
    out += [">", f"> {size}{p['format']}", ""]

READY.mkdir(exist_ok=True)
(READY / "UPLOAD-GUIDE.md").write_text("\n".join(out) + "\n", encoding="utf-8")
missing = [p["title"] for p in available if not p.get("bundle") and not any(f.startswith(p["title"]) for f in files)]
print(f"{len(available)} products written; missing files: {missing or 'none'}")
