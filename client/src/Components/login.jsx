import React, {Component} from "react";
import axios from "axios";
import DangerFeedback from "./dangerFeedback";
import SuccessFeedback from "./successFeedback";

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    state = {
        email: '',
        password: '',
        toggle_success_feedback: false,
        toggle_error_feedback: false,
        feedback_text: '',
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.postLoginDetails()
            .then(response => {
            }).catch(error => {
        })
    }

    async postLoginDetails() {
        const that = this;
        await axios({
            method: 'post',
            url: 'http://localhost:3001/api/users/signIn',
            data: {
                email: this.state.email,
                password: this.state.password,
            }
        }).then(function (response) {
            console.log("Data:", response.data.message);
            console.log("Status:", response.status);
            if (response.status === 200) {
                that.setState({feedback_text: response.data.message});
                that.setState({toggle_error_feedback: false});
                that.setState({toggle_success_feedback: true});
            }
        }).catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                that.setState({feedback_text: error.response.data});
                that.setState({toggle_success_feedback: false});
                that.setState({toggle_error_feedback: true});
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
        });
    }

    render() {
        return (
            <div className="loginContainer">
                <div id="login_div" className="row">
                    <div className="col-md-12">
                        <form onSubmit={this.handleSubmit} className="form-signin">
                            <div className="text-center mb-4">
                                <h4>Sign in to store</h4>
                            </div>
                            <div className="form-label-group">
                                <input type="email" onChange={this.handleInputChange} className="form-control mt-2"
                                       placeholder="Email" name="email" required="*" autoFocus=""/>
                                <input type="Password" onChange={this.handleInputChange}
                                       className="form-control mt-2"
                                       pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}"
                                       title="Password must contain at least 1 upper and lower case letter, 1 number and
                                        be at least 8 characters long."
                                       placeholder="Password" name="password" required="*" autoFocus=""/>
                            </div>
                            <button type="submit"
                                    className="btn btn-lg btn-primary btn-block mt-2">Sign in
                            </button>
                            {this.state.toggle_success_feedback &&
                            <SuccessFeedback feedback_success_text={this.state.feedback_text}/>}
                            {this.state.toggle_error_feedback &&
                            <DangerFeedback feedback_error_text={this.state.feedback_text}/>}
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;