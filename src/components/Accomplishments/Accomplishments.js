import React, {Component} from "react";

export default class Accomplishments extends Component {
    render() {
        return (
            <section id="accomplishments" className="section section-text">
                <div className="animate-up animated">
                    <h2 className="section-title">Awards and certifications</h2>
                    <div className="section-box">
                        <li>
                            <b>Incentive Award</b> in The Good Chemistry District Student
                            Contest - 2009
                        </li>
                        <li>
                            <em>
                                <a href="./img/Critical_Thinking.jpg" target="_blank">
                                    Critical Thinking Certification
                                </a>
                            </em>
                            , Oct. 2014
                        </li>
                        <li>
                            <em>
                                <a href="./img/ml_summer.jpg" target="_blank">
                                    Summer Course Machine Learning - HCMUS
                                </a>
                            </em>
                            , Oct. 2019
                        </li>
                        <li>
                            <em>
                                <a href="./img/Emotion_Regconition.jpg" target="_blank">
                                    Emotion Recognition Certification - HCMUS
                                </a>
                            </em>
                            , Nov. 2019
                        </li>
                        <li>
                            <b>Second Round</b> in <a href="https://www.youtube.com/watch?v=hiit2jOgwVQ">Thach Thuc</a> Faculty of Information
                            Technology, HCMUS{" "}
                            <a href="./img/ThachThuc2013.jpg" target="_blank">2013</a>, <a href="./img/ThachThuc2014.jpg" target="_blank">2014</a>
                        </li>
                        
                    </div>
                </div>
            </section>
        );
    }
}
