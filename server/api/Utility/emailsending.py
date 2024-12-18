import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


class EmailSender:
    def __init__(self, smtp_server, smtp_port, sender_email, sender_password):
        self.smtp_server = smtp_server
        self.smtp_port = smtp_port
        self.sender_email = sender_email
        self.sender_password = sender_password
        
        
    def send_confirmation_email(self, recipients_email, name):
        """
        Function to send a confirmation email to the recipient.
        Args:
            recipient_email (str): Recipient's email address.
            name (str): Name of the sender (used in the confirmation message).
        """
        # Secure SSL Context
        context = ssl.create_default_context()
        
        try:
            confirm_msg = MIMEMultipart()
            confirm_msg['From'] = self.sender_email
            confirm_msg['To'] = recipients_email
            confirm_msg['Subject'] = "Thank you for contacting us!"
            confirm_body = f"""
                Hi {name},

                Thank you for reaching out. We have received your message and will respond shortly.

                Regards,
                Support Team
            """
            confirm_msg.attach(MIMEText(confirm_body, 'plain'))
            
            with smtplib.SMTP(self.smtp_server, self.smtp_port, context=context) as server:
                server.starttls()
                server.login(self.sender_email, self.sender_password)
                server.sendmail(self.sender_email, recipients_email, confirm_msg.as_string())
            
            return {'success': 'Success', 'message': 'Confirmation email sent successfully'}
        
        except Exception as e:
            return {'status': 'error', 'message': f'Failed to send confirmation email: {str(e)}'}
        
    
    def send_user_message(self, recipient_email, subject, message, name):
        """
        Function to send the user's message to the support team (sender's email).
        Args:
            recipient_email (str): The email address of the sender (the user).
            subject (str): Subject of the user's message.
            message (str): Content of the user's message.
            name (str): Name of the user (sender).
        """
        # Secure SSL Context
        context = ssl.create_default_context()

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

            with smtplib.SMTP(self.smtp_server, self.smtp_port, context=context) as server:
                server.starttls()
                server.login(self.sender_email, self.sender_password)
                server.sendmail(self.sender_email, self.sender_email, user_msg.as_string())
            
            return {'status': 'Success', 'message': 'User message sent successfully to support team'}
        
        except Exception as e:
            return {'status': 'error', 'message': f'Failed to send user message: {str(e)}'}
    