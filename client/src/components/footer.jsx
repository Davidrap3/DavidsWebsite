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
                    <li className={styles.FooterIcons}><img className={styles.facebookIcon} src='icons/facebook.svg'></img></li>
                    <li className={styles.FooterIcons}><img src='icons/instagram.svg'></img></li>
                    <li className={styles.FooterIcons}><img src='icons/x.svg'></img></li>
                </ul>
            </div>
        </div>
    );
};

export default Footer;