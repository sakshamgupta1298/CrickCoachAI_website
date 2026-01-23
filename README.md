# CrickCoach AI

Premium AI-powered cricket coaching platform with 3D storytelling website.

## Project Structure

```
CrickCoachAI/
├── backend/          # Python FastAPI backend
│   ├── main.py      # API endpoints
│   └── requirements.txt
├── frontend/        # Next.js frontend with Three.js
│   ├── app/         # Next.js app directory
│   ├── components/  # React components
│   └── package.json
└── README.md
```

## Features

- 🎯 **3D Cricket Player Visualizations** - Interactive 3D models with skeletal tracking
- 📊 **Data Overlays** - Performance metrics, angles, and motion analysis
- ✨ **Premium Dark UI** - Modern, cinematic design with smooth animations
- 📱 **App Download Integration** - Seamless mobile app promotion
- 🤝 **Partnership System** - Inquiry forms for coaches and academies
- 🎬 **Scroll-Triggered Animations** - Parallax effects and reveal sequences
- 💫 **Particle Systems** - AI intelligence visualization effects

## Setup Instructions

### Prerequisites

- Python 3.8+ 
- Node.js 18+ and npm
- Git

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment:
```bash
python -m venv venv
```

3. Activate virtual environment:
```bash
# macOS/Linux
source venv/bin/activate

# Windows
venv\Scripts\activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Start the server:
```bash
uvicorn main:app --reload
```

The backend will run on `http://localhost:8000`

## Production deploy (DigitalOcean)

### Frontend → Backend URL (important)

Your Next.js frontend must call the backend using your droplet IP / domain (not `localhost`).

- Set **NEXT_PUBLIC_API_BASE_URL** when deploying the frontend:
  - If backend is exposed directly on port 8000: `http://209.38.123.167:8000`
  - If you reverse-proxy backend under your domain (recommended): `https://crickcoachai.com`

### Backend (FastAPI)

Bind the API to `0.0.0.0` so it’s reachable externally:

- `uvicorn main:app --host 0.0.0.0 --port 8000`

Set CORS to allow your website origin(s):

- **CORS_ALLOW_ORIGINS** (comma-separated), e.g.
  - `CORS_ALLOW_ORIGINS=https://crickcoachai.com,https://www.crickcoachai.com,http://209.38.123.167`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## API Endpoints

- `GET /` - API root
- `GET /api/health` - Health check
- `GET /api/stats` - Platform statistics
- `POST /api/app-download` - Request app download link
- `POST /api/partnership-inquiry` - Submit partnership inquiry
- `POST /api/contact` - General contact form

## Technology Stack

### Backend
- **FastAPI** - Modern Python web framework
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Three.js** - 3D graphics and visualizations
- **React Three Fiber** - React renderer for Three.js
- **Framer Motion** - Animation library
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client

## Design Philosophy

The website is designed as a **3D storytelling experience** that:

- Educates users on AI-powered cricket coaching
- Establishes authority in sports-tech
- Demonstrates value for different stakeholders
- Drives app downloads and partnerships

**Visual Direction:**
- Dark, premium backgrounds (charcoal, deep navy, graphite)
- High-contrast typography with ample spacing
- Minimal UI chrome - visuals speak
- Smooth transitions and micro-interactions
- 3D cricket player silhouettes with skeletal rigs
- Data overlays showing angles, balance, timing
- Camera movements synced to scroll

## Development

### Building for Production

**Frontend:**
```bash
cd frontend
npm run build
npm start
```

**Backend:**
The FastAPI backend is production-ready. For production deployment, consider:
- Using a production ASGI server like Gunicorn
- Setting up proper environment variables
- Implementing database connections
- Adding email service integration

## License

All rights reserved - CrickCoach AI

# CrickCoachAI_website
