import React from 'react';
import { motion } from 'framer-motion';
import { TrophyIcon, RefreshCwIcon } from 'lucide-react';
interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}
export function QuizResults({
  score,
  totalQuestions,
  onRestart
}: QuizResultsProps) {
  const percentage = score / totalQuestions * 100;
  const getMessage = () => {
    if (percentage < 30) {
      return {
        title: 'On dirait que tu me connais pas si bien que ça 😅',
        subtitle:
        "Mais c'est pas grave, on a encore plein de souvenirs à créer ensemble !",
        color: 'text-rose-600'
      };
    } else if (percentage < 70) {
      return {
        title: 'Pas mal, mais tu peux mieux faire !',
        subtitle:
        'Tu me connais bien, mais il reste encore quelques secrets à découvrir.',
        color: 'text-amber-600'
      };
    } else {
      return {
        title: 'Wow, tu me connais vraiment par cœur ! 🔥',
        subtitle:
        'Tu es définitivement mon meilleur ami ! Notre connexion est incroyable.',
        color: 'text-teal-600'
      };
    }
  };
  const message = getMessage();
  return (
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
        duration: 0.5
      }}
      className="w-full max-w-2xl mx-auto">

      <div className="bg-white rounded-2xl shadow-xl p-12 border-2 border-amber-200 text-center">
        {/* Trophy Icon */}
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
            type: 'spring',
            stiffness: 200
          }}
          className="flex justify-center mb-6">

          <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-rose-400 rounded-full flex items-center justify-center">
            <TrophyIcon className="w-12 h-12 text-white" />
          </div>
        </motion.div>

        {/* Score */}
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
            delay: 0.3
          }}
          className="mb-6">

          <div className="text-6xl font-bold text-amber-900 mb-2">
            {score} / {totalQuestions}
          </div>
          <div className="text-2xl font-semibold text-teal-600">
            {percentage.toFixed(0)}%
          </div>
        </motion.div>

        {/* Message */}
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
            delay: 0.4
          }}
          className="mb-8">

          <h2 className={`text-2xl font-bold mb-3 ${message.color}`}>
            {message.title}
          </h2>
          <p className="text-lg text-amber-900/70">{message.subtitle}</p>
        </motion.div>

        {/* Restart Button */}
        <motion.button
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 0.5
          }}
          whileHover={{
            scale: 1.05
          }}
          whileTap={{
            scale: 0.95
          }}
          onClick={onRestart}
          className="px-8 py-4 bg-gradient-to-r from-amber-500 to-rose-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-shadow flex items-center gap-3 mx-auto">

          <RefreshCwIcon className="w-5 h-5" />
          Recommencer le quiz
        </motion.button>
      </div>
    </motion.div>);

}