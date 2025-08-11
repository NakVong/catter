import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Pencil, Mars } from "lucide-react";
import cat from "../assets/cat.jpg";

const FormPage = () => {
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
			<NavBar />
		</div>
	);
};

export default FormPage;
