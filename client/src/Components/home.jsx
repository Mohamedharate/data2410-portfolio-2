import React, { Component } from "react";
import Navbar from "./navbar";
import Login from "./login";
import Register from "./register";

class Home extends Component{
    state = {
        toggleLogin: false,
        toggleRegister: false,
    }

    handleCallbackLogin = (childData) => {
        this.setState({toggleLogin: childData})
    }
    handleCallbackRegister = (childData) => {
        this.setState({toggleRegister: childData})
    }

    render() {
        return (
            <React.Fragment>
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