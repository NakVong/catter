import NavBar from "@/components/NavBar"
import { CatSwiper } from './CatSwiper'; 

const MainPage = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Main Page</h1>
      <CatSwiper/>
      <NavBar/>
    </div>
  );
};

export default MainPage;

