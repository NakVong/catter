import { Link } from 'react-router-dom';
import cat from "../src/assets/cat.jpg";
import { User } from "lucide-react";

const HeaderBar = () => {
    return (
        <div className="fixed top-0 left-0 w-full bg-white border-b flex justify-between items-center h-16 shadow-sm z-50 px-4">
            <div className="w-12 h-12 overflow-hidden">
                <img src={cat} alt="Cat" className="w-full h-full object-cover" />
            </div>
            <Link to="/profile" className="text-purple-500 flex flex-col items-center text-xs">
                <User size={20} />
                Profile
            </Link>
        </div>
    );
};

export default HeaderBar;