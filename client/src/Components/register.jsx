import React, {Component} from "react";
import axios from "axios";
import DangerFeedback from "./dangerFeedback";


class Register extends Component {
    constructor(props) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        country: '',
        city: '',
        zipCode: '',
        street: '',
        phoneNumber: '',
        toggle_error_feedback: false,
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

    handleSubmit = (event) => {
        event.preventDefault();
        this.submitUserDetails()
            .then(response => {
            }).catch(error => {
        })
    }

    async submitUserDetails() {
        const that = this;

        await axios({
            method: 'post',
            url: 'http://localhost:3001/api/register',
            data: {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
                country: this.state.country,
                city: this.state.city,
                zipCode: this.state.zipCode,
                street: this.state.street,
                phoneNumber: this.state.phoneNumber,
            }
        }).then(function (response) {
            console.log("Data:", response.data.Message);
            console.log("Status:", response.status);
            that.setState({toggle_error_feedback: false})
            that.setState({feedback_text: response.data.Message})
            that.props.registerCallback()
        }).catch(function (error) {
            if (error.response) {
                console.log(error.response.data.Error);
                console.log(error.response.status);
                that.setState({toggle_error_feedback: true})
                that.setState({feedback_text: error.response.data.Error})
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
        });

    }

    render() {
        return (
            <div className="registerContainer">
                <div id="login_div" className="row">
                    <div className="col-md-12">
                        <form onSubmit={this.handleSubmit} className="form-signin">
                            <div className="text-center mb-4">
                                <h4>Register User</h4>
                            </div>
                            <div className="form-label-group">
                                <input type="text" onChange={this.handleInputChange}
                                       className="form-control mt-2" placeholder="Firstname"
                                       pattern="^[A-ZÆØÅ]+[a-zæøå ,.'-]{1,20}(\s[A-ZÆØÅ]+[a-zæøå ,.'-]{1,20})?$"
                                       title="First name has to start with an upper case letter and have at least 2 characters."
                                       name="firstName" required autoFocus=""/>
                                <input type="text" onChange={this.handleInputChange}
                                       className="form-control mt-2" placeholder="Lastname"
                                       pattern="^[A-ZÆØÅ]+[a-zæøå ,.'-]{1,20}$"
                                       title="Last name has to start with an upper case letter and have at least 2 characters."
                                       name="lastName" required autoFocus=""/>
                                <input type="email" onChange={this.handleInputChange}
                                       className="form-control mt-2" placeholder="Email"
                                       name="email" required autoFocus=""/>
                                <input type="Password" onChange={this.handleInputChange}
                                       className="form-control mt-2" placeholder="Password"
                                       pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}"
                                       title="Password must contain at least 1 upper and lower case letter, 1 number and be at least 8 characters long."
                                       name="password" required autoFocus=""/>
                                <select name="country" onChange={this.handleInputChange} className="custom-select my-1 mr-sm-2 mt-2" required>
                                    <option value="" defaultValue="">Choose...</option>
                                    <option value="Norway">Norway</option>
                                    <option value="Sweden">Sweden</option>
                                    <option value="Denmark">Denmark</option>
                                </select>
                                <input type="text" onChange={this.handleInputChange}
                                       className="form-control mt-2" placeholder="City"
                                       pattern="^[A-ZÆØÅ]+[a-zæøåA-ZÆØÅ ,.'-]{1,20}(\s[A-ZÆØÅ]+[a-zæøåA-ZÆØÅ ,.'-]{1,20})?(\s[A-ZÆØÅ]+[a-zæøåA-ZÆØÅ ,.'-]{1,20})?$"
                                       title="City name has to start with an upper case letter and have at least 2 characters."
                                       name="city" required autoFocus=""/>
                                <input type="text" onChange={this.handleInputChange}
                                       className="form-control mt-2" placeholder="Zip Code"
                                       pattern="^\d{4,5}(?:[-\s]\d{4})?$"
                                       name="zipCode" required autoFocus=""/>
                                <input type="text" onChange={this.handleInputChange}
                                       className="form-control mt-2" placeholder="Street name"
                                       pattern="^[A-ZÆØÅ]+[a-zæøåA-ZÆØÅ ,.'-]{1,20}([A-ZÆØÅ]+[a-zæøåA-ZÆØÅ ,.'-]{1,20})?(\s[A-ZÆØÅ]+[a-zæøåA-ZÆØÅ ,.'-]{1,20})?\s\d+\s?[a-zæøåA-ZÆØÅ]?"
                                       title="The address should follow this format:
                                       <Address> <Number><Letter(optional)>."
                                       name="street" required autoFocus=""/>
                                <input type="text" onChange={this.handleInputChange}
                                       className="form-control mt-2" placeholder="Phone"
                                       pattern="^(\+|00)?[1-9][0-9 \-\(\)\.]{7,}$"
                                       title="The address should follow this format:
                                       <Country code(optional)> <Number(At least 7 digits>."
                                       name="phoneNumber" required autoFocus=""/>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-lg btn-primary btn-block mt-2">Sign Up!
                            </button>
                            {this.state.toggle_error_feedback &&
                            <DangerFeedback feedback_error_text={this.state.feedback_text}/>}
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;