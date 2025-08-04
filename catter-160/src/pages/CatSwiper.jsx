import TinderCard from 'react-tinder-card';
import './CatSwiper.css';

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
  // Add more cats here...
];

const CatSwiper = () => {
  return (
    <div>
      <h2>Cat Swiper is rendering!</h2>
    </div>
  );  
};

export default CatSwiper;
