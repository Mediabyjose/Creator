#!/usr/bin/env bash
set -euo pipefail

echo "Running ActionForge helper script"

# Actionforge is primarily distributed via GitHub (as a GitHub Action) and not as an npm package.
# This helper prints information and can optionally try to download the latest graph-runner binary
# so you can run graphs locally.

GITHUB_REPO="actionforge/action"

# Show a helpful message
cat <<'EOF'
Note: Actionforge is a GitHub project (https://github.com/actionforge/action).
This repository includes a GitHub Action you can reference from your workflows (e.g. `uses: actionforge/action@v0.9.54`).

Recommended steps:
  1) Add your Action Graphs to `.github/workflows/graphs/` in this repo.
  2) Use the `actionforge/action` GitHub Action (see https://github.com/actionforge/action) in a workflow or trigger it manually.
  3) Optionally, download the `graph-runner` binary to run graphs locally (script attempts to fetch it below).

EOF

# Try to download the latest release's graph-runner for linux x64 (best-effort; may require GitHub API rate limit)
if command -v curl >/dev/null 2>&1; then
  echo "Looking up latest release for $GITHUB_REPO..."
  TAG=$(curl -s "https://api.github.com/repos/$GITHUB_REPO/releases/latest" | grep -m1 '"tag_name":' | sed -E 's/.*"([^"]+)".*/\1/' || true)
  if [ -n "$TAG" ]; then
    echo "Found latest tag: $TAG"
    ASSET_URL=$(curl -s "https://api.github.com/repos/$GITHUB_REPO/releases/latest" | grep -Eo "https://[^"]*graph-runner-linux-x64\.(tar\.gz|zip)" | head -n1 || true)
    if [ -n "$ASSET_URL" ]; then
      echo "Downloading graph-runner from: $ASSET_URL"
      mkdir -p tmp/actionforge && curl -L "$ASSET_URL" -o tmp/actionforge/graph-runner-linux-x64.tar.gz
      echo "Downloaded to tmp/actionforge/graph-runner-linux-x64.tar.gz — extract and use as needed."
    else
      echo "Could not find a graph-runner asset URL in the release. You can download it manually from https://github.com/$GITHUB_REPO/releases"
    fi
  else
    echo "Could not determine latest release tag for $GITHUB_REPO — check internet access or GitHub rate limits."
  fi
else
  echo "curl is not installed; skipping graph-runner lookup."
fi

cat <<'EOF'
If you'd like, tell me the exact Actionforge graph file you want to run and I can add an example workflow and placeholder graph to this repo.
EOF
