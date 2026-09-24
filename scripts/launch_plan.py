"""Write marketing/LAUNCH-PLAN.md: where to post, a 14-day schedule, and ready-to-paste captions.

Run from the repo root: python scripts/launch_plan.py
"""
import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE = "https://pagenook.me"

data = json.loads(subprocess.run(["node", "scripts/export-catalog.ts"], cwd=ROOT, capture_output=True,
                                 text=True, encoding="utf-8", check=True).stdout)
cats = {c["slug"]: c["name"] for c in data["categories"]}
live = [p for p in data["products"] if p["status"] == "available"]
parenting = [p for p in live if p["category"] == "parenting"]

intro = f"""# PageNook launch plan

Drafts only. Nothing here is posted until you say so. Replace `{SITE}` if the site ends up on a different address.

## Where to post, and why

| Channel | Best for | Why |
|---|---|---|
| **Pinterest** | Parenting, kids, planners | Parents search Pinterest for printables, and pins keep bringing visitors for months. This is the #1 channel for PageNook. |
| **Facebook parenting groups** | Parenting | Many groups ban self-promotion. Read the rules; share the **free** Big Feelings pack only where allowed. |
| **Instagram** | Parenting, kids | Use the square images in `marketing/square/`. Carousel = cover + 2 preview pages. |
| **X (Twitter)** | Coding guides | Developers are on X. Share useful tips from the guides, with the link in a reply. |
| **Reddit** | Coding interviews | Only where rules allow. Lead with real value (a pattern explained), link last. |

## Before you post anything
1. The site is live and every Buy button works (test one purchase in Lemon Squeezy test mode).
2. Create a Pinterest **business** account (free) named PageNook, and claim the website.
3. Make boards: *Parenting Printables*, *Toddler Routines & Feelings*, *Kids Learning Printables*, *Family Planners*, *Coding Interview Prep*.

## 14-day schedule (about 20 minutes a day)

| Day | Pinterest | Other |
|---|---|---|
| 1 | Pin 3: Big Feelings Toolkit, Calm Mornings & Bedtimes, Say This Not That | X: launch post (below) |
| 2 | Pin 2: Potty Training Starter Kit, Newborn Survival Planner | Instagram: Big Feelings carousel |
| 3 | Pin 2: 100 Screen-Free Activities, Chores & Rewards | X: Coding Interview Patterns post |
| 4 | Pin 2: ABC Tracing, Numbers 1–20 | Facebook group: share the free Big Feelings pack (if rules allow) |
| 5 | Pin 2: First Words Flashcards, Baby's First Year | Instagram: Calm Mornings carousel |
| 6 | Pin 2: Family Screen-Time Plan, Family Meal Planner | X: Claude Code post |
| 7 | Pin 2: Monthly Budget Planner, Exam Season Study Planner | Check the admin dashboard: which pins brought visitors? |
| 8–14 | Re-pin the 3 best performers to a second board each day; add 1 new pin design per day for your top seller | Reply to every comment and message |

## Rules that keep the account healthy
- One pin per product per board; don't post the same image to many boards in one day.
- Never use fake reviews, sales numbers or "only 2 left" style pressure.
- Put the link in the pin itself; on X, put it in the first reply.
- Keep going for at least 4 weeks before judging. Pinterest traffic grows slowly.

## X launch post

> I built a small shop of useful PDFs called PageNook 📚
>
> Calm-down cards and routine charts for parents, tracing books for little ones, and a coding-interview guide where every code sample is tested.
>
> Everything is $0.99–$1.49. First reply has the link 👇

Reply: `{SITE}`

"""

x_posts = f"""## X posts (coding)

**Coding Interview Patterns**
> Most coding interview problems are ~20 patterns in disguise.
>
> Sorted array + pair? Two pointers.
> "Longest substring that…"? Sliding window.
> "Minimum X such that…"? Binary search on the answer.
>
> I put all 20 on one page each, with tested Python templates. $0.99 👇

Reply: `{SITE}/pdf/coding-interview-patterns`

**Ship It with Claude Code**
> The single most useful line to add to any AI coding prompt:
>
> "Before you start, ask me up to 3 questions."
>
> The questions show you what you forgot to decide. I wrote a 39-page field guide on building a real site this way, every prompt shown.

Reply: `{SITE}/pdf/ship-it-with-claude-code`

**Tip thread idea (free value)**
> 5 binary search bugs I see all the time 🧵 (then one tip per reply, last reply links the guide)

"""

pins = ["## Pinterest pins: title + description for each image\n",
        "Image files are in `marketing/pins/` (named by product). Paste the title and description; set the link to the product page.\n"]
for p in live:
    kw = ", ".join(p["keywords"][:6])
    pins += [
        f"### {p['title']}",
        f"- **Image:** `marketing/pins/{p['slug']}.png`",
        f"- **Board:** {cats[p['category']]}",
        f"- **Link:** `{SITE}/pdf/{p['slug']}`",
        f"- **Title:** {p['title']}: {p['subtitle']} (Printable PDF)",
        f"- **Description:** {p['summary']} Instant download, ${p['price']:.2f}. Print at home. Keywords: {kw}.",
        "",
    ]

insta = ["## Instagram captions (parenting)\n"]
for p in parenting:
    first = p["inside"][0]
    insta += [
        f"### {p['title']}",
        f"> {p['subtitle']} 💛",
        ">",
        f"> Inside: {first.lower() if first[:1].isupper() and not first[:2].isupper() else first}, and more.",
        f"> Printable PDF, ${p['price']:.2f}, link in bio.",
        ">",
        "> #parentingtips #toddlermom #gentleparenting #printables #momlife #kidsactivities",
        "",
    ]

out = ROOT / "marketing" / "LAUNCH-PLAN.md"
out.parent.mkdir(exist_ok=True)
out.write_text(intro + x_posts + "\n".join(pins) + "\n" + "\n".join(insta) + "\n", encoding="utf-8")
print("wrote", out, f"({len(live)} pins, {len(parenting)} Instagram captions)")
