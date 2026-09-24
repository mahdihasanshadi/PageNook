"""Make a Pinterest pin (1000x1500) and a square post image (1080x1080) for every product.

Output: marketing/pins/<slug>.png and marketing/square/<slug>.png
Run from the repo root: python scripts/marketing_images.py [slug ...]
"""
import html
import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
OUT = ROOT / "marketing"
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

FONTS = ('<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Gabarito:wght@600;700;800'
         '&family=Nunito+Sans:wght@400;700;800&display=swap">')
LOGO = ('<svg width="44" height="44" viewBox="0 0 64 64"><path d="M8 30 L32 9 L56 30" fill="none" stroke="#2B2E6B" '
        'stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M13 34 Q22 30 31 35 L31 55 Q22 50 13 54 Z" '
        'fill="#F5B82E"/><path d="M51 34 Q42 30 33 35 L33 55 Q42 50 51 54 Z" fill="#F26B5B"/></svg>')


def uri(web_path: str) -> str:
    return (PUBLIC / web_path.lstrip("/")).resolve().as_uri()


def pin_html(p, cat):
    a, b = p["coverGradient"]
    pages = [uri(p["cover"])] + [uri(x["src"]) for x in (p.get("previews") or [])[:2]]
    stack = "".join(f'<img class="pg pg{i}" src="{src}">' for i, src in reversed(list(enumerate(pages))))
    bullets = "".join(f"<li>{html.escape(x)}</li>" for x in p["inside"][:4])
    return f"""<!doctype html><html><head><meta charset="utf-8">{FONTS}<style>
*{{box-sizing:border-box;margin:0}}
body{{width:1000px;height:1500px;font-family:"Nunito Sans",sans-serif;background:#F7F7FB;color:#1E2145;overflow:hidden}}
.top{{height:860px;background:linear-gradient(150deg,{a},{b});position:relative;padding:56px 60px}}
.tag{{display:inline-block;background:rgba(255,255,255,.2);color:#fff;font:800 26px Gabarito,sans-serif;letter-spacing:.06em;text-transform:uppercase;padding:10px 22px;border-radius:99px}}
.pg{{position:absolute;width:430px;border-radius:8px;box-shadow:0 30px 60px -20px rgba(0,0,0,.55)}}
.pg0{{left:285px;top:150px;z-index:3;width:470px}}
.pg1{{left:90px;top:230px;transform:rotate(-8deg);z-index:2}}
.pg2{{left:520px;top:230px;transform:rotate(8deg);z-index:1}}
.bottom{{padding:48px 60px 0}}
h1{{font:800 70px/1.02 Gabarito,sans-serif;letter-spacing:-.01em;color:#2B2E6B}}
.sub{{font-size:32px;color:#5C6080;margin-top:16px;line-height:1.3}}
ul{{margin-top:26px;padding:0;list-style:none;display:grid;gap:12px}}
li{{font-size:27px;padding-left:44px;position:relative;line-height:1.3}}
li:before{{content:"✓";position:absolute;left:0;top:-2px;width:32px;height:32px;border-radius:50%;background:#DDF3EA;color:#1f7a57;font-weight:800;display:grid;place-items:center;font-size:20px}}
.foot{{position:absolute;left:0;right:0;bottom:0;height:120px;background:#fff;border-top:2px solid #E3E4EF;display:flex;align-items:center;justify-content:space-between;padding:0 60px}}
.brand{{display:flex;align-items:center;gap:12px;font:800 38px Gabarito,sans-serif;color:#2B2E6B}}.brand b{{color:#F26B5B}}
.price{{font:800 44px Gabarito,sans-serif;background:#F5B82E;padding:8px 26px;border-radius:99px}}
.url{{font:700 28px Gabarito,sans-serif;color:#5C6080}}
</style></head><body>
<div class="top"><span class="tag">{html.escape(cat)} · Printable PDF</span>{stack}</div>
<div class="bottom"><h1>{html.escape(p["title"])}</h1><p class="sub">{html.escape(p["subtitle"])}</p><ul>{bullets}</ul></div>
<div class="foot"><div class="brand">{LOGO}<span>Page<b>Nook</b></span></div><span class="url">pagenook.me</span><span class="price">${p["price"]:.2f}</span></div>
</body></html>"""


def square_html(p, cat):
    a, b = p["coverGradient"]
    return f"""<!doctype html><html><head><meta charset="utf-8">{FONTS}<style>
*{{box-sizing:border-box;margin:0}}
body{{width:1080px;height:1080px;font-family:"Nunito Sans",sans-serif;background:linear-gradient(150deg,{a},{b});overflow:hidden;display:grid;grid-template-columns:1fr 1fr;align-items:center;padding:70px;gap:50px;color:#fff}}
img{{width:100%;border-radius:10px;box-shadow:0 30px 60px -18px rgba(0,0,0,.55);transform:rotate(-3deg)}}
.tag{{font:800 22px Gabarito,sans-serif;letter-spacing:.08em;text-transform:uppercase;opacity:.85}}
h1{{font:800 60px/1.03 Gabarito,sans-serif;margin-top:16px}}
p{{font-size:27px;margin-top:18px;opacity:.9;line-height:1.35}}
.row{{display:flex;align-items:center;gap:16px;margin-top:34px}}
.price{{font:800 36px Gabarito,sans-serif;background:#F5B82E;color:#1E2145;padding:6px 22px;border-radius:99px}}
.url{{font:700 24px Gabarito,sans-serif;opacity:.9}}
</style></head><body>
<img src="{uri(p["cover"])}">
<div><div class="tag">{html.escape(cat)}</div><h1>{html.escape(p["title"])}</h1><p>{html.escape(p["subtitle"])}</p>
<div class="row"><span class="price">${p["price"]:.2f}</span><span class="url">pagenook.me</span></div></div>
</body></html>"""


def shoot(page_html: str, width: int, height: int, out: Path, tmp: Path):
    tmp.write_text(page_html, encoding="utf-8")
    subprocess.run([CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars", f"--window-size={width},{height}",
                    "--virtual-time-budget=8000", f"--screenshot={out}", tmp.resolve().as_uri()], check=True, capture_output=True)


def main(only):
    data = json.loads(subprocess.run(["node", "scripts/export-catalog.ts"], cwd=ROOT, capture_output=True,
                                     text=True, encoding="utf-8", check=True).stdout)
    cats = {c["slug"]: c["name"] for c in data["categories"]}
    for d in ("pins", "square"):
        (OUT / d).mkdir(parents=True, exist_ok=True)
    tmp = OUT / "_tmp.html"
    for p in data["products"]:
        if p["status"] != "available" or not p.get("cover") or (only and p["slug"] not in only):
            continue
        shoot(pin_html(p, cats[p["category"]]), 1000, 1500, OUT / "pins" / f"{p['slug']}.png", tmp)
        shoot(square_html(p, cats[p["category"]]), 1080, 1080, OUT / "square" / f"{p['slug']}.png", tmp)
        print("made", p["slug"])
    tmp.unlink(missing_ok=True)


if __name__ == "__main__":
    main(set(sys.argv[1:]))
