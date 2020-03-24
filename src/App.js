import React, {Component} from 'react'
import {BrowserRouter} from 'react-router-dom'
import Main from './pages/MainPage'
import {Provider} from 'react-redux'
import {ConfigureStore} from './redux/configureStore'
import MobileNav from "./components/MobileNav";
import './App.css';

const store = ConfigureStore();

class App extends Component {
    render() {
        return (
            <>
                <MobileNav></MobileNav>
                <Provider store={store}>
                    <BrowserRouter>
                        <Main/>
                    </BrowserRouter>
                </Provider>
            </>
        )
    }
}

export default App;
