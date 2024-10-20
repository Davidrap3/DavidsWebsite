import styles from './HomePage.module.scss';
import Carousel from '../components/carousel';


const HomePage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.carouselContainer}>
                <Carousel />
            </div>
            <div className={styles.AboutSection}>
                <section>
                    <h1 className={styles.CanvasTitle}>My Canvas</h1>
                    <p>I specialize in Wire art ​using Clay and ​recycled materials​ and abstract​ concepts.​</p>
                    <p>While I've been trained in different ​mediums, I found a deep connection ​to sculpting. I love how it ​communicates so much of the creator ​to the audience. Ironically, the ​communication feels easier in the ​abstract. I enjoy using recycled ​materials in my art pieces, giving ​objects a new beautiful purpose for ​existence and adding life into my ​art.</p>
                </section>
            </div>
        </div>
    );
};

export default HomePage;