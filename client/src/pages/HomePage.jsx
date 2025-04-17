import styles from './HomePage.module.scss';
import Carousel from '../components/carousel';
import Footer from '../components/footer';
import ContactEmail from '../components/contactEmail';
import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import axios from 'axios';

const HomePage = () => {

    const [data, setData] = useState({
        description: "Default Description", 
        specialty: "Default Specialty",
        title: "Default Title"
    });
    const [counter, SetCounter] = useState(0);
    // Animation
    const [isVisible, setIsVisible] = useState(false);
    const [isSpecialtyVisible, setIsSpecialtyVisible] = useState(false);
    const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);

    const titleRef = useRef(null);
    const specialtyRef = useRef(null);
    const descriptionRef = useRef(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://127.0.0.1:5000/api/HomeData', {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (response.data && response.data[0]?.specialDescription?.[0]) {
                    const dataParsing = response.data[0].specialDescription[0]; 

                    setData((prevData) => ({
                        ...prevData,
                        description: dataParsing.description,
                        specialty: dataParsing.specialty,
                        title: dataParsing.title
                    }));
                }
                console.log(response.data);
            } catch (err) {
                console.log("No Data Supplied")
            }
        };

        fetchData();
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
                        <img className={styles.AboutImageSize} draggable="false" src='images/testingImages/testing6.jpg'/>
                    </div>
                </div>
            </div>
            <ContactEmail />        
            <Footer />
        </div>
    );
};

export default HomePage;