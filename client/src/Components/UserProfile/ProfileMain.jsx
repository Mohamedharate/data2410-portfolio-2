import React, {Component} from "react";
import ProfilePage from "./ProfilePage";
import OrderPage from "./OrderPage";
import SuccessFeedback from "../Feedback/SuccessFeedback";
import DangerFeedback from "../Feedback/DangerFeedback";
import CloseIcon from '@material-ui/icons/Close';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LoadingSpinnerSmallLight from "../Spinners/LoadingSpinnerSmallLight";


class ProfileMain extends Component {

    state = {
        logout_loading: false,
        toggle_error_feedback: false,
        toggle_success_feedback: false,
        feedback_text: '',
    }

    handleLogout = async () => {
        this.setState({logout_loading: true})
        await this.props.handleLogout()
            .then(() => {
                this.setState({logout_loading: false})
            }).catch(() => {
                this.setState({logout_loading: false})
            })
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
                        className="col-md-8 col-lg-5 mh-75 bg-light mt-5 m-2 p-1 pb-3 border border-secondary shadow-lg rounded-left">
                        <div className="row">
                            <div className="col-12">
                                <button onClick={this.props.close} className="btn btn-light float-right">
                                    <CloseIcon/>
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
                                        <div className="col-7 text-left mt-3">
                                            <h4>{this.props.current_user.firstName} {this.props.current_user.lastName}</h4>
                                        </div>
                                        <div className="col-5">
                                            <button onClick={this.handleLogout}
                                                    className="btn btn-danger mt-2 float-right" disabled={this.state.logout_loading}>
                                                Logout {this.state.logout_loading ? <LoadingSpinnerSmallLight/> :
                                                <ExitToAppIcon/>}
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
                                                feedback={this.handleFeedbackCallback}
                                                orders={this.props.current_user.orders}
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