// CatSwiperFM.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, ChevronLeft, CheckCircle2, RotateCcw } from "lucide-react";
import { cats as initialCats } from "../data/cats";
import { Card } from "@/components/ui/card";

//HELPERS
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

//MAIN EXPORT FUNCTION

export default function CatSwiperFM() {
	const [list, setList] = useState(initialCats);
  const [index, setIndex] = useState(() => {
    // Load from localStorage on first render
    const saved = localStorage.getItem("catIndex");
    return saved ? parseInt(saved, 10) : 0;
  });
  
  useEffect(() => {
    localStorage.setItem("catIndex", index);
  }, [index]);
  const next = () => setIndex((i) => (i + 1) % list.length);

  const prevCat = () => {
  if (index === 0) return; // at first cat, do nothing
  setFlippedIndex(null);   // reset flip so front shows
  setIndex((i) => (i - 1 + list.length) % list.length);
};


  const cat = list[index];
  if (!cat) return null;
	const [dir, setDir] = useState(0); // -1 left, 1 right
	const [flippedIndex, setFlippedIndex] = useState(null);


	const isFlipped = flippedIndex === index;



	const handleDragEnd = (_e, info) => {
  const { offset, velocity } = info;
  const power = Math.abs(offset.x) * 0.5 + Math.abs(velocity.x);
  const threshold = 120;
  const swiped = power > 500 || Math.abs(offset.x) > threshold;

  if (swiped) {
    if (offset.x > 0) {
      // ✅ Right swipe = like
      setList(prev =>
        prev.map((c, i) =>
          i === index ? { ...c, likedByUser: true } : c
	  
        )
      );
      next(1);
    } else {
		setList(prev =>
        prev.map((c, i) =>
          i === index ? { ...c, likedByUser: false } : c
	  
        )
      );
      // ❌ Left swipe = skip
      next(-1);
    }
  }
};




	////ON CLICK FLIP
	const toggleFlip = (index) =>
		setFlippedIndex((cur) => (cur === index ? null : index));

	return (
		<div className="w-full flex items-center justify-center py-8 select-none">
			<div className="relative w-[360px] h-[720px]">
				<AnimatePresence custom={dir} mode="wait">
					
<motion.div
  key={cat.name}
  drag="x"
  dragElastic={0.2}
  onDragEnd={handleDragEnd}
  initial={{ opacity: 0, x: 40 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{
    opacity: 0,
    x: 80, // always slides to the right as it fades
    transition: { duration: 0.25 }
  }}
  whileDrag={{ scale: 1.02 }}
  className="absolute inset-0"
  style={{ touchAction: "pan-y" }}
>
	
						{/* 🔻 Your existing card markup starts here (unchanged) */}
						<div className="relative [perspective:1200px] h-full">
							<div
								className={`relative h-full transition-transform duration-500 [transform-style:preserve-3d] ${
									isFlipped ? "[transform:rotateY(180deg)]" : ""
								}`}
							>
								
								<Card
									onClick={() => toggleFlip(index)}
									className="rounded-3xl shadow-lg w-[360px] mx-auto overflow-hidden [backface-visibility:hidden]"
								>
									{index > 0 && (
    <button
      onClick={prevCat}
      className="absolute top-3 left-3 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100"
    >
      <RotateCcw className="w-5 h-5 text-gray-700" />
    </button>
  )}
  {cat.likedByUser && (
  <button
    className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center z-50"
    aria-label="Liked"
  >
    <Heart className="w-6 h-6 text-red-500 fill-red-500" />
  </button>
)}
									{/* IMAGE AREA */}
									<div className="relative h-[480px]">
										<img
											src={cat.image}
											alt={`${cat.name} the cat`}
											draggable={false}
											className="w-full h-full object-cover object-center"
										/>
										{/* action buttons */}
										
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

								{/* BACK FACE — scrollable details/story */}
								<Card
									onClick={() => toggleFlip(index)}
									className="absolute inset-0 rounded-3xl shadow-lg w-[360px] mx-auto overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)]"
								>
									{index > 0 && (
    <button
      onClick={prevCat}
      className="absolute top-3 left-3 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100"
    >
      <RotateCcw className="w-5 h-5 text-gray-700" />
    </button>
  )}
  {cat.likedByUser && (
  <button
    className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center z-50"
    aria-label="Liked"
  >
    <Heart className="w-6 h-6 text-red-500 fill-red-500" />
  </button>
)}
									<div className="flex flex-col h-[720px] bg-white">
										{/* Header image */}
										<div className="relative h-[320px]">
											<img
												src={cat.image}
												alt={`${cat.name} detail`}
												draggable={false}
												className="w-full h-full object-cover object-[50%_20%]" // was object-center
											/>
											
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
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	);
}
