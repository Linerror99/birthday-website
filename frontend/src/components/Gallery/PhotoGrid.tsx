import React from 'react';
import { motion } from 'framer-motion';
import { Photo } from '../../data/photos';
interface PhotoGridProps {
  photos: Photo[];
  onPhotoClick: (index: number) => void;
}
export function PhotoGrid({ photos, onPhotoClick }: PhotoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {photos.map((photo, index) =>
      <motion.div
        key={photo.id}
        initial={{
          opacity: 0,
          y: 20
        }}
        whileInView={{
          opacity: 1,
          y: 0
        }}
        viewport={{
          once: true
        }}
        transition={{
          delay: index * 0.1
        }}
        whileHover={{
          y: -8
        }}
        onClick={() => onPhotoClick(index)}
        className="group cursor-pointer">

          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow">
            <img
            src={photo.src}
            alt={photo.caption}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="font-semibold text-lg mb-1">{photo.caption}</p>
                {photo.date &&
              <p className="text-sm text-white/80">
                    {new Date(photo.date).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
                  </p>
              }
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>);

}