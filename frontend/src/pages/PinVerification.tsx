import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LockIcon, AlertCircleIcon, SparklesIcon } from 'lucide-react';
import { validatePin } from '../utils/pinConfig';
interface PinVerificationProps {
  onSuccess: () => void;
}
export function PinVerification({ onSuccess }: PinVerificationProps) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePin(pin)) {
      onSuccess();
    } else {
      setError(true);
      setAttempts(attempts + 1);
      setPin('');
      // Reset error after animation
      setTimeout(() => setError(false), 2000);
    }
  };
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-amber-50 via-rose-50 to-teal-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) =>
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
          duration: 0.6
        }}
        className="relative z-10 w-full max-w-md">

        <motion.div
          animate={
          error ?
          {
            x: [-10, 10, -10, 10, 0]
          } :
          {}
          }
          transition={{
            duration: 0.4
          }}
          className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-amber-200">

          {/* Lock Icon */}
          <motion.div
            initial={{
              scale: 0,
              rotate: -180
            }}
            animate={{
              scale: 1,
              rotate: 0
            }}
            transition={{
              delay: 0.2,
              type: 'spring'
            }}
            className="flex justify-center mb-6">

            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-rose-400 flex items-center justify-center">
              <LockIcon className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{
              opacity: 0,
              y: -20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: 0.3
            }}
            className="text-2xl md:text-3xl font-bold text-center mb-2 bg-gradient-to-r from-amber-600 to-rose-500 bg-clip-text text-transparent">

            Pour accéder à ton cadeau
          </motion.h2>

          <motion.p
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            transition={{
              delay: 0.4
            }}
            className="text-center text-amber-900/70 mb-6 flex items-center justify-center gap-2">

            Entre ton code secret{' '}
            <SparklesIcon className="w-4 h-4 text-amber-500" />
          </motion.p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Code secret"
                autoFocus
                className={`w-full px-6 py-4 text-center text-2xl font-bold tracking-widest rounded-xl border-2 transition-all ${error ? 'border-red-400 bg-red-50 text-red-700' : 'border-amber-200 focus:border-amber-400 text-amber-900'} focus:outline-none uppercase`} />

            </div>

            <AnimatePresence>
              {error &&
              <motion.div
                initial={{
                  opacity: 0,
                  y: -10
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                exit={{
                  opacity: 0,
                  y: -10
                }}
                className="flex items-center gap-2 p-3 bg-red-50 border-2 border-red-200 rounded-xl text-red-700">

                  <AlertCircleIcon className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm">
                    Code incorrect, réessaye ! Il faut être l'heureux du jour
                    pour voir les vœux.
                  </p>
                </motion.div>
              }
            </AnimatePresence>

            <motion.button
              type="submit"
              whileHover={{
                scale: 1.02
              }}
              whileTap={{
                scale: 0.98
              }}
              className="w-full py-4 bg-gradient-to-r from-amber-500 via-rose-500 to-teal-500 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all">

              Déverrouiller
            </motion.button>
          </form>

          {attempts > 0 &&
          <motion.p
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            className="text-center text-sm text-amber-600 mt-4">

              {attempts === 1 ? '1 tentative' : `${attempts} tentatives`}
            </motion.p>
          }
        </motion.div>
      </motion.div>
    </div>);

}