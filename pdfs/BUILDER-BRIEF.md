# PageNook PDF builder brief

You are building printable PDF products for PageNook, a small digital store selling PDFs ($0.99) to international buyers, mostly parents. These are sold, so content must be genuinely useful, accurate, warm and well designed.

## Tools you must use
- Shared toolkit: `C:\Users\Sadi\OneDrive\Desktop\pagenook\pdfs\planner_kit.py`. Read it fully first. It gives:
  - `build(folder, slug, title, pages_fn, theme_css)`: renders A4 AND US Letter PDFs (`<slug>-a4.pdf`, `<slug>-letter.pdf`) via headless Chrome.
  - `page(title, body, product, meta=..., sub=...)`: a standard page with header and footer.
  - `rows(...)`: fill-in tables.
  - `cover_page(...)` and `info_page(...)`.
  - `emoji("🦊")`: file:// URL of a Twemoji SVG. It downloads the file, and raises on a bad emoji, so pick another.
  - `TWEMOJI_CREDIT`: must appear on the info page of any PDF that uses `emoji()`.
  - CSS classes documented in `BASE_CSS`. `.lines` blocks are auto-filled with real ruled lines at build time. FONTS includes Gabarito, Nunito Sans and Andika (a friendly letter font for kids' tracing).
- Study these finished products and match their quality and structure:
  - Planner pages: `pdfs\monthly-budget-planner\gen.py`, `pdfs\exam-study-planner\gen.py`.
  - Kids' tracing (its own render pipeline via `pdfs\build.py` `render`): `pdfs\abc-tracing-adventure\gen.py`, `pdfs\numbers-tracing-1-20\gen.py`.
  - Parenting kits with cards, charts and scripts: `pdfs\big-feelings-toolkit\gen.py`, `pdfs\calm-mornings-bedtimes\gen.py`, `pdfs\chores-rewards-by-age\gen.py`, `pdfs\screen-free-activities\gen.py`.
  - Each product is one `gen.py` in its folder, with a THEME css string (set `--accent`, `--ink2`, `--tint`, `--cover` to a palette that suits the product) and a `pages()` function.
- Run with `python gen.py` from the product folder (Python 3.12; pypdf and pypdfium2 are installed).
- IMPORTANT: create and edit files with the Write/Edit tools, NOT bash heredocs. Heredocs corrupt backslashes here.

## Quality checks (do all of them)
1. Every `<section class="page">` must fit on exactly one physical page in BOTH sizes. Compare the section count with `len(PdfReader(pdf).pages)` for both files. Pages use `overflow:hidden`, so ALSO check for clipped content: load the built HTML in headless Chrome at print size and flag any page or card whose `scrollHeight` exceeds its `clientHeight`, or check visually.
2. Render every page to PNG (pypdfium2, scale ~0.5) into a contact sheet under `C:\Users\Sadi\AppData\Local\Temp\claude\C--Users-Sadi-OneDrive-Desktop\ee5af3bc-9e93-4c1c-a34f-63fc96a72da1\scratchpad\` and LOOK at it with the Read tool. Zoom in (crop at scale 1.0) on at least two pages per product. Fix clipped text, overlaps, big empty gaps and missing images.
3. Content rules:
   - No invented statistics, studies, quotes, reviews or expert names.
   - Parenting guidance must be gentle, widely accepted and general, never medical or diagnostic.
   - Activities must be safe: flag supervision, small parts and heat.
   - Use US spelling. Keep kid-facing text short and simple.
   - When a product promises a count ("30 activities", "100 ideas"), assert it in code.
4. Legal line on the info page: "© 2026 PageNook. For personal, family and single-classroom use; please don't redistribute or resell." Add TWEMOJI_CREDIT if emoji are used, and "Letter font: Andika by SIL International (OFL)." if Andika is used.

## Deliverables per product
- `gen.py`, both PDFs, and a `listing.json` in the folder with exactly these keys:
  - slug, title, subtitle (≤ 60 chars), category (as given), pages (int), format ("Printable PDF · A4 and US Letter versions included")
  - coverGradient ([hex, hex])
  - summary (1–2 sentences, ≤ 220 chars), description (array of 2 short paragraphs)
  - inside (array of 5–8 bullet strings), forWho (array of 2–3 strings), keywords (array of 8–12 lowercase strings)
  - previewPages (array of 4 zero-based page indices that best show the product, not the cover)
- Do NOT edit anything outside your product folders: no catalog, no git, no `planner_kit.py`. If the kit needs a change, say so in your report.

## Final report (short)
For each product give: slug, page count (a4/letter), one line on what's inside, and any concerns. Confirm you viewed the contact sheets.
