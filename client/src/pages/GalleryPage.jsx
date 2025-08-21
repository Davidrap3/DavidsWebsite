import { useState } from 'react';
import styles from './GalleryPage.module.scss';
import Footer from '../components/footer';

const GalleryPage = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const galleryImages = [
        {
            id: 1,
            src: "images/testingImages/testing1.jpg",
            title: "Samurai",
            description: "Wire art sculpture depicting a samurai warrior",
            dimensions: "24 x 36",
            year: "2023",
            medium: "Wire and clay"
        },
        {
            id: 2,
            src: "images/testingImages/testing2.jpg",
            title: "Abstract Form",
            description: "Abstract sculpture exploring form and negative space",
            dimensions: "30 x 40",
            year: "2023",
            medium: "Recycled materials"
        },
        {
            id: 3,
            src: "images/testingImages/testing3.jpg",
            title: "Ocean Waves",
            description: "Flowing sculpture inspired by ocean movement",
            dimensions: "35 x 28",
            year: "2024",
            medium: "Wire and clay"
        },
        {
            id: 4,
            src: "images/testingImages/testing4.jpg",
            title: "Ship",
            description: "Maritime-inspired sculpture with emphasis on negative space",
            dimensions: "38 x 48 x 26 cm",
            year: "2024",
            medium: "Mixed media"
        },
        {
            id: 5,
            src: "images/testingImages/testing5.jpg",
            title: "Dynasty",
            description: "Sculpture capturing movement and historical essence",
            dimensions: "30 x 40",
            year: "2023",
            medium: "Wire art"
        },
        {
            id: 6,
            src: "images/testingImages/testing6.jpg",
            title: "Golden Expression",
            description: "Contemporary piece exploring artistic expression",
            dimensions: "32 x 45",
            year: "2024",
            medium: "Clay and recycled materials"
        }
    ];

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
                <h1 className={styles.Title}>Gallery</h1>
                <p className={styles.Subtitle}>A collection of wire art sculptures using clay and recycled materials</p>
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