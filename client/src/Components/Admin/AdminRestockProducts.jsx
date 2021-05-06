import React, {Component} from "react";
import axios from "axios";
import AdminRestockProduct from "./AdminRestockProduct";

class AdminRestockProducts extends Component {
    state = {
        products: [],
    };

    handleGetProducts = () => {
        this.getProducts().then()
    };
    handleAddStockCallback = (product, value) => {
        console.log("click", product)
        if (value != null) {
            const products = [...this.state.products];
            const index = products.findIndex(i => i._id === product)
            products[index].quantity = parseInt(products[index].quantity) + parseInt(value);
            this.setState({products})
            this.updateStock(products[index].quantity, products[index].itemId).then()
        } else {
            console.error("Give number property to Quantity!")
        }
    };

    handleRemoveStockCallback = (product, value) => {
        if (value != null) {
            const products = [...this.state.products];
            const index = products.findIndex(i => i._id === product)
            products[index].quantity = parseInt(products[index].quantity) - parseInt(value);
            this.setState({products})
            this.updateStock(products[index].quantity, products[index].itemId).then()
        } else {
            console.error("Give number property to Quantity!")
        }
    };

    async getProducts() {
        await axios.get('http://localhost:3001/api/products/get/allProductsPure')
            .then(res => {
                const products = res.data
                this.setState({ products })
            }).catch(res => {
                console.error(res)
            })
    }

    async updateStock(data, itemId) {
        await axios({
            method: 'put',
            url: `http://localhost:3001/api/products/update/${itemId}`,
            data: {
                quantity: data
            }
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className="row text-center m-5">
                    <div className="col-md-4"/>
                    <div className="col-md-4">
                        <h3>Restock</h3>
                    </div>
                    <div className="col-md-4">
                        <button onClick={this.handleGetProducts} className="btn btn-primary">
                            Get Products
                        </button>
                    </div>
                </div>
                <div className="row text-center">
                    <div className="col-12">
                        {this.state.products.map((product, index) => (
                            <AdminRestockProduct
                            key={index}
                            product={product}
                            addStock = {this.handleAddStockCallback}
                            removeStock = {this.handleRemoveStockCallback}
                            />
                        ))}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default AdminRestockProducts;