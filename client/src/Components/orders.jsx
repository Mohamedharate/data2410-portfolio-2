import React, {Component, Fragment} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {Alert} from "react-bootstrap";

class Orders extends Component{

    constructor(props) {
        super(props);
        this.state = {user: "", orders: [], order_id: 0};
    };

    componentDidMount = async () => {
        await axios({
            method: "get",
            url: 'https://localhost:3001/api/orders/getUserOrders/'+this.props.current_user.email,
        }).then(response => {
            this.setState({
                orders: response.data, order_id: response.data.orders._id,});
        }).catch(function (error){
            console.log(error.data)
        });
    }
    toggleEditProfile = () => {
        this.setState({
            toggle_edit_profile: true,
            toggle_previous_orders: false,
        })
    };
    toggleOrders = () => {
        this.setState({
            toggle_edit_profile: false,
            toggle_previous_orders: true,
        })
    };

    render() {
        const {orders} = this.state;
        return(
            <div className="orderContainer">
                <div className="row">
                    <div className="col-md-2 bg-secondary text-center fillColumn">
                        <button onClick={this.toggleEditProfile} className="btn btn-light btn-md m-2">
                            Edit Profile
                        </button>
                        <button onClick={this.toggleOrders} className="btn btn-light btn-md m-2">
                            Previous Orders
                        </button>
                    </div>
                        <div className="col-md-10">
                        <h3 className="card-header">Previous orders</h3>
                        {!this.state.orders.products &&
                        <Alert color="info">You have no orders. Go shopping!</Alert>}
                        {this.state.orders.products &&
                        <Alert color="info">You are logged in as {this.state.orders.firstName}. Here are your orders:</Alert>}
                        <ul className="list-group">
                        <li className="list-group-item">
                            {orders &&
                            [orders].map((order, index) => {
                            return(
                                <div key={index}>
                                    {order.products &&
                                    [order.products].map((o, i) => {
                                        return(
                                            <div key={i}>
                                                <h6>Price: ${o.total}</h6>
                                                <h6>Date: {o.date}</h6>
                                    </div>
                                )
                            })}
                        </div>
                        )
                    })}
                </li>
                </ul>
            </div>

            </div>
    </div>
        )
    }


}

export default Orders