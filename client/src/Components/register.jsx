import React, {Component} from "react";
import axios from "axios";


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            zipCode: '',
            streetName: '',
            phone: '',
        }

        this.handleInputChange = this.handleInputChange.bind(this);
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
        alert("Submitted:\n" + this.state.firstname + "\n" + this.state.lastname + "\n" + this.state.email + "\n" +
            this.state.password + "\n" + this.state.zipCode + "\n" + this.state.streetName + "\n" + this.state.phone)
        try {
            await axios({
                method: 'post',
                url: 'http://localhost:3001/signIn',
                data: {
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    email: this.state.email,
                    password: this.state.password,
                    zipCode: this.state.zipCode,
                    streetName: this.state.streetName,
                    phone: this.state.phone,
                }
            });
        } catch (e){
            console.error(e)
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="display-1 registerContainer">
                    <div id="login_div" className="row">
                        <div className="col-md-12">
                            <div className="mainLogIn">
                                <div className="form-signin">
                                    <div className="text-center mb-4">
                                        <h4>Register User</h4>
                                    </div>
                                    <div className="form-label-group">
                                        <input type="text" onChange={this.handleInputChange} className="form-control mt-2" placeholder="Firstname"
                                               id="register_firstname"
                                               name="firstname" required="" autoFocus=""/>
                                        <input type="text" onChange={this.handleInputChange} className="form-control mt-2" placeholder="Lastname"
                                               id="register_lastname"
                                               name="lastname" required="" autoFocus=""/>
                                        <input type="text" onChange={this.handleInputChange} className="form-control mt-2" placeholder="Email"
                                               id="register_email"
                                               name="email" required="" autoFocus=""/>
                                        <input type="Password" onChange={this.handleInputChange} className="form-control mt-2" placeholder="Password"
                                               id="register_password"
                                               name="password" required="" autoFocus=""/>
                                        <input type="text" onChange={this.handleInputChange} className="form-control mt-2" placeholder="Zip Code"
                                               id="register_zipCode"
                                               name="zipCode" required="" autoFocus=""/>
                                        <input type="text" onChange={this.handleInputChange} className="form-control mt-2" placeholder="Street name"
                                               id="register_streetName"
                                               name="streetName" required="" autoFocus=""/>
                                        <input type="text" onChange={this.handleInputChange} className="form-control mt-2" placeholder="Phone"
                                               id="register_phone"
                                               name="phone" required="" autoFocus=""/>
                                    </div>
                                    <button onClick={this.submitLoginDetails.bind(this)} className="btn btn-lg btn-primary btn-block mt-2">Register</button>
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