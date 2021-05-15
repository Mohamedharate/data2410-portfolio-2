import React, {Component} from "react";
import axios from "axios";
import bootbox from "bootbox"
import FormData from "form-data";
import DangerFeedback from "../Feedback/DangerFeedback";
import SuccessFeedback from "../Feedback/SuccessFeedback";
import LoadingSpinnerPrimaryLongBtn from "../Spinners/LoadingSpinnerPrimaryLongBtn";

class AdminEditEmployee extends Component {
    constructor(props) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this)
    }

    state = {
        employees: [],
        employee_id: '',
        password: String,

        old_firstName: String,
        old_lastName: String,
        old_email: String,
        old_phoneNumber: String,
        old_position: String,

        new_firstName: String,
        new_lastName: String,
        new_email: String,
        new_phoneNumber: String,
        new_position: String,

        toggle_submit_loading: false,
        toggle_get_employee_loading: false,
        feedback_text: String,
        toggle_error_feedback: false,
        toggle_success_feedback: false,
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            ['new_' + name]: value
        })
    };

    handleEditBtn = employee => {
        this.setState({
            employee_id: employee.employeeId,

            old_firstName: employee.firstName,
            old_lastName: employee.lastName,
            old_email: employee.email,
            old_phoneNumber: employee.phoneNumber,
            old_position: employee.position,

            new_firstName: employee.firstName,
            new_lastName: employee.lastName,
            new_email: employee.email,
            new_phoneNumber: employee.phoneNumber,
            new_position: employee.position,
        })

    }
    handleDeleteBtn = async employee => {
        // Confirm delete
        bootbox.confirm({
            message: "Delete " + employee.firstName + " " + employee.lastName + " from products?",
            buttons: {
                'cancel': {
                    label: 'Cancel',
                    className: 'btn-default pull-left'
                },
                'confirm': {
                    label: 'Delete',
                    className: 'btn-danger pull-right'
                }
            },
            callback: async result => {
                if (result) {
                    console.log("Delete", employee.firstName)
                    await axios.delete(`https://localhost:3001/api/admin/delete/one/${employee.employeeId}`) // TODO venter på route i server
                        .then(() => {
                            this.handleGetEmployees()
                        }).catch(err => {
                            console.log(err)
                        })
                }
            }
        });
    }
    handleSubmit = async event => {
        event.preventDefault();
        this.setState({toggle_submit_loading: true});

        const employeeId = this.state.employee_id

        let formdata = new FormData();

        // Checks which variables has changed and add changed variables to the form-data.
        if (this.state.old_firstName !== this.state.new_firstName) {
            formdata.append('firstName', this.state.new_firstName);
        }
        if (this.state.old_lastName !== this.state.new_lastName) {
            formdata.append('lastName', this.state.new_lastName);
        }
        if (this.state.old_email !== this.state.new_email) {
            formdata.append('email', this.state.new_email);
        }
        if (this.state.old_phoneNumber !== this.state.new_phoneNumber) {
            formdata.append('phoneNumber', this.state.new_phoneNumber);
        }
        if (this.state.old_position !== this.state.new_position) {
            formdata.append('position', this.state.new_position);
        }

        await axios({
            method: 'put',
            url: `https://localhost:3001/api/admin/update/${employeeId}`, //TODO venter på route i server
            data: formdata,
        }).then(res => {
            this.setState({
                toggle_success_feedback: true,
                toggle_error_feedback: false,
                feedback_text: res.data.Message,
            });
        }).catch(err => {
            this.setState({
                toggle_success_feedback: false,
                toggle_error_feedback: true,
                feedback_text: err.response.data.Error,
            });
        });
        this.setState({toggle_submit_loading: false});
    };

    handleGetEmployees = async () => {
        this.setState({toggle_get_employee_loading: true});
        await axios.get('https://localhost:3001/api/admin/get/all') //TODO venter på route i server
            .then(res => {
                const employees = res.data.Message;
                this.setState({employees})
            }).catch(err => {
                this.setState({
                    toggle_success_feedback: false,
                    toggle_error_feedback: true,
                    feedback_text: err.data.Error,
                });
            });
        this.setState({toggle_get_employee_loading: false});
    };

    render() {
        return (
            <div className="fillPage">
                <div className="row text-center m-5">
                    <div className="col-md-4"/>
                    <div className="col-md-4">
                        <h3>Edit Employees</h3>
                    </div>
                    <div className="col-md-4">
                        {this.state.toggle_get_employee_loading ? <LoadingSpinnerPrimaryLongBtn/> :
                            <button onClick={this.handleGetEmployees} className="btn btn-primary btn-block">
                                Get employees
                            </button>}
                    </div>
                </div>
                <div className="row text-center mt-5">
                    <div className="col-sm-4 float-left one">
                        {this.state.employees.map((employee, index) => (
                            <div className="input-group mt-2 ml-2" key={index}>
                                <input type="text"
                                       value={employee.position + "\n" + employee.firstName + " " + employee.lastName}
                                       disabled/>
                                <div className="input-group-append">
                                    <button onClick={() => this.handleEditBtn(employee)}
                                            className="btn btn-outline-secondary">Edit
                                    </button>
                                    <button onClick={() => this.handleDeleteBtn(employee)} className="btn btn-danger">
                                        <span className="material-icons mt-2">delete_forever</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-sm-8 text-left position-fixed offset-sm-3 mr-2 two">
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
                                           value={this.state.new_firstName}
                                           pattern="^[A-ZÆØÅ]+[a-zæøå ,.'-]{1,20}(\s[A-ZÆØÅ]+[a-zæøå ,.'-]{1,20})?$"
                                           title="First name has to start with an upper case letter and have at least 2 characters."
                                           name="firstName" required autoFocus=""/>
                                    <label className=" mt-2" htmlFor="lastName">Last name:</label>
                                    <input type="text" onChange={this.handleInputChange}
                                           className="form-control" placeholder="Lastname"
                                           value={this.state.new_lastName}
                                           pattern="^[A-ZÆØÅ]+[a-zæøå ,.'-]{1,20}$"
                                           title="Last name has to start with an upper case letter and have at least 2 characters."
                                           name="lastName" required autoFocus=""/>
                                    <label className=" mt-2" htmlFor="email">Email:</label>
                                    <input type="email" onChange={this.handleInputChange}
                                           className="form-control" placeholder="Email"
                                           value={this.state.new_email}
                                           name="email" required autoFocus=""/>
                                    <label className=" mt-2" htmlFor="phoneNumber">Phone number:</label>
                                    <input type="text" onChange={this.handleInputChange}
                                           className="form-control" placeholder="Phone"
                                           value={this.state.new_phoneNumber}
                                           pattern="^(\+|00)?[1-9][0-9 \-\(\)\.]{7,}$"
                                           title="The address should follow this format:
                                       <Country code(optional)> <Number(At least 7 digits>."
                                           name="phoneNumber" required autoFocus=""/>
                                    <label className=" mt-2" htmlFor="position">Title:</label>
                                    <select name="position" onChange={this.handleInputChange}
                                            value={this.state.new_position}
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
                                    {this.state.toggle_submit_loading ? <LoadingSpinnerPrimaryLongBtn/> :
                                        <button type="submit" className="btn btn-primary btn-block mt-2">
                                            Update Employee
                                        </button>}
                                </div>
                            </div>
                            {this.state.toggle_error_feedback &&
                            <DangerFeedback feedback_error_text={this.state.feedback_text}/>}
                            {this.state.toggle_success_feedback &&
                            <SuccessFeedback feedback_success_text={this.state.feedback_text}/>}
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminEditEmployee;