import React, {Component,} from "react";
import axios from "axios";


export default class AddReview extends Component{
    constructor(props) {
        super(props);
        this.state = {
            dateTime: (new Date()).toDateString(),
            reviewText: this.props.reviewText || '',
            reviewStars: this.props.reviewStars || ''}
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.putReview()
            .then(response => {
            }).catch(error => {
        })
    };
    async putReview(){
        const that = this;
        await axios({
            method: 'post',
            url: '/api/products/addReview/:itemId',
            data: {
                user: this.state.user,
                mail: this.state.mail,
                reviewText: this.state.reviewText,
                rating: this.state.rating,
            }
        }).then(function(response){
            console.log("Data: ", response.data);
            that.setState({reviewText: response.data.message})
        }).catch(function (error){
            if (error.response){
                console.log(error.response.data);
            }
        })
    }

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
        <div className="container">
                        <div>
                            <div width="100%">
                                <div className="row">
                                <div className="col-lg-6">
                                    <div className="card-header">Add review for item {this.state.name}</div>
                                    <div className="card-body">
                                    <form onSubmit={this.handleSubmit}>
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
                                                <label className="rating" htmlFor="message">Your
                                                    rating</label>
                                                <div className="col-md-9">
                                                    <select name="rating" id="reviewStars" className="star_rate" value={reviewStars}
                                                            onChange={this.handleChange}>
                                                            {options.map((option) => (
                                                                <option key={option.value} value={option.value}>
                                                                    {option.label}</option>
                                                            ))}
                                                    </select>

                                                </div>
                                            </div>

                                            <button type="submit" className="btn btn-success">Send review</button>
                                        </fieldset>
                                    </form>
                                </div>
                                </div>
                                <div className="col-lg-6">
                                    <img className="card-img" src={this.state.image} alt = "picture of product"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
}