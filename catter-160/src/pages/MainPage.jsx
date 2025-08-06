import NavBar from "@/components/NavBar"
import CatSwiper from './CatSwiper'; 

const MainPage = () => {
  return (
    <div>
      {/* Logo in top-left */}
      <div className="p-4">
        <img 
          src={logo} 
          alt="Catter Logo" 
          className="h-12 w-auto object-contain"
        />
      </div>

      <CatSwiper/>
      <NavBar/>
    </div>
  );
};

export default MainPage;


