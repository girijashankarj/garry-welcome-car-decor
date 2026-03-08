#!/bin/bash
# Pre-commit: check for secrets in staged files
set -e
STAGED_FILES=$(git diff --cached --name-only 2>/dev/null || echo "")
if [ -z "$STAGED_FILES" ]; then exit 0; fi
if echo "$STAGED_FILES" | grep -q "\.env$"; then
  echo "WARNING: .env is staged. Remove with: git reset HEAD .env"
fi
echo "Pre-commit checks complete."
