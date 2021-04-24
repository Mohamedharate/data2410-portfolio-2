import React, { Component } from "react";


class Register extends Component{
    constructor(props) {
        super(props);
        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();
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
                                        <input type="text" className="form-control mt-2" placeholder="Firstname"
                                               id="register_firstname"
                                               name="register_firstname" required="" autoFocus=""/>
                                        <input type="text" className="form-control mt-2" placeholder="Lastname"
                                               id="register_lastname"
                                               name="register_lastname" required="" autoFocus=""/>
                                        <input type="text" className="form-control mt-2" placeholder="Email"
                                               id="register_email"
                                               name="register_email" required="" autoFocus=""/>
                                        <input type="Password" className="form-control mt-2" placeholder="Password"
                                               id="register_password"
                                               name="register_password" required="" autoFocus=""/>
                                        <input type="text" className="form-control mt-2" placeholder="Zip Code"
                                               id="register_zipCode"
                                               name="register_zipCode" required="" autoFocus=""/>
                                        <input type="text" className="form-control mt-2" placeholder="Street name"
                                               id="register_streetName"
                                               name="register_streetName" required="" autoFocus=""/>
                                        <input type="text" className="form-control mt-2" placeholder="Phone"
                                               id="register_phone"
                                               name="register_phone" required="" autoFocus=""/>
                                    </div>
                                    <button className="btn btn-lg btn-primary btn-block mt-2">Register</button>
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