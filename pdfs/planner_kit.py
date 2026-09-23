"""Shared building blocks for PageNook printable planners (A4 + US Letter)."""
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from build import render  # noqa: E402

LOGO = ('<svg width="{s}" height="{s}" viewBox="0 0 64 64"><path d="M8 30 L32 9 L56 30" fill="none" stroke="{roof}" '
        'stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M13 34 Q22 30 31 35 L31 55 Q22 50 13 54 Z" '
        'fill="#F5B82E"/><path d="M51 34 Q42 30 33 35 L33 55 Q42 50 51 54 Z" fill="#F26B5B"/></svg>')

SIZES = [("a4", "A4", "210mm", "297mm"), ("letter", "Letter", "8.5in", "11in")]

BASE_CSS = """
@page { size: %(size)s; margin: 0; }
* { box-sizing: border-box; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { margin: 0; font-family: "Nunito Sans", "Segoe UI", sans-serif; color: #1E2145; font-size: 9.5pt; }
.page { width: %(w)s; height: %(h)s; padding: 13mm 13mm 11mm; break-after: page; display: flex; flex-direction: column; gap: 4mm; overflow: hidden; }
.page:last-child { break-after: auto; }
h1, h2, h3 { font-family: "Gabarito", sans-serif; margin: 0; line-height: 1.1; color: var(--ink2); }
.ph { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 0.7mm solid var(--accent); padding-bottom: 2.5mm; }
.ph h1 { font-size: 22pt; font-weight: 800; }
.ph .meta { display: flex; gap: 6mm; font: 700 9pt "Gabarito", sans-serif; color: #5C6080; }
.ph .meta span { min-width: 30mm; border-bottom: 0.3mm solid #9FA3C7; padding-bottom: 0.5mm; }
.sub { color: #5C6080; font-size: 9.5pt; margin: 0; }
h2 { font-size: 11.5pt; color: var(--ink2); margin-bottom: 1.5mm; }
.card { border: 0.35mm solid #D9DBEC; border-radius: 3.5mm; padding: 3.5mm 4mm; }
.tint { background: var(--tint); border-color: transparent; }
.grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 4mm; }
.grid3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4mm; }
.grow { flex: 1; display: flex; flex-direction: column; min-height: 0; }
.grow > table.form { height: 100%%; }
.fill { flex: 1; display: grid; grid-auto-rows: minmax(0, 1fr); gap: 4mm; min-height: 0; }
.fill > * { min-height: 0; overflow: hidden; }
.fill > .card { display: flex; flex-direction: column; }
.fill .card { display: flex; flex-direction: column; min-height: 0; }
.fill .lines { flex: 1; }
table.form { width: 100%%; border-collapse: collapse; table-layout: fixed; }
table.form th { font: 800 7.5pt "Gabarito", sans-serif; letter-spacing: .06em; text-transform: uppercase; color: #fff; background: var(--accent); padding: 1.8mm 2mm; text-align: left; }
table.form th:first-child { border-top-left-radius: 2mm; }
table.form th:last-child { border-top-right-radius: 2mm; }
table.form td { border-bottom: 0.3mm solid #D9DBEC; height: var(--row, 7.2mm); padding: 0 2mm; font-size: 8.5pt; color: #5C6080; }
table.form td + td { border-left: 0.3mm solid #EEF0F7; }
table.form tr:nth-child(even) td { background: #FAFAFD; }
table.form tr.total td { font: 800 8.5pt "Gabarito", sans-serif; color: var(--ink2); background: var(--tint); border-bottom: 0; }
.lines { flex: 1 1 0; height: 0; display: flex; flex-direction: column; overflow: hidden; min-height: 15mm; }
.lines i { flex: none; height: var(--lh, 7.5mm); border-bottom: 0.3mm solid #D9DBEC; }
.box { display: inline-block; width: 3.6mm; height: 3.6mm; border: 0.35mm solid var(--accent); border-radius: 0.8mm; vertical-align: middle; }
.checks { list-style: none; margin: 0; padding: 0; display: grid; gap: 2.2mm; }
.checks li { display: flex; gap: 2.5mm; align-items: center; border-bottom: 0.3mm solid #E6E8F2; padding-bottom: 1.8mm; }
.foot { margin-top: auto; display: flex; justify-content: space-between; font: 600 7pt "Gabarito", sans-serif; color: #A2A5C4; }
.foot b { color: var(--accent); }
.label { font: 800 7.5pt "Gabarito", sans-serif; letter-spacing: .06em; text-transform: uppercase; color: #5C6080; }
.field { border-bottom: 0.3mm solid #9FA3C7; height: 7mm; }

/* cover */
.cover { background: var(--cover); color: #fff; padding: 20mm 18mm 16mm; }
.cover .brand { font: 800 13pt "Gabarito", sans-serif; display: flex; align-items: center; gap: 2mm; }
.cover .brand b { color: #F26B5B; }
.cover .eyebrow { margin-top: 26mm; font: 800 10pt "Gabarito", sans-serif; letter-spacing: .16em; text-transform: uppercase; color: #F5B82E; }
.cover h1 { color: #fff; font-size: 46pt; font-weight: 800; margin-top: 4mm; letter-spacing: -.01em; }
.cover .lede { font-size: 15pt; color: rgba(255,255,255,.82); margin-top: 5mm; max-width: 130mm; line-height: 1.35; }
.cover .art { margin-top: auto; }
.cover .bottom { display: flex; justify-content: space-between; align-items: center; margin-top: 8mm; font: 700 10.5pt "Gabarito", sans-serif; color: rgba(255,255,255,.8); }
.cover .pill { background: #F5B82E; color: #1E2145; padding: 2mm 5mm; border-radius: 99px; }

/* info page */
.info { font-size: 10.5pt; line-height: 1.55; }
.info h1 { font-size: 24pt; }
.info h3 { font-size: 12.5pt; color: var(--ink2); margin: 3mm 0 1mm; }
.info p { margin: 0 0 2mm; }
.info ol, .info ul { margin: 0 0 2mm; padding-left: 6mm; }
.info li { margin-bottom: 1.4mm; }
.info .legal { margin-top: auto; font-size: 8pt; color: #8A8DAE; }
"""

FONTS = ('<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Gabarito:wght@600;700;800'
         '&family=Nunito+Sans:wght@400;600;700;800&family=Andika:wght@400;700&display=swap">')

# Twemoji illustrations (CC-BY 4.0). Every PDF that uses emoji() must print TWEMOJI_CREDIT.
TWEMOJI_DIR = Path(__file__).resolve().parent / "_twemoji"
TWEMOJI_CREDIT = ("Illustrations: Twemoji by Twitter, Inc. and other contributors, licensed under CC-BY 4.0 "
                  "(creativecommons.org/licenses/by/4.0).")


def emoji(ch: str) -> str:
    """Return a file:// URL for the Twemoji SVG of an emoji character, downloading it once."""
    import urllib.request

    code = "-".join(f"{ord(c):x}" for c in ch if ord(c) != 0xFE0F)
    TWEMOJI_DIR.mkdir(exist_ok=True)
    path = TWEMOJI_DIR / f"{code}.svg"
    if not path.exists():
        url = f"https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/svg/{code}.svg"
        with urllib.request.urlopen(url, timeout=30) as r:  # raises on 404 so a bad emoji fails loudly
            path.write_bytes(r.read())
    return path.as_uri()


def info_page(title: str, inner_html: str, legal: str = "") -> str:
    """A text page for grown-ups: intro, how to use, tips. `legal` goes at the bottom."""
    legal_html = f'<p class="legal">{legal}</p>' if legal else ""
    return f'<section class="page info"><h1>{title}</h1>{inner_html}{legal_html}</section>'


def cover_page(eyebrow: str, title_html: str, lede: str, art_html: str, pill: str, note: str) -> str:
    """Standard PageNook cover. Background comes from --cover in the theme CSS."""
    return f"""<section class="page cover">
  <div class="brand">{LOGO.format(s=20, roof="#fff")}<span>Page<b>Nook</b></span></div>
  <div class="eyebrow">{eyebrow}</div>
  <h1>{title_html}</h1>
  <p class="lede">{lede}</p>
  <div class="art">{art_html}</div>
  <div class="bottom"><span class="pill">{pill}</span><span>{note}</span></div>
</section>"""


def rows(n, cols, total=None, widths=None):
    """An empty fill-in table: header labels, n blank rows, optional total row."""
    colgroup = ""
    if widths:
        colgroup = "<colgroup>" + "".join(f'<col style="width:{w}">' for w in widths) + "</colgroup>"
    head = "".join(f"<th>{c}</th>" for c in cols)
    body = "".join("<tr>" + "<td></td>" * len(cols) + "</tr>" for _ in range(n))
    if total:
        body += '<tr class="total"><td>' + total + "</td>" + "<td></td>" * (len(cols) - 1) + "</tr>"
    return f'<table class="form">{colgroup}<thead><tr>{head}</tr></thead><tbody>{body}</tbody></table>'


def page(title, body, product, meta=("Month", "Year"), sub=None):
    meta_html = "".join(f"<span>{m}</span>" for m in meta)
    sub_html = f'<p class="sub">{sub}</p>' if sub else ""
    return f"""<section class="page">
  <div class="ph"><h1>{title}</h1><div class="meta">{meta_html}</div></div>
  {sub_html}
  {body}
  <div class="foot"><span><b>PageNook</b> · {product}</span><span>pagenook.me</span></div>
</section>"""


def build(folder: Path, slug: str, title: str, pages_fn, theme_css: str):
    for key, size, w, h in SIZES:
        css = BASE_CSS % {"size": size, "w": w, "h": h} + theme_css
        # Real ruled lines print more reliably than a CSS gradient.
        body = re.sub(r'(<div class="lines[^"]*"[^>]*>)(</div>)', r"\1" + "<i></i>" * 45 + r"\2", pages_fn())
        html = (f'<!doctype html><html lang="en"><head><meta charset="utf-8"><title>{title}</title>{FONTS}'
                f"<style>{css}</style></head><body>{body}</body></html>")
        src = folder / f"book-{key}.html"
        src.write_text(html, encoding="utf-8")
        out = folder / f"{slug}-{key}.pdf"
        render(src, out)
        print("wrote", out.name)
