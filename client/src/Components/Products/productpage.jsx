import React, {Component} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import { Button} from 'react-bootstrap';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import InputSpinner from "react-bootstrap-input-spinner";


import LoadingSpinnerSuccessLongBtn from "../Spinners/LoadingSpinnerSuccessLongBtn";
import LoadingSpinnerSmallGeneral from "../Spinners/LoadingSpinnerSmallGeneral";
import LoadingSpinnerLargeGeneral from "../Spinners/LoadingSpinnerLargeGeneral";


export default class Productpage extends Component {
    constructor(props) {
        super(props);
        this.state = {descriptionLong: "", cart_feedback: false, toggle_loading: false, loading_photo: false};
        this.state = {product: [], quantity: 1, price: 0, quantityOfProduct: 0, price_mapped: 0, reviews: []};
    }

    componentDidMount = async() => {
        this.setState({loading_photo: true})
        await axios({
            method: "get",
            url: 'https://localhost:3001/api/products/get/'+this.props.itemId,
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
        this.setState({loading_photo: false})
    };


    postToCart = async (event) => {
        event.preventDefault();
        this.setState({toggle_loading: true})
        await axios({
            method: "post",
            url: 'https://localhost:3001/api/cart/addToCart/',
            data: {product_id: this.state.product.itemId, quantity: this.state.quantity}
        }).then(response => {
            this.setState({cart_feedback: "Product added to card!"})
            this.props.handleAddToCartCallback(this.state.product, this.state.quantity);
        }).catch(error => {
            if(error.response){
                console.log(error.response)
            }else if (error.request) {
                console.log(error.request);
            }
        })
        this.setState({toggle_loading: false});
    }

    render() {
        const {product,price} = this.state;
        return (
            <div className="productContainer">
                <div className="row">
                    <div className={"col-lg-1"}>

                    </div>
                    <div className="col-lg-3">
                        <h1 className="my-4">ShopMet</h1>
                        <div className="list-group">
                            <Link to="/" className="list-group-item" style={{color: "black"}}>Back</Link>
                        </div>
                </div>
                    <div className="col-lg-6">
                        <div className="card mt-4">
                            <div className="card-img-top">
                                {this.state.loading_photo ? <LoadingSpinnerLargeGeneral/> :
                                    <Carousel autoPlay="true" showThumbs={false} infiniteLoop="true">
                                        {product.imageUrl &&
                                        product.imageUrl.map((img, index) => (
                                            <div key={index}>
                                                <img className="fit-contain"
                                                     src={`data:img/${img.contentType};base64,${img.image.toString("base64")}`}
                                                     height={600}
                                                />
                                            </div>
                                        ))
                                        }
                                    </Carousel>
                                }
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">{product.name}</h3>
                                {Object.values(price).map((price_mapped) => (<h4 className="price" key="p">${price_mapped}</h4>))}

                                <p className="card-text">{product.descriptionLong}</p>
                                <p className="card-text">{this.state.quantityOfProduct} left in stock</p>
                                <div style={{display: 'flex'}}>
                                    <div style={{width: '100px', height:'auto'}}>
                                        <InputSpinner
                                            className="InputSpinner"
                                            type="number" size ={'sm'} variant={'dark'}
                                            value={this.state.quantity} min={1}
                                            onChange={(qty) => this.setState({...this.state, quantity: qty})}
                                            max={this.state.quantityOfProduct} label="Quantity"  precision={1} step={1}/>
                                    </div>
                                    {this.state.toggle_loading ? <LoadingSpinnerSuccessLongBtn/> :
                                        <Button type="submit" style={{ padding: '0 10px', marginLeft: '20px', width: '50%', fontSize: 'large'}} variant="success"
                                                onClick={this.postToCart}>Add to cart</Button>}
                                </div>
                                    <p className="card-text">{this.state.cart_feedback}</p>
                            </div>
                        </div>
                        <div className="card card-outline-secondary my-4">
                            <div className="card-header">Product Reviews</div>
                            <div className="card-body">
                                {product.reviews && product.reviews.map(review => (
                                    <div key={review.Time} className="review">
                                        <p className="review_text">{review.reviewText}</p>
                                        <p className="star-ratings">{review.rating} stars</p>
                                        <small className="text-muted">Posted by {review.user} on {review.Date}</small>
                                        <hr/>
                                    </div>
                                    ))}
                                <Link to={'/addReview/' + product.itemId} className="btn btn-success">Leave a
                                    Review</Link>
                            </div>
                        </div>
                    </div>
                    <div className={"col-lg-1"}>

                    </div>
                </div>

            </div>
        )
    }

}