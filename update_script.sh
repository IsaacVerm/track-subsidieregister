#!/bin/bash

# Download subsidies CSV
node download-subsidies.js

# Add all changes to git
git add -A

# Create timestamp in UTC
timestamp=$(date -u)

# Commit changes with timestamp
git commit -m "Latest data: ${timestamp}" || exit 0

# Push to main branch on github if there were any changes
git push origin main