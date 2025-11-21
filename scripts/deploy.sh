
# --- Configuration ---
# Set the project root directory. 
# Adjust this line if the script is NOT in the project root.
# Example: If script is at /home/ubuntu/project/deploy.sh, set to /home/ubuntu/project
PROJECT_ROOT="/home/ubuntu/healthstartrust" 
BRANCH="${DEPLOY_BRANCH:-main}"
REMOTE="origin"

echo "==> Starting deployment..."
cd "$PROJECT_ROOT" || { echo "ERROR: Could not navigate to $PROJECT_ROOT"; exit 1; }

# 1. Ensure the correct branch is checked out (and ignore local changes if needed)
echo "Checking out branch $BRANCH..."
git checkout "$BRANCH"

# 2. Fetch the latest changes (downloads, but doesn't merge)
echo "Fetching changes from $REMOTE/$BRANCH..."
git fetch $REMOTE

# 3. Overwrite local branch and working directory to match the remote branch
# This step is key: it removes all local commits and uncommitted changes.
echo "Resetting local repository to $REMOTE/$BRANCH (Overwriting all local changes)..."
git reset --hard "$REMOTE/$BRANCH"

# 4. Clean up any untracked files or folders
echo "Removing untracked files..."
git clean -df

echo "==> Done. Latest $BRANCH is now live."