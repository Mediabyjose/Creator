#!/usr/bin/env bash
set -euo pipefail

if [ $# -lt 1 ]; then
  echo "Usage: $0 <path-to-exported-graph.yml>" >&2
  exit 1
fi

FILE="$1"
if [ ! -f "$FILE" ]; then
  echo "File not found: $FILE" >&2
  exit 1
fi

BRANCH="graph-export/$(date +%Y%m%d%H%M%S)"

echo "Creating branch $BRANCH and adding $FILE to .github/workflows/graphs/"

git checkout -b "$BRANCH"
mkdir -p .github/workflows/graphs
cp "$FILE" ".github/workflows/graphs/$(basename "$FILE")"
git add ".github/workflows/graphs/$(basename "$FILE")"
git commit -m "chore(graph): add exported Actionforge graph"
git push -u origin "$BRANCH"

echo "Pushed branch $BRANCH. A workflow will attempt to create a pull request to import the exported graph."