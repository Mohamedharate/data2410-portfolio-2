import React, {Component} from "react";
import axios from "axios";
import DangerFeedback from "../Feedback/DangerFeedback";
import LoadingSpinnerPrimaryLongBtn from "../Spinners/LoadingSpinnerPrimaryLongBtn";
import CloseIcon from '@material-ui/icons/Close';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

class SignIn extends Component {
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
            url: 'https://localhost:3001/api/signIn',
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
    }

    render() {
        return (
            <div className="backgroundContainer position-fixed mt-5">
                <div className="row text-center justify-content-center mt-3">
                    <div
                        className="col-md-6 col-lg-3 mh-75 bg-light mt-5 p-4 border border-secondary shadow-lg rounded">
                        <div className="row">
                            <div className="col-3"/>
                            <div className="col-6">
                                <h4>Sign in!</h4>
                            </div>
                            <div className="col-3">
                                <button onClick={this.props.close} className="btn btn-light float-right">
                                    <CloseIcon/>
                                </button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <a href="https://localhost:3001/auth/google" className="google-btn">
                                    <div className="google-icon-wrapper">
                                        <img className="google-icon"
                                             src="/btn_google_light_normal_ios.svg"/>
                                    </div>
                                    <p className="btn-text"><b>Sign in with google</b></p>
                                </a>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
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
                                                    <AlternateEmailIcon/>
                                                </div>
                                            </div>
                                            <input type="email" onChange={this.handleInputChange}
                                                   className="form-control mt-2"
                                                   placeholder="Email" name="email" required="*" autoFocus=""
                                                   aria-describedby="basic-addon1"/>
                                        </div>
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text mt-2" id="basic-addon1">
                                                    <VpnKeyIcon/>
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
                                    {this.state.toggle_loading ? <LoadingSpinnerPrimaryLongBtn/> :
                                        <button type="submit" className="btn btn-primary btn-block">
                                            Sign in!
                                        </button>}
                                    {this.state.toggle_error_feedback &&
                                    <DangerFeedback feedback_error_text={this.state.feedback_text}/>}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default SignIn;