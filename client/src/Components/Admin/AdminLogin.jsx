import React, {Component} from "react";
import Footer from "../footer";
import DangerFeedback from "../Feedback/DangerFeedback";
import axios from "axios";
import LoadingSpinnerPrimaryLongBtn from "../Spinners/LoadingSpinnerPrimaryLongBtn";

class AdminLogin extends Component {
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
            url: 'http://localhost:3001/api/signin-admin',
            data: {
                email: this.state.email,
                password: this.state.password,
            }
        }).then(response => {
            this.props.loginCallback(response.data);
            this.setState({toggle_error_feedback: false});
        }).catch(error => {
            this.setState({
                feedback_text: error.response.data.Error,
                toggle_error_feedback: true,
                toggle_loading: false,
            });
        });
    };

    render() {
        return (
            <React.Fragment>
                <div className="fillPage">
                    <div className="adminLoginContainer">
                        <div className="row mt-5">
                            <div className="col-md-12 text-center">
                                <h3>Administrator Page</h3>
                                <h5 className="text-danger">Authorized personnel only!</h5>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-md-12">
                                <form onSubmit={this.handleSubmit} className="form-signin">
                                    <div className="form-label-group mb-2">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text mt-2" id="basic-addon1">
                                                    <i className="material-icons">mail</i>
                                                </div>
                                            </div>
                                            <input type="email" onChange={this.handleInputChange}
                                                   className="form-control mt-2"
                                                   placeholder="Email" name="email" required="*" autoFocus=""
                                                   aria-describedby="basic-addon1"/>
                                        </div>
                                        <div className="input-group">
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
                                    {this.state.toggle_loading ? <LoadingSpinnerPrimaryLongBtn/> :
                                        <button type="submit" className="btn btn-primary btn-block">
                                            Sign in!
                                        </button>}
                                </form>
                                {this.state.toggle_error_feedback &&
                                <DangerFeedback feedback_error_text={this.state.feedback_text}/>}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer toggle_admin={this.props.toggle_admin}/>
            </React.Fragment>
        );
    }
}

export default AdminLogin;