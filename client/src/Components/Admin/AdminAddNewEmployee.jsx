import React, {Component} from "react";
import DangerFeedback from "../dangerFeedback";
import axios from "axios";
import SuccessFeedback from "../successFeedback";
import LoadingSpinnerPrimaryLongBtn from "../Spinners/LoadingSpinnerPrimaryLongBtn";


class AdminAddNewEmployee extends Component {
    constructor(props) {
        super(props)

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    state = {
        firstName: String,
        lastName: String,
        email: String,
        password: String,
        phoneNumber: String,
        position: String,

        toggle_loading: false,
        feedback_text: String,
        toggle_error_feedback: false,
        toggle_success_feedback: false,
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    };

    handleSubmit = async event => {
        event.preventDefault();
        this.setState({toggle_loading: true});

        await axios({
            method: 'post',
            url: 'http://localhost:3001/api/admin/register',
            data: {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
                phoneNumber: this.state.phoneNumber,
                position: this.state.position,
            }
        }).then(res => {
            console.log(res)
            this.setState({
                toggle_success_feedback: true,
                toggle_error_feedback: false,
                feedback_text: res.status,
            })
        }).catch(err => {
            this.setState({
                toggle_success_feedback: false,
                toggle_error_feedback: true,
                feedback_text: err.response.data.Error,
            })
        })
        this.setState({toggle_loading: false});
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="form-signin">
                <div className="row text-center m-5">
                    <div className="col-12">
                        <h3>Register New Employee</h3>
                    </div>
                </div>
                <div className="row form-label-group justify-content-center m-2">
                    <div className="col-sm-6">
                        <label className=" mt-2" htmlFor="firstName">First name:</label>
                        <input type="text" onChange={this.handleInputChange}
                               className="form-control" placeholder="Firstname"
                               pattern="^[A-ZÆØÅ]+[a-zæøå ,.'-]{1,20}(\s[A-ZÆØÅ]+[a-zæøå ,.'-]{1,20})?$"
                               title="First name has to start with an upper case letter and have at least 2 characters."
                               name="firstName" required autoFocus=""/>
                        <label className=" mt-2" htmlFor="lastName">Last name:</label>
                        <input type="text" onChange={this.handleInputChange}
                               className="form-control" placeholder="Lastname"
                               pattern="^[A-ZÆØÅ]+[a-zæøå ,.'-]{1,20}$"
                               title="Last name has to start with an upper case letter and have at least 2 characters."
                               name="lastName" required autoFocus=""/>
                        <label className=" mt-2" htmlFor="email">Email:</label>
                        <input type="email" onChange={this.handleInputChange}
                               className="form-control" placeholder="Email"
                               name="email" required autoFocus=""/>
                        <label className=" mt-2" htmlFor="password">Password</label>
                        <input type="Password" onChange={this.handleInputChange}
                               className="form-control" placeholder="Password"
                               pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}"
                               title="Password must contain at least 1 upper and lower case letter, 1 number and be at least 8 characters long."
                               name="password" required autoFocus=""/>
                        <label className=" mt-2" htmlFor="phoneNumber">Phone number:</label>
                        <input type="text" onChange={this.handleInputChange}
                               className="form-control" placeholder="Phone"
                               pattern="^(\+|00)?[1-9][0-9 \-\(\)\.]{7,}$"
                               title="The address should follow this format:
                                       <Country code(optional)> <Number(At least 7 digits>."
                               name="phoneNumber" required autoFocus=""/>
                        <label className=" mt-2" htmlFor="position">Title:</label>
                        <select name="position" onChange={this.handleInputChange}
                                className="custom-select my-1 mr-sm-2" required>
                            <option value="" defaultValue="">Choose...</option>
                            <option value="CO-worker">CO-worker</option>
                            <option value="Marketing Coordinator">Marketing Coordinator</option>
                            <option value="Web Designer">Web Designer</option>
                            <option value="Project Manager">Project Manager</option>
                            <option value="Executive Sales Manager">Executive Sales Manager</option>
                            <option value="President">President</option>
                        </select>
                    </div>
                </div>
                <div className="row justify-content-center m-2">
                    <div className="col-md-3">
                        {this.state.toggle_loading ? <LoadingSpinnerPrimaryLongBtn/> :
                            <button type="submit" className="btn btn-primary btn-block mt-2">
                                Register Employee
                            </button>}
                    </div>
                </div>
                {this.state.toggle_error_feedback &&
                <DangerFeedback feedback_error_text={this.state.feedback_text}/>}
                {this.state.toggle_success_feedback &&
                <SuccessFeedback feedback_success_text={this.state.feedback_text}/>}
            </form>
        );
    }
}

export default AdminAddNewEmployee;