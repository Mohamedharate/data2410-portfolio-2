import React, {Component} from "react";
import axios from "axios";
import DangerFeedback from "../dangerFeedback";
import SuccessFeedback from "../successFeedback";

class AdminEditProduct extends Component {
    constructor(props) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleInputFile = this.handleInputFile.bind(this)
    }

    state = {
        products: [],
        imagePreview: File,
        itemId: Number,

        old_imageArray: [],
        old_product_name: String,
        old_product_price: Number,
        old_product_stock: Number,
        old_product_category: String,
        old_short_description: String,
        old_long_description: String,

        new_imageArray: [],
        new_product_name: String,
        new_product_price: Number,
        new_product_stock: Number,
        new_product_category: String,
        new_short_description: String,
        new_long_description: String,

        feedback_text: String,
        toggle_error_feedback: false,
        toggle_success_feedback: false,
    };

    handleGetProducts = () => {
        this.getProducts().then()
    };
    handleInputChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            ['new_'+name]: value
        })
    };
    handleInputFile = event => {
        const file = event.target.files[0]; //TODO make this work for a list of pictures.

        this.setState({imagePreview: URL.createObjectURL(file)})

        const imageArray = file
        this.setState({imageArray});
    }
    handleEdit = product => {

        const preview = `data:${product.imageUrl[0].contentType};base64, ${product.imageUrl[0].image}`

        this.setState({
            imagePreview: preview,
            itemId: product.itemId,

            old_imageArray: product.imageUrl,
            old_product_name: product.name,
            old_product_price: parseInt(product.price.$numberDecimal),
            old_product_stock: product.quantity,
            old_product_category: product.category,
            old_short_description: product.descriptionShort,
            old_long_description: product.descriptionLong,

            new_imageArray: product.imageUrl,
            new_product_name: product.name,
            new_product_price: parseInt(product.price.$numberDecimal),
            new_product_stock: product.quantity,
            new_product_category: product.category,
            new_short_description: product.descriptionShort,
            new_long_description: product.descriptionLong,

        })

    }
    handleSubmit = event => {
        event.preventDefault();

        let file = this.state.new_imageArray;

        let formdata = new FormData();

        // Checks which variables has changed and add changed variables to the form-data.
        if (this.state.old_imageArray !== this.state.new_imageArray) {
            console.log("Bildet er endret!")
            formdata.append('imageUrl', file);
        }
        if (this.state.old_product_name !== this.state.new_product_name) {
            console.log("endret!")
            formdata.append('name', this.state.new_product_name);
        }
        if (this.state.old_short_description !== this.state.new_short_description) {
            console.log("endret!")
            formdata.append('descriptionShort', this.state.new_short_description);
        }
        if (this.state.old_long_description !== this.state.new_long_description) {
            console.log("endret!")
            formdata.append('descriptionLong', this.state.new_long_description);
        }
        if (this.state.old_product_price !== this.state.new_product_price) {
            console.log("endret!")
            formdata.append('price', this.state.new_product_price);
        }
        if (this.state.old_product_category !== this.state.new_product_category) {
            console.log("endret!")
            formdata.append('category', this.state.new_product_category);
        }
        if (this.state.old_product_stock !== this.state.new_product_stock) {
            console.log("endret!")
            formdata.append('quantity', this.state.new_product_stock);
        }

        console.log(formdata); //TODO console

        this.updateProduct(formdata).then();
    };

    async updateProduct(formdata) {
        const itemId = this.state.itemId;

        await axios({
            method: 'put',
            url: `http://localhost:3001/api/products/update/${itemId}`,
            data: formdata,
        }).then(res => {
            console.log(res.data.message)
            this.setState({
                toggle_success_feedback: true,
                toggle_error_feedback: false,
                feedback_text: res.data.message,
            })
        }).catch(err => {
            console.log(err)
            this.setState({
                toggle_success_feedback: false,
                toggle_error_feedback: true,
                feedback_text: err.error,
            })
        })
    }

    async getProducts() {
        await axios.get('http://localhost:3001/api/products/get/allProductsPure')
            .then(res => {
                const products = res.data
                this.setState({products})
            }).catch(res => {
                console.error(res)
            })
    }

    render() {
        return (
            <div className="fillPage">
                <div className="row text-center mt-5">
                    <div className="col-md-4"/>
                    <div className="col-md-4">
                        <h3>Edit Products</h3>
                    </div>
                    <div className="col-md-4">
                        <button onClick={this.handleGetProducts} className="btn btn-primary">
                            Get Products
                        </button>
                    </div>
                </div>
                <div className="row text-center mt-5">
                    <div className="col-sm-4 float-left one">
                        {this.state.products.map((product, index) => (
                            <div className="input-group mt-2 ml-2" key={index}>
                                <input type="text" value={product.name} disabled/>
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <button onClick={() => this.handleEdit(product)} className="btn">Edit</button>
                                    </div>
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
                                        <option value="Coffee Beans">Coffee Beans</option>
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
                                    <button type="submit" className="btn btn-lg btn-primary btn-block mt-2">
                                        Update Product
                                    </button>
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

export default AdminEditProduct;
