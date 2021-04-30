import React, { Component } from "react";
import axios from "axios";
import Navbar from "./navbar";
import Login from "./login";
import Register from "./register";
import About from "./about";
import Mainpage from "./mainpage";
import Footer from "./footer";


class Home extends Component{
    constructor(props) {
        super(props);

        this.handleLoad = this.handleLoad.bind(this);
    }
    state = {
        toggleLogin: false,
        toggleRegister: false,
        isAuthenticated: false,
        current_user: {},
    }


    componentDidMount() {
        window.addEventListener('load', this.handleLoad);
    }
    async handleLoad() {
        this.tryIsAuthenticated().then()
    }
z
    handleToggleLoginCallback = () => {
        this.setState({toggleLogin: !this.state.toggleLogin, toggleRegister: false});
    }
    handleToggleRegisterCallback = () => {
        this.setState({toggleLogin: false, toggleRegister: !this.state.toggleRegister});
    }
    handleLogin = () => {
        this.tryIsAuthenticated().then()
    }
    handleLogoutCallback = () => {
        console.log("HandleLogout i home")
        this.tryLogout().then()
        this.tryIsAuthenticated().then()

    }

    async tryIsAuthenticated() {
        await axios.get('http://localhost:3001/api/users/isAuthenticated')
            .then(response => {
                this.setState({isAuthenticated: true});
                this.setState({current_user: response.data})
                this.setState({toggleLogin: false});
                console.log(this.state.current_user.firstName)
            }).catch(error => {
                this.setState({isAuthenticated: false});
                this.setState({current_user: {}})
                console.log("No session available: ", error.data);
            })
    }

    async tryLogout() {
        console.log("Try Logout")
        await axios({
            method: 'post',
            url: 'http://localhost:3001/logout',
            data: {}
        }).then()
    }

    render() {
        return (
            <React.Fragment>
                <Mainpage />
                <About />
                <Footer />
                <Navbar
                    toggleLoginCallback = {this.handleToggleLoginCallback}
                    toggleRegisterCallback = {this.handleToggleRegisterCallback}
                    handleLogoutCallback = {this.handleLogoutCallback}
                    isAuthenticated = {this.state.isAuthenticated}
                    current_user = {this.state.current_user}
                />
                {this.state.toggleLogin && <Login loginCallback = {this.handleLogin}/>}
                {this.state.toggleRegister && <Register registerCallback = {this.handleToggleLoginCallback}/>}
            </React.Fragment>
        );
    }
}
export default Home;