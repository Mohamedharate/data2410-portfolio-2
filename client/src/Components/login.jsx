import React, {Component} from "react";
import axios from "axios";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }

    async postLoginDetails() {
        let res;
        alert("This was submittet: " + this.state.email + " " + this.state.password)
        try {
             res = await axios({
                method: 'post',
                url: 'http://localhost:3001/signIn',
                data: {
                    email: this.state.email,
                    password: this.state.password,
                }
            });
        } catch (e){
            console.error(e)
        }
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
                                    <input type="text" onChange={this.handleInputChange} className="form-control mt-2"
                                           placeholder="Email" name="email" required="" autoFocus=""/>
                                    <input type="Password" onChange={this.handleInputChange} className="form-control mt-2"
                                           placeholder="Password" name="password" required="" autoFocus=""/>
                                </div>
                                <button onClick={this.postLoginDetails.bind(this)} className="btn btn-lg btn-primary btn-block mt-2">Sign in
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