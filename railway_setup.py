#!/usr/bin/env python3
"""
BeautySpot Anne - Railway Deployment Automation Script
Configures all services, databases, and environment variables via Railway API
"""

import os
import json
import requests
import subprocess
from typing import Optional, Dict, Any

# Railway API endpoint
API_URL = "https://api.railway.app/graphql"

class RailwayDeployer:
    def __init__(self, token: str):
        self.token = token
        self.headers = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
        }
        self.project_id = "ceac9d51-c1b0-413f-b112-5caa1e02dae0"
        
    def query(self, query: str, variables: Optional[Dict] = None) -> Dict[str, Any]:
        """Execute a GraphQL query against Railway API"""
        payload = {"query": query}
        if variables:
            payload["variables"] = variables
            
        response = requests.post(
            API_URL,
            json=payload,
            headers=self.headers,
            timeout=30
        )
        response.raise_for_status()
        return response.json()
    
    def add_postgres(self) -> bool:
        """Add PostgreSQL service to project"""
        print("📦 Adding PostgreSQL database...")
        
        mutation = """
        mutation {
            serviceCreate(input: {
                projectId: "%s"
                name: "postgres"
                source: {
                    image: "postgres:15"
                }
            }) {
                id
                name
            }
        }
        """ % self.project_id
        
        try:
            result = self.query(mutation)
            if "errors" not in result:
                print("✅ PostgreSQL added successfully")
                return True
            else:
                print(f"⚠️  PostgreSQL response: {result.get('errors', 'Unknown error')}")
                return False
        except Exception as e:
            print(f"⚠️  Could not add PostgreSQL via API: {e}")
            print("   → You'll need to add it manually in the Railway dashboard")
            return False
    
    def get_services(self) -> list:
        """Get all services in the project"""
        query = """
        query {
            project(id: "%s") {
                services {
                    edges {
                        node {
                            id
                            name
                        }
                    }
                }
            }
        }
        """ % self.project_id
        
        result = self.query(query)
        services = []
        try:
            for edge in result["data"]["project"]["services"]["edges"]:
                services.append(edge["node"])
        except (KeyError, TypeError):
            pass
        return services
    
    def set_service_variables(self, service_id: str, variables: Dict[str, str]) -> bool:
        """Set environment variables for a service"""
        print(f"  Setting {len(variables)} environment variables...")
        
        for key, value in variables.items():
            mutation = """
            mutation {
                variableUpsert(input: {
                    projectId: "%s"
                    environmentId: "production"
                    serviceId: "%s"
                    name: "%s"
                    value: "%s"
                }) {
                    id
                }
            }
            """ % (self.project_id, service_id, key, value.replace('"', '\\"'))
            
            try:
                result = self.query(mutation)
                if "errors" in result:
                    print(f"    ⚠️  Failed to set {key}: {result['errors']}")
                else:
                    print(f"    ✅ {key}")
            except Exception as e:
                print(f"    ⚠️  Error setting {key}: {e}")
        
        return True
    
    def deploy(self) -> str:
        """Get deployment instructions"""
        return """
🎯 FINAL SETUP STEPS (Complete in Railway Dashboard)
======================================================

1. Go to your project: https://railway.app/project/ceac9d51-c1b0-413f-b112-5caa1e02dae0

2. If PostgreSQL wasn't auto-added, manually add it:
   - Click "+ New Service"
   - Search "PostgreSQL"
   - Click "Create"

3. Connect your GitHub repository:
   - Click "+ New Service" → "GitHub Repository"
   - Select: Apollomakesit/BeautySpotAnne
   - Railway will automatically detect backend and frontend in railway.json

4. Environment Variables - Fill in your actual values:
   
   BACKEND SERVICE:
   - STRIPE_SECRET_KEY = sk_test_... (get from Stripe dashboard)
   - STRIPE_WEBHOOK_SECRET = whsec_... (get from Stripe webhooks)
   - FRONTEND_URL = (update after frontend deploys)
   - CORS_ORIGINS = (update after frontend deploys)
   
   FRONTEND SERVICE:
   - NEXT_PUBLIC_API_URL = (update after backend deploys)
   - NEXTAUTH_URL = https://<your-frontend-domain>
   - NEXTAUTH_SECRET = (generate: openssl rand -base64 32)
   - GOOGLE_CLIENT_ID = your_id (optional)
   - GOOGLE_CLIENT_SECRET = your_secret (optional)
   - FACEBOOK_CLIENT_ID = your_id (optional)
   - FACEBOOK_CLIENT_SECRET = your_secret (optional)

5. Click "Deploy" on both Backend and Frontend services

6. After services get URLs, update cross-service URLs:
   - Backend FRONTEND_URL with frontend URL
   - Frontend NEXT_PUBLIC_API_URL with backend URL

7. Configure Stripe Webhook:
   - Go to Stripe Dashboard
   - Webhooks → Add endpoint
   - URL: https://<backend-url>.up.railway.app/api/bookings/webhook
   - Events: checkout.session.completed
   - Copy signing secret → STRIPE_WEBHOOK_SECRET in backend

📚 Reference files:
   - ./ENV_VARIABLES_REFERENCE.md
   - ./RAILWAY_DEPLOYMENT.md
   - ./RAILWAY_CHECKLIST.md

🎉 Your deployment is ready to go!
        """

def get_railway_token() -> Optional[str]:
    """Try to get Railway token from CLI cache"""
    try:
        result = subprocess.run(
            ["railway", "token"],
            capture_output=True,
            text=True,
            timeout=5
        )
        if result.returncode == 0:
            return result.stdout.strip()
    except (subprocess.TimeoutExpired, FileNotFoundError):
        pass
    return None

def main():
    print("🚀 BeautySpot Anne - Railway Deployment Automation")
    print("=" * 50)
    print()
    
    # Get token
    token = get_railway_token()
    if not token:
        print("❌ Could not get Railway token")
        print()
        print("Please get your token by running:")
        print("  railway token")
        print()
        print("Then set it as an environment variable:")
        print("  export RAILWAY_TOKEN=<your-token>")
        print()
        print("Or create a .env file with:")
        print("  RAILWAY_TOKEN=<your-token>")
        return 1
    
    print(f"✅ Authenticated as Railway user")
    print()
    
    deployer = RailwayDeployer(token)
    
    # Step 1: Add PostgreSQL
    deployer.add_postgres()
    print()
    
    # Step 2: Get services
    print("📋 Checking services...")
    services = deployer.get_services()
    if services:
        print(f"✅ Found {len(services)} service(s)")
        for svc in services:
            print(f"   - {svc['name']} (ID: {svc['id']})")
    print()
    
    # Step 3: Configure variables for backend
    print("⚙️  Configuring Backend Service Variables...")
    backend_vars = {
        "STRIPE_SECRET_KEY": "sk_test_placeholder_update_me",
        "STRIPE_WEBHOOK_SECRET": "whsec_placeholder_update_me", 
        "FRONTEND_URL": "http://localhost:3000",
        "CORS_ORIGINS": "http://localhost:3000",
    }
    
    # Find backend service
    backend_svc = next((s for s in services if "backend" in s.get("name", "").lower()), None)
    if backend_svc:
        deployer.set_service_variables(backend_svc["id"], backend_vars)
        print()
    
    # Step 4: Configure variables for frontend
    print("⚙️  Configuring Frontend Service Variables...")
    frontend_vars = {
        "NEXT_PUBLIC_API_URL": "http://localhost:8000",
        "NEXTAUTH_URL": "http://localhost:3000",
        "NEXTAUTH_SECRET": "please-generate-with-openssl-rand-base64-32",
        "GOOGLE_CLIENT_ID": "your_google_client_id",
        "GOOGLE_CLIENT_SECRET": "your_google_client_secret",
        "FACEBOOK_CLIENT_ID": "your_facebook_app_id",
        "FACEBOOK_CLIENT_SECRET": "your_facebook_app_secret",
    }
    
    # Find frontend service
    frontend_svc = next((s for s in services if "frontend" in s.get("name", "").lower()), None)
    if frontend_svc:
        deployer.set_service_variables(frontend_svc["id"], frontend_vars)
        print()
    
    # Show final instructions
    print(deployer.deploy())
    
    return 0

if __name__ == "__main__":
    exit(main())
