#!/bin/bash

# CrickCoach AI Server Setup Script
# Run this on your DigitalOcean server at /root/CrickCoachAI_website

set -e

PROJECT_DIR="/root/CrickCoachAI_website"
BACKEND_DIR="$PROJECT_DIR/backend"
FRONTEND_DIR="$PROJECT_DIR/frontend"

echo "🚀 Setting up CrickCoach AI on server..."

# Check if directory exists
if [ ! -d "$PROJECT_DIR" ]; then
    echo "❌ Error: $PROJECT_DIR does not exist!"
    echo "Please clone your repository first:"
    echo "  cd /root"
    echo "  git clone <YOUR_REPO_URL> CrickCoachAI_website"
    exit 1
fi

cd "$PROJECT_DIR"

# Setup Backend
echo "📦 Setting up backend..."
cd "$BACKEND_DIR"

if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
fi

source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt

# Create .env if it doesn't exist
if [ ! -f ".env" ]; then
    echo "Creating backend .env file..."
    cat > .env << EOF
CORS_ALLOW_ORIGINS=https://crickcoachai.com,https://www.crickcoachai.com,http://209.38.123.167
EMAIL_SEND_MODE=background
EOF
    echo "✅ Created backend/.env"
fi

# Setup Frontend
echo "📦 Setting up frontend..."
cd "$FRONTEND_DIR"

if [ ! -d "node_modules" ]; then
    echo "Installing Node.js dependencies..."
    npm install
fi

# Create .env.local if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo "Creating frontend .env.local file..."
    cat > .env.local << EOF
NEXT_PUBLIC_API_BASE_URL=https://crickcoachai.com/api
EOF
    echo "✅ Created frontend/.env.local"
    echo "⚠️  Please update NEXT_PUBLIC_API_BASE_URL if you're not using a domain"
fi

# Build frontend
echo "🏗️  Building frontend..."
npm run build

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Configure Nginx (see DEPLOYMENT.md Step 5)"
echo "2. Start applications with PM2:"
echo "   cd $BACKEND_DIR && pm2 start ecosystem.config.js"
echo "   cd $FRONTEND_DIR && pm2 start ecosystem.config.js"
echo "   pm2 save && pm2 startup"
echo ""
echo "Or use the quick commands:"
echo "   cd $BACKEND_DIR"
echo "   pm2 start 'source venv/bin/activate && uvicorn main:app --host 127.0.0.1 --port 8000' --name crickcoachai-backend"
echo ""
echo "   cd $FRONTEND_DIR"
echo "   pm2 start 'npm start' --name crickcoachai-frontend"
echo "   pm2 save"

