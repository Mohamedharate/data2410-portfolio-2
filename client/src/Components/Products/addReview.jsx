import React, {Component,} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import LoadingSpinnerLargeSuccess from "../Spinners/LoadingSpinnerLargeSuccess";


export default class AddReview extends Component{
    constructor(props) {
        super(props);
        this.state = {
            dateTime: (new Date()).toDateString(),
            message: '',
            rating: '',
            user_name: '',
            email: '',
            toggle_spinner: false
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        this.setState({toggle_spinner: true})
        await axios({
            method: 'post',
            url: '/api/products/addReview/'+this.props.match.params.itemId,
            data: {
                user: this.state.user_name,
                reviewText: this.state.message,
                rating: this.state.rating,
            }
        }).then(function(response){
            console.log("Data: ", response.data);
            this.setState({reviewText: response.data.message})
        }).catch(function (error){
            if (error.response){
                console.log(error.response.data);
            }
        });
        this.setState({toggle_spinner: false})
    };

    async componentDidMount() {
        const that = this;
        await axios({
            method: "get",
            url: 'https://localhost:3001/api/products/get/'+this.props.match.params.itemId,
        }).then(function (response) {
            that.setState({name: response.data.name,
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
    const { reviewStars } = this.state;
    const options = [
        {
            label: "1",
            value: "1",
        }, {
            label: "2",
            value: "2",
        }, {
            label: "3",
            value: "3",
        }, {
            label: "4",
            value: "4",
        }, {
            label: "5",
            value: "5",
        }
    ];
    return(
        <div className="review">
        <div className="productContainer">
                                <div className="row">
                                    <div className={"col-lg-1"}>
                                    </div>
                                <div className="col-lg-5">
                                    <div className="card-header">Add review for item {this.state.name}</div>
                                    <div className="card-body">
                                    <form onSubmit={this.handleSubmit}>
                                        <fieldset>
                                            <div className="form-group">
                                                <label className="col-md-9 control-label">Full
                                                    Name</label>
                                                <div className="col-md-9">
                                                    <input type="text" name="user_name" onChange={this.handleChange} placeholder="Your name" required={true}
                                                           className="form-control"/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="col-md-9 control-label">Your
                                                    E-mail</label>
                                                <div className="col-md-9">
                                                    <input name="email" type="text" onChange={this.handleChange} placeholder="Your email"
                                                           className="form-control"/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="col-md-9 control-label">Your
                                                    message</label>
                                                <div className="col-md-9">
                                                    <textarea className="form-control" onChange={this.handleChange} name="message" required={true}
                                                              placeholder="Please enter your feedback here..."
                                                              rows="5"/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="col-md-9 control-label" htmlFor="message">Your
                                                    rating</label>
                                                <div className="col-md-9">
                                                    <select name="rating" className="form-control" value={reviewStars} required={true}
                                                            onChange={this.handleChange}>
                                                            {options.map((option) => (
                                                                <option key={option.value} value={option.value}>
                                                                    {option.label}</option>
                                                            ))}
                                                    </select>

                                                </div>
                                            </div>
                                            {this.state.toggle_spinner ? <LoadingSpinnerLargeSuccess/>:
                                                <button type="submit" className="btn btn-success">Send review</button>
                                            }
                                        </fieldset>
                                    </form>
                                </div>
                                </div>
                                <div className="col-lg-5">
                                    <div className="card-img">
                                    <img className="card-img" src={this.state.image} alt = "picture of product"/>
                                    </div>
                                </div>
                                    <div className={"col-lg-1"}>
                                    </div>
                </div>
            </div>
        </div>
    )
}
}