#!/usr/bin/env python3
"""
Quick git commit and push for Railway deployment files
"""
import subprocess
import os

os.chdir("/workspaces/BeautySpotAnne")

# Configure git
subprocess.run(["git", "config", "user.email", "railway@deploy.local"], capture_output=True)
subprocess.run(["git", "config", "user.name", "Railway Deployer"], capture_output=True)

# Add all files
print("Adding files...")
subprocess.run(["git", "add", "-A"], check=True)

# Commit
print("Committing...")
result = subprocess.run(
    ["git", "commit", "-m", "Add Railway deployment automation scripts"],
    capture_output=True,
    text=True
)
print(result.stdout or result.stderr or "✓ Committed")

# Push
print("Pushing to GitHub...")
result = subprocess.run(
    ["git", "push", "origin", "main"],
    capture_output=True,
    text=True,
    timeout=30
)
print(result.stdout or result.stderr or "✓ Pushed")

print("\n✅ Done! Your code is on GitHub and ready for Railway deployment.")
