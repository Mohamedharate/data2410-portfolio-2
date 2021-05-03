import React, {Component} from "react";

class ShoppingCartObject extends Component {

    render() {
        return (
            <div className="shoppingCartObject m-3">
                <div className="row">
                    <div className="col-sm-3">
                        <div className="test"/>
                    </div>
                    <div className="col-sm-5">
                        <p className="mt-3"><strong>{this.props.shoppingCartObject.name}</strong></p>
                    </div>
                    <div className="col-4">
                        <p className="text-nowrap mt-2">
                            <button className="btn-circle btn-dark btn-sm rounded-circle m-2">-</button>
                            {this.props.shoppingCartObject.quantity}
                            <button className="btn-circle btn-dark btn-sm rounded-circle m-2">+</button>
                        </p>
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