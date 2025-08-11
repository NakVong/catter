import { Link } from 'react-router-dom';
import { User } from "lucide-react";
import paw from "@/src/assets/catter-logo.png";

const HeaderBar = () => {
  return (
    <div className="fixed top-0 left-0 w-full bg-white border-b flex justify-between items-center h-16 shadow-sm z-50 px-4">
      <div className="flex items-center">
        <img src={paw} alt="Cat" className="w-24 h-24 object-contain" />
      </div>
      <Link to="/profile" className="text-rose-500 flex flex-col items-center text-xs">
        <User size={24} />
        Profile
      </Link>
    </div>
  );
};

export default HeaderBar;