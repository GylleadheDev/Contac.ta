"use client"

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

// GIF data
const gifs = [
  {
    id: 1,
    url: "https://media.giphy.com/media/fQZX2aoRC1Tqw/giphy.gif?cid=ecf05e47wt2ikyk9x7xbtaksa3bje2jbtm0hh77fm47ymyos&ep=v1_gifs_search&rid=giphy.gif&ct=g",
    title: "Abstract Motion",
  },
  {
    id: 2,
    url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3Q1NjJiaTFwc2hobDUxZnBmZmg2NTVzYnpnN2RiOGJtZmIyeXM3ZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/t3sZxY5zS5B0z5zMIz/giphy.gif",
    title: "Digital Wave",
  },
  {
    id: 3,
    url: "https://media.giphy.com/media/L4AQvif7x9fS8/giphy.gif?cid=790b76114z7ba7rjucf7swt0c749627ab7ib841muvjcm6ua&ep=v1_gifs_search&rid=giphy.gif&ct=g",
    title: "Neon Flow",
  },

];

// GIF Carousel Component
export function GifCarousel({ className }: { className?: string }) {
  const [api, setApi] = useState<any>();

  useEffect(() => {
    if (!api) return;

    // Auto-play functionality
    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <div className={cn("w-full max-w-5xl mx-auto px-4", className)}>
       <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-orange-600 from-teal-500  dark:bg-gradient-to-r dark:to-blue-600 dark:from-[#EA755F]">
                Better clients
              </span>{" "}
              Managment App
            </h1>
            <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
              With Contac.ta you will say bye for the most exausting problems , and say yes for the productive routine and managments
            </p>

            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover the features that make our platform  Great!
            </p>
          </div>
        </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {gifs.map((gif) => (
            <CarouselItem
              key={gif.id}
              className="basis-full sm:basis-1/2 lg:basis-1/3 pl-2 md:pl-4"
            >
              <div className="p-1">
                <Card className="overflow-hidden">
                  <div className="aspect-square relative group">
                    <img
                      src={gif.url}
                      alt={gif.title}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <p className="text-white text-lg font-semibold">
                        {gif.title}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  );
}

// Main App Component