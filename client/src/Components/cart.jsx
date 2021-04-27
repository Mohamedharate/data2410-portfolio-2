import React, {Component} from "react";
import { addToCart, emptyCart, removeFromCart, updateCartQuantity } from "../actions/cartActions";
import { addOrder } from "../actions/orderActions"; // for checkout

class Cart extends Component{

    // boolean for om brukeren er logget inn og hvilken bruker


    render() {
        const user = this.props.user;

        return (
            <div className="cartContainer">
                <div id="cart_div" className="row">
                    <div className="col-md-12">
                        <h4>
                            <b>Hello, *user*</b>
                        </h4>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-14 col-xs-12">

                        </div>
                    </div>
                </div>
            </div>
    );
    }
}

export default Cart;