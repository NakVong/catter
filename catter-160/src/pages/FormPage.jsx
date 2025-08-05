import { Card, CardContent } from "@/components/ui/card";
import NavBar from "@/components/NavBar";
import catTutorial from '../assets/cat-tutorial.jpg';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const FormPage = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-between pb-24">
            {/* Profile Section */}
            <Carousel className="relative mt-12 w-[90%] max-w-md bg-pink-50 text-center p-6 rounded-3xl shadow-md">
                <CarouselContent>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index}>
                            <div className="p-1">
                                <Card className="bg-pink-50 shadow-none border-none">
                                    <CardContent className="flex aspect-square items-center justify-center p-6">
                                        {index === 0 ? (
                                            <div>
                                                <img src={catTutorial} className="rounded-3xl pb-6" alt="Tutorial" />
                                                <p className="text-xl text-[#5F5B5B] pb-3">Find your new friends</p>
                                                <p className="text-l text-[#ADA8A8]">Make your life more colorful</p>
                                            </div>
                                        ) : (
                                            <div className="text-gray-400 italic">Coming soon...</div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

            {/* Bottom Nav */}
            <NavBar />
        </div>
    );
};

export default FormPage