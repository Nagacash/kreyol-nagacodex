import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';

interface ImageCarouselProps {
  images: string[];
}

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    };
  }
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className="relative aspect-video w-full rounded-lg overflow-hidden flex justify-center items-center bg-zinc-900 shadow-lg shadow-black/30 group">
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={page}
          src={images[imageIndex]}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute h-full w-full object-cover"
          alt={`French Guiana view ${imageIndex + 1}`}
        />
      </AnimatePresence>
      <div className="absolute top-1/2 -translate-y-1/2 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={() => paginate(1)}
          className="bg-black/40 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
          aria-label="Next image"
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 left-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={() => paginate(-1)}
          className="bg-black/40 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
        {images.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === imageIndex ? 'p-1 bg-amber-500' : 'bg-white/50'
            }`}
            onClick={() => setPage([i, i > imageIndex ? 1 : -1])}
           />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
