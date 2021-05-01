import React, {Component,} from "react";
import axios from "axios";
import {func} from "prop-types";

export default class AddReview extends Component{

    async putReview(){
        const that = this;
        await axios({
            method: 'put',
            url: '/api/products/addReview:itemId',
            data: {
                name: this.state.name,
                mail: this.state.mail,
                message: this.state.message,
                stars: this.state.stars,
            }
        }).then(function(response){
            console.log("Data: ", response.data);
        }).catch(function (error){
            if (error.response){
                console.log(error.response.data);
            }
        })
    }
    handleReview = (event) => {
        event.preventDefault();
    }



render() {
    return(
        <div className="container">
            <div className="row">
                    <div className="col-lg-9">
                        <div>
                            <div width="100%">
                                <h1>Feedback</h1>
                                <div className="card mt-4">
                                    <div className="card-header">Add review for item</div>
                                    <div className="card-body">
                                    <form className="form-horisontal">
                                        <fieldset>
                                            <div className="form-group">
                                                <label className="col-md-9 control-label">Full
                                                    Name</label>
                                                <div className="col-md-9">
                                                    <input id="name" name="name" type="text" placeholder="Your name"
                                                           className="form-control"/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="col-md-9 control-label">Your
                                                    E-mail</label>
                                                <div className="col-md-9">
                                                    <input id="email" name="email" type="text" placeholder="Your email"
                                                           className="form-control"/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="col-md-9 control-label">Your
                                                    message</label>
                                                <div className="col-md-9">
                                                    <textarea className="form-control" id="message" name="message"
                                                              placeholder="Please enter your feedback here..."
                                                              rows="5"/>
                                                </div>
                                            </div>
                                        <div className="form-group">
                                            <label className="col-md-9 control-label">Number of stars</label>
                                            <div className="col-md-9">
                                                    <select className="form-control" id="stars" name="stars">
                                                            <option>1</option>
                                                        <option>2</option>
                                                        <option>3</option>
                                                        <option>4</option>
                                                        <option>5</option>
                                                    </select>
                                            </div>
                                        </div>
                                            <div className="btn btn-success">Send review</div>
                                        </fieldset>
                                    </form>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}
}