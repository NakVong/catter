import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
	Pencil,
	Mars,
	House,
	BookText,
	MessageSquare,
	User,
} from "lucide-react";
import { Link } from "react-router-dom";
import cat from "../assets/cat.jpg";

const ProfilePage = () => {
	return (
		<div className="min-h-screen bg-white flex flex-col items-center justify-between pb-24">
			{/* Profile Section */}
			<Card className="relative mt-12 w-[90%] max-w-md bg-pink-50 text-center p-6 rounded-3xl shadow-md">
				<button className="absolute top-2 right-2 bg-rose-200 rounded-full p-1 shadow-md">
					<Pencil size={16} className="text-white" />
				</button>

				<h1 className="text-3xl font-bold mb-4">Profile</h1>

				<div className="relative inline-block">
					<Avatar className="w-28 h-28 mx-auto shadow-md">
						<AvatarImage src={cat} alt="Cat" />
					</Avatar>
				</div>

				<div className="mt-4">
					<p className="text-xl font-semibold">
						Order <span className="text-sm font-normal ml-1">2 months</span>
					</p>
					<p className="text-xl font-bold mt-1">1.7kg</p>
					<div className="mt-2 inline-flex items-center justify-center w-8 h-8 border border-blue-600 rounded-md mx-auto">
						<Mars size={16} className="text-blue-600" />
					</div>
				</div>
			</Card>

			{/* Bottom Nav */}
			<div className="fixed bottom-0 left-0 w-full bg-white border-t flex justify-around items-center h-16">
				<Link
					to="/main"
					className="text-gray-400 flex flex-col items-center text-xs"
				>
					<House />
					Home
				</Link>
				<Link
					to="/guide"
					className="text-gray-400 flex flex-col items-center text-xs"
				>
					<BookText />
					Guides
				</Link>
				<Link
					to="/chat"
					className="text-gray-400 rsselative flex flex-col items-center text-xs"
				>
					<MessageSquare />
					Chat
					<span className="absolute top-0 right-2 bg-red-500 text-white text-xs rounded-full px-1">
						4
					</span>
				</Link>
				<Link
					to="/profile"
					className="text-purple-500 flex flex-col items-center text-xs"
				>
					<User />
					Profile
				</Link>
			</div>
		</div>
	);
};

export default ProfilePage;
