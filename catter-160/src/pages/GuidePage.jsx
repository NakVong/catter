//import { Link } from "next/link"

import { Link } from "react-router-dom";



import { Button } from "@/components/ui/button"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"


import { Textarea } from "@/components/ui/textarea"
import { Mail, ArrowRight, Scissors, UtensilsCrossed, Droplets, ToyBrick, ShowerHead } from "lucide-react"



import "./GuidePage.css";

const buttonGroupStyle = "flex flex-wrap flex-col items-center gap-8";
const buttonStyle =
    "relative w-64 h-8 bg-gray-100 text-gray-900 rounded flex justify-center items-center";




const GuidePage = () => {
    return (

        <div
            id="main"
            className="flex min-h-screen flex-col items-center justify-center"
        >

            
            <div className={buttonGroupStyle}>
                <div>
                    Recommended For You!
                </div>
                <Link to="/guide/q1" className={buttonStyle}>
                    <div className="flex items-center gap-2">
                        <Scissors className="w-4 h-4 absolute left-4" />
                        <span>Trim Cat Nails</span>
                        <ArrowRight className="w-4 h-4 absolute right-4" />
                    </div>
                </Link>
                <Link to="/guide/q1" className={buttonStyle}>
                    <div className="flex items-center gap-2">
                        <UtensilsCrossed className="w-4 h-4 absolute left-4" />
                        <span>Feed the Right Food</span>
                        <ArrowRight className="w-4 h-4 absolute right-4" />
                    </div>
                </Link>

                <Link to="/guide/q1" className={buttonStyle}>
                    <div className="flex items-center gap-2">
                        <Droplets className="w-4 h-4 absolute left-4" />
                        <span>Clean The Litter Box</span>
                        <ArrowRight className="w-4 h-4 absolute right-4" />
                    </div>
                </Link>
                <Link to="/guide/q1" className={buttonStyle}>
                    <div className="flex items-center gap-2">
                        <ToyBrick className="w-4 h-4 absolute left-4" />
                        <span>Play with Your Cat</span>
                        <ArrowRight className="w-4 h-4 absolute right-4" />
                    </div>
                </Link>
                <Link to="/guide/q1" className={buttonStyle}>
                    <div className="flex items-center gap-2">
                        <ShowerHead className="w-4 h-4 absolute left-4" />
                        <span>Bathing Your Cat</span>
                        <ArrowRight className="w-4 h-4 absolute right-4" />
                    </div>
                </Link>

                <div className="grid w-full gap-2">
                    <Textarea placeholder="Type your own question here." />
                    <Button>Ask Catter</Button>
                </div>


            </div>
        </div>
    );
};


export default GuidePage