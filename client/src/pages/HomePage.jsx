import styles from './HomePage.module.scss';
import Carousel from '../components/carousel';
import Footer from '../components/footer';
import ContactEmail from '../components/contactEmail';
import { useEffect, useRef, useState } from 'react';

const HomePage = () => {

    const [data, setData] = useState({
        description: "Default Description",
        specialty: "Default Specialty",
        title: "Default Title"
    });
    // Animation
    const [isVisible, setIsVisible] = useState(false);
    const [isSpecialtyVisible, setIsSpecialtyVisible] = useState(false);
    const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);

    const titleRef = useRef(null);
    const specialtyRef = useRef(null);
    const descriptionRef = useRef(null);

    useEffect(() => {
        // Load site content from JSON file
        fetch(`${process.env.PUBLIC_URL}/data/siteContent.json`)
            .then(response => response.json())
            .then(content => {
                if (content.artistInfo) {
                    setData({
                        description: content.artistInfo.specialty,
                        specialty: content.artistInfo.specialty,
                        title: content.artistInfo.title
                    });
                }
            })
            .catch(error => console.error('Error loading site content:', error));
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (entry.target === titleRef.current) {
                            setIsVisible(true);
                        } else if (entry.target === descriptionRef.current) {
                            setIsDescriptionVisible(true);
                        } else if (entry.target === specialtyRef.current) {
                            setIsSpecialtyVisible(true)
                        }
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (titleRef.current) observer.observe(titleRef.current);
        if (specialtyRef.current) observer.observe(specialtyRef.current);
        if (descriptionRef.current) observer.observe(descriptionRef.current);

        return () => observer.disconnect();
        
    }, [data]);
    
    return (
        <div className={styles.container}>
            <div className={styles.carouselContainer}>
                <Carousel />
            </div>
            <div className={styles.AboutSection}>
                <section className={styles.AboutSectionText}>
                    <h1 
                    ref={titleRef} 
                    className={`${styles.CanvasTitle} ${isVisible ? styles.Animate : ''}`}>
                        {data.title}
                    </h1>
                    <div className={styles.CanvasTextOuter}>
                        <p 
                        ref={specialtyRef}
                        className={`${styles.CanvasSpecialty} ${isSpecialtyVisible ? styles.Animate : ''}`}>
                            {data.specialty}
                        ​</p>
                        <p
                        ref={descriptionRef}
                        className={`${styles.CanvasDescription} ${isDescriptionVisible ? styles.Animate : ''}`}>
                            {data.description}
                        </p>
                    </div>
                </section>
                <div className={styles.AboutImageContainer}>
                    <div className={styles.AboutImageBorder}>
                        <img className={styles.AboutImageSize} draggable="false" src={`${process.env.PUBLIC_URL}/images/testingImages/testing6.jpg`} alt="Artwork" loading="lazy"/>
                    </div>
                </div>
            </div>
            <ContactEmail />        
            <Footer />
        </div>
    );
};

export default HomePage;