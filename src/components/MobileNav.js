import React from "react";

function MobileNav() {
  return (
    <div className="mobile-nav">
      <button className="btn-mobile mobile-nav-close">
        <i className="icon icon-close"></i>
      </button>
      <div className="mobile-nav-inner">
        <nav id="mobile-nav" className="nav">
          <ul className="clearfix">
            <li>
              <a href="index.html#about">About</a>
            </li>
            <li>
              <a href="index.html#education">Education</a>
            </li>
            <li>
              <a href="index.html#experience">Experiences</a>
            </li>
            <li>
              <a href="index.html#accomplishments">Awards</a>
            </li>
            <li>
              <a href="index.html#miscellaneous">
                Miscellaneous<span></span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default MobileNav;
