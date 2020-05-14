import React, {Component} from 'react'
import {BrowserRouter} from 'react-router-dom'
import Main from './pages/MainPage'
import {Provider} from 'react-redux'
import {ConfigureStore} from './redux/configureStore'
import MobileNav from "./components/MobileNav";
import './App.css';
import {ArrowAltCircleUp} from "./components/Icon/Icon";

const store = ConfigureStore();

class App extends Component {
    render() {
        return (
            <>
                <MobileNav></MobileNav>
				<div></div>
                <Provider store={store}>
                    <BrowserRouter>
                        <Main/>
                    </BrowserRouter>
                </Provider>
                <a className="btn-scroll-top" href="index.html#">
                    <ArrowAltCircleUp/>
                </a>
            </>
        )
    }
}

export default App;
