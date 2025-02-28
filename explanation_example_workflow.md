# GitHub Actions Workflow Explanation: Scrape Latest Data

This GitHub Actions workflow is designed to regularly fetch and store data from a fire incident API. Here's a line-by-line explanation:

## Workflow Name and Trigger Configuration

```yaml
name: Scrape latest data

on:
  push:
  workflow_dispatch:
  schedule:
  - cron: '6,26,46 * * * *'
```

- **`name: Scrape latest data`**: Names the workflow "Scrape latest data"
- **`on:`**: Defines when the workflow should run
- **`push:`**: Triggers the workflow when code is pushed to the repository
- **`workflow_dispatch:`**: Allows manual triggering of the workflow from the GitHub UI
- **`schedule:`**: Sets up scheduled runs
- **`- cron: '6,26,46 * * * *'`**: Runs the workflow at minutes 6, 26, and 46 of every hour (every 20 minutes)

## Job Configuration

```yaml
jobs:
  scheduled:
    runs-on: ubuntu-latest
```

- **`jobs:`**: Defines the jobs that make up the workflow
- **`scheduled:`**: Names the job "scheduled"
- **`runs-on: ubuntu-latest`**: Specifies that the job should run on the latest Ubuntu runner

## Job Steps

```yaml
steps:
- name: Check out this repo
  uses: actions/checkout@v3
```

- **`steps:`**: Defines the sequence of tasks to execute
- **`- name: Check out this repo`**: Names the first step
- **`uses: actions/checkout@v3`**: Uses the checkout action (v3) to clone the repository to the runner

```yaml
- name: Fetch latest data
  run: |-
    curl 'https://www.fire.ca.gov/api/sitecore/Incident/GetFiresForMap' \
      -X POST --data-raw 'showFeatured=False' | jq > incidents-june-2023-format.json
```

- **`- name: Fetch latest data`**: Names the second step
- **`run: |-`**: Begins a multi-line command
- The command uses `curl` to send a POST request to the California fire department API
- **`-X POST --data-raw 'showFeatured=False'`**: Specifies a POST request with the given data
- **`| jq > incidents-june-2023-format.json`**: Pipes the response through `jq` (to format the JSON) and saves it to a file

```yaml
- name: Commit and push if it changed
  run: |-
    git config user.name "Automated"
    git config user.email "actions@users.noreply.github.com"
    git add -A
    timestamp=$(date -u)
    git commit -m "Latest data: ${timestamp}" || exit 0
    git push
```

- **`- name: Commit and push if it changed`**: Names the final step
- **`git config user.name "Automated"`**: Sets the Git username for the commit
- **`git config user.email "actions@users.noreply.github.com"`**: Sets the Git email for the commit
- **`git add -A`**: Stages all changes
- **`timestamp=$(date -u)`**: Creates a timestamp variable with the current UTC time
- **`git commit -m "Latest data: ${timestamp}" || exit 0`**: Commits the changes with a timestamped message, or exits with code 0 if there's nothing to commit
- **`git push`**: Pushes the changes back to the repository

This workflow effectively creates an automated data collection system that regularly fetches fire incident data, formats it as JSON, and commits it to the repository, creating a historical record of the data over time.
