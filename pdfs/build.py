"""Render a PageNook PDF from its book.html using headless Chrome.

Two passes: render once, find which page each chapter starts on,
write those numbers into the table of contents, then render again.

Usage: python build.py ship-it-with-claude-code "Ship It with Claude Code"
"""
import re
import subprocess
import sys
from pathlib import Path

from pypdf import PdfReader

CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"


def render(html: Path, pdf: Path) -> None:
    subprocess.run(
        [CHROME, "--headless=new", "--disable-gpu", "--no-pdf-header-footer",
         "--run-all-compositor-stages-before-draw", "--virtual-time-budget=15000",
         f"--print-to-pdf={pdf}", html.resolve().as_uri()],
        check=True, capture_output=True,
    )


def norm(s: str) -> str:
    return re.sub(r"[^a-z0-9]", "", s.lower())


def main(slug: str, title: str) -> None:
    folder = Path(__file__).parent / slug
    src = folder / "book.html"
    html = src.read_text(encoding="utf-8")

    # chapter id -> title of its opener
    chapters = re.findall(
        r'<section class="chapter" id="(\w+)">\s*<div class="opener"><div class="num">[^<]*</div><h1>(.*?)</h1>',
        html)

    tmp = folder / "_pass1.html"
    tmp.write_text(html, encoding="utf-8")
    first = folder / "_pass1.pdf"
    render(tmp, first)

    pages = [norm(p.extract_text() or "") for p in PdfReader(first).pages]
    toc_page = next(i for i, t in enumerate(pages) if t.startswith(norm("Contents")) or "contents" in t[:60])
    numbers = {}
    for cid, ctitle in chapters:
        key = norm(re.sub(r"<.*?>", "", ctitle).replace("&amp;", "&"))
        for i in range(toc_page + 1, len(pages)):
            if key in pages[i]:
                numbers[cid] = i + 1
                break

    for cid, n in numbers.items():
        html = html.replace(f'<span class="pg" data-for="{cid}"></span>',
                            f'<span class="pg" data-for="{cid}">{n}</span>')
    tmp.write_text(html, encoding="utf-8")
    out = folder / f"{slug}.pdf"
    render(tmp, out)
    tmp.unlink()
    first.unlink()

    missing = [c for c, _ in chapters if c not in numbers]
    print(f"{out.name}: {len(PdfReader(out).pages)} pages; chapter pages {numbers}")
    if missing:
        print("Could not locate:", missing)


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else "")
