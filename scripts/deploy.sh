
#!/usr/bin/env bash
set -euo pipefail

# --- Configuration -----------------------------------------------------------
# If the script lives inside the repo (default), PROJECT_ROOT resolves
# automatically. Otherwise, export PROJECT_ROOT before running the script.
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="${PROJECT_ROOT_OVERRIDE:-$(cd "$SCRIPT_DIR/.." && pwd)}"
BRANCH="${DEPLOY_BRANCH:-main}"
REMOTE="${DEPLOY_REMOTE:-origin}"
NPM_BINARY="${NPM_BINARY:-npm}"

echo "==> Starting deployment from $PROJECT_ROOT (branch: $BRANCH)..."
cd "$PROJECT_ROOT" || { echo "ERROR: Could not navigate to $PROJECT_ROOT"; exit 1; }

# 1. Ensure the correct branch is checked out (and ignore local changes if needed)
echo "Checking out branch $BRANCH..."
git checkout "$BRANCH"

# 2. Fetch the latest changes (downloads, but doesn't merge)
echo "Fetching changes from $REMOTE/$BRANCH..."
git fetch "$REMOTE"

# 3. Overwrite local branch and working directory to match the remote branch
#    This step removes all local commits and uncommitted changes.
echo "Resetting local repository to $REMOTE/$BRANCH (overwriting local changes)..."
git reset --hard "$REMOTE/$BRANCH"

# 4. Clean up any untracked files or folders
echo "Removing untracked files..."
git clean -df

# 5. Install dependencies (production-only) and build the optimized assets
if command -v "$NPM_BINARY" >/dev/null 2>&1; then
  if [ -f package-lock.json ]; then
    echo "Installing production dependencies (npm ci --omit=dev)..."
    "$NPM_BINARY" ci --omit=dev
  else
    echo "Installing production dependencies (npm install --omit=dev)..."
    "$NPM_BINARY" install --omit=dev
  fi

  echo "Building static assets (npm run build)..."
  "$NPM_BINARY" run build
else
  echo "ERROR: npm was not found on this server. Install Node.js/npm or set NPM_BINARY."
  exit 1
fi

echo "==> Deployment complete. Latest $BRANCH is now live with fresh build artifacts."