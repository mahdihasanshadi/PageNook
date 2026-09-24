"""Smoke-test a running PageNook site: every page, cover, preview and free sample must return 200.

Run from the repo root with the site running: python scripts/check_site.py [base_url]
"""
import json
import subprocess
import sys
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3100"

data = json.loads(subprocess.run(["node", "scripts/export-catalog.ts"], cwd=ROOT, capture_output=True,
                                 text=True, encoding="utf-8", check=True).stdout)
urls = ["/", "/shelves", "/free", "/about", "/contact", "/refunds", "/terms", "/privacy", "/search?q=summer",
        "/sitemap.xml", "/robots.txt", "/api/health"]
urls += [f"/shelves/{c['slug']}" for c in data["categories"]]
for p in data["products"]:
    urls.append(f"/pdf/{p['slug']}")
    urls += [u for u in [p.get("cover"), p.get("freeSample")] if u]
    urls += [x["src"] for x in (p.get("previews") or [])]

bad = []
for u in urls:
    try:
        status = urllib.request.urlopen(BASE + urllib.parse.quote(u, safe="/?=&"), timeout=180).status
    except Exception as e:  # noqa: BLE001 - report every failure
        status = str(e)
    if status != 200:
        bad.append((u, status))

live = [p for p in data["products"] if p["status"] == "available"]
print(f"{len(urls)} URLs checked; {len(live)} for sale "
      f"({len([p for p in live if not p.get('bundle')])} PDFs + {len([p for p in live if p.get('bundle')])} bundles)")
print("problems:", bad or "none")
sys.exit(1 if bad else 0)
