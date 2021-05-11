import React, {Component, useEffect} from "react";
import axios from "axios";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from "./navbar";
import Login from "./login";
import Register from "./register";
import About from "./about";
import Mainpage from "./Products/mainpage";
import Footer from "./footer";
import Productpage from "./Products/productpage";
import addReview from "./Products/addReview";
import ShoppingCart from "./shoppingCart";
import Orders from "./orders";


class Home extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        toggleLogin: false,
        toggleRegister: false,
        toggleShoppingCart: false,
        isAuthenticated: false,
        current_user: {},
        empty_cart: false,
        empty_cart_message: 'Nothing to show here.',
        cart_objects: [],
        cart_counter: 0,
        cart_total_price: 0,
        cart_error_feedback: false,
        cart_success_feedback: false,
        cart_feedback_text: String,
    };

    componentDidMount = async () => {
        this.Authenticated()
    };

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

    // Handle cart
    handleQuantityIncreaseCallback = async item_id => {
        const cart_objects = [...this.state.cart_objects];
        const index = cart_objects.findIndex(i => i.itemId === item_id)
        cart_objects[index].quantity++;
        await axios({
            method: 'post',
            url: 'http://localhost:3001/api/cart/addToCart',
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
        if (cart_objects[index].quantity > 0){
            cart_objects[index].quantity--;
            await axios({
                method: 'put',
                url: 'http://localhost:3001/api/cart/deleteFromCart',
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
        console.log("add to cart")
        const Product = product;
        Product.quantity = quantity;

        const cart_objects = [...this.state.cart_objects, Product];
        this.updateCartCounterAndPrice(cart_objects);
        this.setState({cart_objects})
    }

    // Handle checkout
    handleCheckOutCallback = async () => {
        console.log("checkout");
        this.placeNewOrder()
        //TODO Her må det lages et Checkout vindu som tar inn informasjon om levering.
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
            url: 'http://localhost:3001/logout',
            data: {}
        }).then(() => {
            sessionStorage.clear();
            this.state.toggleShoppingCart = false;
            const cart_objects = [];
            this.updateCartCounterAndPrice(cart_objects);
            this.setState({
                cart_objects,
                current_user: {},
                isAuthenticated: false
            });
        })
    };
    Authenticated = async () => {
        await axios.get('http://localhost:3001/api/users/isAuthenticated')
            .then(response => {
                if (response.status === 200) {
                    // Session is auth
                    const current_user = response.data;
                    this.getCartObjects(current_user);
                    this.setState({ current_user, isAuthenticated: true});
                } else {
                    // Session is not auth
                    this.setState({ current_user: {}, isAuthenticated: false });
                }
            }).catch(error => {
                console.log(error);
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

    placeNewOrder = async () => {
        await axios({
            method: 'post',
            url: 'http://localhost:3001/api/orders/newOrder',
            data: {}, //TODO add correct data
        }).then(r => {
            this.setState({
                cart_error_feedback: false,
                cart_success_feedback: true,
                cart_feedback_text: r.data.Message
            }).catch(err => {
                this.setState({
                    cart_error_feedback: true,
                    cart_success_feedback: false,
                    cart_feedback_text: String
                })
            });
        })
    }

    render() {
        return (
            <Router>
                <React.Fragment>
                    <Navbar
                        toggleLoginCallback={this.handleToggleLoginCallback}
                        toggleRegisterCallback={this.handleToggleRegisterCallback}
                        toggleShoppingCartCallback={this.handleToggleShoppingCartCallback}
                        handleLogoutCallback={this.handleLogoutCallback}
                        isAuthenticated={this.state.isAuthenticated}
                        current_user={this.state.current_user}
                        cart_counter={this.state.cart_counter}
                        cart_total_price={this.state.cart_total_price}
                    />
                    <Switch>
                        <Route exact path="/" component={Mainpage}/>
                        <Route path="/products/:itemId" component={Productpage} addToCartCallback={this.handleAddToCartCallback}/>
                        <Route path="/addReview/:itemId" component={addReview}/>
                        <Route path="/chart" component={ShoppingCart}/>
                        <Orders>
                            <Route> path="/orders"</Route>
                            component={Orders}
                            current_user={this.state.current_user}
                            isAuthenticated={this.state.isAuthenticated}
                        />
                        </Orders>
                    </Switch>
                    {this.state.toggleLogin && <Login loginCallback={this.handleLoginCallback}/>}
                    {this.state.toggleRegister && <Register />}
                    {this.state.toggleShoppingCart &&
                    <ShoppingCart
                        addToCartCallback={this.handleAddToCartCallback}
                        quantity_increase={this.handleQuantityIncreaseCallback}
                        quantity_decrease={this.handleQuantityDecreaseCallback}
                        onCheckOut={this.handleCheckOutCallback}
                        empty_cart={this.state.empty_cart}
                        empty_cart_message={this.state.empty_cart_message}
                        cart_objects={this.state.cart_objects}
                        cart_total_price={this.state.cart_total_price}
                        toggle_error_feedback={this.state.cart_error_feedback}
                        toggle_success_feedback={this.state.cart_success_feedback}
                        feedback_text={this.state.cart_feedback_text}
                    />}
                    <About/>
                    <Footer toggle_admin={this.props.toggle_admin}/>
                </React.Fragment>
            </Router>
        );
    }
}

export default Home;