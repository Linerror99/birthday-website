import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MenuIcon, XIcon } from 'lucide-react';
interface HeaderProps {
  onNavigate: (section: 'quiz' | 'album' | 'timeline') => void;
}
export function Header({ onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuItems = [
  {
    id: 'quiz' as const,
    label: 'Quiz'
  },
  {
    id: 'album' as const,
    label: 'Album'
  },
  {
    id: 'timeline' as const,
    label: 'Timeline'
  }];

  const handleNavigate = (section: 'quiz' | 'album' | 'timeline') => {
    onNavigate(section);
    setMobileMenuOpen(false);
  };
  return (
    <motion.header
      initial={{
        y: -100,
        opacity: 0
      }}
      animate={{
        y: 0,
        opacity: 1
      }}
      transition={{
        duration: 0.6,
        type: 'spring'
      }}
      className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-lg border-b-2 border-amber-200 shadow-sm">

      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Title */}
          <motion.h1
            initial={{
              opacity: 0,
              x: -20
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              delay: 0.3
            }}
            className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-600 via-rose-500 to-teal-500 bg-clip-text text-transparent">

            Joyeux Anniversaire ! 🎉
          </motion.h1>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6" role="navigation">
            {menuItems.map((item, index) =>
            <motion.button
              key={item.id}
              initial={{
                opacity: 0,
                y: -20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: 0.4 + index * 0.1
              }}
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              onClick={() => handleNavigate(item.id)}
              className="px-6 py-2 font-semibold text-amber-900 hover:text-rose-600 transition-colors relative group">

                {item.label}
                <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-rose-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </motion.button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            transition={{
              delay: 0.4
            }}
            whileTap={{
              scale: 0.9
            }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-amber-900"
            aria-label="Toggle menu">

            {mobileMenuOpen ?
            <XIcon className="w-6 h-6" /> :

            <MenuIcon className="w-6 h-6" />
            }
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen &&
        <motion.nav
          initial={{
            opacity: 0,
            height: 0
          }}
          animate={{
            opacity: 1,
            height: 'auto'
          }}
          exit={{
            opacity: 0,
            height: 0
          }}
          className="md:hidden mt-4 pb-4 border-t border-amber-200 pt-4"
          role="navigation">

            {menuItems.map((item) =>
          <motion.button
            key={item.id}
            whileTap={{
              scale: 0.95
            }}
            onClick={() => handleNavigate(item.id)}
            className="block w-full text-left px-4 py-3 font-semibold text-amber-900 hover:bg-amber-50 rounded-lg transition-colors">

                {item.label}
              </motion.button>
          )}
          </motion.nav>
        }
      </div>
    </motion.header>);

}