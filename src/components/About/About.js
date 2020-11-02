import React, {Component} from 'react'
import {Envelope, Facebook, Github, Linkedin, Medium,  Skype, Stackoverflow, Twitter, HackerRank} from '../Icon/Icon'
// Phone,
export default class About extends Component {
    render() {
        let profileUniversityStyle = {
            padding: 0,
            border: 0,
            margin: 0
        };
        return (
            <section id="about" className="section section-about">
                <div className="animate-up">
                    <div className="section-box">
                        <div className="profile">
                            <div className="row">
                                <div className="col-xs-5">
                                    <div className="profile-photo">
                                        <img src="./img/awatar.jpg" width={300} height={300} alt="Hoang Minh Thanh"/>
                                    </div>
                                    <div className="section-txt-btn">
                                        <p><a className="btn btn-lg btn-border ripple" rel="noopener noreferrer"
                                              target="_blank" href="./file/Hoang_Minh_Thanh-CV.pdf">Resume</a></p>
                                    </div>
                                </div>
                                <div className="col-xs-7">
                                    <div className="profile-info">
                                        <div className="profile-preword"><span>Hi !</span></div>
                                        <h1 className="profile-title"><span>I'm</span> Minh-Thanh Hoang</h1>
                                        <div className="job-title">Software Engineer</div>
                                        <h2 className="profile-position"><strong>BS. Student</strong></h2>
                                        <h2 className="profile-university" style={profileUniversityStyle}>
                                            Computer Science at University of Science - VNU</h2>
                                        <br/>
                                        <h5 className=""><strong>Blog : </strong><a href={"https://hmthanh.github.io/blog/"}>Minh-Thanh's Blog</a></h5>
                                        <h2 className="profile-university"><strong>Language & tools</strong> :
                                        <ul className="list-icon">
                                            <li><img className="item-icon" alt="python" src="./img/icon_python.png"></img></li>
                                            <li><img className="item-icon" alt="cplusplus" src="./img/icon_cplusplus.png"></img></li>
                                            <li><img className="item-icon" alt="jupyter" src="./img/icon_jupyter.png"></img></li>
                                            <li><img className="item-icon" alt="vim" src="./img/icon_vim.png"></img></li>
                                            <li><img className="item-icon" alt="command" src="./img/icon_command.png"></img></li>
                                            <li><img className="item-icon" alt="vscode" src="./img/icon_vscode.png"></img></li>
                                            <li><img className="item-icon" alt="sql" src="./img/icon_sql.png"></img></li>
                                            <li><img className="item-icon" alt="mysql" src="./img/icon_mysql.png"></img></li>
                                            <li><img className="item-icon" alt="git" src="./img/icon_git.png"></img></li>
                                            <li><img className="item-icon" alt="github" src="./img/icon_github.png"></img></li>
                                        </ul>
                                        </h2>

                                        <div className="ul-info">
                                            <a className="contact-item" href="skype:+hmthanhgm">
                                                <Skype/> hmthanhgm
                                            </a>
                                            <a className="contact-item" href="mailto:hmthanhgm@gmail.com">
                                                <Envelope/> hmthanhgm@gmail.com
                                            </a>
                                            {/*<a className="contact-item" href="tel:+84913472506">*/}
                                            {/*    <Phone/>+84913472506*/}
                                            {/*</a>*/}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="profile-social">
                            <ul className="ul-info">
                                <li className="li-info">
                                    <a className="icon-info" rel="noopener noreferrer" target="_blank"
                                       href="https://www.facebook.com/hmthanhgm">
                                        <Facebook/>
                                    </a>
                                </li>
                                <li className="li-info">
                                    <a className="icon-info" rel="noopener noreferrer" target="_blank"
                                       href="https://twitter.com/hmthanhgm">
                                        <Twitter/>
                                    </a>
                                </li>
                                <li className="li-info">
                                    <a className="icon-info" rel="noopener noreferrer" target="_blank"
                                       href="https://www.linkedin.com/in/hmthanh/">
                                        <Linkedin/>
                                    </a>
                                </li>
                                <li className="li-info">
                                    <a className="icon-info" rel="noopener noreferrer" target="_blank"
                                       href="https://github.com/hmthanh">
                                        <Github/>
                                    </a>
                                </li>
                                <li className="li-info">
                                    <a className="icon-info" rel="noopener noreferrer" target="_blank"
                                       href="https://medium.com/@hmthanh">
                                        <Medium/>
                                    </a>
                                </li>
                                <li className="li-info">
                                    <a className="icon-info" rel="noopener noreferrer" target="_blank"
                                       href="https://stackoverflow.com/story/hmthanh">
                                        <Stackoverflow/>
                                    </a>
                                </li>

                                <li className="li-info">
                                    <a className="icon-info" rel="noopener noreferrer" target="_blank"
                                       href="https://www.hackerrank.com/hmthanh">
                                        <HackerRank/>
                                    </a>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </section>
        )
    }
}
