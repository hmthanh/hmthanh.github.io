import React, {Component} from 'react'

export default class Experience extends Component {
    render() {
        var logoStyle = {
            float: "center",
            width: "100%",
            paddingLeft: "10%",
            paddingRight: "10%"
        };
        return (
            <section id="experience" className="section section-experience">
                <div className="animate-up">
                    <h2 className="section-title">Experiences</h2>

                    <div className="timeline">
                        <div className="timeline-bar"></div>
                        <div className="timeline-inner clearfix">
                            <div className="timeline-box timeline-box-left">
                                <span className="dot"></span>
                                <div className="timeline-box-inner animate-left animated">
                                    <span className="arrow"></span>
                                    <div className="date">Aug. 2018 - Apr. 2019</div>
                                    <img src="img/xep.png" alt="XEP Company" width={388} height={120} style={logoStyle}/>
                                    <h3>XEP</h3>
                                    <h4>Web Developer</h4>
                                    <p>ASP.NET, C#, MSSQL, ReactJS</p>
                                </div>
                            </div>

                            <div className="timeline-box timeline-box-right">
                                <span className="dot"></span>
                                <div className="timeline-box-inner animate-right animated">
                                    <span className="arrow"></span>
                                    <div className="date">Aug. 2019 - Now</div>
                                    <img src="img/rakumo.png" alt="rakumo Co., Ltd" style={logoStyle}/>
                                    <h3>rakumo Co., Ltd</h3>
                                    <h4>Python Developer</h4>
                                    <p>Python, Django, Flask, Git, Selenium</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
