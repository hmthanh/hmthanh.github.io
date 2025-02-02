'use client';

import About from '@/components/About/About';
import Accomplishments from '@/components/Accomplishments/Accomplishments';
import Education from '@/components/Education/Education';
import Experience from '@/components/Experience/Experience';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import Miscellaneous from '@/components/Miscellaneous/Miscellaneous';
import MobileNav from '@/components/MobileNav';
import News from '@/components/News/News';
import ScrollToTopButton from '@/components/ScrollToTopButton/ScrollToTopButton';
import { ArrowaltCircleUp } from '@/icon';
import Link from 'next/link';

export default function Page() {
  return (
    <>
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
    </>
  );
}
