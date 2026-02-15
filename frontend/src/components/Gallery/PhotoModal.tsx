import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Photo } from '../../data/photos';
import { useSwipe } from '../../hooks/useSwipe';
interface PhotoModalProps {
  photos: Photo[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
}
export function PhotoModal({
  photos,
  currentIndex,
  onClose,
  onNavigate
}: PhotoModalProps) {
  const currentPhoto = photos[currentIndex];
  const swipeHandlers = useSwipe({
    onSwipeLeft: () => onNavigate('next'),
    onSwipeRight: () => onNavigate('prev')
  });
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate('prev');
      if (e.key === 'ArrowRight') onNavigate('next');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNavigate]);
  return (
    <AnimatePresence>
      <motion.div
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        exit={{
          opacity: 0
        }}
        onClick={onClose}
        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">

        {/* Close Button */}
        <motion.button
          initial={{
            opacity: 0,
            scale: 0.8
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          whileHover={{
            scale: 1.1
          }}
          whileTap={{
            scale: 0.9
          }}
          onClick={onClose}
          className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
          aria-label="Fermer">

          <XIcon className="w-6 h-6" />
        </motion.button>

        {/* Navigation Buttons */}
        {currentIndex > 0 &&
        <motion.button
          initial={{
            opacity: 0,
            x: -20
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          whileHover={{
            scale: 1.1
          }}
          whileTap={{
            scale: 0.9
          }}
          onClick={(e) => {
            e.stopPropagation();
            onNavigate('prev');
          }}
          className="absolute left-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
          aria-label="Photo précédente">

            <ChevronLeftIcon className="w-6 h-6" />
          </motion.button>
        }

        {currentIndex < photos.length - 1 &&
        <motion.button
          initial={{
            opacity: 0,
            x: 20
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          whileHover={{
            scale: 1.1
          }}
          whileTap={{
            scale: 0.9
          }}
          onClick={(e) => {
            e.stopPropagation();
            onNavigate('next');
          }}
          className="absolute right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10"
          aria-label="Photo suivante">

            <ChevronRightIcon className="w-6 h-6" />
          </motion.button>
        }

        {/* Image Container */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          exit={{
            opacity: 0,
            scale: 0.9
          }}
          onClick={(e) => e.stopPropagation()}
          className="max-w-5xl w-full"
          {...swipeHandlers}>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{
                opacity: 0,
                x: 100
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              exit={{
                opacity: 0,
                x: -100
              }}
              transition={{
                duration: 0.3
              }}
              className="relative">

              <img
                src={currentPhoto.src}
                alt={currentPhoto.caption}
                className="w-full h-auto max-h-[80vh] object-contain rounded-2xl" />

              <div className="mt-6 text-center text-white">
                <p className="text-xl font-semibold mb-2">
                  {currentPhoto.caption}
                </p>
                {currentPhoto.date &&
                <p className="text-white/70">
                    {new Date(currentPhoto.date).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                  </p>
                }
                <p className="text-sm text-white/50 mt-2">
                  {currentIndex + 1} / {photos.length}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>);

}