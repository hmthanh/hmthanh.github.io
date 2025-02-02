import Link from 'next/link';
import React from 'react';

export default function MobileNav() {
  return (
    <div className="mobile-nav">
      <button className="btn-mobile mobile-nav-close">
        <i className="icon icon-close"></i>
      </button>
      <div className="mobile-nav-inner">
        <nav id="mobile-nav" className="nav">
          <ul className="clearfix">
            <li>
              <Link href="/#about">
                About<span></span>
              </Link>
            </li>
            <li>
              <Link href="/#education">
                Education<span></span>
              </Link>
            </li>
            <li>
              <Link href="/#experience">
                Experiences<span></span>
              </Link>
            </li>
            <li>
              <Link href="/#accomplishments">
                Awards<span></span>
              </Link>
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
  );
}
