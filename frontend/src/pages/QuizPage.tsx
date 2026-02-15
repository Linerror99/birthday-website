import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from 'lucide-react';
import { QuizCard } from '../components/Quiz/QuizCard';
import { QuizResults } from '../components/Quiz/QuizResults';
import { quizQuestions } from '../data/quizQuestions';
import { useLocalStorage } from '../hooks/useLocalStorage';
export function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [appState, setAppState] = useLocalStorage('birthdayAppState', {
    isUnlocked: true,
    unlockedAt: new Date().toISOString(),
    quizBestScore: 0,
    quizAttempts: 0
  });
  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    if (currentQuestion < quizQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 1600);
    } else {
      setTimeout(() => {
        setShowResults(true);
        const newScore = isCorrect ? score + 1 : score;
        setAppState({
          ...appState,
          quizBestScore: Math.max(appState.quizBestScore, newScore),
          quizAttempts: appState.quizAttempts + 1
        });
      }, 1600);
    }
  };
  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
  };
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
      <main className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          className="w-full max-w-4xl">

          <motion.h2
            initial={{
              opacity: 0,
              y: -20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-amber-600 to-rose-500 bg-clip-text text-transparent">

            Quiz de l'Amitié
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

            À quel point me connais-tu vraiment ? 🤔
          </motion.p>

          <AnimatePresence mode="wait">
            {!showResults ?
            <QuizCard
              key={currentQuestion}
              question={quizQuestions[currentQuestion]}
              questionNumber={currentQuestion + 1}
              totalQuestions={quizQuestions.length}
              onAnswer={handleAnswer} /> :


            <QuizResults
              score={score}
              totalQuestions={quizQuestions.length}
              onRestart={handleRestartQuiz} />

            }
          </AnimatePresence>
        </motion.div>
      </main>
    </div>);

}