#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

OUT="presentation.html"
TEMPLATE="template.html"

# Read template
html=$(<"$TEMPLATE")

# ── Inject styles ──
styles=$(<"styles.css")
html="${html/<!-- STYLES -->/$styles}"

# ── Inject slides (sorted) ──
slides=""
for f in slides/*.html; do
  slides+=$'\n'"$(<"$f")"
done
html="${html/<!-- SLIDES -->/$slides}"

# ── Inject scripts ──
# engine first, then per-slide scripts (sorted)
scripts=$(<"js/engine.js")
for f in js/slide-*.js; do
  [ -f "$f" ] && scripts+=$'\n'"$(<"$f")"
done
html="${html/<!-- SCRIPTS -->/$scripts}"

printf '%s' "$html" > "$OUT"
echo "✔ Built $OUT ($(wc -c < "$OUT" | tr -d ' ') bytes, $(grep -c 'class=\"slide' "$OUT") slides)"
