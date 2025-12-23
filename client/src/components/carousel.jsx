import { useEffect, useState } from 'react';
import styles from './carousel.module.scss';

const Carousel = () => {
    const [tempInfo, setTempInfo] = useState([]);
    const [siteContent, setSiteContent] = useState({ artistInfo: { artistName: "The Golden Sail", description: "" } });
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchPosition, setTouchPosition] = useState(null);
    const [pause, setPause] = useState(false);
    const [direction, setDirection] = useState(null);

    useEffect(() => {
        // Load carousel items
        fetch(`${process.env.PUBLIC_URL}/data/carousel.json`)
            .then(response => response.json())
            .then(data => {
                // Prepend PUBLIC_URL to image paths in the artImages array
                const itemsWithUrl = data.map(item => ({
                    ...item,
                    artImages: item.artImages.map(img => `${process.env.PUBLIC_URL}/${img}`)
                }));
                setTempInfo(itemsWithUrl);
            })
            .catch(error => console.error('Error loading carousel:', error));

        // Load site content
        fetch(`${process.env.PUBLIC_URL}/data/siteContent.json`)
            .then(response => response.json())
            .then(data => setSiteContent(data))
            .catch(error => console.error('Error loading site content:', error));
    }, []);

    const nextSlide = () => {
        setDirection('right');
        setCurrentIndex((prevIndex) => (prevIndex + 1) % tempInfo.length);
    };

    const prevSlide = () => {
        setDirection('left');
        setCurrentIndex((prevIndex) => (prevIndex - 1 + tempInfo.length) % tempInfo.length);
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
        if (pause || tempInfo.length === 0) return;

        const interval = setInterval(() => {
            setDirection('right');
            setCurrentIndex((prevIndex) => (prevIndex + 1) % tempInfo.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [pause, tempInfo.length])


    return(
        <section
            className={styles.CarouselContainer}
            aria-roledescription="carousel"
            aria-label="Featured artworks"
        >
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
                    {siteContent.artistInfo.description}
                </p>
            </div>
            <div
                className={styles.CarouselImagesContainer}
                onMouseEnter={() => setPause(true)}
                onMouseLeave={() => setPause(false)}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
            >
                { tempInfo && tempInfo.map((item, index) => (
                    <div key={item.id} className={ currentIndex === index ? `${styles.CarouselItem} ${direction === 'right' ? styles.SlideInRight : styles.SlideInLeft}`: styles.SlideHidden}>
                        <img
                            src={item.artImages[0]}
                            alt={item.artName}
                            className={styles.ArtImage}
                            draggable="false"
                            loading="lazy"
                        />
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
                <div className={styles.Indicators} role="group" aria-label="Carousel navigation">
                    { tempInfo.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={index === currentIndex ? `${styles.indicator}` : `${styles.indicator} ${styles.indicatorInactive}`}
                            aria-label={`Go to slide ${index + 1}: ${item.artName}`}
                            aria-current={index === currentIndex ? 'true' : 'false'}
                        ></button>
                    ))}
                </div>
                <button
                    onClick={prevSlide}
                    className={`${styles.CarouselArrows} ${styles.CarouselLeft}`}
                    aria-label="Previous slide"
                >
                    <i className={`${styles.CarouselIconLeft} fa-solid fa-angle-left`} aria-hidden="true"></i>
                </button>
                <button
                    onClick={nextSlide}
                    className={`${styles.CarouselArrows} ${styles.CarouselRight}`}
                    aria-label="Next slide"
                >
                    <i className={`${styles.CarouselIconLeft} fa-solid fa-angle-right`} aria-hidden="true"></i>
                </button>
            </div>
        </section>
    )

}


export default Carousel;