import React, {Component} from 'react'
import Header from "../../components/Header";
import About from "../../components/About/About";
import News from "../../components/News";
import Education from "../../components/Education";
import Experience from "../../components/Experience";
import Accomplishments from "../../components/Accomplishments";
import Miscellaneous from "../../components/Miscellaneous";
import Footer from "../../components/Footer";

class InfoPage extends Component {
    render() {
        return (
            <div className="wrapper">
                <Header></Header>
                <div className="content">
                    <div className="container">
                        <About></About>
                        <News></News>
                        <Education></Education>
                        <Experience></Experience>
                        <Accomplishments></Accomplishments>
                        <Miscellaneous></Miscellaneous>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        )
    }
}


export default InfoPage