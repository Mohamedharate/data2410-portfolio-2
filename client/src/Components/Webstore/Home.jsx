import React, {Component, useEffect} from "react";
import axios from "axios";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from "./Navbar";
import SignIn from "../Authentication/SignIn";
import SignUp from "../Authentication/SignUp";
//import About from "./about";
import Mainpage from "../Products/mainpage";
import Footer from "./Footer";
import Productpage from "../Products/productpage";
import addReview from "../Products/addReview";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import Orders from "../Orders";
import Checkout from "../ShoppingCart/Checkout";
import ProfileMain from "../UserProfile/ProfileMain"


class Home extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        toggleLogin: false,
        toggleRegister: false,
        toggleShoppingCart: false,
        toggleCheckOut: false,
        toggleProfilePage: false,
        isAuthenticated: false,
        navbar_loading: false,
        current_user: {},
        empty_cart: true,
        empty_cart_message: 'Nothing to show here.',
        cart_objects: [],
        cart_counter: 0,
        cart_total_price: 0,
        cart_error_feedback: false,
        cart_success_feedback: false,
        cart_feedback_text: String,
    };

    componentDidMount = async () => {
        await this.Authenticated()
    };

    // Handlers
    // Toggle windows.
    handleToggleLoginCallback = () => {
        this.setState({
            toggleLogin: !this.state.toggleLogin,
            toggleRegister: false,
            toggleShoppingCart: false,
            toggleCheckOut: false,
            toggleProfilePage: false,
        });
    }
    handleToggleRegisterCallback = () => {
        this.setState({
            toggleLogin: false,
            toggleRegister: !this.state.toggleRegister,
            toggleShoppingCart: false,
            toggleCheckOut: false,
            toggleProfilePage: false,
        });
    }
    handleToggleShoppingCartCallback = () => {
        this.setState({
            toggleLogin: false,
            toggleRegister: false,
            toggleShoppingCart: !this.state.toggleShoppingCart,
            toggleCheckOut: false,
            toggleProfilePage: false,
        });
    }
    handleToggleCheckOutCallback = () => {
        this.setState({
            toggleLogin: false,
            toggleRegister: false,
            toggleShoppingCart: false,
            toggleCheckOut: !this.state.toggleCheckOut,
            toggleProfilePage: false,
        })
    }
    handleToggleProfilePageCallback = () => {
        this.setState({
            toggleLogin: false,
            toggleRegister: false,
            toggleShoppingCart: false,
            toggleCheckOut: false,
            toggleProfilePage: !this.state.toggleProfilePage,
        })
    }

    // Handle cart
    handleQuantityIncreaseCallback = async item_id => {
        const cart_objects = [...this.state.cart_objects];
        const index = cart_objects.findIndex(i => i.itemId === item_id)
        cart_objects[index].quantity++;
        await axios({
            method: 'post',
            url: 'https://localhost:3001/api/cart/addToCart',
            data: {
                product_id: cart_objects[index].itemId,
                quantity: 1
            },
        }).then(r => {
            this.updateCartCounterAndPrice(cart_objects);
            this.setState({cart_objects})
        })
    }
    handleQuantityDecreaseCallback = async item_id => {
        const cart_objects = [...this.state.cart_objects];
        const index = cart_objects.findIndex(i => i.itemId === item_id)
        if (cart_objects[index].quantity > 0) {
            cart_objects[index].quantity--;
            await axios({
                method: 'put',
                url: 'https://localhost:3001/api/cart/deleteFromCart',
                data: {
                    product_id: cart_objects[index].itemId,
                    quantity: 1
                },
            }).then(r => {
                this.updateCartCounterAndPrice(cart_objects);
                this.setState({cart_objects});
            })
        }
    }
    handleAddToCartCallback = (product, quantity) => {
        const Product = product;
        Product.quantity = quantity;
        Product.price = Object.values(product.price);

        const cart_objects = [...this.state.cart_objects, Product];
        this.updateCartCounterAndPrice(cart_objects);
        this.setState({
            cart_objects,
            empty_cart: false
        })
    }
    handleOrderCompleteCallback = user => {
        this.getCartObjects(user)
        const cart_objects = [...user.cart]
        this.updateCartCounterAndPrice(cart_objects)
        this.setState({cart_objects, empty_cart: true})
    }


    // Handle authentication.
    handleLoginCallback = user => {
        const current_user = user;
        this.setState({current_user, isAuthenticated: true});
        this.getCartObjects(current_user);
        this.setState({toggleLogin: false});
    };
    handleLogoutCallback = async () => {
        await axios({
            method: 'post',
            url: 'https://localhost:3001/logout',
            data: {}
        }).then(() => {
            const cart_objects = [];
            this.updateCartCounterAndPrice(cart_objects);
            this.setState({
                current_user: {},
                isAuthenticated: false,
                toggleShoppingCart: false,
                toggleProfilePage: false,
            });
        })
    };
    Authenticated = async () => {
        this.setState({navbar_loading: true})
        await axios.get('https://localhost:3001/api/users/isAuthenticated')
            .then(response => {
                if (response.status === 200) {
                    // Session is auth
                    const current_user = response.data;
                    this.getCartObjects(current_user);
                    this.setState({
                        current_user,
                        isAuthenticated: true,
                        navbar_loading: false,
                    });
                } else if (response.status === 206) {
                    // Session is not auth but has items in cart
                    this.state.empty_cart = false;
                    const cart_objects = [...response.data.Cart];
                    this.updateCartCounterAndPrice(cart_objects);
                    this.setState({
                        cart_objects,
                        current_user: {},
                        isAuthenticated: false,
                        navbar_loading: false,
                    });
                } else {
                    // Session is not auth and has no items in cart
                    this.setState({
                        current_user: {},
                        isAuthenticated: false,
                        navbar_loading: false,
                    });
                }

            }).catch(error => {
                console.log(error);
                this.setState({
                    current_user: {},
                    isAuthenticated: false,
                    navbar_loading: false,
                });
            });
    };

    // Cart
    // Instantiate Cart
    getCartObjects = user => {
        if (user.cart.length === 0) {
            this.state.empty_cart = true;
            this.state.empty_cart_message = 'There is nothing to see here!';
            return true;
        } else {
            this.state.empty_cart = false;
            const cart_objects = [...user.cart];
            this.updateCartCounterAndPrice(cart_objects);
            this.setState({cart_objects});
            return false;
        }
    };
    // Updating cart values for the navbar.
    updateCartCounterAndPrice = cartArray => {
        let cart_counter = 0;
        let cart_total_price = 0;
        cartArray.forEach(product => {
            cart_counter += parseInt(product.quantity);
            cart_total_price += parseInt(product.price) * parseInt(product.quantity)

        });
        this.setState({cart_counter, cart_total_price})
    }

    render() {
        return (
            <Router>
                <React.Fragment>
                    <Navbar
                        toggleLoginCallback={this.handleToggleLoginCallback}
                        toggleRegisterCallback={this.handleToggleRegisterCallback}
                        toggleShoppingCartCallback={this.handleToggleShoppingCartCallback}
                        toggleProfilePageCallback={this.handleToggleProfilePageCallback}
                        isAuthenticated={this.state.isAuthenticated}
                        loading={this.state.navbar_loading}
                        current_user={this.state.current_user}
                        cart_counter={this.state.cart_counter}
                        cart_total_price={this.state.cart_total_price}
                    />
                    <Switch>
                        <Route exact path="/" component={Mainpage}/>
                        <Route exact path="/products/:itemId" component={() =>
                            <Productpage itemId={window.location.href.split('/').pop()}
                                         handleAddToCartCallback={this.handleAddToCartCallback}/>}/>
                        <Route path="/addReview/:itemId" component={addReview}/>
                        <Route path="/orders/" component={() =>
                            <Orders current_user={this.state.current_user}
                                    isAuthenticated={this.state.isAuthenticated}/>}/>
                    </Switch>
                    {this.state.toggleLogin && <SignIn
                        loginCallback={this.handleLoginCallback}
                        close={this.handleToggleLoginCallback}
                    />}
                    {this.state.toggleRegister && <SignUp
                        close={this.handleToggleRegisterCallback}
                    />}
                    {this.state.toggleProfilePage && <ProfileMain
                        close={this.handleToggleProfilePageCallback}
                        handleLogout={this.handleLogoutCallback}
                        current_user={this.state.current_user}
                    />}
                    {this.state.toggleCheckOut && <Checkout
                        cart_objects={this.state.cart_objects}
                        current_user={this.state.current_user}
                        price_total={this.state.cart_total_price}
                        signed_in={this.state.isAuthenticated}
                        order_complete={this.handleOrderCompleteCallback}
                        close={this.handleToggleCheckOutCallback}
                    />}
                    {this.state.toggleShoppingCart &&
                    <ShoppingCart
                        handleAddToCartCallback={this.handleAddToCartCallback}
                        quantity_increase={this.handleQuantityIncreaseCallback}
                        quantity_decrease={this.handleQuantityDecreaseCallback}
                        onCheckOut={this.handleToggleCheckOutCallback}
                        close={this.handleToggleShoppingCartCallback}
                        empty_cart={this.state.empty_cart}
                        empty_cart_message={this.state.empty_cart_message}
                        cart_objects={this.state.cart_objects}
                        cart_total_price={this.state.cart_total_price}
                        toggle_error_feedback={this.state.cart_error_feedback}
                        toggle_success_feedback={this.state.cart_success_feedback}
                        feedback_text={this.state.cart_feedback_text}
                    />
                    }
                    <Footer toggle_admin={this.props.toggle_admin}/>
                </React.Fragment>
            </Router>
        );
    }
}

// <About/>

export default Home;