import { useState, useEffect } from 'react';
import { ArrowaltCircleUp } from '@/icon';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const checkScrollPosition = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollPosition);
    return () => window.removeEventListener('scroll', checkScrollPosition);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return isVisible ? (
    <>
      <button
        onClick={scrollToTop}
        className="fixed right-4 bottom-10 p-[0.5] rounded-full shadow-lg hover:bg-white hover:shadow-[0_1px_6px_rgba(0,0,0,0.12),0_1px_4px_rgba(0,0,0,0.24)] transition-all"
      >
        <ArrowaltCircleUp className="h-10 fill-[#c8c8c8]" />
      </button>
    </>
  ) : (
    <div>hello</div>
  );
};

export default ScrollToTopButton;
