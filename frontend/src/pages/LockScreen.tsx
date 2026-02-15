import React from 'react';
import { motion } from 'framer-motion';
interface LockScreenProps {
  onUnlock: () => void;
}
export function LockScreen({ onUnlock }: LockScreenProps) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-amber-50 via-rose-50 to-teal-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) =>
        <motion.div
          key={i}
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5,
            opacity: Math.random() * 0.3 + 0.1
          }}
          animate={{
            y: [null, Math.random() * window.innerHeight],
            x: [null, Math.random() * window.innerWidth]
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear'
          }}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: ['#F59E0B', '#FB7185', '#14B8A6'][
            Math.floor(Math.random() * 3)]

          }} />

        )}
      </div>

      {/* Content */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9
        }}
        animate={{
          opacity: 1,
          scale: 1
        }}
        transition={{
          duration: 0.8
        }}
        className="relative z-10 text-center max-w-4xl w-full">

        {/* Title */}
        <motion.h1
          initial={{
            opacity: 0,
            y: -30
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 0.3,
            duration: 0.8
          }}
          className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-600 via-rose-500 to-teal-500 bg-clip-text text-transparent">

          Quelque chose de spécial t'attend...
        </motion.h1>

        <motion.p
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          transition={{
            delay: 0.5
          }}
          className="text-xl md:text-2xl text-amber-900/70 mb-12">

          Une surprise t'attend ! ✨
        </motion.p>

        {/* Unlock Button */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          transition={{
            duration: 0.5,
            delay: 0.7
          }}>

          <motion.button
            whileHover={{
              scale: 1.05
            }}
            whileTap={{
              scale: 0.95
            }}
            animate={{
              boxShadow: [
              '0 0 30px rgba(245, 158, 11, 0.5)',
              '0 0 60px rgba(251, 113, 133, 0.6)',
              '0 0 30px rgba(245, 158, 11, 0.5)']

            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
            onClick={onUnlock}
            className="px-12 py-6 bg-gradient-to-r from-amber-500 via-rose-500 to-teal-500 text-white text-2xl font-bold rounded-2xl shadow-2xl">

            Découvrir 🎁
          </motion.button>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-amber-400/20 to-rose-400/20 rounded-full blur-3xl" />

        <motion.div
          animate={{
            rotate: -360
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="absolute -bottom-20 -right-20 w-60 h-60 bg-gradient-to-br from-teal-400/20 to-amber-400/20 rounded-full blur-3xl" />

      </motion.div>
    </div>);

}