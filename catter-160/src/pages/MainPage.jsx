import NavBar from "@/components/NavBar";
import CatSwiper from "./CatSwiper";
import HeaderBar from "@/components/HeaderBar";

const MainPage = () => {
	const savedCats = JSON.parse(localStorage.getItem("currCats"));
	if (savedCats) {
		// do something with savedCats
	}
	console.log(savedCats[0].likedByUser);
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
