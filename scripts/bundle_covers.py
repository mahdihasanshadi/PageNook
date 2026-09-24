"""Draw a cover image for every bundle: the included PDF covers fanned out on a gradient.

Output: public/covers/<bundle-slug>.jpg (same A-series proportions as single covers).
Run from the repo root: python scripts/bundle_covers.py
"""
import json
import subprocess
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
W, H = 1000, 1414


def gradient(a: str, b: str) -> Image.Image:
    ca = tuple(int(a[i:i + 2], 16) for i in (1, 3, 5))
    cb = tuple(int(b[i:i + 2], 16) for i in (1, 3, 5))
    img = Image.new("RGB", (W, H))
    px = img.load()
    for y in range(H):
        for x in range(W):
            t = (x / W * 0.4 + y / H * 0.6)
            px[x, y] = tuple(int(ca[k] + (cb[k] - ca[k]) * t) for k in range(3))
    return img


def font(size: int) -> ImageFont.FreeTypeFont:
    for name in ("seguibl.ttf", "segoeuib.ttf", "arialbd.ttf"):
        try:
            return ImageFont.truetype(name, size)
        except OSError:
            continue
    return ImageFont.load_default()


def fit(d: ImageDraw.ImageDraw, text: str, size: int, width: int = W - 200) -> ImageFont.FreeTypeFont:
    """Largest font up to `size` that keeps `text` inside the white panel."""
    while size > 18 and d.textlength(text, font=font(size)) > width:
        size -= 2
    return font(size)


def draw_bundle(p: dict, items: list[dict]):
    img = gradient(*p["coverGradient"])
    covers = [Image.open(PUBLIC / it["cover"].lstrip("/")).convert("RGB") for it in items]
    n = len(covers)
    cw = 460 if n <= 3 else 400
    spread = 70 if n <= 3 else 55
    mid = (n - 1) / 2
    for i, c in enumerate(covers):
        c = c.resize((cw, int(c.height * cw / c.width)))
        angle = (i - mid) * (-9 if n <= 3 else -7)
        shadow = Image.new("RGBA", (c.width + 80, c.height + 80), (0, 0, 0, 0))
        ImageDraw.Draw(shadow).rectangle([40, 50, c.width + 40, c.height + 50], fill=(0, 0, 0, 110))
        shadow = shadow.filter(ImageFilter.GaussianBlur(18)).rotate(angle, expand=True)
        card = c.convert("RGBA").rotate(angle, expand=True)
        x = int(W / 2 - card.width / 2 + (i - mid) * spread * 2.1)
        y = int(470 - card.height / 2 + abs(i - mid) * 30)
        img.paste(shadow, (x - 40, y - 30), shadow)
        img.paste(card, (x, y), card)
    d = ImageDraw.Draw(img)
    d.rounded_rectangle([60, 1010, W - 60, 1354], radius=36, fill=(255, 255, 255))
    d.text((100, 1045), f"{n} PDFs · BUNDLE", font=font(34), fill=(92, 96, 128))
    d.text((100, 1095), p["title"], font=fit(d, p["title"], 62), fill=(43, 46, 107))
    d.text((100, 1190), p["subtitle"], font=fit(d, p["subtitle"], 34), fill=(92, 96, 128))
    d.text((100, 1262), "PageNook", font=font(40), fill=(242, 107, 91))
    img.save(PUBLIC / "covers" / f"{p['slug']}.jpg", quality=88)
    print("drew", p["slug"])


def main():
    data = json.loads(subprocess.run(["node", "scripts/export-catalog.ts"], cwd=ROOT, capture_output=True,
                                     text=True, encoding="utf-8", check=True).stdout)
    by_slug = {p["slug"]: p for p in data["products"]}
    for p in data["products"]:
        if p.get("bundle"):
            draw_bundle(p, [by_slug[s] for s in p["bundle"]])


if __name__ == "__main__":
    main()
