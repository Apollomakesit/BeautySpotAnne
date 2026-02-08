#!/bin/bash
# Railway GraphQL API Setup Script
# This script uses curl to interact with Railroad API directly

set -e

PROJECT_ID="ceac9d51-c1b0-413f-b112-5caa1e02dae0"
GITHUB_REPO="Apollomakesit/BeautySpotAnne"
RAILWAY_API="https://api.railway.app/graphql"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "========================================="
echo "Railway GraphQL API Setup Script"
echo "========================================="
echo ""

# Check if RAILWAY_TOKEN is set
if [ -z "$RAILWAY_TOKEN" ]; then
    echo -e "${YELLOW}Warning: RAILWAY_TOKEN environment variable not set${NC}"
    echo "You can set it with: export RAILWAY_TOKEN=your_token_here"
    echo ""
    echo "To get your token, run:"
    echo "  railway token"
    echo ""
    read -p "Enter your Railway token: " RAILWAY_TOKEN
    export RAILWAY_TOKEN="$RAILWAY_TOKEN"
fi

if [ -z "$RAILWAY_TOKEN" ]; then
    echo -e "${RED}Error: No Railway token provided${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Using Railway token${NC}"
echo ""

# Function to make GraphQL queries
query_railway() {
    local query="$1"
    curl -s -X POST "$RAILWAY_API" \
        -H "Authorization: Bearer $RAILWAY_TOKEN" \
        -H "Content-Type: application/json" \
        -d "{\"query\": \"$query\"}"
}

# Query to add PostgreSQL (plugin service)
echo "1. Adding PostgreSQL Database..."
ADD_POSTGRES_QUERY='
mutation {
  pluginServiceCreate(
    input: {
      projectId: "'$PROJECT_ID'"
      pluginSlug: "postgres"
    }
  ) {
    id
    name
  }
}
'

echo "Running: Add PostgreSQL"
response=$(query_railway "$(echo $ADD_POSTGRES_QUERY | tr '\n' ' ')")
echo "$response" | grep -q "error" && echo -e "${RED}✗ PostgreSQL addition may have failed${NC}" || echo -e "${GREEN}✓ PostgreSQL query sent${NC}"
echo "Response: $response"
echo ""

# Query to set backend environment variables
echo "2. Setting Backend Environment Variables..."

# Get backend service ID first
GET_SERVICES_QUERY='
query {
  project(id: "'$PROJECT_ID'") {
    services {
      edges {
        node {
          id
          name
          sourceRepo {
            repo
          }
        }
      }
    }
  }
}
'

echo "Getting services..."
services_response=$(query_railway "$(echo $GET_SERVICES_QUERY | tr '\n' ' ')")
echo "Services: $services_response"
echo ""

# Parse the response to find backend service ID - this is a simplified approach
BACKEND_SERVICE_ID=$(echo "$services_response" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ -z "$BACKEND_SERVICE_ID" ]; then
    echo -e "${YELLOW}Note: Could not automatically get service ID from API${NC}"
    echo "Services in the project:"
    echo "$services_response"
    echo ""
    echo "You may need to get the service IDs manually from the Railway dashboard"
else
    echo -e "${GREEN}Found backend service ID: $BACKEND_SERVICE_ID${NC}"
fi

echo ""
echo "========================================="
echo "Summary and Next Steps"
echo "========================================="
echo ""
echo "Environment Variables to Set:"
echo ""
echo "Backend Service:"
echo "  - STRIPE_SECRET_KEY=sk_test_placeholder"
echo "  - STRIPE_WEBHOOK_SECRET=whsec_placeholder"  
echo "  - FRONTEND_URL=http://localhost:3000"
echo "  - CORS_ORIGINS=http://localhost:3000"
echo ""
echo "Frontend Service:"
echo "  - NEXT_PUBLIC_API_URL=http://localhost:8000"
echo "  - NEXTAUTH_URL=http://localhost:3000"
echo "  - NEXTAUTH_SECRET=please-change-me-with-openssl-rand-base64-32"
echo "  - GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com"
echo "  - GOOGLE_CLIENT_SECRET=your_google_client_secret"
echo "  - FACEBOOK_CLIENT_ID=your_facebook_app_id"
echo "  - FACEBOOK_CLIENT_SECRET=your_facebook_app_secret"
echo ""
echo "To complete setup via Railway CLI:"
echo "  1. Make sure RAILWAY_TOKEN is exported"
echo "  2. Run: railway service select backend"
echo "  3. Run: railway variable set KEY=VALUE for each variable"
echo "  4. Repeat for frontend service"
echo ""
echo "Or use the Railway Dashboard:"
echo "  https://railway.app/project/ceac9d51-c1b0-413f-b112-5caa1e02dae0"
echo ""
