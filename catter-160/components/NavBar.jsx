import { Link, useLocation } from "react-router-dom";
import { House, BookText, MessageSquare } from "lucide-react";

const NavBar = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-around items-center h-16">
            <Link
                to="/main"
                className={`flex flex-col items-center text-xs ${isActive("/main") ? "text-rose-500" : "text-gray-400"}`}
            >
                <House />
                Home
            </Link>
            <Link
                to="/guide"
                className={`flex flex-col items-center text-xs ${isActive("/guide") ? "text-rose-500" : "text-gray-400"}`}
            >
                <BookText />
                Guides
            </Link>
            <Link
                to="/chat"
                className={`relative flex flex-col items-center text-xs ${isActive("/chat") ? "text-rose-500" : "text-gray-400"}`}
            >
                <MessageSquare />
                Chat
            </Link>
        </div>
    );
};

export default NavBar;
