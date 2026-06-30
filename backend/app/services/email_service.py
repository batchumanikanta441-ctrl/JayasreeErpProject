import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from app.core.config import settings


def send_otp_email(receiver_email: str, otp: str):

    message = MIMEMultipart()

    message["From"] = settings.SMTP_EMAIL
    message["To"] = receiver_email
    message["Subject"] = "Jayasree ERP AI - Login OTP"

    body = f"""
Hello,

Your One Time Password (OTP) is:

{otp}

This OTP is valid for 5 minutes.

If you didn't request this OTP, please ignore this email.

Regards,
Jayasree ERP AI
"""

    message.attach(MIMEText(body, "plain"))
    try:
        server = smtplib.SMTP(settings.SMTP_SERVER, settings.SMTP_PORT)
        server.starttls()

        server.login(settings.SMTP_EMAIL, settings.SMTP_PASSWORD)

        server.sendmail(
            settings.SMTP_EMAIL,
            receiver_email,
            message.as_string()
        )

        server.quit()

    except Exception as e:
        # Log error but don't crash — OTP was still saved to DB
        print(f"Email delivery failed: {e}")