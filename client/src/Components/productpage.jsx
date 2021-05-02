import React, { Component } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

export default class Productpage extends Component{
    constructor(props) {
        super(props);
        this.state = {name: "", price: 0, descriptionLong: ""};
        this.state = {products: [], name: "", price: 0, description: "", itemId: "", imageUrl: ""};

    }

    async componentDidMount() {
        const that = this;
        await axios({
            method: "get",
            url: 'http://localhost:3001/api/products/get/'+this.props.match.params.itemId,
        }).then(function (response) {
            console.log("Data: ", response.data);
            that.setState({products: response.data, name: response.data.name, price: response.data.price,
                description: response.data.descriptionLong,
            image: "data:image/png;base64,"+response.data.imageUrl[0].image,
            itemId: response.data.itemId});
        }).catch(function (error) {
            if (!error.data) {
                console.log(error.data)
            }
            console.log(error);
        });
    };


    render() {
        const { price, image } = this.state;
        return(
            <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                        <h1 className="my-4">ShopMet</h1>
                        <div className="list-group">
                            <Link to="/category/coffee" className="list-group-item">Coffee</Link>
                            <Link to="/category/machines" className="list-group-item">Coffee and espresso machines</Link>
                            <Link to="/category/access" className="list-group-item">Accessories</Link>
                            <Link to="/" className="list-group-item">All</Link>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <div className="card mt-4">
                            <img className="card-img-top" src={this.state.image} alt="..."/>
                            <div className="card-body">
                                <h3 className="card-title">{this.state.name}</h3>
                                {Object.values(price).map((p) => (<h4 className="price" key="p">${p}</h4> ))}
                                <p className="card-text">{this.state.description}</p>
                                <span className="text-warning">★ ★ ★ ★ ☆</span>
                                4.0 stars
                            </div>
                        </div>
                        <div className="card card-outline-secondary my-4">
                            <div className="card-header">Product Reviews</div>
                            <div className="card-body">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam
                                    inventore, similique necessitatibus neque non! Doloribus, modi sapiente laboriosam
                                    aperiam fugiat laborum. Sequi mollitia, necessitatibus quae sint natus.</p>
                                <small className="text-muted">Posted by Anonymous on 3/1/21</small>
                                <hr/>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam
                                    inventore, similique necessitatibus neque non! Doloribus, modi sapiente laboriosam
                                    aperiam fugiat laborum. Sequi mollitia, necessitatibus quae sint natus.</p>
                                <small className="text-muted">Posted by Anonymous on 3/1/21</small>
                                <hr/>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam
                                    inventore, similique necessitatibus neque non! Doloribus, modi sapiente laboriosam
                                    aperiam fugiat laborum. Sequi mollitia, necessitatibus quae sint natus.</p>
                                <small className="text-muted">Posted by Anonymous on 3/1/21</small>
                                <hr/>
                                <Link to={'/addReview/'+this.state.itemId} className="btn btn-success" >Leave a Review</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}