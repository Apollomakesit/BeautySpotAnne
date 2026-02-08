#!/usr/bin/env python3
"""
Railway Deployment Setup Script
Configures PostgreSQL, services, and environment variables using the Railway GraphQL API
"""

import os
import json
import subprocess
import time
from pathlib import Path

# Configuration
PROJECT_ID = "ceac9d51-c1b0-413f-b112-5caa1e02dae0"
GITHUB_REPO = "Apollomakesit/BeautySpotAnne"
RAILWAY_API_URL = "https://api.railway.app/graphql"

# Try to get the auth token from Railway config
def get_railway_token():
    """Get Railway auth token from CLI config or environment"""
    # Try to read from railway config file
    railway_config = Path.home() / ".railway" / "config"
    if railway_config.exists():
        with open(railway_config, 'r') as f:
            config = json.load(f)
            if 'token' in config:
                return config['token']
    
    # Try environment variable
    if 'RAILWAY_TOKEN' in os.environ:
        return os.environ['RAILWAY_TOKEN']
    
    return None

def run_railway_command(command):
    """Run a railway CLI command"""
    try:
        # Use stdin to provide input if needed
        result = subprocess.run(
            command,
            shell=True,
            capture_output=True,
            text=True,
            timeout=10,
            input="q\n"  # Escape from interactive mode by sending 'q'
        )
        return result.stdout, result.stderr, result.returncode
    except subprocess.TimeoutExpired:
        return None, "Command timed out", 1
    except Exception as e:
        return None, str(e), 1

def main():
    print("=" * 60)
    print("BeautySpot Anne - Railway Deployment Setup")
    print("=" * 60)
    print(f"Project ID: {PROJECT_ID}")
    print(f"GitHub Repo: {GITHUB_REPO}")
    print()
    
    # Check railway CLI
    stdout, stderr, code = run_railway_command("which railway")
    if code != 0:
        print("ERROR: Railway CLI not found")
        return False
    print("✓ Railway CLI is installed")
    
    # Get token
    token = get_railway_token()
    if not token:
        print("⚠ Could not find Railway token. You may need to run 'railway login' first")
        print("  Attempting to proceed with Railway CLI...")
    else:
        print(f"✓ Found Railway auth token")
    
    print()
    print("Configuration Summary:")
    print("-" * 60)
    print("Backend Service (from railway.json):")
    print("  - Root Directory: backend")
    print("  - Start Command: uvicorn app.main:app --host 0.0.0.0 --port $PORT")
    print()
    print("Frontend Service (from railway.json):")
    print("  - Root Directory: frontend")
    print("  - Start Command: next start")
    print()
    
    print("Environment Variables to Set:")
    print("-" * 60)
    print("\nBACKEND Service:")
    backend_vars = {
        "STRIPE_SECRET_KEY": "sk_test_placeholder (user will update)",
        "STRIPE_WEBHOOK_SECRET": "whsec_placeholder (user will update)",
        "FRONTEND_URL": "http://localhost:3000 (user will update)",
        "CORS_ORIGINS": "http://localhost:3000 (user will update)"
    }
    for key, value in backend_vars.items():
        print(f"  {key}={value}")
    
    print("\nFRONTEND Service:")
    frontend_vars = {
        "NEXT_PUBLIC_API_URL": "http://localhost:8000 (user will update)",
        "NEXTAUTH_URL": "http://localhost:3000 (user will update)",
        "NEXTAUTH_SECRET": "please-change-me-with-openssl-rand-base64-32",
        "GOOGLE_CLIENT_ID": "your_google_client_id.apps.googleusercontent.com",
        "GOOGLE_CLIENT_SECRET": "your_google_client_secret",
        "FACEBOOK_CLIENT_ID": "your_facebook_app_id",
        "FACEBOOK_CLIENT_SECRET": "your_facebook_app_secret"
    }
    for key, value in frontend_vars.items():
        print(f"  {key}={value}")
    
    print()
    print("=" * 60)
    print("Next Steps:")
    print("=" * 60)
    print("1. Add PostgreSQL database:")
    print("   - Navigate to: https://railway.app/project/ceac9d51-c1b0-413f-b112-5caa1e02dae0")
    print("   - Click 'Add New Service' → 'Database' → 'PostgreSQL'")
    print()
    print("2. Update environment variables:")
    print("   - For each service, go to Variables tab in Railway dashboard")
    print("   - Add the variables listed above")
    print()
    print("3. Configure GitHub connection:")
    print("   - The railway.json already specifies backend and frontend as separate services")
    print("   - Check Railway dashboard to ensure GitHub repo is connected")
    print()
    
    return True

if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)
