import React, { Component } from "react";
import Navbar from "./navbar";
import Login from "./login";
import Register from "./register";
import Bestsellers from "./bestsellers";
import { BrowserRouter as Router, Route } from 'react-router-dom' //dumt å bruke react-router-dom?


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
                <Bestsellers>
                    <Router>
                        <Route path="/bestsellers" component={Bestsellers} />
                    </Router>
                </Bestsellers>
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