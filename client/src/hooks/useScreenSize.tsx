import { useEffect, useState } from 'react';

function useScreenSize(): { isMobileScreen: boolean; isTabletScreen: boolean } {
  const [isMobileScreen, setIsMobileScreen] = useState<boolean>(
    // ~480px
    window.matchMedia('(max-width: 30em)').matches
  );

  const [isTabletScreen, setIsTabletScreen] = useState<boolean>(
    // ~768px
    window.matchMedia('(max-width: 48em)').matches
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.matchMedia('(max-width: 48em)').matches);
      setIsTabletScreen(window.matchMedia('(max-width: 62em)').matches);
    };

    // Initial setup for both states
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { isMobileScreen, isTabletScreen };
}

export { useScreenSize };
