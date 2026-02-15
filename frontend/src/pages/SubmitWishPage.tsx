import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { UsersIcon } from 'lucide-react';
import { WishForm } from '../components/WishForm';
import { getContributionCount } from '../api/wishesApi';
export function SubmitWishPage() {
  const [contributionCount, setContributionCount] = useState<number | null>(
    null
  );
  useEffect(() => {
    const loadCount = async () => {
      try {
        const count = await getContributionCount();
        setContributionCount(count);
      } catch (error) {
        console.error('Error loading contribution count:', error);
      }
    };
    loadCount();
  }, []);
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-amber-50 via-rose-50 to-teal-50 relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) =>
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
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <motion.div
          initial={{
            opacity: 0,
            y: -30
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.6
          }}
          className="text-center mb-12">

          <motion.h1
            initial={{
              opacity: 0,
              scale: 0.9
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            transition={{
              delay: 0.2,
              duration: 0.5
            }}
            className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-amber-600 via-rose-500 to-teal-500 bg-clip-text text-transparent">

            Laisse un message pour [Prénom]
          </motion.h1>

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
            className="text-lg md:text-xl text-amber-900/70 mb-4">

            Ton message apparaîtra le jour de son anniversaire !
          </motion.p>

          {/* Contribution Counter */}
          {contributionCount !== null &&
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
              delay: 0.6
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border-2 border-amber-200 shadow-sm">

              <UsersIcon className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-semibold text-amber-900">
                {contributionCount}{' '}
                {contributionCount === 1 ? 'personne a' : 'personnes ont'} déjà
                contribué
              </span>
            </motion.div>
          }
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 0.8
          }}
          className="w-full">

          <WishForm />
        </motion.div>

        <motion.p
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          transition={{
            delay: 1
          }}
          className="mt-8 text-center text-amber-900/60 text-sm">

          Merci de participer à cette surprise !
        </motion.p>
      </div>
    </div>);

}