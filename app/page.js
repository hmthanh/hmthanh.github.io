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
import ScrollToTopButton from '@/components/ScrollToTopButton/ScrollToTopButton';
import Loading from '@/components/Loading';
import Keypoint from '@/components/Keypoint/Keypoint';
import Publications from '@/components/Publications/Publications';

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
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

  // useEffect(() => {
  //   let timeoutId = null;

  //   const handleLoad = () => {
  //     if (timeoutId) {
  //       clearTimeout(timeoutId);
  //       setTimeout(() => {
  //         setIsLoading(false);
  //       }, 800); // Delay hide after fast load
  //     } else {
  //       setIsLoading(false); // Immediate hide after long load
  //     }
  //   };

  //   timeoutId = setTimeout(() => {
  //     timeoutId = null; // Mark page as slow after 1s
  //   }, 1000);

  //   window.addEventListener('load', handleLoad);

  // return () => {
  //   window.removeEventListener('load', handleLoad);
  //   if (timeoutId) clearTimeout(timeoutId);
  // };
  // }, []);

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
                <div className="container flex flex-col px-6">
                  <About />

                  <Keypoint />

                  
                  <Education />
                  <Publications/>
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
