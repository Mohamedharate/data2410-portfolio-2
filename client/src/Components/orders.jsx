import React, {Component} from "react";
import axios from "axios";

class Orders extends Component{

    constructor(props) {
        super(props);
        this.state = {user: "", orders: [], order_id: 0};
    }

    async getOrder(){
        await axios({
            method: "get",
            url: "http://localhost:3001/api/orders/getAllOrders/",
        }).then(function (response){
            console.log(response.data)
        this.setState({orders: response.data, order_id: response.data._id})
        }).catch(function (error){
            console.log(error.data)
        });
    }



    render() {
        return(
            <div className="orderContainer">
            <div className="card mb-5">
                <h3 className="card-header">Previous orders</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                    {this.state.orders &&
                    this.state.orders.map((order) => {
                        return(
                        <div key={order._id}>
                            <h6>{order.date}</h6>
                            <h6>{order.total}</h6>
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