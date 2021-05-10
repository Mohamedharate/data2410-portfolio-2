import React, {Component, Fragment} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {Alert} from "react-bootstrap";

class Orders extends Component{

    constructor(props) {
        super(props);
        this.state = {user: "", orders: [], order_id: 0};
    }
    async getOrder(){
        const that = this;
        await axios({
            method: "get",
            url: "http://localhost:3001/api/orders/getUserOrders/",
        }).then(function (response){
            console.log(response.data)
            that.setState({
                orders: response.data, order_id: response.data.orders._id,});
        }).catch(function (error){
            console.log(error.data)
        });
    }
    render() {
        return(
            <div className="orderContainer">
            <div className="card mt-5">
                <h3 className="card-header">Previous orders</h3>
                        {!this.state.orders &&
                        <Alert color="info">You have no orders. Go shopping!</Alert>}
                        {this.state.orders &&
                        <Alert color="info">You are logged in as {this.state.orders.firstName}. Here are your orders:</Alert>}
                    <ul className="list-group">
                        <li className="list-group-item">
                        {this.state.orders &&
                        this.state.orders.map((order, index) => {
                            return(
                                <div key={index}>
                                    {order.products.map((p, i) => {
                                        return(
                                            <div key={i}>
                                                <h6>Name: {p.name}</h6>
                                                <h6>Price: ${p.price}</h6>
                                                <h6>Date: {p.date}</h6>
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
        )
    }


}

export default Orders