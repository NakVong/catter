import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import NavBar from "@/components/NavBar";

const SubPage = () => {
	const hasFetched = useRef(false);

	const [loading, setLoading] = useState(false);
	//const [response, setResponse] = useState(null);
	const location = useLocation();
	console.log(location.state?.data.userQuestion);
	const question = location.state?.data.userQuestion;
	const [response, setResponse] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			if (hasFetched.current) return;
			hasFetched.current = true;
			setLoading(true);
			if (!question) return;

			try {
				const res = await fetch("https://noggin.rea.gent/minimum-locust-8471", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization:
							"Bearer rg_v1_3ih6mj76av5277maq2r1b7pc3192hnfa7b65_ngk",
					},
					body: JSON.stringify({
						userQuestion: question,
						catInfo: "",
						userInfo: "",
					}),
				});

				const text = await res.text(); // or .json() if you're expecting JSON
				setResponse(text);
				setLoading(false);
			} catch (err) {
				console.error("Error fetching response:", err);
				setResponse("Something went wrong...");
			}
		};

		fetchData();
	}, [question]);

	return (
		<div className="max-w-xl mx-auto p-6 bg-white min-h-screen rounded-xl shadow-md  border border-gray-200">
			<div>
				<h2 className="text-lg font-semibold text-gray-800 mb-1">
					Your question:
				</h2>
				<p className="text-gray-600 italic">{question}</p>
			</div>

			<div>
				<h2 className="text-lg font-semibold text-gray-800 mb-1">
					Catter Says:
				</h2>
			</div>

			<div>
				{loading && (
					<button
						type="button"
						className="bg-gray-100 text-gray-900 px-4 py-2 rounded inline-flex items-center"
						disabled
					>
						<svg
							className="mr-2 h-5 w-5 animate-spin text-white"
							viewBox="0 0 24 24"
							fill="none"
						>
							<circle
								className="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								strokeWidth="4"
							/>
							<path
								className="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4h-4z"
							/>
						</svg>
						Thinking...
					</button>
				)}
			</div>

			<div>
				<p className="text-gray-700 whitespace-pre-line">{response}</p>
			</div>

			<NavBar />
		</div>
	);
};
export default SubPage;
