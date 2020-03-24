import React from "react";

function Header() {
    var head_style = {
        backgroundImage: `url('img/cover.png')`
    };
    return (
        <header className="header">
            <div className="head-bg" style={head_style}></div>
            <div className="head-bar">
                <div className="head-bar-inner">
                    <div className="row">
                        <div className="col-sm-4 col-xs-6">
                            <a className="logo" href="index.html">
                                <span>Hoang Minh Thanh</span>
                            </a>
                        </div>
                        <div className="col-sm-8 col-xs-6">
                            <div className="nav-wrap">
                                <nav id="nav" className="nav">
                                    <ul className="clearfix">
                                        <li>
                                            <a href="index.html#about">About</a>
                                        </li>
                                        <li>
                                            <a href="index.html#education">Education</a>
                                        </li>
                                        <li>
                                            <a href="index.html#experience">Experiences</a>{" "}
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
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
