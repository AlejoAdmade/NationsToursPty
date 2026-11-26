#!/usr/bin/env python3
"""Generate a catalog of the image files under assets/img/tours/.
Run automatically by the GitHub workflow or locally with python scripts/generate_tour_manifest.py.
"""
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT / "assets" / "img" / "tours"
EXTS = {".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"}
# Explicitly list valid slugs so accidental folders do not create public gallery categories.
SLUGS = ("panama-city", "panama-canal", "cruceros", "monkey-island", "san-lorenzo", "transfers")
manifest = {}
for slug in SLUGS:
    folder = BASE / slug
    images = sorted((p for p in folder.iterdir() if p.is_file() and p.suffix.lower() in EXTS),
                    key=lambda p: (p.name.lower() != "portada.webp" and p.name.lower() != "portada.jpg" and p.name.lower() != "portada.png", p.name.lower())) if folder.exists() else []
    manifest[slug] = [p.relative_to(ROOT).as_posix() for p in images]
output = BASE / "manifest.json"
output.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print("Gallery manifest updated:", {key: len(files) for key, files in manifest.items()})
