import React, { Component } from "react";
import Navbar from "./navbar";
import Login from "./login";
import Register from "./register";
import Bestsellers from "./bestsellers";
import Mainpage from "./mainpage";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Footer from "./footer";


class Home extends Component{
    state = {
        toggleLogin: false,
        toggleRegister: false,
    }

    handleCallbackLogin = () => {
        this.setState({toggleLogin: !this.state.toggleLogin, toggleRegister: false})
    }
    handleCallbackRegister = () => {
        this.setState({toggleLogin: false, toggleRegister: !this.state.toggleRegister})
    }

    render() {
        return (
            <React.Fragment>
                <Mainpage>
                    <Router>
                        <Route path="./mainpage" component={Mainpage} />
                    </Router>
                </Mainpage>
                <Bestsellers>
                    <Router>
                        <Route path="./bestsellers" component={Bestsellers}/>
                    </Router>
                </Bestsellers>
                <Footer>
                </Footer>
                <Navbar
                    loginCallback = {this.handleCallbackLogin}
                    registerCallback = {this.handleCallbackRegister}
                />
                {this.state.toggleLogin && <Login />}
                {this.state.toggleRegister && <Register/>}

            </React.Fragment>
        );
    }
}
export default Home;