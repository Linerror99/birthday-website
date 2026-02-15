import { useState, useEffect } from 'react';
import { getTimeRemaining, TARGET_DATE } from '../utils/dateUtils';

export function useCountdown(targetDate: Date = TARGET_DATE) {
  const [timeRemaining, setTimeRemaining] = useState(
    getTimeRemaining(targetDate)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = getTimeRemaining(targetDate);
      setTimeRemaining(remaining);

      if (remaining.total <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return timeRemaining;
}