import { cn } from "@/app/_libs/classnames";
import { HTMLAttributes, TouchEvent, useId, useState } from "react";
import { IconChevronLeft } from "../icons/chevron-left";
import { IconChevronRight } from "../icons/chevron-right";
import { Button, ButtonProps } from "../ui/button";
import { Image } from "../ui/image";

type Props = {
  images: string[];
  className?: HTMLAttributes<HTMLDivElement>["className"];
  imageClassName?: HTMLAttributes<HTMLImageElement>["className"];
};

export function ImageSlider({ images, className, imageClassName }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  let touchStartX = 0;

  function nextSlide() {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }

  function prevSlide() {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  }

  function handleTouchStart(e: TouchEvent) {
    touchStartX = e.touches[0].clientX;
  }

  function handleTouchEnd(e: TouchEvent) {
    const touchEndX = e.changedTouches[0].clientX;
    if (touchStartX - touchEndX > 50) nextSlide();
    if (touchStartX - touchEndX < -50) prevSlide();
  }

  return (
    <div
      className={cn(
        "relative flex w-full items-center justify-center overflow-hidden",
        className,
      )}
    >
      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((src, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              className={cn("h-40 w-full object-cover", imageClassName)}
              defaultImageSrc="/images/restaurant/default.png"
            />
          </div>
        ))}
      </div>
      <ImageIndex currentIndex={currentIndex} numberOfImage={images.length} />
      <NavButton
        onClick={prevSlide}
        className={cn("left-2", images.length < 2 ? "hidden" : "")}
      >
        <IconChevronLeft />
      </NavButton>
      <NavButton
        onClick={nextSlide}
        className={cn("right-2", images.length < 2 ? "hidden" : "")}
      >
        <IconChevronRight />
      </NavButton>
    </div>
  );
}

function NavButton({ children, className, ...props }: ButtonProps) {
  return (
    <Button
      className={cn(
        "absolute top-1/2 flex h-8 w-8 -translate-y-1/2 transform items-center justify-center rounded-full bg-black/50 p-2 text-white",
        className,
      )}
      variant="ghost"
      {...props}
    >
      {children}
    </Button>
  );
}

function ImageIndex({
  currentIndex,
  numberOfImage,
}: {
  currentIndex: number;
  numberOfImage: number;
}) {
  const componentId = useId();

  if (numberOfImage < 2) {
    return <></>;
  }

  return (
    <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 flex-row items-center gap-1 rounded-full bg-gray-800 px-2 py-1">
      {[...Array(numberOfImage)].map((_, index) => (
        <div
          key={`${componentId}-${index}`}
          className={cn(
            "h-2 w-2 rounded-full bg-gray-500",
            index === currentIndex ? "bg-white" : "",
          )}
        ></div>
      ))}
    </div>
  );
}
