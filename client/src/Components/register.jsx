import React, {Component} from "react";
import axios from "axios";
import DangerFeedback from "./dangerFeedback";
import SuccessFeedback from "./successFeedback";


class Register extends Component {
    constructor(props) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    state = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        zipCode: '',
        streetName: '',
        phone: '',
        toggle_error_feedback: false,
        toggle_success_feedback: false,
        feedback_text: '',
    }


    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }

    async submitLoginDetails() {
        const that = this;

        await axios({
            method: 'post',
            url: 'http://localhost:3001/api/users/signup',
            data: {
                firstName: this.state.firstname,
                lastName: this.state.lastname,
                email: this.state.email,
                password: this.state.password,
                zipCode: this.state.zipCode,
                street: this.state.streetName,
                phone: this.state.phone,
            }
        }).then(function (response) {
            console.log("Data:", response.data);
            console.log("Status:", response.status);
            that.setState({toggle_error_feedback: false})
            that.setState({toggle_success_feedback: true})
            that.setState({feedback_text: response.data})
        }).catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                if(error.response.status === 500){
                    that.setState({toggle_error_feedback: true})
                    that.setState({toggle_success_feedback: false})
                    that.setState({feedback_text: error.response.data})
                }
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
        });

    }

    render() {
        return (
            <React.Fragment>
                <div className="registerContainer">
                    <div id="login_div" className="row">
                        <div className="col-md-12">
                            <div className="mainLogIn">
                                <div className="form-signin">
                                    <div className="text-center mb-4">
                                        <h4>Register User</h4>
                                    </div>
                                    <div className="form-label-group">
                                        <input type="text" onChange={this.handleInputChange}
                                               className="form-control mt-2" placeholder="Firstname"
                                               pattern={/^[a-z ,.'-]+$/i}
                                               name="firstname" required="" autoFocus=""/>
                                        <input type="text" onChange={this.handleInputChange}
                                               className="form-control mt-2" placeholder="Lastname"
                                               pattern={/^[a-z ,.'-]+$/i}
                                               name="lastname" required="" autoFocus=""/>
                                        <input type="email" onChange={this.handleInputChange}
                                               className="form-control mt-2" placeholder="Email"
                                               pattern={
                                                   /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/}
                                               name="email" required="" autoFocus=""/>
                                        <input type="Password" onChange={this.handleInputChange}
                                               className="form-control mt-2" placeholder="Password"
                                               pattern={/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/}
                                               name="password" required="" autoFocus=""/>
                                        <input type="text" onChange={this.handleInputChange}
                                               className="form-control mt-2" placeholder="Zip Code"
                                               pattern={/^\d{5}(?:[-\s]\d{4})?$/}
                                               name="zipCode" required="" autoFocus=""/>
                                        <input type="text" onChange={this.handleInputChange}
                                               className="form-control mt-2" placeholder="Street name"
                                               pattern={/^\s[A-z]+\s[A-z]+\d+/}
                                               name="streetName" required="" autoFocus=""/>
                                        <input type="text" onChange={this.handleInputChange}
                                               className="form-control mt-2" placeholder="Phone"
                                               pattern={/^\s[A-z]+\s[A-z]+\d+/}
                                               name="phone" required="" autoFocus=""/>
                                    </div>
                                    <button onClick={this.submitLoginDetails.bind(this)}
                                            className="btn btn-lg btn-primary btn-block mt-2">Register
                                    </button>
                                    {this.state.toggle_error_feedback && <DangerFeedback feedback_error_text={this.state.feedback_text} />}
                                    {this.state.toggle_success_feedback && <SuccessFeedback feedback_success_text={this.state.feedback_text} />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Register;