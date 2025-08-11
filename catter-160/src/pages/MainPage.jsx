import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import CatSwiper from "./CatSwiper";
import HeaderBar from "@/components/HeaderBar";

const MainPage = () => {
  const [savedCats, setSavedCats] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("currCats");
      setSavedCats(raw ? JSON.parse(raw) : []);
    } catch {
      setSavedCats([]); // corrupted JSON or unavailable
    }
  }, []);

  console.log(savedCats?.[0]?.likedByUser);

  return (
    <div>
      <HeaderBar />
      <CatSwiper />
      <NavBar />
    </div>
  );
};

export default MainPage;

