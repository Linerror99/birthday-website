import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileTextIcon, VideoIcon } from 'lucide-react';
import { Wish } from '../data/wishes';
interface WishCardProps {
  wish: Wish;
  index: number;
}
export function WishCard({ wish, index }: WishCardProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  // Rotation variations for post-it effect
  const rotations = [-2, 1, -1, 2, -1.5, 1.5];
  const rotation = rotations[index % rotations.length];
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 50,
        rotate: 0
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        rotate: rotation
      }}
      viewport={{
        once: true,
        margin: '-50px'
      }}
      transition={{
        delay: index * 0.1,
        duration: 0.5
      }}
      whileHover={{
        scale: 1.05,
        rotate: 0,
        zIndex: 10
      }}
      className="relative">

      <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg shadow-lg p-6 border-2 border-amber-200 min-h-[250px] flex flex-col">
        {/* Name Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-rose-400 flex items-center justify-center text-white font-bold text-lg">
              {wish.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-bold text-amber-900">{wish.name}</p>
              <p className="text-xs text-amber-700">
                {new Date(wish.createdAt).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long'
                })}
              </p>
            </div>
          </div>
          {wish.type === 'video' ?
          <VideoIcon className="w-6 h-6 text-amber-600" /> :

          <FileTextIcon className="w-6 h-6 text-amber-600" />
          }
        </div>

        {/* Content */}
        <div className="flex-1">
          {wish.type === 'text' ?
          <p className="text-amber-900 leading-relaxed italic">
              "{wish.message}"
            </p> :

          <div className="space-y-3">
              {wish.message &&
            <p className="text-amber-900 text-sm italic">
                  "{wish.message}"
                </p>
            }
              {wish.videoUrl &&
            <div className="relative rounded-lg overflow-hidden bg-black">
                  <video
                src={wish.videoUrl}
                controls
                className="w-full h-48 object-cover"
                onPlay={() => setIsVideoPlaying(true)}
                onPause={() => setIsVideoPlaying(false)} />

                </div>
            }
            </div>
          }
        </div>

        {/* Decorative tape effect */}
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-amber-200/50 rotate-0 rounded-sm" />
      </div>
    </motion.div>);

}