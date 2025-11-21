#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BRANCH="${DEPLOY_BRANCH:-main}"

echo "==> Pulling latest ${BRANCH} from origin..."
cd "$REPO_ROOT"

git checkout "$BRANCH"
git pull origin "$BRANCH"

echo "==> Done. Latest ${BRANCH} is now live."