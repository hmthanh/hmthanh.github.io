import React, {Component} from "react";

export default class Accomplishments extends Component {
    render() {
        return (
            <section id="accomplishments" className="section section-text">
                <div className="animate-up animated">
                    <h2 className="section-title">Awards</h2>
                    <div className="section-box">
                        <li>
                            <em>
                                <a href="./img/Emotion_Regconition.jpg" target="_blank">
                                    Emotion Recognition Certification - HCMUS
                                </a>
                            </em>
                            , Nov. 2019
                        </li>
                        <li>
                            <b>Second Round</b> in Thach Thuc, Faculty of Information
                            Technology, HCMUS{" "}
                            <a href="https://www.youtube.com/watch?v=hiit2jOgwVQ">[link] </a>-
                            2013, 2014
                        </li>
                        <li>
                            <b>Incentive Award</b> in The Good Chemistry District Student
                            Contest - 2009
                        </li>
                    </div>
                </div>
            </section>
        );
    }
}
