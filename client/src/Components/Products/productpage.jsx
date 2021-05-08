import React, { Component } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import {array, arrayOf} from "prop-types";
import FormFileInput from "react-bootstrap";


export default class Productpage extends Component {
    constructor(props) {
        super(props);
        this.state = {name: "", price: 0, descriptionLong: ""};
        this.state = {products: [], name: "", price: 0, description: "", itemId: "", imageArr: [], email: ""};

    }

    async componentDidMount() {
        const that = this;
        await axios({
            method: "get",
            url: 'http://localhost:3001/api/products/get/' + this.props.match.params.itemId,
        }).then(function (response) {
            that.setState({
                name: response.data.name, price: response.data.price,
                description: response.data.descriptionLong,
                image: response.data.imageUrl,
                itemId: response.data.itemId
            });
        }).catch(function (error) {
            if (!error.data) {
                console.log(error.data)
            }
            console.log(error);
        });
    };

    async postToCart(itemId, quantity) {
        await axios({
            method: "post",
            url: 'http://localhost:3001/api/cart/addToCart/',
            data: {product_id: itemId, quantity}
        })
    }


    render() {
        const {price} = this.state;
        let imageArr = [];
        let carousel;
        if(this.props.image){
            this.props.image.map((img, i) => {
                const buffer = img.imageURL[0].data;
                const b64 = new Buffer(buffer).toString("base64");
                let mimeType = img.imageURL[0].contentType;
                let src = 'data:${mimeType};base64,${b64}';

                imageArr.push(
                    <div key ={i}>
                        <img src={src} />
                    </div>
                );
            });
        }
        if (imageArr.length > 0){
            carousel = <Carousel>{imageArr}</Carousel>;
        }
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
                                    <Carousel>
                                        {imageArr}
                                    </Carousel>
                                </div>
                                <div className="card-body">
                                    <h3 className="card-title">{this.state.name}</h3>
                                    {Object.values(price).map((p) => (<h4 className="price" key="p">${p}</h4>))}
                                    <p className="card-text">{this.state.description}</p>
                                    <span className="text-warning">★ ★ ★ ★ ☆</span>
                                    4.0 stars
                                    <p><strong>Quantity</strong></p>
                                    <input type="number" className="form-control" value={this.state.quantity} label="Quantity" />
                                    <button type="submit" className="btn btn-lg btn-success btn-block mt-2"
                                            onClick={() => this.postToCart(this.state.itemId, this.state.quantity)}>Add to cart</button>
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
                                    <Link to={'/addReview/' + this.state.itemId} className="btn btn-success">Leave a
                                        Review</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

}