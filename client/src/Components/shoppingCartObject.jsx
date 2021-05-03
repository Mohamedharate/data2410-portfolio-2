import React, {Component} from "react";

class ShoppingCartObject extends Component {

    render() {
        return (
            <div className="shoppingCartObject m-1">
                <div className="row text-nowrap">
                    <div className="col-4">
                        <p className="mt-1 text-center">
                            <button className="btn-circle btn-dark btn-sm rounded-circle mr-2">+</button>
                            {this.props.shoppingCartObject.quantity}
                            <button className="btn-circle btn-dark btn-sm rounded-circle ml-2">-</button>
                        </p>
                    </div>
                    <div className="col-sm-3">
                        <p className="mt-1 text-right">${this.props.shoppingCartObject.price}</p>
                    </div>
                    <div className="col-sm-5">
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