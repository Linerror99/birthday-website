import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckIcon, XIcon } from 'lucide-react';
import { QuizQuestion } from '../../data/quizQuestions';
interface QuizCardProps {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (isCorrect: boolean) => void;
}
export function QuizCard({
  question,
  questionNumber,
  totalQuestions,
  onAnswer
}: QuizCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const handleAnswerClick = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setShowFeedback(true);
    const isCorrect = index === question.correctAnswer;
    setTimeout(() => {
      onAnswer(isCorrect);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }, 1500);
  };
  const isCorrect = selectedAnswer === question.correctAnswer;
  return (
    <motion.div
      initial={{
        opacity: 0,
        rotateY: -90
      }}
      animate={{
        opacity: 1,
        rotateY: 0
      }}
      exit={{
        opacity: 0,
        rotateY: 90
      }}
      transition={{
        duration: 0.5
      }}
      className="w-full max-w-2xl mx-auto">

      <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-amber-200">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-amber-900">
              Question {questionNumber} / {totalQuestions}
            </span>
            <span className="text-sm font-medium text-teal-600">
              {Math.round(questionNumber / totalQuestions * 100)}%
            </span>
          </div>
          <div className="w-full h-2 bg-amber-100 rounded-full overflow-hidden">
            <motion.div
              initial={{
                width: 0
              }}
              animate={{
                width: `${questionNumber / totalQuestions * 100}%`
              }}
              transition={{
                duration: 0.5
              }}
              className="h-full bg-gradient-to-r from-amber-400 to-teal-400" />

          </div>
        </div>

        {/* Question */}
        <h2 className="text-2xl font-bold text-amber-900 mb-8 text-center">
          {question.question}
        </h2>

        {/* Options */}
        <div className="space-y-4">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectAnswer = index === question.correctAnswer;
            const showCorrect = showFeedback && isCorrectAnswer;
            const showWrong = showFeedback && isSelected && !isCorrect;
            return (
              <motion.button
                key={index}
                onClick={() => handleAnswerClick(index)}
                disabled={selectedAnswer !== null}
                whileHover={
                selectedAnswer === null ?
                {
                  scale: 1.02
                } :
                {}
                }
                whileTap={
                selectedAnswer === null ?
                {
                  scale: 0.98
                } :
                {}
                }
                animate={
                showWrong ?
                {
                  x: [-10, 10, -10, 10, 0]
                } :
                {}
                }
                transition={{
                  duration: 0.4
                }}
                className={`
                  w-full p-4 rounded-xl text-left font-medium transition-all
                  flex items-center justify-between
                  ${selectedAnswer === null ? 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-2 border-amber-200' : ''}
                  ${showCorrect ? 'bg-green-100 text-green-900 border-2 border-green-400' : ''}
                  ${showWrong ? 'bg-red-100 text-red-900 border-2 border-red-400' : ''}
                  ${!showCorrect && !showWrong && selectedAnswer !== null ? 'bg-gray-100 text-gray-500 border-2 border-gray-200' : ''}
                `}>

                <span>{option}</span>
                <AnimatePresence>
                  {showCorrect &&
                  <motion.div
                    initial={{
                      scale: 0,
                      rotate: -180
                    }}
                    animate={{
                      scale: 1,
                      rotate: 0
                    }}
                    exit={{
                      scale: 0
                    }}>

                      <CheckIcon className="w-6 h-6 text-green-600" />
                    </motion.div>
                  }
                  {showWrong &&
                  <motion.div
                    initial={{
                      scale: 0,
                      rotate: 180
                    }}
                    animate={{
                      scale: 1,
                      rotate: 0
                    }}
                    exit={{
                      scale: 0
                    }}>

                      <XIcon className="w-6 h-6 text-red-600" />
                    </motion.div>
                  }
                </AnimatePresence>
              </motion.button>);

          })}
        </div>

        {/* Confetti effect on correct answer */}
        <AnimatePresence>
          {showFeedback && isCorrect &&
          <div className="fixed inset-0 pointer-events-none flex items-center justify-center">
              {[...Array(20)].map((_, i) =>
            <motion.div
              key={i}
              initial={{
                x: 0,
                y: 0,
                opacity: 1,
                scale: 1
              }}
              animate={{
                x: (Math.random() - 0.5) * 400,
                y: (Math.random() - 0.5) * 400,
                opacity: 0,
                scale: 0,
                rotate: Math.random() * 360
              }}
              transition={{
                duration: 1,
                ease: 'easeOut'
              }}
              className="absolute w-3 h-3 rounded-full"
              style={{
                backgroundColor: [
                '#F59E0B',
                '#FB7185',
                '#14B8A6',
                '#FCD34D'][
                Math.floor(Math.random() * 4)]
              }} />

            )}
            </div>
          }
        </AnimatePresence>
      </div>
    </motion.div>);

}