import React, {Component,} from "react";
import axios from "axios";

export default class Productpage extends Component{
    constructor(props) {
        super(props);
        this.state = {'product': []};

    }

    async componentDidMount() {
        const that = this;
        await axios({
            method: "get",
            url: 'http://localhost:3001/api/products/:itemId',
        }).then(function (response) {
            console.log("Data: ", response);
            that.setState({product: response.data});
        }).catch(function (error) {
            if (!error.data) {
                console.log(error.data)
            }
            console.log(error);
        });
    };


    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <h1 className="my-4">ShopMet</h1>
                        <div className="list-group">
                            <a className="list-group-item" href="#!">Category 1</a>
                            <a className="list-group-item" href="#!">Category 2</a>
                            <a className="list-group-item" href="#!">Category 3</a>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <div className="card mt-4">
                            <img className="card-img-top img-fluid" src="https://via.placeholder.com/900x400"
                                 alt="..."/>
                            <div className="card-body">
                                <h3 className="card-title">Product Name</h3>
                                <h4>$24.99</h4>
                                <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                    Sapiente dicta fugit fugiat hic aliquam itaque facere, soluta. Totam id dolores,
                                    sint aperiam sequi pariatur praesentium animi perspiciatis molestias iure,
                                    ducimus!</p>
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
                                <a className="btn btn-success" href="#!">Leave a Review</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}