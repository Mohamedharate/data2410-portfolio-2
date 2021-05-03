import React, {Component} from "react";
import ShoppingCartObject from "./shoppingCartObject";
import axios from "axios";

class ShoppingCart extends Component {
    state = {
        cart_objects: [
            {id: 1, name: 'Brød', quantity: 2,},
            {id: 2, name: 'Bil', quantity: 2,},
            {id: 3, name: 'Bord', quantity: 2,},
            {id: 4, name: 'Blad', quantity: 2,},
        ]
    }

    async getCartObjects() {
        axios.get('')
            .then(response => {

            })
    }

    render() {
        return (
            <div className="shoppingCartContainer">
                <div className="row">
                    <div className="col-sm-5">
                        <button className="btn btn-primary float-right mt-3">!Check out</button>
                    </div>
                    <div className="col-sm-7">
                        <h4 className="text-center m-3">Shopping Cart</h4>
                    </div>
                </div>
                <div className="shoppingCartObjectsContainer">
                    {this.state.cart_objects.map(shoppingCartObject => (
                        <ShoppingCartObject
                            key={shoppingCartObject.id}
                            shoppingCartObject={shoppingCartObject}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default ShoppingCart;