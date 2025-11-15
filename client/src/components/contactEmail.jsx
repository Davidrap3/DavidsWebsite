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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmailInformation({...emailInformation, [name]: value });
    };

    const handleFocus = (field) => {
        console.log("Test")
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
            alert('Email sent successfully!');
            clearEmailFields();
        } catch (err) {
            console.log("Error Sending Email", err);
            alert('Failed to send email. Please try again.');
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
                        />
                    </div>
                    <div className={styles.EmailButtonsContainer}>
                        <i 
                        className={`${styles.IconGarbageClear} fa-regular fa-trash-can`} 
                        onClick={clearEmailFields}>
                        </i> 
                        <button className={`${styles.SendEmailBox}`} type="submit" >
                            <i className={`${styles.IconSendEmail} fa-solid fa-arrow-right`}></i>
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ContactEmail;