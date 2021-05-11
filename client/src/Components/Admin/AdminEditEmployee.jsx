import React, {Component} from "react";
import axios from "axios";
import bootbox from "bootbox"
import FormData from "form-data";
import DangerFeedback from "../dangerFeedback";
import SuccessFeedback from "../successFeedback";
import LoadingSpinnerPrimaryLongBtn from "../Spinners/LoadingSpinnerPrimaryLongBtn";

class AdminEditEmployee extends Component {
    constructor(props) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this)
    }

    state = {
        password: String,
        employee_id: '',

        old_firstName: String,
        old_lastName: String,
        old_email: String,
        old_phoneNumber: String,
        old_position: String,

        new_firstName: String,
        new_lastName: String,
        new_email: String,
        new_phoneNumber: String,
        new_position: String,

        toggle_submit_loading: false,
        toggle_get_product_loading: false,
        feedback_text: String,
        toggle_error_feedback: false,
        toggle_success_feedback: false,
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            ['new_' + name]: value
        })
    };

    handleEditBtn = employee => {
        this.setState({
            employee_id: employee._id,

            old_firstName: employee.firstName,
            old_lastName: employee.lastName,
            old_email: employee.email,
            old_phoneNumber: employee.phoneNumber,
            old_position: employee.position,

            new_firstName: employee.firstName,
            new_lastName: employee.lastName,
            new_email: employee.email,
            new_phoneNumber: employee.phoneNumber,
            new_position: employee.position,
        })

    }
    handleDeleteBtn = async employee => {
        // Confirm delete
        bootbox.confirm({
            message: "Delete " + employee.firstName + " " + employee.lastName + " from products?",
            buttons : {
                'cancel': {
                    label: 'Cancel',
                    className: 'btn-default pull-left'
                },
                'confirm': {
                    label: 'Delete',
                    className: 'btn-danger pull-right'
                }
            },
            callback: async result => {
                if (result) {
                    console.log("Delete", employee.firstName)
                    await axios.delete(`http://localhost:3001/*****/${employee._id}`) // TODO find url
                        .then(() => {
                            this.handleGetEmployees()
                        }).catch(err => {
                            console.log(err)
                        })
                }
            }
        });
    }
    handleSubmit = async event => {
        event.preventDefault();
        this.setState({toggle_submit_loading: true});

        const employeeId = this.state.employee_id

        let formdata = new FormData();

        // Checks which variables has changed and add changed variables to the form-data.
        if (this.state.old_firstName !== this.state.new_firstName) {
            formdata.append('firstName', this.state.new_firstName);
        }
        if (this.state.old_lastName !== this.state.new_lastName) {
            formdata.append('lastName', this.state.new_lastName);
        }
        if (this.state.old_email !== this.state.new_email) {
            formdata.append('email', this.state.new_email);
        }
        if (this.state.old_phoneNumber !== this.state.new_phoneNumber) {
            formdata.append('phoneNumber', this.state.new_phoneNumber);
        }
        if (this.state.old_position !== this.state.new_position) {
            formdata.append('position', this.state.new_position);
        }

        await axios({
            method: 'put',
            url: `http://localhost:3001/*****/${employeeId}`, //TODO find url
            data: formdata,
        }).then(res => {
            this.setState({
                toggle_success_feedback: true,
                toggle_error_feedback: false,
                feedback_text: res.data.Message,
            });
        }).catch(err => {
            this.setState({
                toggle_success_feedback: false,
                toggle_error_feedback: true,
                feedback_text: err.response.data.Error,
            });
        });
        this.setState({toggle_submit_loading: false});
    };

    handleGetEmployees = async () => {
        this.setState({toggle_get_product_loading: true});
        await axios.get('http://localhost:3001/api/products/get/allProductsPure')
            .then(res => {
                const products = res.data;
                this.setState({products});
            }).catch(err => {
                this.setState({
                    toggle_success_feedback: false,
                    toggle_error_feedback: true,
                    feedback_text: err.data.Error,
                });
            });
        this.setState({toggle_get_product_loading: false});
    };

    render() {
        return (
            <div className="fillPage">
                <div className="row text-center m-5">
                    <div className="col-md-4"/>
                    <div className="col-md-4">
                        <h3>Edit Products</h3>
                    </div>
                    <div className="col-md-4">
                        {this.state.toggle_get_product_loading ? <LoadingSpinnerPrimaryLongBtn/> :
                            <button onClick={this.handleGetProducts} className="btn btn-primary btn-block">
                                Get Products
                            </button>}
                    </div>
                </div>
                <div className="row text-center mt-5">
                    <div className="col-sm-4 float-left one">
                        {this.state.products.map((product, index) => (
                            <div className="input-group mt-2 ml-2" key={index}>
                                <input type="text" value={product.name} disabled/>
                                <div className="input-group-append">
                                    <button onClick={() => this.handleEditBtn(product)} className="btn btn-outline-secondary">Edit</button>
                                    <button onClick={() => this.handleDeleteBtn(product)} className="btn btn-danger">
                                        <span className="material-icons mt-2">delete_forever</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-sm-8 text-left position-fixed offset-sm-3 mr-2 two">
                        <form onSubmit={this.handleSubmit} className="form-addProduct">
                            <div className="row form-label-group">
                                <div className="col-6 m-4">
                                    <label htmlFor="uploadImage">Upload Image:</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="uploadImg">Upload Image</span>
                                        </div>
                                        <div className="custom-file">
                                            <input onChange={this.handleInputFile} type="file"
                                                   className="form-control-file"
                                                   id="uploadImage"
                                                   name="imageUrl" aria-describedby="uploadImg" multiple/>
                                            <label className="custom-file-label"
                                                   htmlFor="uploadImage">Choose file..</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-5">
                                    <p>Preview image:</p>
                                    <img className="previewImage" src={this.state.imagePreview} alt=""/>
                                </div>
                            </div>
                            <div className="row form-label-group m-2">
                                <div className="col-sm-6">
                                    <label className="mt-2" htmlFor="product_name">Product name:</label>
                                    <input type="text" onChange={this.handleInputChange}
                                           className="form-control" placeholder="Name"
                                           name="product_name" value={this.state.new_product_name} required
                                           autoFocus=""/>
                                    <label className="mt-2" htmlFor="product_price">Product price:</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">$</span>
                                        </div>
                                        <input type="number" onChange={this.handleInputChange}
                                               className="form-control" placeholder="Price"
                                               name="product_price" value={this.state.new_product_price} required/>
                                    </div>
                                    <label className="mt-2" htmlFor="product_stock">Product Stock:</label>
                                    <input type="number" onChange={this.handleInputChange}
                                           className="form-control" placeholder="Stock"
                                           name="product_stock" value={this.state.new_product_stock} required
                                           autoFocus=""/>
                                    <label className="mt-2" htmlFor="product_category">Category</label>
                                    <select name="product_category" onChange={this.handleInputChange}
                                            className="custom-select my-1 mr-sm-2"
                                            value={this.state.new_product_category} required>
                                        <option value="" defaultValue="">Choose...</option>
                                        <option value="Coffee Capsules">Coffee Capsules</option>
                                        <option value="Coffee Beans">Coffee Beans</option>
                                        <option value="Filter Ground Coffee">Filter Ground Coffee</option>
                                        <option value="Coffee Machine">Coffee Machine</option>
                                        <option value="Coffee">Coffee</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="col-sm-5">
                                    <label className="mt-2" htmlFor="short_description">Short Description:</label>
                                    <textarea onChange={this.handleInputChange} className="form-control"
                                              placeholder="Short Description" value={this.state.new_short_description}
                                              rows="3" name="short_description" required/>
                                    <label className="mt-2" htmlFor="long_description">Long Description:</label>
                                    <textarea onChange={this.handleInputChange} className="form-control"
                                              placeholder="Long Description" value={this.state.new_long_description}
                                              rows="6" name="long_description" required/>
                                </div>
                            </div>
                            <div className="row m-2">
                                <div className="col-md-3">
                                    {this.state.toggle_submit_loading ? <LoadingSpinnerPrimaryLongBtn/> :
                                        <button type="submit" className="btn btn-primary btn-block mt-2">
                                            Update Product
                                        </button>}
                                </div>
                            </div>
                            {this.state.toggle_error_feedback &&
                            <DangerFeedback feedback_error_text={this.state.feedback_text}/>}
                            {this.state.toggle_success_feedback &&
                            <SuccessFeedback feedback_success_text={this.state.feedback_text}/>}
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminEditEmployee;