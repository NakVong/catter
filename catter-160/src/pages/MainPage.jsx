import NavBar from "@/components/NavBar";
import CatSwiper from "./CatSwiper";
import HeaderBar from "@/components/HeaderBar";

const MainPage = () => {
	return (
		<div>
			{/* Logo in top-left */}
			<HeaderBar/>
		
			<CatSwiper />
			<NavBar />
		</div>
	);
};

export default MainPage;
