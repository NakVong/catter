import * as React from "react";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import {
	Undo2,
	X,
	Star,
	Heart,
	Zap,
	CheckCircle2,
	ChevronLeft,
	HeartOff,
} from "lucide-react";

import tabbyImg from "../assets/tabby.jpg";
import tigriImg from "../assets/white.jpg";
import miloImg from "../assets/milo.jpg";
import lunaImg from "../assets/luna.jpg";
import cleoImg from "../assets/cleo.jpg";
/* ---------- Helpers ---------- */
function formatAge(age) {
	const num = parseFloat(age);
	if (isNaN(num)) return age;
	const years = Math.floor(num);
	const months = Math.round((num - years) * 12);
	if (years === 0) return `${months}m`;
	if (months === 0) return `${years}y`;
	return `${years}y ${months}m`;
}

const SexBadge = ({ sex }) => {
	const female = sex?.toLowerCase() === "female";
	const color = female
		? "text-pink-600 bg-pink-100"
		: "text-blue-600 bg-blue-100";
	const symbol = female ? "♀" : "♂";
	return (
		<span
			className={`shrink-0 ${color} rounded-full w-7 h-7 flex items-center justify-center text-lg font-bold shadow`}
			aria-label={female ? "Female" : "Male"}
		>
			{symbol}
		</span>
	);
};

// Example for PinkChip:
const PinkChip = ({ children }) => (
	<span className="text-xs text-[#E57373] bg-[#FDEBEB] rounded-full px-2.5 py-1 border border-[#FAD1D1]">
		{children}
	</span>
);

/** Health summary card used on the details (back) page */
const HealthCard = ({ status, label }) => {
	const isDone = status?.toLowerCase() === "done";
	const statusClass = isDone ? "text-green-600" : "text-rose-500";
	return (
		<div className="w-[150px] rounded-2xl border border-gray-200 bg-white px-4 py-3 text-center shadow-sm">
			<div className={`font-semibold ${statusClass}`}>{status}</div>
			<div className="text-gray-500">{label}</div>
		</div>
	);
};

/* ---------- Data ---------- */
import { cats as initialCats } from "../data/cats";
//import { cats } from "../data/cats";

const toggleLike = (index) => {
	setCatList((prev) => {
		const copy = [...prev];
		copy[index] = { ...copy[index], likedByUser: !copy[index].likedByUser };
		return copy;
	});
};

/* ---------- Component ---------- */
export default function CatSwiper() {
	const [api, setApi] = useState(null); // <-- get Embla API from shadcn
	const [cats, setCats] = useState(initialCats);

	useEffect(() => {
		if (!api) return;

		let userDragged = false;

		const onPointerDown = () => {
			userDragged = true;
		};

		const onScrollEnd = () => {
			if (!userDragged) return; // 只在“用户拖动”后触发
			userDragged = false;

			const total = api.scrollSnapList().length;
			const next = (api.selectedScrollSnap() + 1) % total;
			api.scrollTo(next); // 不管左/右，统一跳到下一个
		};

		api.on("pointerDown", onPointerDown);
		api.on("scrollEnd", onScrollEnd);

		return () => {
			api.off("pointerDown", onPointerDown);
			api.off("scrollEnd", onScrollEnd);
		};
	}, [api]);

	const [flippedIndex, setFlippedIndex] = React.useState(null);
	const toggleFlip = (index) =>
		setFlippedIndex((cur) => (cur === index ? null : index));

	return (
		<Carousel
			setApi={setApi}
			opts={{ loop: true }}
			className="w-full max-w-[380px] mx-auto"
		>
			<CarouselContent>
				{cats.map((cat, index) => {
					const isFlipped = flippedIndex === index;
					return (
						<CarouselItem key={cat.name}>
							{/* 3D flip container */}
							<div className="relative [perspective:1200px]">
								<div
									className={`relative transition-transform duration-500 [transform-style:preserve-3d] ${
										isFlipped ? "[transform:rotateY(180deg)]" : ""
									}`}
								>
									{/* FRONT FACE */}
									<Card
										onClick={() => toggleFlip(index)}
										className="rounded-3xl shadow-lg w-[360px] mx-auto overflow-hidden [backface-visibility:hidden]"
									>
										{/* IMAGE AREA */}
										<div className="relative h-[480px]">
											<img
												src={cat.image}
												alt={`${cat.name} the cat`}
												className="w-full h-full object-cover object-center"
											/>
											{/* action buttons */}
											<div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 flex items-center justify-center gap-3">
												<button className="w-14 h-14 rounded-full bg-white shadow-lg grid place-items-center">
													<X className="w-7 h-7 text-red-500" />
												</button>
												<button
													onClick={() => toggleLike(index)}
													className="w-14 h-14 rounded-full bg-white shadow-lg grid place-items-center"
												>
													{cat.likedByUser ? (
														<Heart className="w-7 h-7 text-red-500 fill-red-500" /> // solid red
													) : (
														<Heart className="w-7 h-7 text-green-500" /> // green outline
													)}
												</button>
											</div>
										</div>
										{/* CONTENT BELOW IMAGE */}
										<div className="px-4 pt-2.5 pb-5">
											<div className="flex items-start justify-between gap-3">
												<div className="flex flex-col items-start">
													<h2 className="text-2xl font-bold tracking-tight">
														{cat.name}
													</h2>
													<p className="text-gray-600 mt-0.5">
														📍 {cat.location}
													</p>
													{cat.shortDescription && (
														<p className="text-gray-800 text-sm">
															{cat.shortDescription}
														</p>
													)}
												</div>

												<div className="flex items-center gap-2 pt-1 shrink-0 whitespace-nowrap">
													<span className="text-sm font-medium text-gray-700">
														{formatAge(cat.age)}
													</span>
													<CheckCircle2 className="w-5 h-5 text-cyan-500" />
													<SexBadge sex={cat.sex} />
												</div>
											</div>

											<div className="mt-3 flex flex-wrap gap-2">
												<PinkChip>🐈 {cat.breed}</PinkChip>
												<PinkChip>🎨 {cat.color}</PinkChip>
												<PinkChip>⚖️ {cat.weight}</PinkChip>
												<PinkChip>
													{cat.sex === "Female" ? "♀ Female" : "♂ Male"}
												</PinkChip>
												<PinkChip>💉 {cat.spayed}</PinkChip>
											</div>
										</div>
									</Card>

									<Card
										onClick={() => toggleFlip(index)}
										className="absolute inset-0 rounded-3xl shadow-lg w-[360px] mx-auto overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)]"
									>
										<div className="flex flex-col h-[720px] bg-white">
											{/* Header image */}
											<div className="relative h-[320px]">
												<img
													src={cat.image}
													alt={`${cat.name} detail`}
													className="w-full h-full object-cover object-[50%_20%]" // was object-center
												/>
												<button
													onClick={() => toggleFlip(index)}
													className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white/95 shadow grid place-items-center"
													aria-label="Back"
												>
													<ChevronLeft className="w-5 h-5" />
												</button>
												<button
													className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 shadow grid place-items-center"
													aria-label="Favorite"
												>
													<Heart className="w-5 h-5" />
												</button>
											</div>

											{/* Scrollable content */}
											<div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
												{/* Title + price + age/sex */}
												<div className="flex items-start justify-between gap-3">
													<h3 className="text-2xl font-bold">{cat.name}</h3>
													<div className="flex items-center gap-3 shrink-0">
														<span className="text-lg font-semibold">
															${cat.price}
														</span>
														<div className="flex items-center gap-2 whitespace-nowrap">
															<span className="text-sm font-medium text-gray-700">
																{formatAge(cat.age)}
															</span>
															<CheckCircle2 className="w-5 h-5 text-cyan-500" />
															<SexBadge sex={cat.sex} />
														</div>
													</div>
												</div>

												<p className="text-gray-600">📍 {cat.location}</p>

												{/* Health summary cards */}
												<div className="grid grid-cols-2 gap-3 pt-1">
													<HealthCard
														status={cat.health.surgery}
														label="Surgery"
													/>
													<HealthCard
														status={cat.health.allergy}
														label="Allergy"
													/>
													<HealthCard
														status={cat.health.vaccination}
														label="Vaccination"
													/>
													<HealthCard
														status={cat.health.disease}
														label="Disease"
													/>
												</div>

												<hr className="my-2" />

												<div>
													<h4 className="font-semibold mb-1">About</h4>
													<p className="text-gray-700 leading-relaxed">
														{cat.about}
													</p>
												</div>

												<div className="pb-2" />
											</div>
										</div>
									</Card>
								</div>
							</div>
						</CarouselItem>
					);
				})}
			</CarouselContent>
		</Carousel>
	);
}
