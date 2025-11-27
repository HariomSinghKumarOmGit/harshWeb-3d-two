import { useState, useEffect } from 'react';

/**
 * Custom hook to track scroll events and provide scroll state
 * Used for triggering Steve's animations on scroll
 */
export const useScrollAnimation = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let scrollTimeout;

    const handleScroll = (e) => {
      const delta = e.deltaY;
      setScrollY(prev => prev + delta);
      setIsScrolling(true);

      // Clear existing timeout
      clearTimeout(scrollTimeout);

      // Set scrolling to false after 150ms of no scrolling
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('wheel', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Normalize scroll value between 0 and 1
  const normalizedScroll = Math.min(Math.abs(scrollY) / 1000, 1);

  return { scrollY, isScrolling, normalizedScroll };
};
