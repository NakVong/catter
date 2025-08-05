import NavBar from "@/components/NavBar"
import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const SubPage = () => {

    const slides = [
    {
        title: "Step 1: Get Treats 🍖",
        description: "Make sure your cat is calm and offer some treats before you begin.",
        image: "/images/guide/catfood.jpg",
    },
    {
        title: "Step 2: Gently Hold the Paw 🐾",
        description: "Press gently on the paw pad to extend the nails. Be gentle, don't squish.",
        image: "/images/guide/trimnail0.avif",
    },
    {
        title: "Step 3: Trim Carefully ✂️",
        description: "Only trim the sharp tip. Avoid the pink part (quick)!",
        image: "/images/guide/trimnail.avif",
    },
    ];
	return (
		<>
        <div className="min-h-screen flex flex-wrap flex-col items-center justify-center gap-8">

            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text drop-shadow-md">
            ✂️ How to Trim Your Cat’s Claws Like a Pro 🐱
            </h1>


            <Carousel className="w-full max-w-xs">
                <CarouselContent>
                    {slides.map((slide, index) => (
                    <CarouselItem key={index}>
                        <div className="p-1">
                        <Card>
                            <CardContent className="h-85    flex flex-col items-center justify-center p-6 space-y-3 text-center">
                            <img src={slide.image} alt={slide.title} className="w-60 h-50 object-contain" />
                            <h2 className="text-xl font-bold">{slide.title}</h2>
                            <p className="text-sm text-gray-600">{slide.description}</p>
                            </CardContent>
                        </Card>
                        </div>
                    </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>





    

        </div>
		
        <NavBar />

        </>
	);
};
export default SubPage;