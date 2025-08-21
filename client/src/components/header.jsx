import styles from './header.module.scss';
import { Link, useLocation } from "react-router-dom";

const Header = () => {
    return (
        <div className={styles.HeaderContainer}>
            <div className={styles.HeaderContainerInner}>
                <div className={styles.HeaderLeft}>
                    <img className= {styles.HeaderLogo} src='images/templogo.svg'></img>
                </div>
                <div className={styles.HeaderCenter}>
                    <p className={styles.HeaderTitle}>The Golden Sail</p>
                </div>
                <div className={styles.HeaderRight}>
                    <div className={styles.HeaderLinksContainer}>
                        <nav>
                            <ul className={styles.HeaderLinksInner}>
                                <li className={styles.HeaderLinks}><Link className={styles.LinkDecoration} to='/'>Home</Link></li>
                                <li className={styles.HeaderLinks}><Link className={styles.LinkDecoration} to='/About'>About</Link></li>
                                <li className={styles.HeaderLinks}><Link className={styles.LinkDecoration} to='/Gallery'>Gallery</Link></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;