import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from 'lucide-react';
import { PhotoGrid } from '../components/Gallery/PhotoGrid';
import { PhotoModal } from '../components/Gallery/PhotoModal';
import { photos } from '../data/photos';
export function AlbumPage() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(
    null
  );
  const handlePhotoNavigate = (direction: 'prev' | 'next') => {
    if (selectedPhotoIndex === null) return;
    if (direction === 'prev' && selectedPhotoIndex > 0) {
      setSelectedPhotoIndex(selectedPhotoIndex - 1);
    } else if (direction === 'next' && selectedPhotoIndex < photos.length - 1) {
      setSelectedPhotoIndex(selectedPhotoIndex + 1);
    }
  };
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-amber-50 via-cream-50 to-teal-50">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-lg border-b-2 border-amber-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link to="/">
            <motion.button
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              className="flex items-center gap-2 text-amber-900 hover:text-rose-600 transition-colors font-semibold">

              <ArrowLeftIcon className="w-5 h-5" />
              Retour
            </motion.button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{
              opacity: 0,
              y: -20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-rose-600 to-teal-500 bg-clip-text text-transparent">

            Album Souvenirs
          </motion.h2>
          <motion.p
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            transition={{
              delay: 0.2
            }}
            className="text-center text-amber-900/70 mb-12 text-lg">

            Nos plus beaux moments ensemble 📸
          </motion.p>

          <PhotoGrid photos={photos} onPhotoClick={setSelectedPhotoIndex} />
        </div>
      </main>

      {/* Photo Modal */}
      {selectedPhotoIndex !== null &&
      <PhotoModal
        photos={photos}
        currentIndex={selectedPhotoIndex}
        onClose={() => setSelectedPhotoIndex(null)}
        onNavigate={handlePhotoNavigate} />

      }
    </div>);

}