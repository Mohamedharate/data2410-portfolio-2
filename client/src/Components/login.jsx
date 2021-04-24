import React, {Component} from "react";


class Login extends Component {

    render() {
        return (
            <React.Fragment>
                <div className="loginContainer">
                    <div id="login_div" className="row">
                        <div className="col-md-12">
                            <div className="mainLogIn">
                                <div className="form-signin">
                                    <div className="text-center mb-4">
                                        <h4>Sign in to store</h4>
                                    </div>
                                    <div className="form-label-group">
                                        <input type="text" className="form-control mt-2" placeholder="Username"
                                               id="login_username"
                                               name="login_username" required="" autoFocus=""></input>
                                        <input type="Password" className="form-control mt-2" placeholder="Password"
                                               id="login_Password"
                                               name="login_Password" required="" autoFocus=""></input>
                                    </div>
                                    <button className="btn btn-lg btn-primary btn-block mt-2">Sign in
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Login;