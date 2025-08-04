import NavBar from "@/components/NavBar"
import CatCarousel from './CatSwiper'; 


const MainPage = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}></h1>
      <CatSwiper/>
      <NavBar/>
    </div>
  );
};

export default MainPage;

