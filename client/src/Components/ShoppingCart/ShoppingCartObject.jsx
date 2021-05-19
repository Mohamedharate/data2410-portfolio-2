import React, {Component} from "react";

class ShoppingCartObject extends Component {
    render() {
        return (
            <div className="shoppingCartObject m-1">
                <div className="row align-items-center">
                    <div className="col-4">
                        <p className="mt-1 text-center text-nowrap">
                            <button onClick={this.props.quantity_increase}
                                    className="btn-circle btn-dark btn-sm rounded-circle mr-2">+</button>
                            {this.props.shoppingCartObject.quantity}
                            <button onClick={this.props.quantity_decrease}
                                    className="btn-circle btn-dark btn-sm rounded-circle ml-2">-</button>
                        </p>
                    </div>
                    <div className="col-3">
                        <p className="mt-1 text-right">
                            ${this.props.shoppingCartObject.price * this.props.shoppingCartObject.quantity}
                        </p>
                    </div>
                    <div className="col-5">
                        <p className="mt-1 text-center">{this.props.shoppingCartObject.name}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <hr/>
                    </div>
                </div>
            </div>
        );
    }
}

export default ShoppingCartObject