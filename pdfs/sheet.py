"""Contact sheet of every page in a product's A4 PDF, for review.

Usage: python sheet.py <slug> <out.png> [scale] [cols]
"""
import sys
from pathlib import Path

import pypdfium2 as pdfium
from PIL import Image

slug, out = sys.argv[1], sys.argv[2]
scale = float(sys.argv[3]) if len(sys.argv) > 3 else 0.32
cols = int(sys.argv[4]) if len(sys.argv) > 4 else 8
pdf = pdfium.PdfDocument(str(Path(__file__).parent / slug / f"{slug}-a4.pdf"))
ims = [pdf[i].render(scale=scale).to_pil() for i in range(len(pdf))]
w, h = ims[0].size
rows = (len(ims) + cols - 1) // cols
sheet = Image.new("RGB", (w * cols, h * rows), "#888")
for n, im in enumerate(ims):
    sheet.paste(im, ((n % cols) * w, (n // cols) * h))
sheet.save(out)
print(len(ims), "pages")
