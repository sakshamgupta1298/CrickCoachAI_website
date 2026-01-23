# CrickCoach AI Backend

FastAPI backend for CrickCoach AI platform.

## Quick Start

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run server
uvicorn main:app --reload
```

## API Documentation

Once the server is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Environment Variables

Create a `.env` file in the `backend/` directory (use `backend/config.example` as a reference).

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=CrickCoach AI <your-email@gmail.com>

# Default is: backend/assets/CrickCoachAI.apk
APK_PATH=/absolute/path/to/CrickCoachAI.apk
```

Place your APK at `backend/assets/CrickCoachAI.apk` (see `backend/assets/README.md`).

## Endpoints

### Health Check
- `GET /api/health` - Returns API health status

### Statistics
- `GET /api/stats` - Returns platform statistics

### App Download
- `POST /api/app-download` - Emails the Android APK as an attachment
  - Body: `{ "email": "user@example.com" }`

### Partnership Inquiry
- `POST /api/partnership-inquiry` - Submit partnership inquiry
  - Body: `{ "name": "...", "email": "...", "organization": "...", "message": "...", "inquiry_type": "academy" | "club" | "coach" | "other" }`

### Contact
- `POST /api/contact` - General contact form
  - Body: `{ "name": "...", "email": "...", "subject": "...", "message": "..." }`

## Production Deployment

For production, consider:
1. Using environment variables for sensitive data
2. Implementing proper email service (SendGrid, AWS SES, etc.)
3. Adding database for persistent storage
4. Setting up proper CORS origins
5. Implementing rate limiting
6. Adding authentication if needed

