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

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      //   setIsLoading(false);
    };

    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  if (isLoading)
    return (
      <div
        id="preloader"
        className="h-screen w-screen fixed top-0 left-0 bg-[#05050F] z-50"
      >
        <div className="preloader-container">
          <div className="cssload-loader">
            <div className="cssload-inner cssload-one"></div>
            <div className="cssload-inner cssload-two"></div>
            <div className="cssload-inner cssload-three"></div>
          </div>
        </div>
      </div>
    );

  return (
    <FancyboxWrapper>
      <MobileNav></MobileNav>
      <main className="main h-[2000px] ">
        <div className="wrapper">
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
        </div>
      </main>
      {/* <Link className="btn-scroll-top" href="/#">
        <ArrowaltCircleUp />
      </Link> */}
      <ScrollToTopButton />
    </FancyboxWrapper>
  );
}
