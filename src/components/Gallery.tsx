import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Gallery() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -current.offsetWidth / 1.5 : current.offsetWidth / 1.5;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const images = [
    "https://picsum.photos/seed/gal1/600/800",
    "https://picsum.photos/seed/gal2/600/800",
    "https://picsum.photos/seed/gal3/600/800",
    "https://picsum.photos/seed/gal4/600/800",
    "https://picsum.photos/seed/gal5/600/800",
    "https://picsum.photos/seed/gal6/600/800",
    "https://picsum.photos/seed/gal7/600/800",
    "https://picsum.photos/seed/gal8/600/800",
  ];

  return (
    <section id="gallery" className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl relative group">
        
        {/* Navigation Buttons */}
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 md:-left-6 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur shadow-xl text-slate-800 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
          aria-label="Scroll left"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 md:-right-6 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur shadow-xl text-slate-800 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
          aria-label="Scroll right"
        >
          <ChevronRight size={24} />
        </button>

        {/* Scroll Container */}
        <div 
          ref={scrollRef}
          className="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory pb-12 pt-8 px-4 -mx-4 cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <style>{`
            #gallery .flex::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          
          {images.map((src, idx) => (
            <div 
              key={idx}
              className="min-w-[260px] md:min-w-[320px] aspect-[3/4] shrink-0 snap-center rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 bg-slate-200 dark:bg-slate-800"
            >
              <img 
                src={src} 
                alt={`Gallery image ${idx + 1}`} 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
