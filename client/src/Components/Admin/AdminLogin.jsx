import React, {Component} from "react";
import Footer from "../footer";
import DangerFeedback from "../dangerFeedback";

class AdminLogin extends Component {
    state = {
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
                                    <button type="submit"
                                            className="btn btn-lg btn-primary btn-block mt-2">Sign in!
                                    </button>

                                </form>
                                    {this.state.toggle_error_feedback &&
                                    <DangerFeedback feedback_error_text={this.state.feedback_text}/>}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer toggle_admin = {this.props.toggle_admin}/>
            </React.Fragment>
        );
    }
}

export default AdminLogin;