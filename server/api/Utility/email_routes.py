from flask import Blueprint, request, jsonify
from .emailsending import EmailSender
import os

# Email BluePrint
email_bp = Blueprint('email', __name__)

email_sender = EmailSender(
    smtp_server="smtp.gmail.com",
    smtp_port=587,
    sender_email=os.environ.get('SENDER_EMAIL'),
    sender_password=os.environ.get('SENDER_PASSWORD')
)

@email_bp.route('/send-email', methods=['POST'])
def send_email():
    data = request.json
    name = data.get('name')
    recipient_email = data.get('email')
    subject = data.get('subject')
    message = data.get('message')

    # Send confirmation email to the user
    confirmation_response = email_sender.send_confirmation_email(
        recipient_email=recipient_email,
        name=name
    )
    
    # Send the user's message to the support team
    user_message_response = email_sender.send_user_message(
        recipient_email=recipient_email,
        subject=subject,
        message=message,
        name=name
    )

    # If both emails were successful, return a success response
    if confirmation_response['status'] == 'Success' and user_message_response['status'] == 'Success':
        return jsonify({"status": "success", "message": "Emails sent successfully!"}), 200
    else:
        return jsonify({
            "status": "error",
            "message": f"Failed to send emails: {confirmation_response['message']} | {user_message_response['message']}"
        }), 500
    