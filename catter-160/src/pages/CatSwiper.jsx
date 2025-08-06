import TinderCard from 'react-tinder-card';
import styles from './CatSwiper.module.css';

const cats = [
  {
    name: 'Samantha',
    location: 'California (2.5km)',
    image: 'https://placekitten.com/300/200',
    age: '1.5 years',
    breed: 'Tabby',
    weight: '2.3kg',
    color: 'Grey',
    sex: 'Male',
    spayed: 'Spayed',
  },
  // You can add more cat objects here
];

const CatSwiper = () => {
  return (
    <div className={styles.cardContainer}>
      {cats.map((cat, index) => (
        <TinderCard key={index} preventSwipe={['up', 'down']}>
          <div className={styles.catCard}>
            <img src={cat.image} alt={cat.name} className={styles.catImage} />
            <h2>{cat.name}</h2>
            <p>{cat.location}</p>
            <div className={styles.description}>
              <p><strong>Age:</strong> {cat.age}</p>
              <p><strong>Breed:</strong> {cat.breed}</p>
              <p><strong>Weight:</strong> {cat.weight}</p>
              <p><strong>Color:</strong> {cat.color}</p>
              <p><strong>Sex:</strong> {cat.sex}</p>
              <p><strong>Spayed:</strong> {cat.spayed}</p>
            </div>
          </div>
        </TinderCard>
      ))}
    </div>
  );
};
};

export default CatSwiper;


