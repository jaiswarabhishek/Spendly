// src/components/hooks/use-mobile.ts
import { useState, useEffect } from 'react';

export const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      // Set the condition for what you consider a "mobile" screen width
      setIsMobile(window.innerWidth <= 768);
    };

    // Check on initial load
    handleResize();

    // Add event listener on window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};
