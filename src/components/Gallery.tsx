import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

export function Gallery() {
  const images = [
    "https://picsum.photos/seed/gal1/600/800",
    "https://picsum.photos/seed/gal2/600/800",
    "https://picsum.photos/seed/gal3/600/800",
    "https://picsum.photos/seed/gal4/600/800",
    "https://picsum.photos/seed/gal5/600/800",
    "https://picsum.photos/seed/gal6/600/800",
    "https://picsum.photos/seed/gal7/600/800",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const getOffset = (index: number) => {
    let offset = index - currentIndex;
    const half = Math.floor(images.length / 2);
    // Wrap around logic for infinite carousel effect
    if (offset > half) offset -= images.length;
    if (offset < -half) offset += images.length;
    return offset;
  };

  return (
    <section id="gallery" className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden flex items-center justify-center">
      <div 
        className="relative w-full max-w-6xl h-[500px] md:h-[600px] flex items-center justify-center" 
        style={{ perspective: '1200px' }}
      >
        {images.map((src, index) => {
          const offset = getOffset(index);
          const isCenter = offset === 0;
          const isLeft = offset === -1;
          const isRight = offset === 1;
          
          // Calculate styles based on offset
          let transformStyle = '';
          let zIndex = 0;
          let opacity = 1;
          let blurClass = 'blur-0';

          if (isCenter) {
            transformStyle = 'translateX(0) scale(1) rotateY(0deg)';
            zIndex = 30;
            blurClass = 'blur-0';
          } else if (isLeft) {
            transformStyle = 'translateX(-65%) scale(0.8) rotateY(15deg)';
            zIndex = 20;
            blurClass = 'blur-[4px]';
          } else if (isRight) {
            transformStyle = 'translateX(65%) scale(0.8) rotateY(-15deg)';
            zIndex = 20;
            blurClass = 'blur-[4px]';
          } else {
            // Hidden cards (further back)
            transformStyle = `translateX(${offset > 0 ? '120%' : '-120%'}) scale(0.6) rotateY(${offset > 0 ? '-25deg' : '25deg'})`;
            zIndex = 10;
            opacity = 0;
            blurClass = 'blur-md';
          }

          return (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "absolute w-64 md:w-80 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 ease-out cursor-pointer",
                blurClass
              )}
              style={{
                transform: transformStyle,
                zIndex: zIndex,
                opacity: opacity,
              }}
            >
              {/* Overlay to darken non-center cards */}
              <div className={cn(
                "absolute inset-0 bg-black/30 transition-opacity duration-700 z-10",
                isCenter ? "opacity-0" : "opacity-100 hover:opacity-50"
              )} />
              <img
                src={src}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          );
        })}

        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-4 md:left-12 z-40 p-3 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur shadow-lg text-slate-800 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 hover:scale-110 transition-all"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 md:right-12 z-40 p-3 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur shadow-lg text-slate-800 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 hover:scale-110 transition-all"
          aria-label="Next image"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
}
