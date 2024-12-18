import { useState, useRef } from 'react';
import axios from 'axios';
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


    const sendEmail = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/send-email' , emailInformation, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            console.log(response.data);
        } catch (err) {
            console.log("Error Sending Email", err)
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
                    <div>
                        <button type="reset">Clear</button>
                        <button type="submit" >Send Email</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ContactEmail;