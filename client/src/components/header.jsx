import styles from './header.module.scss';
import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <header className={styles.HeaderContainer}>
            <div className={styles.HeaderContainerInner}>
                <div className={styles.HeaderLeft}>
                    <img className= {styles.HeaderLogo} src={`${process.env.PUBLIC_URL}/images/templogo.svg`} alt="The Golden Sail Logo"></img>
                </div>
                <div className={styles.HeaderCenter}>
                    <h1 className={styles.HeaderTitle}>The Golden Sail</h1>
                </div>
                <nav className={styles.HeaderRight}>
                    <div className={styles.HeaderLinksContainer}>
                        <ul className={styles.HeaderLinksInner}>
                            <li className={styles.HeaderLinks}><NavLink className={({isActive}) => isActive ? `${styles.LinkDecoration} ${styles.ActiveLink}` : styles.LinkDecoration} to='/'>Home</NavLink></li>
                            <li className={styles.HeaderLinks}><NavLink className={({isActive}) => isActive ? `${styles.LinkDecoration} ${styles.ActiveLink}` : styles.LinkDecoration} to='/About'>About</NavLink></li>
                            <li className={styles.HeaderLinks}><NavLink className={({isActive}) => isActive ? `${styles.LinkDecoration} ${styles.ActiveLink}` : styles.LinkDecoration} to='/Gallery'>Gallery</NavLink></li>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;