"""Download the site's stock photos from Unsplash (free under the Unsplash License) into public/photos/.

Credits live in lib/photos.ts. Run from the repo root: python scripts/fetch_photos.py
"""
import urllib.request
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "public" / "photos"

PHOTOS = {
    "parenting": "photo-1758874961220-38296d64a674",
    "kids-learning": "photo-1617117206620-b01f2919ff86",
    "study-exams": "photo-1514369118554-e20d93546b30",
    "tech-coding": "photo-1498050108023-c5249f4df085",
    "work-career": "photo-1698047682091-782b1e5c6536",
    "home-life": "photo-1606787364410-947e10173148",
    "planners-templates": "photo-1585435465945-bef5a93f8849",
    "free-kids": "photo-1620398722262-969d8f2bc875",
    "free-parents": "photo-1758598737528-77505cac475f",
}

OUT.mkdir(parents=True, exist_ok=True)
for name, pid in PHOTOS.items():
    url = f"https://images.unsplash.com/{pid}?w=1600&q=72&fm=jpg&fit=crop&crop=entropy&ar=16:10"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    data = urllib.request.urlopen(req, timeout=60).read()
    (OUT / f"{name}.jpg").write_bytes(data)
    print(f"{name}.jpg  {len(data) // 1024} KB")
