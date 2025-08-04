//import { Link } from "next/link"


import { Button } from "@/components/ui/button"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Mail, ArrowRight, Scissors, UtensilsCrossed, Droplets, ToyBrick, ShowerHead } from "lucide-react"



import "./GuidePage.css";

const buttonGroupStyle = "flex flex-wrap flex-col items-center gap-8";
const buttonStyle =
    "w-64 bg-gray-100 text-gray-900 ";




const GuidePage = () => {
    return (

        <div
            id="main"
            className="flex min-h-screen flex-col items-center justify-center"
        >

            <div>
                Recommended For You!
            </div>
            <div className={buttonGroupStyle}>
                <Button className={buttonStyle}>
                    <Scissors className="mr-2 h-4 w-4" />
                    Trim Cat Nails
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button className={buttonStyle}>
                    <UtensilsCrossed className="mr-2 h-4 w-4" />
                    Feed the Right Food
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button className={buttonStyle}>
                    <Droplets className="mr-2 h-4 w-4" />
                    Clean the Litter Box
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button className={buttonStyle}>
                    <ToyBrick className="mr-2 h-4 w-4" />
                    Play with Your Cat
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button className={buttonStyle}>
                    <ShowerHead className="mr-2 h-4 w-4" />
                    Bathing Your Cat
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};


export default GuidePage