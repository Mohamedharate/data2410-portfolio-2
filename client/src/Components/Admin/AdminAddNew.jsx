import React, {Component} from "react";
import axios from "axios";
import FormData from "form-data"
import DangerFeedback from "../dangerFeedback";
import SuccessFeedback from "../successFeedback";

class AdminAddNew extends Component {
    constructor(props) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleInputFile = this.handleInputFile.bind(this)
    }
    state = {
        imageArray: [],
        product_name: String,
        product_price: Number,
        product_stock: Number,
        product_category: String,
        short_description: String,
        long_description: String,
        imagePreview: File,
        feedback_text: String,
        toggle_error_feedback: false,
        toggle_success_feedback: false,
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    };

    handleInputFile = event => {
        const file = event.target.files[0]; //TODO make this work for a list of pictures.

        this.setState({imagePreview: URL.createObjectURL(file)})

        const imageArray = file
        this.setState({imageArray});
        console.log("array", imageArray); //TODO console
    }

    handleSubmit = event => {
        event.preventDefault();

        let file = this.state.imageArray;

        let formdata = new FormData();

        formdata.append('imageUrl', file);
        formdata.append('name', this.state.product_name);
        formdata.append('descriptionShort', this.state.short_description);
        formdata.append('descriptionLong', this.state.long_description);
        formdata.append('price', this.state.product_price);
        formdata.append('category', this.state.product_category);
        formdata.append('quantity', this.state.product_stock);

        console.log(formdata); //TODO console

        this.addProduct(formdata).then();
    };

    async addProduct(formdata) {
        await axios({
            method: 'post',
            url: 'http://localhost:3001/api/products/new',
            data: formdata,
        }).then(res => {
            this.setState({
                toggle_success_feedback: true,
                toggle_error_feedback: false,
                feedback_text: res.data.Message,
            })
        }).catch(err => {
            this.setState({
                toggle_success_feedback: false,
                toggle_error_feedback: true,
                feedback_text: err.response.data.Error,
            })
        })
    }

    render() {
        return (
            <React.Fragment>
                <form onSubmit={this.handleSubmit} className="form-addProduct">
                    <div className="row text-center m-5">
                        <div className="col-12">
                            <h3>Add New Product</h3>
                        </div>
                    </div>
                    <div className="row form-label-group m-2">
                        <div className="col-6">
                            <label htmlFor="uploadImage">Upload Image:</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="uploadImg">Upload Image</span>
                                </div>
                                <div className="custom-file">
                                    <input onChange={this.handleInputFile} type="file" className="form-control-file"
                                           id="uploadImage"
                                           name="imageUrl" aria-describedby="uploadImg" multiple/>
                                    <label className="custom-file-label"
                                           htmlFor="uploadImage">Choose file..</label>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <p>Preview image:</p>
                            <img className="previewImage" src={this.state.imagePreview} alt=""/>
                        </div>
                    </div>
                    <div className="row form-label-group m-2">
                        <div className="col-sm-6">
                            <label className="mt-2" htmlFor="product_name">Product name:</label>
                            <input type="text" onChange={this.handleInputChange}
                                   className="form-control" placeholder="Name"
                                   name="product_name" required autoFocus=""/>
                            <label className="mt-2" htmlFor="product_price">Product price:</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">$</span>
                                </div>
                                <input type="number" onChange={this.handleInputChange}
                                       className="form-control" placeholder="Price"
                                       name="product_price" required/>
                            </div>
                            <label className="mt-2" htmlFor="product_stock">Product Stock:</label>
                            <input type="number" onChange={this.handleInputChange}
                                   className="form-control" placeholder="Stock"
                                   name="product_stock" required autoFocus=""/>
                            <label className="mt-2" htmlFor="product_category">Category</label>
                            <select name="product_category" onChange={this.handleInputChange}
                                    className="custom-select my-1 mr-sm-2" required>
                                <option value="" defaultValue="">Choose...</option>
                                <option value="Coffee Capsules">Coffee Capsules</option>
                                <option value="Coffee Beans">Coffee Beans</option>
                                <option value="Filter Ground Coffee">Filter Ground Coffee</option>
                                <option value="Coffee Machine">Coffee Machine</option>
                                <option value="Coffee Beans">Coffee Beans</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="col-sm-6">
                            <label className="mt-2" htmlFor="short_description">Short Description:</label>
                            <textarea onChange={this.handleInputChange} className="form-control"
                                      placeholder="Short Description"
                                      rows="3" name="short_description" required/>
                            <label className="mt-2" htmlFor="long_description">Long Description:</label>
                            <textarea onChange={this.handleInputChange} className="form-control"
                                      placeholder="Long Description"
                                      rows="7" name="long_description" required/>
                        </div>
                    </div>
                    <div className="row m-2">
                        <div className="col-md-3">
                            <button type="submit" className="btn btn-lg btn-primary btn-block mt-2">
                                Add Product
                            </button>
                        </div>
                    </div>
                    {this.state.toggle_error_feedback &&
                    <DangerFeedback feedback_error_text={this.state.feedback_text}/>}
                    {this.state.toggle_success_feedback &&
                    <SuccessFeedback feedback_success_text={this.state.feedback_text}/>}
                </form>
            </React.Fragment>
        );
    }
}

export default AdminAddNew;