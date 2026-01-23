# Quick Deployment Checklist

## On Your Local Machine (Before Pushing to Git)

1. **Commit all changes:**
```bash
git add .
git commit -m "Ready for production deployment"
git push origin main
```

## On DigitalOcean Server (209.38.123.167)

### 1. Initial Setup (One-time)
```bash
# Install dependencies
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs python3 python3-pip python3-venv nginx
sudo npm install -g pm2

# Clone repository
cd /var/www
sudo git clone <YOUR_GIT_REPO_URL> crickcoachai
sudo chown -R $USER:$USER crickcoachai
cd crickcoachai
```

### 2. Backend Setup
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Create .env (optional - CORS is configurable via env)
echo "CORS_ALLOW_ORIGINS=https://crickcoachai.com,https://www.crickcoachai.com,http://209.38.123.167" > .env
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install

# Create .env.local
echo "NEXT_PUBLIC_API_BASE_URL=https://crickcoachai.com/api" > .env.local
# OR if no domain:
# echo "NEXT_PUBLIC_API_BASE_URL=http://209.38.123.167/api" > .env.local

npm run build
```

### 4. Nginx Configuration
```bash
sudo nano /etc/nginx/sites-available/crickcoachai
```

Paste the configuration from `DEPLOYMENT.md` (Step 5)

```bash
sudo ln -s /etc/nginx/sites-available/crickcoachai /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 5. Start Applications with PM2
```bash
# Backend
cd /var/www/crickcoachai/backend
pm2 start "source venv/bin/activate && uvicorn main:app --host 127.0.0.1 --port 8000" --name crickcoachai-backend

# Frontend
cd /var/www/crickcoachai/frontend
pm2 start "npm start" --name crickcoachai-frontend

# Save PM2 configuration
pm2 save
pm2 startup
```

### 6. SSL Setup (If you have a domain)
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d crickcoachai.com -d www.crickcoachai.com
```

### 7. Firewall
```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

## Verify Deployment

- Frontend: `http://209.38.123.167` or `https://crickcoachai.com`
- Backend API: `http://209.38.123.167/api/health` or `https://crickcoachai.com/api/health`
- Check PM2: `pm2 status`
- Check Nginx: `sudo systemctl status nginx`

## Updating After Code Changes

```bash
cd /var/www/crickcoachai
git pull origin main

# Restart backend
cd backend
source venv/bin/activate
pip install -r requirements.txt  # If dependencies changed
pm2 restart crickcoachai-backend

# Restart frontend
cd ../frontend
npm install  # If dependencies changed
npm run build
pm2 restart crickcoachai-frontend
```

