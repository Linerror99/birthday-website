import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LockScreen } from './pages/LockScreen';
import { PinVerification } from './pages/PinVerification';
import { HomePage } from './pages/HomePage';
import { QuizPage } from './pages/QuizPage';
import { AlbumPage } from './pages/AlbumPage';
import { TimelinePage } from './pages/TimelinePage';
import { WishesPage } from './pages/WishesPage';
import { SubmitWishPage } from './pages/SubmitWishPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { useLocalStorage, INITIAL_APP_STATE } from './hooks/useLocalStorage';
import { isDateReached } from './utils/dateUtils';
export function App() {
  const [appState, setAppState] = useLocalStorage(
    'birthdayAppState',
    INITIAL_APP_STATE
  );
  const [showMainApp, setShowMainApp] = useState(false);
  const [showPinVerification, setShowPinVerification] = useState(false);
  useEffect(() => {
    // Check if already unlocked or if date has been reached
    if (appState.isUnlocked || isDateReached()) {
      setShowMainApp(true);
      // Check if PIN verification is needed
      if (!appState.isPinVerified) {
        setShowPinVerification(true);
      }
    }
  }, [appState.isUnlocked, appState.isPinVerified]);
  const handleUnlock = () => {
    setAppState({
      ...appState,
      isUnlocked: true,
      unlockedAt: new Date().toISOString()
    });
    setShowMainApp(true);
    setShowPinVerification(true);
  };
  const handlePinSuccess = () => {
    setAppState({
      ...appState,
      isPinVerified: true
    });
    setShowPinVerification(false);
  };
  // Public routes (always accessible)
  if (!showMainApp) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/souhaits" element={<SubmitWishPage />} />
          <Route
            path="/admin-dashboard-secret-xyz123"
            element={<AdminDashboard />} />

          <Route path="*" element={<LockScreen onUnlock={handleUnlock} />} />
        </Routes>
      </BrowserRouter>);

  }
  // PIN verification screen (after unlock, before main app)
  if (showPinVerification) {
    return <PinVerification onSuccess={handlePinSuccess} />;
  }
  // Main app routes (after unlock AND pin verification)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/album" element={<AlbumPage />} />
        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="/voeux" element={<WishesPage />} />
        <Route path="/souhaits" element={<SubmitWishPage />} />
        <Route
          path="/admin-dashboard-secret-xyz123"
          element={<AdminDashboard />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>);

}