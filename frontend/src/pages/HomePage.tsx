import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TargetIcon, CameraIcon, ClockIcon, HeartIcon } from 'lucide-react';
const navigationCards = [
{
  id: 'quiz',
  title: 'Quiz',
  description: 'Teste tes connaissances',
  icon: TargetIcon,
  gradient: 'from-amber-400 to-rose-400',
  path: '/quiz'
},
{
  id: 'album',
  title: 'Album',
  description: 'Nos plus beaux souvenirs',
  icon: CameraIcon,
  gradient: 'from-rose-400 to-teal-400',
  path: '/album'
},
{
  id: 'timeline',
  title: 'Timeline',
  description: 'Notre histoire ensemble',
  icon: ClockIcon,
  gradient: 'from-teal-400 to-amber-400',
  path: '/timeline'
},
{
  id: 'wishes',
  title: 'Vœux',
  description: 'Messages de tes proches',
  icon: HeartIcon,
  gradient: 'from-purple-400 to-pink-400',
  path: '/voeux'
}];

export function HomePage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-amber-50 via-rose-50 to-teal-50 relative overflow-hidden">
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
            background: ['#F59E0B', '#FB7185', '#14B8A6', '#A78BFA'][
            Math.floor(Math.random() * 4)]

          }} />

        )}
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        {/* Hero Section */}
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
            duration: 0.8
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
              duration: 0.6
            }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-600 via-rose-500 to-teal-500 bg-clip-text text-transparent">

            Joyeux Anniversaire !
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
            className="text-xl md:text-2xl text-amber-900/70 mb-8">

            Une journée spéciale pour une personne extraordinaire
          </motion.p>

          {/* Photo */}
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
              delay: 0.6,
              type: 'spring'
            }}
            className="relative inline-block mb-8">

            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400"
                alt="Photo d'anniversaire"
                className="w-full h-full object-cover" />

            </div>
          </motion.div>
        </motion.div>

        {/* Navigation Cards */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 0.8,
            duration: 0.6
          }}
          className="w-full max-w-5xl">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {navigationCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.id}
                  initial={{
                    opacity: 0,
                    y: 20
                  }}
                  animate={{
                    opacity: 1,
                    y: 0
                  }}
                  transition={{
                    delay: 0.9 + index * 0.1
                  }}>

                  <Link to={card.path}>
                    <motion.div
                      whileHover={{
                        scale: 1.05,
                        y: -5
                      }}
                      whileTap={{
                        scale: 0.95
                      }}
                      className="bg-white rounded-2xl shadow-lg p-6 border-2 border-amber-200 cursor-pointer group h-full">

                      <div
                        className={`w-16 h-16 rounded-full bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>

                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-amber-900 mb-2">
                        {card.title}
                      </h3>
                      <p className="text-amber-700">{card.description}</p>
                      <motion.div className="mt-4 h-1 bg-gradient-to-r from-amber-400 to-rose-400 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                    </motion.div>
                  </Link>
                </motion.div>);

            })}
          </div>
        </motion.div>

        {/* Footer Message */}
        <motion.p
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          transition={{
            delay: 1.5
          }}
          className="mt-12 text-center text-amber-900/60 text-sm flex items-center gap-2">

          Fait avec{' '}
          <HeartIcon className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />{' '}
          pour toi
        </motion.p>
      </div>
    </div>);

}