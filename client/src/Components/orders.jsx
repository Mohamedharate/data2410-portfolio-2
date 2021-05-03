import React, {Component} from "react";
import axios from "axios";

class Orders extends Component{

    constructor(props) {
        super(props);
        this.state = {user: "", orders: []};
    }

    async getOrder(){
        await axios({
            method: "get",
            url: "http://localhost:3001/api/orders/get/"+this.props.match.email,
        }).then(function (response){
        this.setState({email: response.data.email, orderNumber: response.data.orderNumber,
        products: response.data.products, total: response.data.total})
        }).catch(function (error){
            console.log(error.data)
        });
    }



    render() {
        const { orderNumber } = this.state;
        return(

            <div className="previous-orders">
                <table className="table">

                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orderNumber.map((order)=>(
                        <tr key={order}>
                            <td>{order}</td>
                            <td>{order.total}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )


    }


}

export default Orders