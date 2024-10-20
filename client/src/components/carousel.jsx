import { useEffect, useState } from 'react';
import styles from './carousel.module.scss';

const Carousel = () => {

    const tempInfo = [
        {
            id: 1,
            artName: "Samurai",
            artImage: "images/testingImages/testing1.jpg",
            description: "Text",
            details: [ 
                {
                    dimensions: "24 x 36",
                    concept: "Fairytale come to life",
                    year: " 2023"
                }
            ]
        },
        {
            id: 2,
            artName: "Ship",
            artImage: "images/testingImages/testing4.jpg",
            description: "Text",
            details: [ 
                {
                    dimensions: "38 x 48​ x 26 cm",
                    concept: "Negative Space",
                    year: " 2024"
                }
            ]
        },
        {
            id: 3,
            artName: "d​ynasty",
            artImage: "images/testingImages/testing5.jpg",
            description: "Text",
            details: [ 
                {
                    dimensions: "30 x 40",
                    concept: "Movement",
                    year: " 2023"
                }
            ]
        }
    ]

    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchPosition, setTouchPosition] = useState(null);
    const [pause, setPause] = useState(false);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % tempInfo.length)
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + tempInfo.length) % tempInfo.length)
    };

    const handleTouchStart = (e) => {
        const touchDown = e.touches[0].clientX;
        setTouchPosition(touchDown);
    }

    const handleTouchMove = (e) => {
        if (touchPosition === null) {
            return;
        }

        const currentTouch = e.touches[0].clientX;
        const diff = touchPosition - currentTouch;

        if (diff > 5) {
            nextSlide();
        }

        if (diff < -5) {
            prevSlide();
        }

        setTouchPosition(null);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (!pause) {
                nextSlide(currentIndex + 1);
            }
        }, 10000);

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        }
    })


    return(
        <div className={styles.CarouselContainer}
        onMouseEnter={() => setPause(true)}
        onMouseLeave={() => setPause(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}>
            <div className={styles.CarouselAuthor}>
                <p className={styles.CarouselTitle}>
                  The<br/>
                  Golden<br/>
                  Sail  
                </p>
                <p className={styles.CarouselArtist}>
                    Artist
                </p>
                <p className={styles.AuthorDescription}>
                I've been sculpting professionally for eight ​years with my work (Golden Sail) being dis​played in the 2024 summer exhibition​ of the Royal Academy of arts. While being​ an artist is a difficult tug-of-war b​etween my inner dreamer and critic, I've gro​wn to love this process a lot. It hasn't​ just taught me much about the world,​ but als​o about myself.
                </p>
            </div>
            { tempInfo && tempInfo.map((item, index) => (
                <div key={item.id} className={ currentIndex === index ? styles.CarouselItem: styles.SlideHidden}>
                    <img src={item.artImage} alt={item.artName} className={styles.ArtImage}></img>
                    <div className={styles.ArtDetails}>
                        <h2 className={styles.ArtName}>{item.artName}</h2>
                        <p className={styles.Description}>{item.description}</p>
                        {item.details && item.details.map((detail, detailIndex) => (
                            <div key={detailIndex} className={styles.DetailSection}>
                                <div className={styles.DetailSectionText}>
                                    <p>Dimensions:</p>
                                    <p>{detail.dimensions}</p>
                                </div>
                                <div className={styles.DetailSectionText}>
                                    <p>Concept:</p>
                                    <p>{detail.concept}</p>
                                </div>
                                <div className={styles.DetailSectionText}>
                                    <p>Year:</p>
                                    <p>{detail.year}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            <span className={styles.Indicators}>
                { tempInfo.map((_, index) => (
                    <button key={index} onClick={() => setCurrentIndex(index)} className={index === currentIndex ? `${styles.indicator}` : `${styles.indicator} ${styles.indicatorInactive}`}></button>
                ))}
            </span>
            <div onClick={prevSlide} className={`${styles.CarouselArrows} ${styles.CarouselLeft}`}>
                <i className={`${styles.CarouselIconLeft} fa-solid fa-angle-left`}></i>
            </div>
            <div onClick={nextSlide} className={`${styles.CarouselArrows} ${styles.CarouselRight}`}>
                <i className={`${styles.CarouselIconLeft} fa-solid fa-angle-right`}></i>
            </div>
        </div>
    )

}


export default Carousel;