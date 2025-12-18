#!/usr/bin/env bash
set -euo pipefail

echo "Running ActionForge setup script"
if ! command -v npm >/dev/null 2>&1; then
  echo "npm not found — please install Node.js and npm to continue" >&2
  exit 1
fi

# Try to install 'actionforge' from npm — replace this with the correct package or repo if needed
if npm info actionforge >/dev/null 2>&1; then
  echo "Installing actionforge from npm..."
  npm install actionforge --save
  echo "actionforge installed — update your config as needed"
else
  echo "Package 'actionforge' was not found on npm. Please replace the install command with the correct package or repo URL in scripts/setup-actionforge.sh" >&2
  exit 0
fi
