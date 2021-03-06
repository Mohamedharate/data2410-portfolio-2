import React, {Component} from "react";
import Footer from "../Webstore/Footer";
import AdminAddNewProduct from "./AdminAddNewProduct";
import AdminAddNewEmployee from "./AdminAddNewEmployee";
import AdminRestockProducts from "./AdminRestockProducts";
import AdminEditProduct from "./AdminEditProduct";
import AdminEditEmployee from "./AdminEditEmployee";
import axios from "axios";
import LoadingSpinnerSmallLight from "../Spinners/LoadingSpinnerSmallLight";
import DangerFeedback from "../Feedback/DangerFeedback";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

class AdminPage extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        toggle_restock: true,
        toggle_edit_product: false,
        toggle_edit_employee: false,
        toggle_new_employee: false,
        toggle_new_product: false,
        logout_loading: false,
        toggle_error_feedback: false,
        feedback_text: '',
    };

    // Toggle windows
    toggleRestock = () => {
        this.setState({
            toggle_restock: true,
            toggle_edit_product: false,
            toggle_edit_employee: false,
            toggle_new_employee: false,
            toggle_new_product: false
        })
    };
    toggleEditProduct = () => {
        this.setState({
            toggle_restock: false,
            toggle_edit_product: true,
            toggle_edit_employee: false,
            toggle_new_employee: false,
            toggle_new_product: false
        })
    };
    toggleEditEmployee = () => {
        this.setState({
            toggle_restock: false,
            toggle_edit_product: false,
            toggle_edit_employee: true,
            toggle_new_employee: false,
            toggle_new_product: false
        })
    };
    toggleNewAdmin = () => {
        this.setState({
            toggle_restock: false,
            toggle_edit_product: false,
            toggle_edit_employee: false,
            toggle_new_employee: true,
            toggle_new_product: false
        })
    };
    toggleNewProduct = () => {
        this.setState({
            toggle_restock: false,
            toggle_edit_product: false,
            toggle_edit_employee: false,
            toggle_new_employee: false,
            toggle_new_product: true
        })
    };
    handleLogout = async () => {
        this.setState({logout_loading: true})
        await axios({
            method: 'post',
            url: 'https://localhost:3001/admin/logout',
            data: {}
        }).then(() => {
            this.props.logoutCallback();
            this.setState({logout_loading: false})
        }).catch(err => {
            this.setState({
                logout_loading: false,
                toggle_error_feedback: true,
                feedback_text: err.data.Error,
            })
        })
    }

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
                            <br/>
                            <button onClick={this.toggleEditProduct} className="btn btn-light btn-md m-2">
                                Edit Product
                            </button>
                            <br/>
                            <button onClick={this.toggleEditEmployee} className="btn btn-light btn-md m-2">
                                Edit Employee
                            </button>
                            <br/>
                            <button onClick={this.toggleNewProduct} className="btn btn-light btn-md m-2">
                                Add New Product
                            </button>
                            <br/>
                            <button onClick={this.toggleNewAdmin} className="btn btn-light btn-md m-2">
                                Add New Employee
                            </button>
                            <br/>
                            <button onClick={this.handleLogout} className="btn btn-danger btn-md m-2" disabled={this.state.logout_loading}>
                                Logout {this.state.logout_loading ? <LoadingSpinnerSmallLight/> : <ExitToAppIcon/>}
                            </button>
                            {this.state.toggle_error_feedback &&
                            <DangerFeedback feedback_error_text={this.state.feedback_text}/>}
                        </div>
                        <div className="col-md-10">
                            {this.state.toggle_restock &&
                            <AdminRestockProducts/>}
                            {this.state.toggle_edit_product &&
                            <AdminEditProduct/>}
                            {this.state.toggle_edit_employee &&
                            <AdminEditEmployee/>}
                            {this.state.toggle_new_product &&
                            <AdminAddNewProduct/>}
                            {this.state.toggle_new_employee &&
                            <AdminAddNewEmployee/>}
                        </div>
                    </div>
                </div>
                <Footer toggle_admin={this.props.toggle_admin}/>
            </React.Fragment>
        );
    }
}

export default AdminPage;