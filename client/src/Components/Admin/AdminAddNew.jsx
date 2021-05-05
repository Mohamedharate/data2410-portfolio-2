import React, {Component} from "react";
import DangerFeedback from "../dangerFeedback";

class AdminAddNew extends Component {
    state = {
        toggle_error_feedback: false,
    };

    render() {
        return (
            <React.Fragment>
                <form onSubmit={this.handleSubmit} className="form-signin">
                    <div className="row text-center m-5">
                        <div className="col-12">
                            <h3>Add New Product</h3>
                        </div>
                    </div>
                    <div className="row form-label-group m-2">
                        <div className="col-sm-6">
                            <input type="text" onChange={this.handleInputChange}
                                   className="form-control mt-2" placeholder="Firstname"
                                   pattern="^[A-ZÆØÅ]+[a-zæøå ,.'-]{1,20}(\s[A-ZÆØÅ]+[a-zæøå ,.'-]{1,20})?$"
                                   title="First name has to start with an upper case letter and have at least 2 characters."
                                   name="firstName" required autoFocus=""/>
                            <input type="text" onChange={this.handleInputChange}
                                   className="form-control mt-2" placeholder="Lastname"
                                   pattern="^[A-ZÆØÅ]+[a-zæøå ,.'-]{1,20}$"
                                   title="Last name has to start with an upper case letter and have at least 2 characters."
                                   name="lastName" required autoFocus=""/>
                            <input type="email" onChange={this.handleInputChange}
                                   className="form-control mt-2" placeholder="Email"
                                   name="email" required autoFocus=""/>
                            <input type="Password" onChange={this.handleInputChange}
                                   className="form-control mt-2" placeholder="Password"
                                   pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}"
                                   title="Password must contain at least 1 upper and lower case letter, 1 number and be at least 8 characters long."
                                   name="password" required autoFocus=""/>
                            <select name="country" onChange={this.handleInputChange} className="custom-select my-1 mr-sm-2 mt-2" required>
                                <option value="" defaultValue="">Choose...</option>
                                <option value="Norway">Norway</option>
                                <option value="Sweden">Sweden</option>
                                <option value="Denmark">Denmark</option>
                            </select>
                        </div>
                        <div className="col-sm-6">
                            <input type="text" onChange={this.handleInputChange}
                                   className="form-control mt-2" placeholder="City"
                                   pattern="^[A-ZÆØÅ]+[a-zæøåA-ZÆØÅ ,.'-]{1,20}(\s[A-ZÆØÅ]+[a-zæøåA-ZÆØÅ ,.'-]{1,20})?(\s[A-ZÆØÅ]+[a-zæøåA-ZÆØÅ ,.'-]{1,20})?$"
                                   title="City name has to start with an upper case letter and have at least 2 characters."
                                   name="city" required autoFocus=""/>
                            <input type="text" onChange={this.handleInputChange}
                                   className="form-control mt-2" placeholder="Zip Code"
                                   pattern="^\d{4,5}(?:[-\s]\d{4})?$"
                                   name="zipCode" required autoFocus=""/>
                            <input type="text" onChange={this.handleInputChange}
                                   className="form-control mt-2" placeholder="Street name"
                                   pattern="^[A-ZÆØÅ]+[a-zæøåA-ZÆØÅ ,.'-]{1,20}([A-ZÆØÅ]+[a-zæøåA-ZÆØÅ ,.'-]{1,20})?(\s[A-ZÆØÅ]+[a-zæøåA-ZÆØÅ ,.'-]{1,20})?\s\d+\s?[a-zæøåA-ZÆØÅ]?"
                                   title="The address should follow this format:
                                       <Address> <Number><Letter(optional)>."
                                   name="street" required autoFocus=""/>
                            <input type="text" onChange={this.handleInputChange}
                                   className="form-control mt-2" placeholder="Phone"
                                   pattern="^(\+|00)?[1-9][0-9 \-\(\)\.]{7,}$"
                                   title="The address should follow this format:
                                       <Country code(optional)> <Number(At least 7 digits>."
                                   name="phoneNumber" required autoFocus=""/>
                        </div>
                    </div>
                    <div className="row m-2">
                        <div className="col-md-3">
                            <button type="submit" className="btn btn-lg btn-primary btn-block mt-2">
                                Add Product
                            </button>
                        </div>
                    </div>
                    {this.state.toggle_error_feedback &&
                    <DangerFeedback feedback_error_text={this.state.feedback_text}/>}
                </form>
            </React.Fragment>
        );
    }
}

export default AdminAddNew;