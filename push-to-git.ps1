# Run this script from the project root
# Replace <remote-url> with your Git repository URL.

$remoteUrl = Read-Host "Enter remote repository URL"

if (-not $remoteUrl) {
  Write-Error "Remote repository URL is required."
  exit 1
}

Write-Output "Initializing git repository..."
git init

Write-Output "Adding files..."
git add .

Write-Output "Committing files..."
git commit -m "Initial commit"

Write-Output "Setting main branch..."
git branch -M main

Write-Output "Adding remote origin..."
git remote add origin $remoteUrl

Write-Output "Pushing to remote..."
git push -u origin main

Write-Output "Done. Your project has been pushed to $remoteUrl"