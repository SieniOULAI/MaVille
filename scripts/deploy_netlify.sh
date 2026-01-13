#!/usr/bin/env bash
set -euo pipefail

# deploy_netlify.sh
# Usage: set NETLIFY_AUTH_TOKEN and NETLIFY_SITE_ID environment variables, then run this script

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

echo "Preparing deploy for MaVille site..."

# Ensure dist exists and contains built files
if [ ! -d "dist" ]; then
  echo "dist/ not found — creating and copying fallback CSS"
  mkdir -p dist
fi

# Try to build Tailwind CSS if package.json exists and tailwind is installed
if command -v npx >/dev/null 2>&1 && [ -f package.json ]; then
  echo "Running npm install (if needed) and building CSS..."
  # prefer ci if node_modules absent
  if [ ! -d node_modules ]; then
    npm install --no-audit --no-fund
  fi
  if npm run --silent build:css >/dev/null 2>&1; then
    echo "Built CSS into dist/styles.css"
  else
    echo "Build script failed or tailwind not available — copying fallback style.css to dist/styles.css"
    cp -f style.css dist/styles.css
  fi
else
  echo "Node/Tailwind not available — copying fallback style.css to dist/styles.css"
  cp -f style.css dist/styles.css
fi

if [ -z "${NETLIFY_AUTH_TOKEN:-}" ] || [ -z "${NETLIFY_SITE_ID:-}" ]; then
  echo "ERROR: please set NETLIFY_AUTH_TOKEN and NETLIFY_SITE_ID environment variables." >&2
  exit 2
fi

echo "Deploying to Netlify site id: ${NETLIFY_SITE_ID} (prod)"

# Use netlify-cli via npx
if ! command -v npx >/dev/null 2>&1; then
  echo "npx not found; please install Node.js to use netlify CLI" >&2
  exit 3
fi

npx --yes netlify-cli deploy --dir=dist --prod --auth "$NETLIFY_AUTH_TOKEN" --site "$NETLIFY_SITE_ID"

echo "Deployment finished. Verify on Netlify dashboard or ${NETLIFY_SITE_ID} site URL."
