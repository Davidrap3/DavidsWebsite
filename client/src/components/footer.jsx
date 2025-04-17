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
                <ul>
                    <li>FB</li>
                    <li>Insta</li>
                    <li>Mobile</li>
                </ul>
            </div>
        </div>
    );
};

export default Footer;