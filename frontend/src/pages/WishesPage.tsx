import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, Loader2Icon } from 'lucide-react';
import { WishCard } from '../components/WishCard';
import { getApprovedWishes } from '../api/wishesApi';
import { Wish } from '../data/wishes';
export function WishesPage() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadWishes = async () => {
      try {
        const approvedWishes = await getApprovedWishes();
        setWishes(approvedWishes);
      } catch (error) {
        console.error('Error loading wishes:', error);
      } finally {
        setLoading(false);
      }
    };
    loadWishes();
  }, []);
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
            className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">

            Vœux de tes Proches
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

            Des messages remplis d'amour pour toi 💌
          </motion.p>

          {loading ?
          <div className="flex flex-col items-center justify-center py-20">
              <Loader2Icon className="w-12 h-12 text-amber-500 animate-spin mb-4" />
              <p className="text-amber-900/70">Chargement des vœux...</p>
            </div> :
          wishes.length === 0 ?
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            className="text-center py-20">

              <p className="text-2xl text-amber-900/70 mb-4">
                Aucun vœu pour le moment 😊
              </p>
              <p className="text-amber-900/50">
                Les messages de tes proches apparaîtront ici !
              </p>
            </motion.div> :

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishes.map((wish, index) =>
            <WishCard key={wish.id} wish={wish} index={index} />
            )}
            </div>
          }
        </div>
      </main>
    </div>);

}