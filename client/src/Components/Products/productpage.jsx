import React, {Component} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import InputSpinner from "react-bootstrap-input-spinner";
import {CardImg} from "react-bootstrap";


export default class Productpage extends Component {
    handleAddToCartCallback = () => {
        this.state.handleAddToCartCallback()
    }
    constructor(props) {
        super(props);
        this.state = {descriptionLong: "", cart_feedback: false};
        this.state = {product: [], quantity: 1, price: 0, quantityOfProduct: 0};
    }

    componentDidMount = async() => {
        await axios({
            method: "get",
            url: 'http://localhost:3001/api/products/get/' + this.props.match.params.itemId,
        }).then(response => {
            this.setState({
                product: response.data, price: response.data.price, quantityOfProduct: response.data.quantity
            });
        }).catch(error => {
            if (!error.data) {
                console.log(error.data)
            }
            console.log(error);
        });
    };


    postToCart = async (event) => {
        event.preventDefault();
        await axios({
            method: "post",
            url: 'http://localhost:3001/api/cart/addToCart/',
            data: {product_id: this.state.product.itemId, quantity: this.state.quantity}
        }).then(response => {
            this.props.handleAddToCartCallback(this.state.product, this.state.quantity);
            this.setState({cart_feedback: true})
        }).catch(error => {
            if(error.response){
                console.log(error.response)
                console.log(error.response)
            }else if (error.request) {
                console.log(error.request);
            }
        })
    }

    render() {
        const {product,price} = this.state;
        return (
            <div className="productContainer">
                <div className="row">
                    <div className="col-lg-3">
                        <h1 className="my-4">ShopMet</h1>
                        <div className="list-group">
                            <Link to="/category/coffee" className="list-group-item">Coffee beans</Link>
                            <Link to="/category/capsules" className="list-group-item">Coffee capsules</Link>
                            <Link to="/category/filter" className="list-group-item">Filter Ground coffee</Link>
                            <Link to="/category/machines" className="list-group-item">Coffee machines</Link>
                            <Link to="/category/access" className="list-group-item">Other</Link>
                            <Link to="/" className="list-group-item">All</Link>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <div className="card mt-4">
                            <div className="card-img-top">
                                <Carousel autoPlay="true" infiniteLoop="true">
                                    {product.imageUrl &&
                                    product.imageUrl.map((img, index) => {
                                        return(
                                            <div>
                                                <CardImg
                                                    key={index}
                                                    src={`data:img/${img.contentType};base64,${img.image.toString("base64")}`}
                                                    height={600}
                                                />
                                            </div>
                                        )
                                    })
                                    }
                                </Carousel>
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">{product.name}</h3>
                                {Object.values(price).map((p) => (<h4 className="price" key="p">${p}</h4>))}

                                <p className="card-text">{product.descriptionLong}</p>
                                <p className="card-text">{this.state.quantityOfProduct} left in stock</p>
                                <span className="text-warning">★ ★ ★ ★ ☆ </span>
                                 4.0 stars
                                <InputSpinner
                                    className="InputSpinner"
                                    type="number" size ={'lg'} variant={'dark'}
                                    value={this.state.quantity} min={1}
                                    onChange={(qty) => this.setState({...this.state, quantity: qty})}
                                    max={this.state.quantityOfProduct} label="Quantity" />
                                <button type="submit" className="btn btn-lg btn-success btn-block mt-2"
                                        onClick={this.postToCart}
                                >Add to cart</button>
                                {this.state.cart_feedback &&
                                    <p className="card-text">Product added to cart!</p>
                                }
                            </div>
                        </div>
                        <div className="card card-outline-secondary my-4">
                            <div className="card-header">Product Reviews</div>
                            <div className="card-body">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam
                                    inventore, similique necessitatibus neque non! Doloribus, modi sapiente
                                    laboriosam
                                    aperiam fugiat laborum. Sequi mollitia, necessitatibus quae sint natus.</p>
                                <small className="text-muted">Posted by Anonymous on 3/1/21</small>
                                <hr/>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam
                                    inventore, similique necessitatibus neque non! Doloribus, modi sapiente
                                    laboriosam
                                    aperiam fugiat laborum. Sequi mollitia, necessitatibus quae sint natus.</p>
                                <small className="text-muted">Posted by Anonymous on 3/1/21</small>
                                <hr/>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam
                                    inventore, similique necessitatibus neque non! Doloribus, modi sapiente
                                    laboriosam
                                    aperiam fugiat laborum. Sequi mollitia, necessitatibus quae sint natus.</p>
                                <small className="text-muted">Posted by Anonymous on 3/1/21</small>
                                <hr/>
                                <Link to={'/addReview/' + product.itemId} className="btn btn-success">Leave a
                                    Review</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}