import styles from './footer.module.scss';


const Footer = () => {
    return (
        <div className={styles.Footer}>
            <div>
                <h2>Explore</h2>
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Gallery</li>
                </ul>
            </div>
            <div>
                <p>Copyright © 2024 Studio M23</p>
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