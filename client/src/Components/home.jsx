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
import ShoppingCart from "./shoppingCart";
import Orders from "./orders";


class Home extends Component{
    constructor(props) {
        super(props);

        this.handleLoad = this.handleLoad.bind(this);
    }
    state = {
        toggleLogin: false,
        toggleRegister: false,
        toggleShoppingCart: false,
        isAuthenticated: false,
        current_user: {},
        empty_cart: false,
        empty_cart_message: 'Nothing to show here.',
        cart_objects: []
    }

    // Init/on load
    componentDidMount() {
        window.addEventListener('load', this.handleLoad);
    }
    async handleLoad() {
        this.tryIsAuthenticated().then()
    }

    // Handlers
    // Toggle windows.
    handleToggleLoginCallback = () => {
        this.setState({toggleLogin: !this.state.toggleLogin, toggleRegister: false});
    }
    handleToggleRegisterCallback = () => {
        this.setState({toggleLogin: false, toggleRegister: !this.state.toggleRegister});
    }
    handleToggleShoppingCartCallback = () => {
        this.setState({toggleShoppingCart: !this.state.toggleShoppingCart});
    }

    // Handle quantities in cart
    handleQuantityIncreaseCallback = itemId => {
        console.log("Increase", itemId)
    }
    handleQuantityDecreaseCallback = itemId => {
        console.log("Decrease", itemId)
    }

    // Handle authentication.
    handleLoginCallback = () => {
        this.tryIsAuthenticated().then()
    }
    handleLogoutCallback = () => {
        this.tryLogout().then()
        this.tryIsAuthenticated().then()
        this.getCartObjects().then()
        this.state.toggleShoppingCart = false;
    }

    // Api calls
    async tryIsAuthenticated() {
        await axios.get('http://localhost:3001/api/users/isAuthenticated')
            .then(response => {
                this.setState({isAuthenticated: true});
                this.setState({current_user: response.data})
                this.setState({toggleLogin: false});
                this.getCartObjects()
            }).catch(error => {
                this.setState({isAuthenticated: false});
                this.setState({current_user: {}})
            })
    }

    async tryLogout() {
        await axios({
            method: 'post',
            url: 'http://localhost:3001/logout',
            data: {}
        }).then()
    }

    async getCartObjects() {
        axios.get('http://localhost:3001/api/cart/getCart')
            .then(response => {
                if (response.data.message){
                    this.state.empty_cart = true;
                    this.state.empty_cart_message = response.data.message;
                    return true;
                } else {
                    this.state.empty_cart = false;
                    this.state.cart_objects = response.data.products
                    return false;
                }
            }).catch(error => {
            console.log(error.data)
        })
    }

    render() {
        return (
            <Router>
            <React.Fragment>
                <Switch>
                    <Route exact path="/" component={Mainpage}/>
                    <Route path ="/products/:itemId" component={Productpage}/>
                    <Route path ="/addReview/:itemId" component={addReview}/>
                    <Route path ="/chart" component={ShoppingCart}/>
                    <Route path ="/orders" component={Orders}/>
                </Switch>
                <Navbar
                    toggleLoginCallback = {this.handleToggleLoginCallback}
                    toggleRegisterCallback = {this.handleToggleRegisterCallback}
                    toggleShoppingCartCallback = {this.handleToggleShoppingCartCallback}
                    handleLogoutCallback = {this.handleLogoutCallback}
                    isAuthenticated = {this.state.isAuthenticated}
                    current_user = {this.state.current_user}
                />
                {this.state.toggleLogin && <Login loginCallback = {this.handleLoginCallback}/>}
                {this.state.toggleRegister && <Register registerCallback = {this.handleToggleLoginCallback}/>}
                {this.state.toggleShoppingCart &&
                <ShoppingCart
                    quantity_increase = {this.handleQuantityIncreaseCallback}
                    quantity_decrease = {this.handleQuantityDecreaseCallback}
                    empty_cart = {this.state.empty_cart}
                    empty_cart_message = {this.state.empty_cart_message}
                    cart_objects = {this.state.cart_objects}
                />}
                <About />
                <Footer />
            </React.Fragment>
            </Router>
        );
    }
}
export default Home;