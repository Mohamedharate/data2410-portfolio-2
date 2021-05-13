import React, {Component} from "react";
import ProfilePage from "./ProfilePage";
import OrderPage from "./OrderPage";
import SuccessFeedback from "../Feedback/SuccessFeedback";
import DangerFeedback from "../Feedback/DangerFeedback";


class ProfileMain extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        toggle_error_feedback: false,
        toggle_success_feedback: false,
        feedback_text: '',
    }

    handleLogout = () => {
        this.props.handleLogout()
    }

    handleFeedbackCallback = (success, text) => {
        if (success) {
            this.setState({
                toggle_error_feedback: false,
                toggle_success_feedback: true,
                feedback_text: text
            })
        } else {
            this.setState({
                toggle_error_feedback: true,
                toggle_success_feedback: false,
                feedback_text: text
            })
        }
    }

    render() {
        return (
                <div className="backgroundContainer position-fixed">
                    <div className="row text-center justify-content-end">
                        <div
                            className="col-md-8 col-lg-5 mh-75 bg-light mt-5 mr-4 p-1 pb-3 border border-secondary shadow-lg rounded-bottom">
                            <div className="row">
                                <div className="col-12">
                                    <button onClick={this.props.close}
                                            className="btn btn-light material-icons float-right">
                                        close
                                    </button>
                                </div>
                            </div>
                            <div className="container">
                                <div className="row">
                                    <div className="col-12">
                                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                                            <li className="nav-item">
                                                <a className="nav-link active" id="home-tab" data-toggle="tab"
                                                   href="#home"
                                                   role="tab" aria-controls="home" aria-selected="true">Profile</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" id="profile-tab" data-toggle="tab"
                                                   href="#profile"
                                                   role="tab" aria-controls="profile" aria-selected="false">Orders</a>
                                            </li>
                                        </ul>
                                        <div className="row">
                                            <div className="col-8 text-left mt-3">
                                                <h4>{this.props.current_user.firstName} {this.props.current_user.lastName}</h4>
                                            </div>
                                            <div className="col-4">
                                                <button onClick={this.handleLogout} className="btn btn-danger mt-2 float-right">
                                                    <div className="row">
                                                        <div className="col-7 align-self-center">
                                                            Logout
                                                        </div>
                                                        <div className="col-4 align-self-center">
                                                            <span className="material-icons mt-2">exit_to_app</span>
                                                        </div>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="tab-content" id="myTabContent">
                                            <div className="tab-pane fade show active" id="home" role="tabpanel"
                                                 aria-labelledby="home-tab">
                                                <ProfilePage
                                                    feedback={this.handleFeedbackCallback}
                                                    current_user={this.props.current_user}
                                                />
                                            </div>
                                            <div className="tab-pane fade" id="profile" role="tabpanel"
                                                 aria-labelledby="profile-tab">
                                                <OrderPage

                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-9">
                                        {this.state.toggle_success_feedback &&
                                        <SuccessFeedback feedback_success_text={this.state.feedback_text}/>}
                                        {this.state.toggle_error_feedback &&
                                        <DangerFeedback feedback_error_text={this.state.feedback_text}/>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default ProfileMain;