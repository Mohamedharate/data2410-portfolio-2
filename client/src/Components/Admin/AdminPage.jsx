import React, {Component} from "react";
import Footer from "../footer";
import AdminAddNewProduct from "./AdminAddNewProduct";
import AdminAddNewEmployee from "./AdminAddNewEmployee";
import AdminRestockProducts from "./AdminRestockProducts";
import AdminEditProduct from "./AdminEditProduct";

class AdminPage extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        toggle_restock: true,
        toggle_edit_product: false,
        toggle_new_admin: false,
        toggle_new_product: false,
    };

    // Toggle windows
    toggleRestock = () => {
        this.setState({
            toggle_restock: true,
            toggle_edit_product: false,
            toggle_new_admin: false,
            toggle_new_product: false
        })
    };
    toggleEditProduct = () => {
        this.setState({
            toggle_restock: false,
            toggle_edit_product: true,
            toggle_new_admin: false,
            toggle_new_product: false
        })
    };
    toggleNewAdmin = () => {
        this.setState({
            toggle_restock: false,
            toggle_edit_product: false,
            toggle_new_admin: true,
            toggle_new_product: false
        })
    };
    toggleNewProduct = () => {
        this.setState({
            toggle_restock: false,
            toggle_edit_product: false,
            toggle_new_admin: false,
            toggle_new_product: true
        })
    };

    render() {
        return (
            <React.Fragment>
                <div className="fillPage">
                    <div className="row">
                        <div className="col-md-2 bg-secondary text-center fillColumn">
                            <h3 className="mt-5">Actions:</h3>
                            <button onClick={this.toggleRestock} className="btn btn-light btn-md m-2">
                                Restock
                            </button>
                            <button onClick={this.toggleEditProduct} className="btn btn-light btn-md m-2">
                                Edit Product
                            </button>
                            <button onClick={this.toggleNewProduct} className="btn btn-light btn-md m-2">
                                Add New Product
                            </button>
                            <button onClick={this.toggleNewAdmin} className="btn btn-light btn-md m-2">
                                Add New Admin
                            </button>
                            <button onClick={this.props.logoutCallback} className="btn btn-light btn-md m-2">
                                Logout
                            </button>
                        </div>
                        <div className="col-md-10">
                            {this.state.toggle_restock &&
                            <AdminRestockProducts />}
                            {this.state.toggle_edit_product &&
                            <AdminEditProduct />}
                            {this.state.toggle_new_product &&
                            <AdminAddNewProduct />}
                            {this.state.toggle_new_admin &&
                            <AdminAddNewEmployee />}
                        </div>
                    </div>
                </div>
                <Footer toggle_admin = {this.props.toggle_admin}/>
            </React.Fragment>
        );
    }
}
export default AdminPage;