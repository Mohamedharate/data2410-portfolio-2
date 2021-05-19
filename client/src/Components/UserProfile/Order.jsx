import React, {Component} from "react";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';


class Order extends Component {

    state = {
        toggle_products: false,
    }

    handleToggleProducts = () => {
        this.setState({toggle_products: !this.state.toggle_products})
    }

    render() {
        const date = new Date(this.props.order.date);
        return (
            <div className="container">
                <hr/>
                <div className="row text-left">
                    <div className="col-md 10">
                        <strong>Date: </strong>{date.toLocaleDateString('no', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    })}
                    </div>
                </div>
                <div className="row justify-content-center text-left">
                    <div className="col-md-5">
                        <strong className="mt-2">Billing address:</strong><br/>
                        <strong>Country: </strong>{this.props.order.billingAddress.country}<br/>
                        <strong>City: </strong>{this.props.order.billingAddress.city}<br/>
                        <strong>Zip Code: </strong>{this.props.order.billingAddress.zipCode}<br/>
                        <strong>Street: </strong>{this.props.order.billingAddress.street}<br/>
                    </div>
                    <div className="col-md-5">
                        <strong className="mt-2">Shipping address:</strong><br/>
                        <strong>Country: </strong>{this.props.order.shippingAddress.country}<br/>
                        <strong>City: </strong>{this.props.order.shippingAddress.city}<br/>
                        <strong>Zip Code: </strong>{this.props.order.shippingAddress.zipCode}<br/>
                        <strong>Street: </strong>{this.props.order.shippingAddress.street}<br/>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-10 border border-secondary rounded text-left m-2">
                        <button onClick={this.handleToggleProducts} className="btn text-dark btn-block p-0">
                            {this.state.toggle_products ?
                                <div className="row align-items-center">
                                    <div className="col-auto p-1">
                                        <ExpandMoreIcon/>
                                    </div>
                                    <div className="col-auto p-1">
                                        <span>Show Less</span>
                                    </div>
                                </div>
                                :
                                <div className="row align-items-center">
                                    <div className="col-auto p-1">
                                        <ChevronRightIcon/>
                                    </div>
                                    <div className="col-auto p-1">
                                        <span>Show Products</span>
                                    </div>
                                </div>}
                        </button>
                        {this.state.toggle_products &&
                        <React.Fragment>
                            <div className="row text-nowrap mt-2">
                                <div className="col-4 text-center">
                                    <h6>Quantity:</h6>
                                </div>
                                <div className="col-5 text-center">
                                    <h6>Product:</h6>
                                </div>
                                <div className="col-3 text-center">
                                    <h6>Price:</h6>
                                </div>
                            </div>
                            {this.props.order.products.map(product => (
                                <div className="container">
                                    <div className="row">
                                        <div className="col-4 align-self-center">
                                            <p className="text-center">
                                                {product.quantity}x
                                            </p>
                                        </div>
                                        <div className="col-5 align-self-center">
                                            <p className="text-center">
                                                {product.name}
                                            </p>
                                        </div>
                                        <div className="col-3 align-self-center">
                                            <p className="text-center">
                                                ${product.price * product.quantity}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <hr/>
                                        </div>
                                    </div>
                                </div>))}
                        </React.Fragment>}
                    </div>
                </div>
            </div>
        );
    }
}

export default Order;