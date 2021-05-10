import React, {Component} from "react";
import axios from "axios";
import DangerFeedback from "./dangerFeedback";
import LoadingSpinnerBtn from "./LoadingSpinnerBtn";

class Login extends Component {
    constructor(props) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    state = {
        email: '',
        password: '',
        toggle_loading: false,
        toggle_error_feedback: false,
        feedback_text: '',
    };

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        this.setState({toggle_loading: true});
        await axios({
            method: 'post',
            url: 'http://localhost:3001/api/signIn',
            data: {
                email: this.state.email,
                password: this.state.password,
            }
        }).then(response => {
            this.props.loginCallback(response.data);
            this.setState({toggle_error_feedback: false});
        }).catch(error => {
            this.setState({toggle_loading: false});
            if (error.response) {
                console.log(error.response.data.Error);
                console.log(error.response.status);
                this.setState({feedback_text: error.response.data.Error});
                this.setState({toggle_error_feedback: true});
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
        });
    };

    handleGoogleBtn = async () => {
        console.log("click");
        await axios.get('http://localhost:3001/auth/google').then(() => {console.log("Done")})
    };

    render() {
        return (
            <div className="loginContainer">
                <div id="login_div" className="row">
                    <div className="col-12">
                        <div className="text-center mb-4">
                            <h4>Sign in to store</h4>
                        </div>
                    </div>
                </div>
                <div className="row text-center">
                    <div className="col-12">
                        <div onClick={this.handleGoogleBtn} className="google-btn">
                            <div className="google-icon-wrapper">
                                <img className="google-icon"
                                     src="/btn_google_light_normal_ios.svg"/>
                            </div>
                            <p className="btn-text"><b>Sign in with google</b></p>
                        </div>
                        <div className="separator">
                            <div className="line"/>
                            <h5>or</h5>
                            <div className="line"/>
                        </div>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-md-12">
                        <form onSubmit={this.handleSubmit} className="form-signin">
                            <div className="form-label-group">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text mt-2" id="basic-addon1">
                                            <i className="material-icons">mail</i>
                                        </div>
                                    </div>
                                    <input type="email" onChange={this.handleInputChange} className="form-control mt-2"
                                           placeholder="Email" name="email" required="*" autoFocus=""
                                           aria-describedby="basic-addon1"/>
                                </div>
                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text mt-2" id="basic-addon1">
                                            <i className="material-icons">vpn_key</i>
                                        </div>
                                    </div>
                                    <input type="Password" onChange={this.handleInputChange}
                                           className="form-control mt-2"
                                           pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}"
                                           title="Password must contain at least 1 upper and lower case letter, 1 number and
                                        be at least 8 characters long."
                                           placeholder="Password" name="password" required="*" autoFocus=""/>
                                </div>
                            </div>
                            {this.state.toggle_loading ? <LoadingSpinnerBtn/> :
                                <button type="submit" className="btn btn-primary btn-block">
                                    Sign in!
                                </button>}
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