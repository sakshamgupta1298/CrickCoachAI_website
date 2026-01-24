from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import Optional
import os
from dotenv import load_dotenv
from fastapi import BackgroundTasks
from email.message import EmailMessage
import smtplib
import traceback

load_dotenv()

app = FastAPI(
    title="CrickCoach AI API",
    description="Backend API for CrickCoach AI platform",
    version="1.0.0"
)

# CORS middleware
cors_allow_origins_env = os.getenv("CORS_ALLOW_ORIGINS", "").strip()
cors_allow_origins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://209.38.123.167",
    "http://209.38.123.167:3000",
    "http://crickcoachai.com",
    "http://www.crickcoachai.com",
    "https://crickcoachai.com",
    "https://www.crickcoachai.com",
]
if cors_allow_origins_env:
    cors_allow_origins = [o.strip() for o in cors_allow_origins_env.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    # In production, set CORS_ALLOW_ORIGINS as a comma-separated list.
    allow_origins=cors_allow_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class PartnershipInquiry(BaseModel):
    name: str
    email: EmailStr
    organization: Optional[str] = None
    message: str
    inquiry_type: str  # "academy", "club", "coach", "other"

class AppDownloadRequest(BaseModel):
    email: EmailStr
    name: Optional[str] = None


def _send_apk_email(to_email: str) -> None:
    """
    Sends a download link for the Android APK via email.
    Requires SMTP_* env vars configured.
    """
    # SMTP2GO hardcoded settings
    smtp_host = "mail.smtp2go.com"
    smtp_port = 2525  # SMTP2GO default port
    smtp_user = "elevateai.co.in"
    smtp_password = "2btuslti469KsVv7"
    from_email = "CrickCoach AI <noreply@crickcoachai.com>"  # Verified domain

    # Google Drive download link
    download_link = "https://drive.google.com/file/d/1rKe4n6eoHsierxhO2TzuphkzxqzvJXY4/view?usp=sharing"
    # Direct download link (alternative format)
    file_id = "1rKe4n6eoHsierxhO2TzuphkzxqzvJXY4"
    direct_download_link = f"https://drive.google.com/uc?export=download&id={file_id}"

    if not smtp_host or not smtp_user or not smtp_password or not from_email:
        raise RuntimeError("SMTP is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD (and optionally SMTP_FROM).")

    msg = EmailMessage()
    msg["Subject"] = "CrickCoach AI — Android APK Download"
    msg["From"] = from_email
    msg["To"] = to_email
    
    # Create both plain text and HTML versions
    plain_text = f"""Thanks for your interest in CrickCoach AI!

Download the latest Android APK from the link below:

{download_link}

Direct Download Link:
{direct_download_link}

Installation Instructions:
1. Click on the download link above
2. Download the APK file to your Android device
3. Enable "Install from Unknown Sources" in your device settings if prompted
4. Open the downloaded APK file and follow the installation prompts

If you have any issues installing it, reply to this email.

Best regards,
CrickCoach AI Team"""
    
    html_content = f"""<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: #2c3e50;">Thanks for your interest in CrickCoach AI!</h2>
    
    <p>Download the latest Android APK from the link below:</p>
    
    <p style="margin: 20px 0;">
        <a href="{download_link}" 
           style="display: inline-block; padding: 12px 24px; background-color: #3498db; 
                  color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
            Download CrickCoach AI APK
        </a>
    </p>
    
    <p>Or use this direct download link:</p>
    <p><a href="{direct_download_link}" style="color: #3498db;">{direct_download_link}</a></p>
    
    <h3 style="color: #2c3e50; margin-top: 30px;">Installation Instructions:</h3>
    <ol style="line-height: 2;">
        <li>Click on the download link above</li>
        <li>Download the APK file to your Android device</li>
        <li>Enable "Install from Unknown Sources" in your device settings if prompted</li>
        <li>Open the downloaded APK file and follow the installation prompts</li>
    </ol>
    
    <p style="margin-top: 30px; color: #7f8c8d;">
        If you have any issues installing it, reply to this email.
    </p>
    
    <p style="margin-top: 20px;">
        Best regards,<br>
        <strong>CrickCoach AI Team</strong>
    </p>
</body>
</html>"""
    
    msg.set_content(plain_text)
    msg.add_alternative(html_content, subtype='html')

    # SMTP2GO SSL ports: 465, 8465, 443
    # TLS ports: 2525 (default), 8025, 587, 80, 25
    ssl_ports = [465, 8465, 443]
    
    try:
        if smtp_port in ssl_ports:
            # Use SSL connection for SSL ports
            with smtplib.SMTP_SSL(smtp_host, smtp_port, timeout=30) as server:
                server.login(smtp_user, smtp_password)
                server.send_message(msg)
        else:
            # Use TLS connection for TLS ports
            with smtplib.SMTP(smtp_host, smtp_port, timeout=30) as server:
                server.set_debuglevel(0)  # Set to 1 for debugging
                server.starttls()
                server.login(smtp_user, smtp_password)
                server.send_message(msg)
    except smtplib.SMTPAuthenticationError as e:
        error_msg = f"SMTP Authentication failed. Check your username and password. Error: {e}"
        print(f"[SMTP ERROR] {error_msg}")
        print(f"[SMTP DEBUG] Host: {smtp_host}, Port: {smtp_port}, User: {smtp_user}")
        raise RuntimeError(error_msg) from e
    except smtplib.SMTPSenderRefused as e:
        # Handle sender errors
        error_msg = f"SMTP sender error: {e}"
        print(f"[SMTP ERROR] {error_msg}")
        raise RuntimeError(error_msg) from e
    except Exception as e:
        error_msg = f"Failed to send email via SMTP2GO: {e}"
        print(f"[SMTP ERROR] {error_msg}")
        raise RuntimeError(error_msg) from e


def _send_apk_email_safe(to_email: str) -> None:
    """BackgroundTasks helper: never raises (so failures are logged instead of swallowed)."""
    try:
        _send_apk_email(to_email)
        print(f"[app-download] APK email sent to {to_email}")
    except Exception as e:
        print(f"[app-download] FAILED to send APK email to {to_email}: {e}")
        traceback.print_exc()

def _send_partnership_inquiry_email(inquiry: PartnershipInquiry) -> None:
    """
    Sends partnership inquiry email to admin@crickcoachai.com with all form details.
    """
    # SMTP2GO hardcoded settings
    smtp_host = "mail.smtp2go.com"
    smtp_port = 2525  # SMTP2GO default port
    smtp_user = "elevateai.co.in"
    smtp_password = "2btuslti469KsVv7"
    from_email = "CrickCoach AI <noreply@crickcoachai.com>"  # Verified domain
    admin_email = "admin@crickcoachai.com"

    if not smtp_host or not smtp_user or not smtp_password or not from_email:
        raise RuntimeError("SMTP is not configured.")

    # Map inquiry types to readable labels
    inquiry_type_labels = {
        "academy": "Cricket Academy",
        "club": "Cricket Club",
        "coach": "Individual Coach",
        "other": "Other"
    }
    inquiry_type_label = inquiry_type_labels.get(inquiry.inquiry_type, inquiry.inquiry_type)

    msg = EmailMessage()
    msg["Subject"] = "Inquiry Regarding CrickCoach AI"
    msg["From"] = from_email
    msg["To"] = admin_email
    msg["Reply-To"] = inquiry.email  # So admin can reply directly to the inquirer
    
    # Create both plain text and HTML versions
    plain_text = f"""New Partnership Inquiry Received

Inquiry Type: {inquiry_type_label}
Name: {inquiry.name}
Email: {inquiry.email}
Organization: {inquiry.organization if inquiry.organization else 'Not provided'}

Message:
{inquiry.message}

---
You can reply directly to this email to respond to {inquiry.name} at {inquiry.email}."""

    html_content = f"""<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: #2c3e50;">New Partnership Inquiry Received</h2>
    
    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr>
            <td style="padding: 8px; background-color: #f4f4f4; font-weight: bold; width: 150px;">Inquiry Type:</td>
            <td style="padding: 8px;">{inquiry_type_label}</td>
        </tr>
        <tr>
            <td style="padding: 8px; background-color: #f4f4f4; font-weight: bold;">Name:</td>
            <td style="padding: 8px;">{inquiry.name}</td>
        </tr>
        <tr>
            <td style="padding: 8px; background-color: #f4f4f4; font-weight: bold;">Email:</td>
            <td style="padding: 8px;"><a href="mailto:{inquiry.email}" style="color: #3498db;">{inquiry.email}</a></td>
        </tr>
        <tr>
            <td style="padding: 8px; background-color: #f4f4f4; font-weight: bold;">Organization:</td>
            <td style="padding: 8px;">{inquiry.organization if inquiry.organization else 'Not provided'}</td>
        </tr>
    </table>
    
    <h3 style="color: #2c3e50; margin-top: 30px;">Message:</h3>
    <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #3498db; margin: 20px 0;">
        <p style="white-space: pre-wrap; margin: 0;">{inquiry.message}</p>
    </div>
    
    <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #7f8c8d;">
        You can reply directly to this email to respond to <strong>{inquiry.name}</strong> at 
        <a href="mailto:{inquiry.email}" style="color: #3498db;">{inquiry.email}</a>.
    </p>
</body>
</html>"""
    
    msg.set_content(plain_text)
    msg.add_alternative(html_content, subtype='html')

    # SMTP2GO SSL ports: 465, 8465, 443
    # TLS ports: 2525 (default), 8025, 587, 80, 25
    ssl_ports = [465, 8465, 443]
    
    try:
        if smtp_port in ssl_ports:
            # Use SSL connection for SSL ports
            with smtplib.SMTP_SSL(smtp_host, smtp_port, timeout=30) as server:
                server.login(smtp_user, smtp_password)
                server.send_message(msg)
        else:
            # Use TLS connection for TLS ports
            with smtplib.SMTP(smtp_host, smtp_port, timeout=30) as server:
                server.set_debuglevel(0)
                server.starttls()
                server.login(smtp_user, smtp_password)
                server.send_message(msg)
    except smtplib.SMTPAuthenticationError as e:
        error_msg = f"SMTP Authentication failed. Check your username and password. Error: {e}"
        print(f"[SMTP ERROR] {error_msg}")
        print(f"[SMTP DEBUG] Host: {smtp_host}, Port: {smtp_port}, User: {smtp_user}")
        raise RuntimeError(error_msg) from e
    except smtplib.SMTPSenderRefused as e:
        error_msg = f"SMTP sender error: {e}"
        print(f"[SMTP ERROR] {error_msg}")
        raise RuntimeError(error_msg) from e
    except Exception as e:
        error_msg = f"Failed to send partnership inquiry email via SMTP2GO: {e}"
        print(f"[SMTP ERROR] {error_msg}")
        raise RuntimeError(error_msg) from e

def _send_partnership_inquiry_email_safe(inquiry: PartnershipInquiry) -> None:
    """BackgroundTasks helper: never raises (so failures are logged instead of swallowed)."""
    try:
        _send_partnership_inquiry_email(inquiry)
        print(f"[partnership-inquiry] Email sent to admin@crickcoachai.com for inquiry from {inquiry.email}")
    except Exception as e:
        print(f"[partnership-inquiry] FAILED to send email for inquiry from {inquiry.email}: {e}")
        traceback.print_exc()

def _send_contact_form_email(contact: ContactForm) -> None:
    """
    Sends contact form email to admin@crickcoachai.com with all form details.
    """
    # SMTP2GO hardcoded settings
    smtp_host = "mail.smtp2go.com"
    smtp_port = 2525  # SMTP2GO default port
    smtp_user = "elevateai.co.in"
    smtp_password = "2btuslti469KsVv7"
    from_email = "CrickCoach AI <noreply@crickcoachai.com>"  # Verified domain
    admin_email = "admin@crickcoachai.com"

    if not smtp_host or not smtp_user or not smtp_password or not from_email:
        raise RuntimeError("SMTP is not configured.")

    msg = EmailMessage()
    msg["Subject"] = f"Contact Form: {contact.subject}"
    msg["From"] = from_email
    msg["To"] = admin_email
    msg["Reply-To"] = contact.email  # So admin can reply directly to the sender
    
    # Create both plain text and HTML versions
    plain_text = f"""New Contact Form Submission

Subject: {contact.subject}
Name: {contact.name}
Email: {contact.email}

Message:
{contact.message}

---
You can reply directly to this email to respond to {contact.name} at {contact.email}."""

    html_content = f"""<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: #2c3e50;">New Contact Form Submission</h2>
    
    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr>
            <td style="padding: 8px; background-color: #f4f4f4; font-weight: bold; width: 150px;">Subject:</td>
            <td style="padding: 8px;">{contact.subject}</td>
        </tr>
        <tr>
            <td style="padding: 8px; background-color: #f4f4f4; font-weight: bold;">Name:</td>
            <td style="padding: 8px;">{contact.name}</td>
        </tr>
        <tr>
            <td style="padding: 8px; background-color: #f4f4f4; font-weight: bold;">Email:</td>
            <td style="padding: 8px;"><a href="mailto:{contact.email}" style="color: #3498db;">{contact.email}</a></td>
        </tr>
    </table>
    
    <h3 style="color: #2c3e50; margin-top: 30px;">Message:</h3>
    <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #3498db; margin: 20px 0;">
        <p style="white-space: pre-wrap; margin: 0;">{contact.message}</p>
    </div>
    
    <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #7f8c8d;">
        You can reply directly to this email to respond to <strong>{contact.name}</strong> at 
        <a href="mailto:{contact.email}" style="color: #3498db;">{contact.email}</a>.
    </p>
</body>
</html>"""
    
    msg.set_content(plain_text)
    msg.add_alternative(html_content, subtype='html')

    # SMTP2GO SSL ports: 465, 8465, 443
    # TLS ports: 2525 (default), 8025, 587, 80, 25
    ssl_ports = [465, 8465, 443]
    
    try:
        if smtp_port in ssl_ports:
            # Use SSL connection for SSL ports
            with smtplib.SMTP_SSL(smtp_host, smtp_port, timeout=30) as server:
                server.login(smtp_user, smtp_password)
                server.send_message(msg)
        else:
            # Use TLS connection for TLS ports
            with smtplib.SMTP(smtp_host, smtp_port, timeout=30) as server:
                server.set_debuglevel(0)
                server.starttls()
                server.login(smtp_user, smtp_password)
                server.send_message(msg)
    except smtplib.SMTPAuthenticationError as e:
        error_msg = f"SMTP Authentication failed. Check your username and password. Error: {e}"
        print(f"[SMTP ERROR] {error_msg}")
        print(f"[SMTP DEBUG] Host: {smtp_host}, Port: {smtp_port}, User: {smtp_user}")
        raise RuntimeError(error_msg) from e
    except smtplib.SMTPSenderRefused as e:
        error_msg = f"SMTP sender error: {e}"
        print(f"[SMTP ERROR] {error_msg}")
        raise RuntimeError(error_msg) from e
    except Exception as e:
        error_msg = f"Failed to send contact form email via SMTP2GO: {e}"
        print(f"[SMTP ERROR] {error_msg}")
        raise RuntimeError(error_msg) from e

def _send_contact_form_email_safe(contact: ContactForm) -> None:
    """BackgroundTasks helper: never raises (so failures are logged instead of swallowed)."""
    try:
        _send_contact_form_email(contact)
        print(f"[contact-form] Email sent to admin@crickcoachai.com for contact from {contact.email}")
    except Exception as e:
        print(f"[contact-form] FAILED to send email for contact from {contact.email}: {e}")
        traceback.print_exc()

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

@app.get("/")
async def root():
    return {
        "message": "CrickCoach AI API",
        "status": "operational",
        "version": "1.0.0"
    }

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}

@app.get("/api/check-config")
async def check_config():
    """
    Diagnostic endpoint to check if email and download link configuration is set up correctly.
    """
    config_status = {
        "smtp_configured": False,
        "download_link_configured": False,
        "errors": []
    }
    
    # Check SMTP config (hardcoded in the function, but we can verify it's set)
    # SMTP is hardcoded, so it's always configured
    config_status["smtp_configured"] = True
    
    # Check download link (hardcoded in the function)
    download_link = "https://drive.google.com/file/d/1rKe4n6eoHsierxhO2TzuphkzxqzvJXY4/view?usp=sharing"
    if download_link:
        config_status["download_link_configured"] = True
        config_status["download_link"] = download_link
    else:
        config_status["errors"].append("Download link not configured")
    
    return config_status

@app.post("/api/partnership-inquiry")
async def submit_partnership_inquiry(inquiry: PartnershipInquiry, background_tasks: BackgroundTasks):
    """
    Submit a partnership inquiry from academies, clubs, or coaches.
    Sends email notification to admin@crickcoachai.com.
    """
    try:
        # Send email notification to admin
        send_mode = os.getenv("EMAIL_SEND_MODE", "sync").lower().strip()
        if send_mode == "background":
            background_tasks.add_task(_send_partnership_inquiry_email_safe, inquiry)
        else:
            _send_partnership_inquiry_email(inquiry)
        
        return {
            "status": "success",
            "message": "Thank you for your interest. We'll be in touch soon.",
            "inquiry_id": f"INQ-{hash(inquiry.email) % 10000}"
        }
    except Exception as e:
        error_msg = str(e)
        error_trace = traceback.format_exc()
        print(f"[ERROR] Failed to send partnership inquiry email:")
        print(error_trace)
        raise HTTPException(status_code=500, detail=f"Failed to submit inquiry: {error_msg}")

@app.post("/api/app-download")
async def request_app_download(request: AppDownloadRequest, background_tasks: BackgroundTasks):
    """
    Handle app download requests and email the Android APK.
    """
    try:
        # In dev, it's better to fail loudly so the UI doesn't claim success when SMTP fails.
        # Set EMAIL_SEND_MODE=background to queue sending after returning the response.
        send_mode = os.getenv("EMAIL_SEND_MODE", "sync").lower().strip()
        if send_mode == "background":
            background_tasks.add_task(_send_apk_email_safe, str(request.email))
        else:
            _send_apk_email(str(request.email))
        return {
            "status": "success",
            "message": "APK sent to your email."
        }
    except Exception as e:
        # Log full error details for debugging
        error_msg = str(e)
        error_trace = traceback.format_exc()
        print(f"[ERROR] Failed to send APK email to {request.email}:")
        print(error_trace)
        raise HTTPException(status_code=500, detail=f"Failed to send email: {error_msg}")

@app.post("/api/contact")
async def submit_contact_form(contact: ContactForm, background_tasks: BackgroundTasks):
    """
    General contact form submission.
    Sends email notification to admin@crickcoachai.com.
    """
    try:
        # Send email notification to admin
        send_mode = os.getenv("EMAIL_SEND_MODE", "sync").lower().strip()
        if send_mode == "background":
            background_tasks.add_task(_send_contact_form_email_safe, contact)
        else:
            _send_contact_form_email(contact)
        
        return {
            "status": "success",
            "message": "Thank you for reaching out. We'll respond shortly."
        }
    except Exception as e:
        error_msg = str(e)
        error_trace = traceback.format_exc()
        print(f"[ERROR] Failed to send contact form email:")
        print(error_trace)
        raise HTTPException(status_code=500, detail=f"Failed to submit contact form: {error_msg}")

@app.get("/api/stats")
async def get_platform_stats():
    """
    Return platform statistics for display on website.
    """
    return {
        "players_coached": 12500,
        "videos_analyzed": 45000,
        "coaches_using": 320,
        "academies_partnered": 45,
        "avg_improvement": "23%"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

