import { Link } from "react-router-dom";
import { House, BookText, MessageSquare, User } from "lucide-react";

const NavBar = () => {
    return (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-around items-center h-16">
            <Link to="/main" className="text-gray-400 flex flex-col items-center text-xs">
                <House />
                Home
            </Link>
            <Link to="/guide" className="text-gray-400 flex flex-col items-center text-xs">
                <BookText />
                Guides
            </Link>
            <Link to="/chat" className="text-gray-400 relative flex flex-col items-center text-xs">
                <MessageSquare />
                Chat
                <span className="absolute top-0 right-2 bg-red-500 text-white text-xs rounded-full px-1">4</span>
            </Link>
            <Link to="/profile" className="text-rose-500 flex flex-col items-center text-xs">
                <User />
                Profile
            </Link>
        </div>
    )
};

export default NavBar;
