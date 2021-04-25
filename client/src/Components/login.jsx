import React, {Component} from "react";
import axios from "axios";

class Login extends Component {
    constructor(props) {
        super(props);
        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();
    }

    async postLoginDetails() {
        let res;
        try {
            res = await axios({
                method: 'post',
                url: 'http://localhost:3001/signIn',
                data: {
                    email: this.emailRef.current,
                    lastName: this.passwordRef.current,
                }
            });
        } catch (e) {
            console.error(e)
        }
        console.log("Emailref: " + this.emailRef.current)
        console.log("Passwordref: " + this.passwordRef.current)
        console.log("Res: " + res)
        console.log("Res.data: " + res)
    }

    render() {
        return (
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
                                           ref={this.emailRef}
                                           name="login_username" required="" autoFocus=""/>
                                    <input type="Password" className="form-control mt-2" placeholder="Password"
                                           ref={this.passwordRef}
                                           name="login_Password" required="" autoFocus=""/>
                                </div>
                                <button onClick={this.postLoginDetails()}
                                        className="btn btn-lg btn-primary btn-block mt-2">Sign in
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;