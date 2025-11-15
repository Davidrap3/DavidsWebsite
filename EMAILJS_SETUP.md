# EmailJS Setup Instructions

This website now uses EmailJS for contact form submissions, which works with static hosting (GitHub Pages, Netlify, etc.) without requiring a backend server.

## Setup Steps

### 1. Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (200 emails/month)
3. Verify your email address

### 2. Add Email Service
1. Go to **Email Services** in the dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail recommended)
4. Follow the instructions to connect your email account
5. **Copy the Service ID** - you'll need this later

### 3. Create Email Template
1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Set up your template with these variables:
   ```
   From: {{from_name}} ({{from_email}})
   Subject: {{subject}}
   Message: {{message}}
   ```
4. Example template:
   ```
   New contact form submission from your website!

   Name: {{from_name}}
   Email: {{from_email}}
   Subject: {{subject}}

   Message:
   {{message}}
   ```
5. **Copy the Template ID** - you'll need this later
6. Save the template

### 4. Get Your Public Key
1. Go to **Account** > **General**
2. Find your **Public Key** (also called API Key)
3. **Copy the Public Key**

### 5. Configure Environment Variables

#### For Local Development:
Create a `.env` file in the `client` folder:
```bash
REACT_APP_EMAILJS_SERVICE_ID=your_service_id_here
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id_here
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key_here
```

#### For GitHub Pages:
You have two options:

**Option A: Use GitHub Secrets (Recommended)**
1. Go to your GitHub repository
2. Settings > Secrets and variables > Actions
3. Add these secrets:
   - `REACT_APP_EMAILJS_SERVICE_ID`
   - `REACT_APP_EMAILJS_TEMPLATE_ID`
   - `REACT_APP_EMAILJS_PUBLIC_KEY`

**Option B: Hardcode in the file (Less secure but simpler)**
Edit `client/src/components/contactEmail.jsx` and replace:
```javascript
const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';
```

With your actual values:
```javascript
const serviceID = 'service_xxxxxxx';
const templateID = 'template_xxxxxxx';
const publicKey = 'your_public_key_here';
```

Note: The public key is safe to expose in client-side code - that's why it's called "public key".

### 6. Test the Contact Form
1. Run your development server: `npm start`
2. Fill out the contact form
3. Submit and check:
   - Your browser console for success/error messages
   - Your EmailJS dashboard for sent emails
   - Your email inbox for the received message

## Security Notes
- The public key is meant to be exposed in client-side code
- EmailJS has built-in rate limiting and spam protection
- You can add additional security in EmailJS dashboard (domain whitelist, CAPTCHA, etc.)
- Free tier includes 200 emails/month, which is plenty for a portfolio site

## Troubleshooting

**Email not sending?**
- Check browser console for error messages
- Verify all three IDs are correct
- Make sure your EmailJS service is active
- Check your EmailJS dashboard for error logs

**Getting CORS errors?**
- EmailJS handles CORS automatically, but make sure you're using the correct public key
- Check that your domain is allowed in EmailJS settings

**Emails going to spam?**
- Add your sending email to your contacts
- Check EmailJS template settings
- Consider using a professional email service

## Free Tier Limits
- 200 emails per month
- 2 email services
- 2 email templates
- No credit card required

For most portfolio websites, this is more than enough!
