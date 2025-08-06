import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import tabbyImg from "../assets/tabby.jpg";
import tigriImg from "../assets/white.jpg";

const cats = [
  {
    name: "Samantha",
    location: "California (2.5km)",
    image: tabbyImg,
    age: "1.5 years",
    breed: "Tabby",
    weight: "2.3kg",
    color: "Grey",
    sex: "Male",
    spayed: "Spayed",
  },
  {
    name: "Tigri",
    location: "Boston (1.2km)",
    image: tigriImg,
    age: "One year old",
    breed: "British Short Hair",
    weight: "2.7kg",
    color: "White",
    sex: "Female",
    spayed: "Spayed",
  },
];

export function CatCarousel() {
  return (
    <Carousel className="w-full max-w-[340px]">
      <CarouselContent>
        {cats.map((cat, index) => (
          <CarouselItem key={index}>
            <Card className="p-4 rounded-2xl shadow-lg w-[320px] h-[560px] mx-auto flex flex-col justify-between">
              <div className="relative h-[240px] rounded-xl overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-center rounded-xl"
                />
                <div className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center text-xl">
                  ❤️
                </div>
              </div>
              <div className="mt-2 text-left">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-bold">{cat.name}</h2>
                  {cat.sex === "Female" && (
                    <span className="text-pink-600 bg-pink-100 rounded-full px-2 py-1 text-sm">♀</span>
                  )}
                </div>
                <p className="text-sm text-gray-500">📍 {cat.location}</p>
              </div>
              <div className="bg-pink-50 p-4 rounded-xl text-sm text-gray-700 mt-2">
                <p><strong>Age:</strong> {cat.age}</p>
                <p><strong>Breed:</strong> {cat.breed}</p>
                <p><strong>Weight:</strong> {cat.weight}</p>
                <p><strong>Color:</strong> {cat.color}</p>
                <p><strong>Sex:</strong> {cat.sex}</p>
                <p><strong>Spayed/Not Spayed:</strong> {cat.spayed}</p>
                <p className="italic text-gray-500 text-xs mt-2">More details: (tap for more info)</p>
              </div>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}







