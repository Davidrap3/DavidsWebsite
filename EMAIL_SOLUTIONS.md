# Email Solutions for Static Hosting

Since GitHub Pages can't run the Flask backend, you need an alternative for the contact form. Here are your options.

---

## Option 1: EmailJS (Recommended - Easiest)

EmailJS lets you send emails directly from JavaScript without a backend.

### Pros
- ✅ No backend/server needed
- ✅ Free tier: 200 emails/month
- ✅ Easy setup (10-15 minutes)
- ✅ Keeps your current form design
- ✅ Can send confirmation emails
- ✅ Works with Gmail

### Cons
- ❌ API keys visible in frontend (use Public Key feature)
- ❌ Limited on free tier

### Setup Instructions

**1. Create EmailJS Account**
- Go to https://www.emailjs.com/
- Sign up (free)
- Verify your email

**2. Add Email Service**
- Go to "Email Services"
- Click "Add New Service"
- Choose Gmail
- Connect your Gmail account
- Note the Service ID

**3. Create Email Template**
- Go to "Email Templates"
- Click "Create New Template"
- Create template for user confirmation:
```
Subject: Thank you for contacting The Golden Sail

Hi {{from_name}},

Thank you for your message! I've received your inquiry and will get back to you soon.

Best regards,
The Golden Sail
```

- Create template for yourself (notification):
```
Subject: New Contact Form Submission from {{from_name}}

You have a new message from your website:

Name: {{from_name}}
Email: {{reply_to}}
Subject: {{subject}}

Message:
{{message}}
```

- Note both Template IDs

**4. Get Your Public Key**
- Go to "Account" → "General"
- Copy your Public Key

**5. Install EmailJS in your project**
```bash
cd client
npm install @emailjs/browser
```

**6. Update contactEmail.jsx**

Replace the entire file with this code:

```jsx
import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import styles from './contactEmail.module.scss';

const ContactEmail = () => {
    const textAreaRef = useRef(null);
    const [emailInformation, setEmailInformation] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [focus, setFocus] = useState({
        name: false,
        email: false,
        subject: false,
        message: false
    });
    const [status, setStatus] = useState(''); // 'sending', 'success', 'error'

    // EmailJS Configuration
    const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
    const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // Template for you
    const EMAILJS_CONFIRMATION_TEMPLATE_ID = 'YOUR_CONFIRMATION_TEMPLATE_ID'; // Template for user
    const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmailInformation({...emailInformation, [name]: value });
    };

    const handleFocus = (field) => {
        setFocus((prev) => ({...focus, [field]: true}));
    };

    const handleBlur = (field) => {
        setFocus((prev) => ({...focus, [field]: false}));
    }

    const handleExpanding = () => {
        const textArea = textAreaRef.current;
        textArea.style.height = 'auto';
        textArea.style.height = `${textArea.scrollHeight}px`;
    }

    const clearEmailFields = () => {
        setEmailInformation({
            name: '',
            email: '',
            subject: '',
            message: ''
        });
        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto';
        }
    }

    const sendEmail = async (e) => {
        e.preventDefault();
        setStatus('sending');

        try {
            // Prepare template parameters
            const templateParams = {
                from_name: emailInformation.name,
                reply_to: emailInformation.email,
                subject: emailInformation.subject,
                message: emailInformation.message
            };

            // Send notification to you (the artist)
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                templateParams,
                EMAILJS_PUBLIC_KEY
            );

            // Send confirmation to user
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_CONFIRMATION_TEMPLATE_ID,
                templateParams,
                EMAILJS_PUBLIC_KEY
            );

            setStatus('success');
            clearEmailFields();

            // Clear success message after 3 seconds
            setTimeout(() => setStatus(''), 3000);
        } catch (error) {
            console.error('Error sending email:', error);
            setStatus('error');
            setTimeout(() => setStatus(''), 3000);
        }
    };

    return(
        <>
            <div className={styles.emailFormOuter}>
                <h1 className={styles.ContactTitle}>
                    Contact
                </h1>
                <form
                    className={styles.emailFormInner}
                    onSubmit={sendEmail}
                >
                    <div className={styles.emailRow}>
                        <div className={styles.nameEmail}>
                            <label className={focus.name ? styles.focusedLabel : styles.unFocussedLabel}>
                                Your Name
                            </label>
                            <input
                            className={styles.nameEmailInput}
                            type='text'
                            name='name'
                            placeholder='Enter your name'
                            value={emailInformation.name}
                            onChange={handleChange}
                            onFocus={() => handleFocus('name')}
                            onBlur={() => handleBlur('name')}
                            required
                            />
                        </div>
                        <div className={styles.emailEmail}>
                            <label className={focus.email ? styles.focusedLabel : styles.unFocussedLabel}>
                                Email Address
                            </label>
                            <input
                            className={styles.emailEmailInput}
                            type='email'
                            name='email'
                            placeholder='Enter your email address'
                            value={emailInformation.email}
                            onChange={handleChange}
                            onFocus={() => handleFocus('email')}
                            onBlur={() => handleBlur('email')}
                            required
                            />
                        </div>
                    </div>
                    <div className={styles.subjectEmail}>
                        <label className={focus.subject ? styles.focusedLabel : styles.unFocussedLabel}>Subject</label>
                        <input
                        className={styles.subjectEmailInput}
                        type='text'
                        name='subject'
                        placeholder='Subject'
                        value={emailInformation.subject}
                        onChange={handleChange}
                        onFocus={() => handleFocus('subject')}
                        onBlur={() => handleBlur('subject')}
                        required
                        />
                    </div>
                    <div className={styles.messageEmail}>
                        <label className={focus.message ? styles.focusedLabel : styles.unFocussedLabel}>Your Message</label>
                        <textarea
                        className={styles.messageEmailTextBox}
                        name='message'
                        placeholder='Hi, I think we need a design system for our products at Company X. How soon can you hop on to discuss this?'
                        value={emailInformation.message}
                        ref={textAreaRef}
                        onInput={handleExpanding}
                        onChange={handleChange}
                        onFocus={() => handleFocus('message')}
                        onBlur={() => handleBlur('message')}
                        required
                        />
                    </div>
                    {status && (
                        <div className={styles.statusMessage}>
                            {status === 'sending' && 'Sending...'}
                            {status === 'success' && '✓ Message sent successfully!'}
                            {status === 'error' && '✗ Failed to send message. Please try again.'}
                        </div>
                    )}
                    <div className={styles.EmailButtonsContainer}>
                        <i
                        className={`${styles.IconGarbageClear} fa-regular fa-trash-can`}
                        onClick={clearEmailFields}
                        type="button">
                        </i>
                        <button
                        className={`${styles.SendEmailBox}`}
                        type="submit"
                        disabled={status === 'sending'}>
                            <i className={`${styles.IconSendEmail} fa-solid fa-arrow-right`}></i>
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ContactEmail;
```

**7. Add CSS for status message**

Add to `contactEmail.module.scss`:
```scss
.statusMessage {
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
    text-align: center;
    font-size: 14px;
}

.statusMessage {
    &:has(text*="Sending") {
        background-color: #fff3cd;
        color: #856404;
    }
    &:has(text*="✓") {
        background-color: #d4edda;
        color: #155724;
    }
    &:has(text*="✗") {
        background-color: #f8d7da;
        color: #721c24;
    }
}
```

**8. Replace the placeholders**
In the code above, replace:
- `YOUR_SERVICE_ID` with your EmailJS Service ID
- `YOUR_TEMPLATE_ID` with your notification template ID
- `YOUR_CONFIRMATION_TEMPLATE_ID` with your confirmation template ID
- `YOUR_PUBLIC_KEY` with your EmailJS Public Key

**9. Test locally**
```bash
npm start
# Fill out the form and submit
```

**10. Deploy**
```bash
npm run build
npm run deploy
```

---

## Option 2: Formspree (Simplest - No Code Changes Needed)

Formspree handles form submissions and forwards to your email.

### Pros
- ✅ Easiest to set up (5 minutes)
- ✅ Free tier: 50 submissions/month
- ✅ No email service configuration
- ✅ Spam protection included

### Cons
- ❌ Shows Formspree branding on free tier
- ❌ Limited customization of confirmation emails

### Setup Instructions

**1. Create Formspree Account**
- Go to https://formspree.io/
- Sign up (free)

**2. Create New Form**
- Click "New Form"
- Name it "Contact Form"
- Copy the form endpoint URL (looks like `https://formspree.io/f/abcd1234`)

**3. Update contactEmail.jsx**

Replace the `sendEmail` function:

```jsx
const sendEmail = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
        const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: emailInformation.name,
                email: emailInformation.email,
                subject: emailInformation.subject,
                message: emailInformation.message
            })
        });

        if (response.ok) {
            setStatus('success');
            clearEmailFields();
            setTimeout(() => setStatus(''), 3000);
        } else {
            setStatus('error');
            setTimeout(() => setStatus(''), 3000);
        }
    } catch (error) {
        console.error('Error:', error);
        setStatus('error');
        setTimeout(() => setStatus(''), 3000);
    }
};
```

Replace `YOUR_FORM_ID` with your actual Formspree form ID.

---

## Option 3: Keep Flask Backend + Deploy to Render/Heroku

Keep your existing Python backend but host it separately.

### Pros
- ✅ No changes to existing code
- ✅ Full control over email logic
- ✅ Can add more backend features later

### Cons
- ❌ More complex setup
- ❌ Need to maintain backend server
- ❌ Free tiers may have cold starts (slow first load)

### Setup Instructions

**Using Render.com (Free)**

1. Create account at https://render.com/
2. Create new "Web Service"
3. Connect your GitHub repo
4. Set up:
   - Root Directory: `server/api`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn api:app`
5. Add environment variables:
   - `SENDER_EMAIL`
   - `APP_PASSWORD`
6. Deploy

**Update Frontend**

In `contactEmail.jsx`, change the API URL:
```jsx
const response = await axios.post('https://your-app.onrender.com/api/send-email', emailInformation, {
```

---

## Recommendation

**For your use case (art portfolio), I recommend EmailJS (Option 1)** because:

1. ✅ Free tier is generous (200 emails/month)
2. ✅ No backend to maintain
3. ✅ Works perfectly with GitHub Pages
4. ✅ Can still send confirmation emails to users
5. ✅ Easy for your friend to maintain

**Choose Formspree (Option 2)** if:
- You want the absolute easiest setup
- You don't need custom confirmation emails
- 50 emails/month is enough

**Choose Backend Option (Option 3)** if:
- You plan to add more server-side features
- You need complete control
- You're comfortable maintaining a backend

---

## Next Steps

1. Choose your preferred option
2. Follow the setup instructions above
3. Test the contact form locally
4. Deploy to GitHub Pages
5. Send yourself a test email

---

## Questions?

- **How do I know which emails are sent?** - EmailJS and Formspree both have dashboards showing submission history
- **Is it secure?** - Yes, all options use HTTPS. EmailJS public keys are safe to expose.
- **Can I switch later?** - Yes! You can change providers anytime by updating the contact form component.

Let me know which option you'd like to implement and I can help you set it up!
