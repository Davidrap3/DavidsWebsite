import { useState, useEffect } from 'react';
import styles from './GalleryPage.module.scss';
import Footer from '../components/footer';

const GalleryPage = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [galleryImages, setGalleryImages] = useState([]);
    const [siteContent, setSiteContent] = useState({ gallery: { title: "Gallery", subtitle: "" } });

    useEffect(() => {
        // Load gallery items
        fetch(`${process.env.PUBLIC_URL}/data/gallery.json`)
            .then(response => response.json())
            .then(data => {
                // Prepend PUBLIC_URL to image paths
                const imagesWithUrl = data.map(img => ({
                    ...img,
                    src: `${process.env.PUBLIC_URL}/${img.src}`
                }));
                setGalleryImages(imagesWithUrl);
            })
            .catch(error => console.error('Error loading gallery:', error));

        // Load site content
        fetch(`${process.env.PUBLIC_URL}/data/siteContent.json`)
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

    const nextImage = () => {
        if (selectedImage) {
            const currentIndex = galleryImages.findIndex(img => img.id === selectedImage.id);
            const nextIndex = (currentIndex + 1) % galleryImages.length;
            setSelectedImage(galleryImages[nextIndex]);
        }
    };

    const prevImage = () => {
        if (selectedImage) {
            const currentIndex = galleryImages.findIndex(img => img.id === selectedImage.id);
            const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
            setSelectedImage(galleryImages[prevIndex]);
        }
    };

    const handleModalClick = (e) => {
        if (e.target.classList.contains(styles.Modal)) {
            closeModal();
        }
    };

    const handleKeyDown = (e) => {
        if (!selectedImage) return;

        switch(e.key) {
            case 'Escape':
                closeModal();
                break;
            case 'ArrowRight':
                nextImage();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        if (selectedImage) {
            document.addEventListener('keydown', handleKeyDown);
            return () => document.removeEventListener('keydown', handleKeyDown);
        }
    }, [selectedImage, galleryImages]);

    return (
        <div className={styles.Container}>
            <div className={styles.GalleryHeader}>
                <h1 className={styles.Title}>{siteContent.gallery.title}</h1>
                <p className={styles.Subtitle}>{siteContent.gallery.subtitle}</p>
            </div>
            
            <div className={styles.GalleryGrid}>
                {galleryImages.map((image) => (
                    <button
                        key={image.id}
                        className={styles.GalleryItem}
                        onClick={() => openModal(image)}
                        aria-label={`View ${image.title}, created in ${image.year}`}
                    >
                        <img
                            src={image.src}
                            alt={image.title}
                            className={styles.GalleryImage}
                            draggable="false"
                            loading="lazy"
                        />
                        <div className={styles.ImageOverlay}>
                            <h3 className={styles.ImageTitle}>{image.title}</h3>
                            <p className={styles.ImageYear}>{image.year}</p>
                        </div>
                    </button>
                ))}
            </div>

            {selectedImage && (
                <div
                    className={styles.Modal}
                    onClick={handleModalClick}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                >
                    <div className={styles.ModalContent}>
                        <button
                            className={styles.CloseButton}
                            onClick={closeModal}
                            aria-label="Close modal"
                        >
                            <i className="fa-solid fa-xmark" aria-hidden="true"></i>
                        </button>
                        <div className={styles.ModalImageContainer}>
                            <img
                                src={selectedImage.src}
                                alt={selectedImage.title}
                                className={styles.ModalImage}
                                draggable="false"
                                loading="lazy"
                            />
                        </div>
                        <div className={styles.ModalInfo}>
                            <h2 id="modal-title" className={styles.ModalTitle}>{selectedImage.title}</h2>
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