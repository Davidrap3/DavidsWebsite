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
    const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

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
    }


    const sendEmail = async (e) => {
        setIsSubmitting(true);
        setSubmitStatus({ type: '', message: '' });

        try {
            // EmailJS configuration - replace these with your actual values from emailjs.com
            const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
            const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
            const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

            // Send email using EmailJS
            const response = await emailjs.send(
                serviceID,
                templateID,
                {
                    from_name: emailInformation.name,
                    from_email: emailInformation.email,
                    subject: emailInformation.subject,
                    message: emailInformation.message,
                },
                publicKey
            );

            console.log('Email sent successfully:', response);
            setSubmitStatus({
                type: 'success',
                message: 'Thank you! Your message has been sent successfully.'
            });
            clearEmailFields();
        } catch (err) {
            console.error("Error Sending Email", err);
            setSubmitStatus({
                type: 'error',
                message: 'Failed to send email. Please try again or contact us directly.'
            });
        } finally {
            setIsSubmitting(false);
        }
    }


    return(
        <>
            <div className={styles.emailFormOuter}>
                <h1 className={styles.ContactTitle}>
                    Contact
                </h1>
                <form 
                    className={styles.emailFormInner}
                    onSubmit={(e) => {
                        e.preventDefault();
                        sendEmail();
                    }}
                >
                    <div className={styles.emailRow}>
                        <div className={styles.nameEmail}>
                            <label
                                htmlFor="contact-name"
                                className={focus.name ? styles.focusedLabel : styles.unFocussedLabel}
                            >
                                Your Name
                            </label>
                            <input
                            id="contact-name"
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
                            <label
                                htmlFor="contact-email"
                                className={focus.email ? styles.focusedLabel : styles.unFocussedLabel}
                            >
                                Email Address
                            </label>
                            <input
                            id="contact-email"
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
                        <label
                            htmlFor="contact-subject"
                            className={focus.subject ? styles.focusedLabel : styles.unFocussedLabel}
                        >
                            Subject
                        </label>
                        <input
                        id="contact-subject"
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
                        <label
                            htmlFor="contact-message"
                            className={focus.message ? styles.focusedLabel : styles.unFocussedLabel}
                        >
                            Your Message
                        </label>
                        <textarea
                        id="contact-message"
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
                    {submitStatus.message && (
                        <div className={submitStatus.type === 'success' ? styles.SuccessMessage : styles.ErrorMessage} role="alert">
                            {submitStatus.message}
                        </div>
                    )}
                    <div className={styles.EmailButtonsContainer}>
                        <button
                            type="button"
                            className={`${styles.IconGarbageClear} fa-regular fa-trash-can`}
                            onClick={clearEmailFields}
                            aria-label="Clear form"
                            disabled={isSubmitting}
                        >
                        </button>
                        <button className={`${styles.SendEmailBox}`} type="submit" aria-label="Send message" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <i className={`${styles.IconSendEmail} fa-solid fa-spinner fa-spin`} aria-hidden="true"></i>
                            ) : (
                                <i className={`${styles.IconSendEmail} fa-solid fa-arrow-right`} aria-hidden="true"></i>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ContactEmail;