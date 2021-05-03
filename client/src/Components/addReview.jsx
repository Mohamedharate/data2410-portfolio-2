import React, {Component,} from "react";
import axios from "axios";


export default class AddReview extends Component{

    constructor(props) {
        super(props);
        this.state = {
            dateTime: (new Date()).toDateString(),
            firebaseKey: this.props.firebaseKey || '',
            reviewText: this.props.reviewText || '',
            reviewStars: this.props.reviewStars || ''}
    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        if (this.state.firebaseKey === '') {
            this.setState({
                firebaseKey: this.props.firebaseKey
            });
        }

        this.putReview(this.state)
            .then(()=>this.props.onUpdate());

    };

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
    const { reviewStars } = this.state;
    const options = [
        {
            label: "1",
            value: "1",
        },
        {
            label: "2",
            value: "2",
        },
        {
            label: "3",
            value: "3",
        },
        {
            label: "4",
            value: "4",
        },
        {
            label: "5",
            value: "5",
        }
    ];
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
                                                <label className="col-md-3 control-label" htmlFor="message">Your
                                                    rating</label>
                                                <div className="col-md-9">
                                                    <select name="rating" id="reviewStars" className="selectpicker" value={reviewStars}
                                                            onChange={this.handleChange}>
                                                            {options.map((option) => (
                                                                <option key={option.value} value={option.value}>
                                                                    {option.label}</option>
                                                            ))}
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