import styles from './footer.module.scss';


const Footer = () => {
    return (
        <footer className={styles.Footer}>
            <div>

            </div>
            <div className={styles.CopyRightCenter}>
                <p>Copyright © 2025 Golden Sail</p>
            </div>
            <nav aria-label="Social media links">
                <ul className={styles.FooterContainer}>
                    <li className={styles.FooterIcons}>
                        <a href="#facebook" aria-label="Visit our Facebook page">
                            <img className={styles.facebookIcon} src={`${process.env.PUBLIC_URL}/icons/facebook.svg`} alt="" />
                        </a>
                    </li>
                    <li className={styles.FooterIcons}>
                        <a href="#instagram" aria-label="Visit our Instagram page">
                            <img src={`${process.env.PUBLIC_URL}/icons/instagram.svg`} alt="" />
                        </a>
                    </li>
                    <li className={styles.FooterIcons}>
                        <a href="#twitter" aria-label="Visit our X (Twitter) page">
                            <img src={`${process.env.PUBLIC_URL}/icons/x.svg`} alt="" />
                        </a>
                    </li>
                </ul>
            </nav>
        </footer>
    );
};

export default Footer;