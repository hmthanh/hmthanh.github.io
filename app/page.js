'use client';

import { useEffect, useState } from 'react';
import About from '@/components/About/About';
import Accomplishments from '@/components/Accomplishments/Accomplishments';
import FancyboxWrapper from '@/components/Certificate/FancyboxWrapper';
import Education from '@/components/Education/Education';
import Experience from '@/components/Experience/Experience';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import Miscellaneous from '@/components/Miscellaneous/Miscellaneous';
import MobileNav from '@/components/MobileNav';
import News from '@/components/News/News';
import ScrollToTopButton from '@/components/ScrollToTopButton/ScrollToTopButton';
import Loading from '@/components/Loading';

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  // useEffect(() => {
  //   const handleLoad = () => {
  //     setTimeout(() => {
  //       setIsLoading(false);
  //     }, 1000);
  //     //   setIsLoading(false);
  //   };

  //   window.addEventListener('load', handleLoad);

  //   return () => {
  //     window.removeEventListener('load', handleLoad);
  //   };
  // }, []);
  useEffect(() => {
    let timeoutId;

    const handleLoad = () => {
      // If the page loads in less than 3 seconds, wait for 1 second before hiding the loader
      if (timeoutId) {
        clearTimeout(timeoutId); // Clear the 3-second timeout
        setTimeout(() => {
          setIsLoading(false);
        }, 800); // Wait for 1 second
      } else {
        // If the page takes more than 3 seconds to load, hide the loader immediately
        setIsLoading(false);
      }
    };

    // Set a timeout for 3 seconds
    timeoutId = setTimeout(() => {
      timeoutId = null; // Clear the timeout ID
    }, 1000);

    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
      if (timeoutId) clearTimeout(timeoutId); // Cleanup the timeout
    };
  }, []);

  return (
    <FancyboxWrapper>
      <MobileNav></MobileNav>
      <main className="main">
        <div className="wrapper">
          <div
            className="head-bg"
            style={{ backgroundImage: `url('/img/cover.webp')` }}
          ></div>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <Header></Header>
              <div className="content">
                <div className="container">
                  <About />
                  <News />
                  <Education />
                  <Experience />
                  <Accomplishments />
                  <Miscellaneous />
                </div>
              </div>
              <Footer></Footer>
            </>
          )}
        </div>
      </main>
      {/* <Link className="btn-scroll-top" href="/#">
        <ArrowaltCircleUp />
      </Link> */}
      <ScrollToTopButton />
    </FancyboxWrapper>
  );
}
