import NavBar from "@/components/NavBar";
import CatSwiper from "./CatSwiper";
import logo from "../assets/Catter.png";
import paw from "../assets/catter-logo.png";

const MainPage = () => {
	const savedCats = JSON.parse(localStorage.getItem("currCats"));
	if (savedCats) {
		// do something with savedCats
	}
	console.log(savedCats[0].likedByUser);
	return (
		<div>
			{/* Logo in top-left */}
			<img src={paw} alt="paw" className="h-25 w-auto mt-2 -ml-12" />

			<CatSwiper />
			<NavBar />
		</div>
	);
};

export default MainPage;
