import { useState, useEffect } from 'react';
import styles from './GalleryPage.module.scss';
import Footer from '../components/footer';

const GalleryPage = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [galleryImages, setGalleryImages] = useState([]);
    const [siteContent, setSiteContent] = useState({ gallery: { title: "Gallery", subtitle: "" } });

    useEffect(() => {
        // Load gallery items
        fetch('/data/gallery.json')
            .then(response => response.json())
            .then(data => setGalleryImages(data))
            .catch(error => console.error('Error loading gallery:', error));

        // Load site content
        fetch('/data/siteContent.json')
            .then(response => response.json())
            .then(data => setSiteContent(data))
            .catch(error => console.error('Error loading site content:', error));
    }, []);

    const openModal = (image) => {
        setSelectedImage(image);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    const handleModalClick = (e) => {
        if (e.target.classList.contains(styles.Modal)) {
            closeModal();
        }
    };

    return (
        <div className={styles.Container}>
            <div className={styles.GalleryHeader}>
                <h1 className={styles.Title}>{siteContent.gallery.title}</h1>
                <p className={styles.Subtitle}>{siteContent.gallery.subtitle}</p>
            </div>
            
            <div className={styles.GalleryGrid}>
                {galleryImages.map((image) => (
                    <div key={image.id} className={styles.GalleryItem} onClick={() => openModal(image)}>
                        <img 
                            src={image.src} 
                            alt={image.title}
                            className={styles.GalleryImage}
                            draggable="false"
                        />
                        <div className={styles.ImageOverlay}>
                            <h3 className={styles.ImageTitle}>{image.title}</h3>
                            <p className={styles.ImageYear}>{image.year}</p>
                        </div>
                    </div>
                ))}
            </div>

            {selectedImage && (
                <div className={styles.Modal} onClick={handleModalClick}>
                    <div className={styles.ModalContent}>
                        <button className={styles.CloseButton} onClick={closeModal}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                        <div className={styles.ModalImageContainer}>
                            <img 
                                src={selectedImage.src} 
                                alt={selectedImage.title}
                                className={styles.ModalImage}
                                draggable="false"
                            />
                        </div>
                        <div className={styles.ModalInfo}>
                            <h2 className={styles.ModalTitle}>{selectedImage.title}</h2>
                            <p className={styles.ModalDescription}>{selectedImage.description}</p>
                            <div className={styles.ModalDetails}>
                                <div className={styles.DetailRow}>
                                    <span className={styles.DetailLabel}>Dimensions:</span>
                                    <span className={styles.DetailValue}>{selectedImage.dimensions}</span>
                                </div>
                                <div className={styles.DetailRow}>
                                    <span className={styles.DetailLabel}>Year:</span>
                                    <span className={styles.DetailValue}>{selectedImage.year}</span>
                                </div>
                                <div className={styles.DetailRow}>
                                    <span className={styles.DetailLabel}>Medium:</span>
                                    <span className={styles.DetailValue}>{selectedImage.medium}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            <Footer />
        </div>
    );
};

export default GalleryPage;