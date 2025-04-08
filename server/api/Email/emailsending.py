import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from Utility.logger import create_logger

class EmailSender:
    def __init__(self, smtp_server, smtp_port, sender_email, sender_password):
        self.smtp_server = smtp_server
        self.smtp_port = smtp_port
        self.sender_email = sender_email
        self.sender_password = sender_password
        
        
    def send_confirmation_email(self, recipient_email, name):
        context = ssl.create_default_context()
        
        logger = create_logger()
        logger.info("Testing Sending Confirm")
        try:
            confirm_msg = MIMEMultipart()
            confirm_msg['From'] = self.sender_email
            confirm_msg['To'] = recipient_email
            confirm_msg['Subject'] = "Thank you for contacting us!"
            confirm_body = f"""
                Hi {name},

                Thank you for reaching out. We have received your message and will respond shortly.

                Regards,
                Support Team
            """
            confirm_msg.attach(MIMEText(confirm_body, 'plain'))
            
            logger.info("Testing Sending Confirm")
            
            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                server.starttls(context=context)
                server.login(self.sender_email, self.sender_password)
                server.sendmail(self.sender_email, recipient_email, confirm_msg.as_string())
            
            return {'status': 'Success', 'message': 'Confirmation email sent successfully'}
        
        except Exception as e:
            return {'status': 'error', 'message': f'Failed to send confirmation email: {str(e)}'}
        
    
    def send_user_message(self, recipient_email, subject, message, name):
        context = ssl.create_default_context()

        logger = create_logger()
        logger.info("Testing Sending Confirm")
        
        try:
            user_msg = MIMEMultipart()
            user_msg['From'] = f"{name} <{recipient_email}>"
            user_msg['To'] = self.sender_email
            user_msg['Subject'] = f"New Message from {name}: {subject}"
            user_body = f"""
            From: {name} <{recipient_email}>
            Subject: {subject}

            {message}
            """
            user_msg.attach(MIMEText(user_body, 'plain'))

            with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                server.starttls(context=context)
                server.login(self.sender_email, self.sender_password)
                server.sendmail(self.sender_email, self.sender_email, user_msg.as_string())
            
            return {'status': 'Success', 'message': 'User message sent successfully to support team'}
        
        except Exception as e:
            return {'status': 'error', 'message': f'Failed to send user message: {str(e)}'}
    