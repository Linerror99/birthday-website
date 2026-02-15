import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { QuizCard } from '../components/Quiz/QuizCard';
import { QuizResults } from '../components/Quiz/QuizResults';
import { PhotoGrid } from '../components/Gallery/PhotoGrid';
import { PhotoModal } from '../components/Gallery/PhotoModal';
import { TimelineContainer } from '../components/Timeline/TimelineContainer';
import { quizQuestions } from '../data/quizQuestions';
import { photos } from '../data/photos';
import { useLocalStorage } from '../hooks/useLocalStorage';
export function MainApp() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(
    null
  );
  const [appState, setAppState] = useLocalStorage('birthdayAppState', {
    isUnlocked: true,
    unlockedAt: new Date().toISOString(),
    quizBestScore: 0,
    quizAttempts: 0
  });
  const quizRef = useRef<HTMLDivElement>(null);
  const albumRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const handleNavigate = (section: 'quiz' | 'album' | 'timeline') => {
    const refs = {
      quiz: quizRef,
      album: albumRef,
      timeline: timelineRef
    };
    refs[section].current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };
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
  const handlePhotoNavigate = (direction: 'prev' | 'next') => {
    if (selectedPhotoIndex === null) return;
    if (direction === 'prev' && selectedPhotoIndex > 0) {
      setSelectedPhotoIndex(selectedPhotoIndex - 1);
    } else if (direction === 'next' && selectedPhotoIndex < photos.length - 1) {
      setSelectedPhotoIndex(selectedPhotoIndex + 1);
    }
  };
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-amber-50 via-cream-50 to-teal-50">
      <Header onNavigate={handleNavigate} />

      <main className="w-full">
        {/* Quiz Section */}
        <section
          ref={quizRef}
          className="min-h-screen flex flex-col items-center justify-center px-4 py-20">

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
        </section>

        {/* Album Section */}
        <section ref={albumRef} className="min-h-screen px-4 py-20">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{
                opacity: 0,
                y: -20
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}
              viewport={{
                once: true
              }}
              className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-rose-600 to-teal-500 bg-clip-text text-transparent">

              Album Souvenirs
            </motion.h2>
            <motion.p
              initial={{
                opacity: 0
              }}
              whileInView={{
                opacity: 1
              }}
              viewport={{
                once: true
              }}
              transition={{
                delay: 0.2
              }}
              className="text-center text-amber-900/70 mb-12 text-lg">

              Nos plus beaux moments ensemble 📸
            </motion.p>

            <PhotoGrid photos={photos} onPhotoClick={setSelectedPhotoIndex} />
          </div>
        </section>

        {/* Timeline Section */}
        <section ref={timelineRef} className="min-h-screen px-4 py-20">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              initial={{
                opacity: 0,
                y: -20
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}
              viewport={{
                once: true
              }}
              className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-teal-600 to-amber-500 bg-clip-text text-transparent">

              Notre Histoire
            </motion.h2>
            <motion.p
              initial={{
                opacity: 0
              }}
              whileInView={{
                opacity: 1
              }}
              viewport={{
                once: true
              }}
              transition={{
                delay: 0.2
              }}
              className="text-center text-amber-900/70 mb-12 text-lg">

              Le voyage de notre amitié à travers le temps ⏳
            </motion.p>

            <TimelineContainer />
          </div>
        </section>
      </main>

      <Footer />

      {/* Photo Modal */}
      {selectedPhotoIndex !== null &&
      <PhotoModal
        photos={photos}
        currentIndex={selectedPhotoIndex}
        onClose={() => setSelectedPhotoIndex(null)}
        onNavigate={handlePhotoNavigate} />

      }
    </div>);

}