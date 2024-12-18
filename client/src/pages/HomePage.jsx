import styles from './HomePage.module.scss';
import Carousel from '../components/carousel';
import Footer from '../components/footer';
import ContactEmail from '../components/contactEmail';
import { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = () => {

    const [data, setData] = useState(null);
    const [counter, SetCounter] = useState(0);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://127.0.0.1:5000/api/HomeData', {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                setData(response.data);
                console.log(response.data);
            } catch (err) {
                setData(err.message);
            }
        };

        fetchData();
    }, []);

    


   
    if (!data || !data[0]?.specialDescription[0]) {
        return <div>Loading...</div>; 
    }

  
    const { description, specialty, title } = data[0].specialDescription[0];

    return (
        <div className={styles.container}>
            <div className={styles.carouselContainer}>
                <Carousel />
            </div>
            <div className={styles.AboutSection}>
                <section className={styles.AboutSectionText}>
                    <h1 className={styles.CanvasTitle}>{title}</h1>
                    <div className={styles.CanvasTextOuter}>
                        <p className={styles.CanvasSpecialty}>{specialty}​</p>
                        <p className={styles.CanvasDescription}>{description}</p>
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