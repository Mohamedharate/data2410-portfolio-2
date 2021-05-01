import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from "./navbar";
import Login from "./login";
import Register from "./register";
import About from "./about";
import Mainpage from "./mainpage";
import Footer from "./footer";
import Productpage from "./productpage";
import addReview from "./addReview";
import Cart from "./cart";
import Orders from "./orders";


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
            <Router>
            <React.Fragment>
                <Switch>
                    <Route exact path="/" component={Mainpage}/>
                    <Route path ="/products/:itemId" component={Productpage}/>
                    <Route path ="/review/:itemId" component={addReview}/>
                    <Route path ="/chart" component={Cart}/>
                    <Route path ="/orders" component={Orders}/>
                </Switch>
                <Navbar
                    toggleLoginCallback = {this.handleToggleLoginCallback}
                    toggleRegisterCallback = {this.handleToggleRegisterCallback}
                    handleLogoutCallback = {this.handleLogoutCallback}
                    isAuthenticated = {this.state.isAuthenticated}
                    current_user = {this.state.current_user}
                />
                {this.state.toggleLogin && <Login loginCallback = {this.handleLogin}/>}
                {this.state.toggleRegister && <Register registerCallback = {this.handleToggleLoginCallback}/>}
                <About />
                <Footer />
            </React.Fragment>
            </Router>
        );
    }
}
export default Home;