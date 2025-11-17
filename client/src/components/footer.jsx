import styles from './footer.module.scss';


const Footer = () => {
    return (
        <div className={styles.Footer}>
            <div>
                
            </div>
            <div className={styles.CopyRightCenter}>
                <p>Copyright © 2025 Golden Sail</p>
            </div>
            <div>
                <ul className={styles.FooterContainer}>
                    <li className={styles.FooterIcons}><img className={styles.facebookIcon} src={`${process.env.PUBLIC_URL}/icons/facebook.svg`} alt="Facebook"></img></li>
                    <li className={styles.FooterIcons}><img src={`${process.env.PUBLIC_URL}/icons/instagram.svg`} alt="Instagram"></img></li>
                    <li className={styles.FooterIcons}><img src={`${process.env.PUBLIC_URL}/icons/x.svg`} alt="X (Twitter)"></img></li>
                </ul>
            </div>
        </div>
    );
};

export default Footer;