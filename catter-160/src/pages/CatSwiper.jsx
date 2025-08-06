import TinderCard from 'react-tinder-card';
import styles from './CatSwiper.module.css';
import tabbyImg from '../assets/tabby.jpg';
import tigriImg from '../assets/white.jpg';
import { useState } from 'react';

const cats = [
  {
    name: 'Samantha',
    location: 'California (2.5km)',
    image: tabbyImg,
    age: '1.5 years',
    breed: 'Tabby',
    weight: '2.3kg',
    color: 'Grey',
    sex: 'Male',
    spayed: 'Spayed',
  },
  {
    name: 'Tigri',
    location: 'Boston (1.2km)',
    image: tigriImg,
    age: 'One year old',
    breed: 'British Short Hair',
    weight: '2.7kg',
    color: 'White',
    sex: 'Female',
    spayed: 'Spayed',
  }
];

const CatSwiper = () => {
  const [currentIndex, setCurrentIndex] = useState(cats.length - 1);

  const swiped = (dir, name, index) => {
    setCurrentIndex(index - 1);
  };

  return (
    <div className={styles.cardWrapper}>
      {cats.map((cat, index) => {
        const isTop = index === currentIndex;
        const isNext = index === currentIndex - 1;

        return (
          <TinderCard
            className={styles.swipe}
            key={cat.name}
            onSwipe={(dir) => swiped(dir, cat.name, index)}
            preventSwipe={['up', 'down']}
          >
            <div
              className={`${styles.catCard} ${
                isTop ? styles.topCard : isNext ? styles.nextCard : styles.hiddenCard
              }`}
            >
              <div className={styles.imageContainer}>
                <img src={cat.image} alt={cat.name} className={styles.catImage} />
                <div className={styles.heartIcon}>❤️</div>
              </div>
              <div className={styles.catInfo}>
                <div className={styles.nameRow}>
                  <p className={styles.catName}>{cat.name}</p>
                  {cat.sex === 'Female' && <span className={styles.femaleIcon}>♀</span>}
                </div>
                <p className={styles.location}>📍 {cat.location}</p>
              </div>
              <div className={styles.description}>
                <p><strong>Age:</strong> {cat.age}</p>
                <p><strong>Breed:</strong> {cat.breed}</p>
                <p><strong>Weight:</strong> {cat.weight}</p>
                <p><strong>Color:</strong> {cat.color}</p>
                <p><strong>Sex:</strong> {cat.sex}</p>
                <p><strong>Spayed/Not Spayed:</strong> {cat.spayed}</p>
                <p className={styles.moreDetails}>More details: (tap for more info)</p>
              </div>
            </div>
          </TinderCard>
        );
      })}
    </div>
  );
};
};

export default CatSwiper;




