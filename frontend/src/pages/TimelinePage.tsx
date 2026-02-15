import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from 'lucide-react';
import { TimelineContainer } from '../components/Timeline/TimelineContainer';
export function TimelinePage() {
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
            className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-teal-600 to-amber-500 bg-clip-text text-transparent">

            Notre Histoire
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

            Le voyage de notre amitié à travers le temps ⏳
          </motion.p>

          <TimelineContainer />
        </div>
      </main>
    </div>);

}