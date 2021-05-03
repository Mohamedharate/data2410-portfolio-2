import React, {Component} from "react";
import ShoppingCartObject from "./shoppingCartObject";
import axios from "axios";

class ShoppingCart extends Component {
    render() {
        return (
            <div className="shoppingCartContainer">
                <div className="shoppingCartHeader">
                    <div className="row">
                        <div className="col-sm-7">
                            <h4 className="text-center m-3">Shopping Cart</h4>
                        </div>
                        <div className="col-sm-5">
                            <button className="btn btn-dark float-right mt-3">Check out!</button>
                        </div>
                    </div>
                    {this.props.empty_cart && <p className="text-center mt-4"><strong>{this.props.empty_cart_message}</strong></p>}
                    {!this.props.empty_cart &&
                    <div className="row text-nowrap mt-2">
                        <div className="col-sm-4 text-center">
                            <h5>Quantity:</h5>
                        </div>
                        <div className="col-sm-3 text-center">
                            <h5>Price:</h5>
                        </div>
                        <div className="col-sm-5 text-center">
                            <h5>Product:</h5>
                        </div>
                    </div> }
                </div>
                {!this.props.empty_cart &&
                <div className="shoppingCartObjectsContainer">
                    {this.props.cart_objects.map(shoppingCartObject => (
                        <ShoppingCartObject
                            key={shoppingCartObject.id}
                            shoppingCartObject={shoppingCartObject}
                        />
                    ))}
                </div>}
            </div>
        );
    }
}

export default ShoppingCart;