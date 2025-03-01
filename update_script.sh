#!/bin/bash

# pull latest changes from github
# maybe another update happened somewhere else (manual correction, etc.)
git pull origin main

# Download subsidies CSV
node download-subsidies.js

# Add all changes to git
git add -A

# Create timestamp in UTC
timestamp=$(LC_TIME=en_US.UTF-8 date -u)

# Commit changes with timestamp
git commit -m "Latest data: ${timestamp}" || exit 0

# Push to main branch on github if there were any changes
git push origin main