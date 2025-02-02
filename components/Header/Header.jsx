import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Header() {
  // var head_style = {
  //   backgroundImage: `url('img/cover.webp')`,
  // }
  return (
    <header className="header" style={{ minHeight: '95px' }}>
      {/* <div className="head-bg" style={head_style}></div> */}

      <div className="head-bar animated">
        <div className="head-bar-inner">
          <div className="row">
            <div className="col-sm-4 col-xs-6">
              {/* <Link className="logo" href="/"> */}
              {/* <span>Hoang Minh Thanh</span> */}
              {/* </a> */}
            </div>
            <div className="col-sm-8 col-xs-6">
              <div className="nav-wrap">
                <nav id="nav" className="nav">
                  <ul className="clearfix">
                    <li>
                      <Link href="/#about">About<span></span></Link>
                    </li>
                    <li>
                      <Link href="/#education">Education<span></span></Link>
                    </li>
                    <li>
                      <Link href="/#experience">Experiences<span></span></Link>
                    </li>
                    <li>
                      <Link href="/#accomplishments">Awards<span></span></Link>
                    </li>
                    <li>
                      <Link href="/#miscellaneous">
                        Miscellaneous<span></span>
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
