# Deployment Guide - Running Backend & Frontend on Same Server

This guide shows how to deploy both backend and frontend on a single DigitalOcean server using Nginx as a reverse proxy.

## Architecture

```
Internet → Nginx (Port 80/443) → {
    /api/* → Backend (Port 8000)
    /* → Frontend (Port 3000 or static files)
}
```

## Prerequisites

- Ubuntu/Debian server (DigitalOcean droplet)
- Domain name pointing to your server IP (optional but recommended)
- SSH access to your server

## Step 1: Install Dependencies

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install Python 3.9+
sudo apt install -y python3 python3-pip python3-venv

# Install Nginx
sudo apt install -y nginx

# Install PM2 for process management (optional but recommended)
sudo npm install -g pm2
```

## Step 2: Clone Your Repository

```bash
# If cloning fresh:
cd /root
git clone <YOUR_GIT_REPO_URL> CrickCoachAI_website
cd CrickCoachAI_website

# OR if already exists at /root/CrickCoachAI_website:
cd /root/CrickCoachAI_website
git pull origin main  # Update to latest code
```

## Step 3: Setup Backend

```bash
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file (if needed)
# nano .env
```

**Backend Environment Variables** (create `backend/.env`):
```env
# CORS origins (comma-separated)
CORS_ALLOW_ORIGINS=https://crickcoachai.com,https://www.crickcoachai.com,http://209.38.123.167

# Email settings (already hardcoded, but you can override)
EMAIL_SEND_MODE=background
```

## Step 4: Setup Frontend

```bash
cd ../frontend

# Install dependencies
npm install

# Create .env.local file
nano .env.local
```

**Frontend Environment Variables** (create `frontend/.env.local`):
```env
NEXT_PUBLIC_API_BASE_URL=https://crickcoachai.com/api
# OR if no domain:
# NEXT_PUBLIC_API_BASE_URL=http://209.38.123.167/api
```

**Build the frontend:**
```bash
npm run build
```

## Step 5: Configure Nginx Reverse Proxy

Create Nginx configuration:

```bash
sudo nano /etc/nginx/sites-available/crickcoachai
```

**Nginx Configuration** (with SSL/HTTPS):
```nginx
# HTTP to HTTPS redirect
server {
    listen 80;
    server_name crickcoachai.com www.crickcoachai.com 209.38.123.167;
    
    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

# HTTPS server
server {
    listen 443 ssl http2;
    server_name crickcoachai.com www.crickcoachai.com 209.38.123.167;

    # SSL certificates (use Let's Encrypt - see Step 6)
    ssl_certificate /etc/letsencrypt/live/crickcoachai.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/crickcoachai.com/privkey.pem;
    
    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Increase body size for file uploads
    client_max_body_size 10M;

    # Backend API proxy
    location /api {
        proxy_pass http://127.0.0.1:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Frontend (Next.js)
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**If you don't have SSL yet** (HTTP only):
```nginx
server {
    listen 80;
    server_name crickcoachai.com www.crickcoachai.com 209.38.123.167;

    client_max_body_size 10M;

    # Backend API proxy
    location /api {
        proxy_pass http://127.0.0.1:8000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Frontend
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/crickcoachai /etc/nginx/sites-enabled/
sudo nginx -t  # Test configuration
sudo systemctl restart nginx
```

## Step 6: Setup SSL with Let's Encrypt (Recommended)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate (replace with your domain)
sudo certbot --nginx -d crickcoachai.com -d www.crickcoachai.com

# Auto-renewal is set up automatically
```

## Step 7: Run Applications with PM2

**Start Backend:**
```bash
cd /root/CrickCoachAI_website/backend
source venv/bin/activate

# Create PM2 ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'crickcoachai-backend',
    script: 'uvicorn',
    args: 'main:app --host 127.0.0.1 --port 8000',
    interpreter: '/root/CrickCoachAI_website/backend/venv/bin/python',
    cwd: '/root/CrickCoachAI_website/backend',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    }
  }]
}
EOF

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup  # Follow instructions to enable auto-start on boot
```

**Start Frontend:**
```bash
cd /root/CrickCoachAI_website/frontend

# Create PM2 ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'crickcoachai-frontend',
    script: 'npm',
    args: 'start',
    cwd: '/root/CrickCoachAI_website/frontend',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
EOF

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
```

## Step 8: Verify Everything Works

```bash
# Check PM2 status
pm2 status

# Check Nginx status
sudo systemctl status nginx

# View logs
pm2 logs crickcoachai-backend
pm2 logs crickcoachai-frontend
sudo tail -f /var/log/nginx/error.log
```

## Step 9: Firewall Configuration

```bash
# Allow HTTP, HTTPS, and SSH
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

## Alternative: Using systemd (Instead of PM2)

**Backend Service** (`/etc/systemd/system/crickcoachai-backend.service`):
```ini
[Unit]
Description=CrickCoach AI Backend
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/root/CrickCoachAI_website/backend
Environment="PATH=/root/CrickCoachAI_website/backend/venv/bin"
ExecStart=/root/CrickCoachAI_website/backend/venv/bin/uvicorn main:app --host 127.0.0.1 --port 8000
Restart=always

[Install]
WantedBy=multi-user.target
```

**Frontend Service** (`/etc/systemd/system/crickcoachai-frontend.service`):
```ini
[Unit]
Description=CrickCoach AI Frontend
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/root/CrickCoachAI_website/frontend
Environment="NODE_ENV=production"
Environment="PORT=3000"
ExecStart=/usr/bin/npm start
Restart=always

[Install]
WantedBy=multi-user.target
```

**Enable services:**
```bash
sudo systemctl daemon-reload
sudo systemctl enable crickcoachai-backend
sudo systemctl enable crickcoachai-frontend
sudo systemctl start crickcoachai-backend
sudo systemctl start crickcoachai-frontend
```

## Useful Commands

```bash
# PM2 commands
pm2 status                    # Check status
pm2 logs                      # View all logs
pm2 restart crickcoachai-backend
pm2 restart crickcoachai-frontend
pm2 stop all
pm2 delete all

# Nginx commands
sudo nginx -t                 # Test config
sudo systemctl restart nginx  # Restart Nginx
sudo systemctl reload nginx   # Reload config

# View logs
pm2 logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

## Troubleshooting

1. **Backend not accessible**: Check if it's running on port 8000: `netstat -tlnp | grep 8000`
2. **Frontend not accessible**: Check if it's running on port 3000: `netstat -tlnp | grep 3000`
3. **CORS errors**: Verify `CORS_ALLOW_ORIGINS` in backend `.env` matches your domain
4. **502 Bad Gateway**: Check if backend/frontend processes are running
5. **SSL errors**: Ensure Let's Encrypt certificates are valid: `sudo certbot certificates`

