import React, {Component} from "react";
import ShoppingCartObject from "./ShoppingCartObject";
import DangerFeedback from "../Feedback/DangerFeedback";
import SuccessFeedback from "../Feedback/SuccessFeedback";
import CloseIcon from '@material-ui/icons/Close';

class ShoppingCart extends Component {
    render() {
        return (
            <div className="backgroundContainer position-fixed">
                <div className="row text-center justify-content-start">
                    <div
                        className="col-md-8 col-lg-5 mh-75 bg-light mt-5 p-1 pb-3 border border-secondary shadow-lg rounded-right">
                        <div className="row">
                            <div className="col-12">
                                <button onClick={this.props.close} className="btn btn-light float-right">
                                    <CloseIcon/>
                                </button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-7">
                                <h4 className="text-center m-3">Shopping Cart</h4>
                            </div>
                            <div className="col-sm-5">
                                <button onClick={this.props.onCheckOut} className="btn btn-dark float-md-right mt-3"
                                        disabled={this.props.empty_cart}>Checkout!
                                </button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                {this.props.toggle_error_feedback &&
                                <DangerFeedback feedback_error_text={this.props.feedback_text}/>}
                                {this.props.toggle_success_feedback &&
                                <SuccessFeedback feedback_success_text={this.props.feedback_text}/>}
                            </div>
                        </div>
                        {this.props.empty_cart &&
                        <p className="text-center mt-4"><strong>{this.props.empty_cart_message}</strong></p>}
                        {!this.props.empty_cart &&
                        <div className="row text-nowrap mt-2">
                            <div className="col-4 text-center">
                                <h5>Quantity:</h5>
                            </div>
                            <div className="col-3 text-center">
                                <h5>Price:</h5>
                            </div>
                            <div className="col-5 text-center">
                                <h5>Product:</h5>
                            </div>
                        </div>}
                        {!this.props.empty_cart &&
                        <div className="shoppingCartObjectsContainer">
                            {this.props.cart_objects.map((shoppingCartObject, index) => (
                                <ShoppingCartObject
                                    key={index}
                                    shoppingCartObject={shoppingCartObject}
                                    quantity_increase={() => this.props.quantity_increase(shoppingCartObject.itemId)}
                                    quantity_decrease={() => this.props.quantity_decrease(shoppingCartObject.itemId)}
                                />
                            ))}
                        </div>}
                        <p>Price total: ${this.props.cart_total_price}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default ShoppingCart;