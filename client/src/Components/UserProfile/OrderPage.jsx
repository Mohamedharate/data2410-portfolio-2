import React, {Component} from "react";
import Order from "./Order";


class OrderPage extends Component {

    render() {
        return (
            <div className="container">
                <div className="row text-left">
                    <div className="col-12">
                        <h6>Orders:</h6>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        {this.props.orders.map(order => (
                            <Order
                                key={order._id}
                                order={order}
                            />))}
                    </div>
                </div>
            </div>
        );
    }
}

export default OrderPage;