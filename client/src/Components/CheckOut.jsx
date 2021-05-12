import React, {Component} from "react";
import axios from "axios";
import DangerFeedback from "./Feedback/DangerFeedback";
import LoadingSpinnerPrimaryLongBtn from "./Spinners/LoadingSpinnerPrimaryLongBtn";
import SuccessFeedback from "./Feedback/SuccessFeedback";

class CheckOut extends Component {
    constructor(props) {
        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    state = {
        firstName: this.props.current_user.firstName ? this.props.current_user.firstName : '',
        lastName: this.props.current_user.lastName ? this.props.current_user.lastName : '',
        email: this.props.current_user.email ? this.props.current_user.email : '',
        country: this.props.current_user.country ? this.props.current_user.country : '',
        city: this.props.current_user.city ? this.props.current_user.city : '',
        zipCode: this.props.current_user.zipCode ? this.props.current_user.zipCode : '',
        street: this.props.current_user.street ? this.props.current_user.street : '',
        shipping_country: '',
        shipping_city: '',
        shipping_zipCode: '',
        shipping_street: '',
        phoneNumber: '',
        separate_shipping: false,
        save_address: false,
        toggle_loading: false,
        toggle_error_feedback: false,
        toggle_success_feedback: false,
        feedback_text: '',
    }


    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = async event => {
        event.preventDefault()
        let country = '';
        let city = '';
        let zipCode = '';
        let street = '';

        if (this.state.separate_shipping) {
            country = this.state.shipping_country;
            city = this.state.shipping_city;
            zipCode = this.state.shipping_zipCode;
            street = this.state.shipping_street;
        } else {
            country = this.state.country;
            city = this.state.city;
            zipCode = this.state.zipCode;
            street = this.state.street;
        }
        this.setState({toggle_loading: true})
        await axios({
            method: 'post',
            url: 'http://localhost:3001/api/orders/newOrder',
            data: {
                save_address: this.state.save_address,
                separate_shipping: this.state.separate_shipping,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                phoneNumber: this.state.phoneNumber,
                country: this.state.country,
                zipCode: this.state.zipCode,
                city: this.state.city,
                street: this.state.street,
                shippingCountry: country,
                shippingZipCode: zipCode,
                shippingCity: city,
                shippingStreet: street,
            }
        }).then(res => {
            this.setState({
                toggle_error_feedback: false,
                toggle_success_feedback: true,
                feedback_text: res.data.Message,
                toggle_loading: false,
            });
            this.props.order_complete(this.props.current_user)
        }).catch(err => {
            this.setState({
                toggle_error_feedback: true,
                toggle_success_feedback: false,
                feedback_text: err.data.Message,
                toggle_loading: false,
            });
        });
        if(this.state.save_address){
            this.setState({toggle_loading: true})
            await axios({
                method: 'put',
                url: `http://localhost:3001/api/users/update/${this.props.current_user.email}`,
                data: {
                    country: this.state.country,
                    city: this.state.city,
                    zipCode: this.state.zipCode,
                    street: this.state.street,
                }
            }).then(res => {
                this.setState({
                    toggle_error_feedback: false,
                    toggle_success_feedback: true,
                    feedback_text: res.data.Message,
                    toggle_loading: false,
                });
            }).catch(err => {
                this.setState({
                    toggle_error_feedback: true,
                    toggle_success_feedback: false,
                    feedback_text: err.data.Error,
                    toggle_loading: false,
                });
            });
        }
    }

    render() {
        return (
            <div className="backgroundContainer position-absolute mt-5">
                <div className="row text-center justify-content-center mt-3">
                    <div className="col-md-10 col-lg-8 mh-75 bg-light mt-5 p-2 border border-secondary shadow-lg rounded">
                        <div className="w-100">
                            <h4>Check Out<button onClick={this.props.close} className="btn btn-light material-icons float-right">close</button></h4>
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8">
                                    <form onSubmit={this.handleSubmit} className="container">
                                        <div className="row text-left">
                                            <div className="col-md-6">
                                                <div className="form-label-group">
                                                    <input type="text" onChange={this.handleInputChange}
                                                           className="form-control mt-2" placeholder="Firstname"
                                                           pattern="^[A-ZÆØÅ]+[a-zæøå ,.'-]{1,20}(\s[A-ZÆØÅ]+[a-zæøå ,.'-]{1,20})?$"
                                                           title="First name has to start with an upper case letter and have at least 2 characters."
                                                           defaultValue={this.props.current_user.firstName ? this.props.current_user.firstName : ''}
                                                           name="firstName" required autoFocus=""/>
                                                    <input type="text" onChange={this.handleInputChange}
                                                           className="form-control mt-2" placeholder="Lastname"
                                                           pattern="^[A-ZÆØÅ]+[a-zæøå ,.'-]{1,20}$"
                                                           title="Last name has to start with an upper case letter and have at least 2 characters."
                                                           defaultValue={this.props.current_user.lastName ? this.props.current_user.lastName : ''}
                                                           name="lastName" required autoFocus=""/>

                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <input type="email" onChange={this.handleInputChange}
                                                       className="form-control mt-2" placeholder="Email"
                                                       defaultValue={this.props.current_user.email ? this.props.current_user.email : ''}
                                                       name="email" required autoFocus=""/>
                                                <input type="text" onChange={this.handleInputChange}
                                                       className="form-control mt-2" placeholder="Phone"
                                                       pattern="^(\+|00)?[1-9][0-9 \-\(\)\.]{7,}$"
                                                       title="The address should follow this format:
                                       <Country code(optional)> <Number(At least 7 digits>."
                                                       defaultValue={this.props.current_user.phoneNumber ? this.props.current_user.phoneNumber : ''}
                                                       name="phoneNumber" required autoFocus=""/>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-check form-switch float-left">
                                                    <input onChange={this.handleInputChange}
                                                           checked={this.state.save_address}
                                                           className="form-check-input" name="save_address"
                                                           type="checkbox" id="flexSwitchCheck"
                                                           disabled={!this.props.signed_in}/>
                                                    <label className="form-check-label" htmlFor="flexSwitchCheck">
                                                        Save address(Signed in only)
                                                    </label>
                                                </div>
                                                <select name="country" onChange={this.handleInputChange}
                                                        className="custom-select my-1 mr-sm-2 mt-2"
                                                        defaultValue={this.props.current_user.country ? this.props.current_user.country : ''} required>
                                                    <option value="" defaultValue="">Choose...</option>
                                                    <option value="Norway">Norway</option>
                                                    <option value="Sweden">Sweden</option>
                                                    <option value="Denmark">Denmark</option>
                                                </select>
                                                <input type="text" onChange={this.handleInputChange}
                                                       className="form-control mt-2" placeholder="City"
                                                       pattern="^[A-ZÆØÅ]+[a-zæøåA-ZÆØÅ ,.'-]{1,20}(\s[A-ZÆØÅ]+[a-zæøåA-ZÆØÅ ,.'-]{1,20})?(\s[A-ZÆØÅ]+[a-zæøåA-ZÆØÅ ,.'-]{1,20})?$"
                                                       title="City name has to start with an upper case letter and have at least 2 characters."
                                                       defaultValue={this.props.current_user.city ? this.props.current_user.city : ''}
                                                       name="city" required autoFocus=""/>
                                                <input type="text" onChange={this.handleInputChange}
                                                       className="form-control mt-2" placeholder="Zip Code"
                                                       pattern="^\d{4,5}(?:[-\s]\d{4})?$"
                                                       defaultValue={this.props.current_user.zipCode ? this.props.current_user.zipCode : ''}
                                                       name="zipCode" required autoFocus=""/>
                                                <input type="text" onChange={this.handleInputChange}
                                                       className="form-control mt-2" placeholder="Street name"
                                                       pattern="^[A-ZÆØÅ]+[a-zæøåA-ZÆØÅ ,.'-]{1,20}([A-ZÆØÅ]+[a-zæøåA-ZÆØÅ ,.'-]{1,20})?(\s[A-ZÆØÅ]+[a-zæøåA-ZÆØÅ ,.'-]{1,20})?\s\d+\s?[a-zæøåA-ZÆØÅ]?"
                                                       title="The address should follow this format:
                                       <Address> <Number><Letter(optional)>."
                                                       defaultValue={this.props.current_user.street ? this.props.current_user.street : ''}
                                                       name="street" required autoFocus=""/>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-check form-switch float-left">
                                                    <input onChange={this.handleInputChange}
                                                           checked={this.state.separate_shipping}
                                                           className="form-check-input" name="separate_shipping"
                                                           type="checkbox" id="flexSwitchCheck"/>
                                                    <label className="form-check-label" htmlFor="flexSwitchCheck">
                                                        Different shipping address?
                                                    </label>
                                                </div>
                                                <select name="shipping_country" onChange={this.handleInputChange}
                                                        className="custom-select my-1 mr-sm-2 mt-2"
                                                        disabled={!this.state.separate_shipping}>
                                                    <option value="" defaultValue="">Choose...</option>
                                                    <option value="Norway">Norway</option>
                                                    <option value="Sweden">Sweden</option>
                                                    <option value="Denmark">Denmark</option>
                                                </select>
                                                <input type="text" onChange={this.handleInputChange}
                                                       className="form-control mt-2" placeholder="City"
                                                       pattern="^[A-ZÆØÅ]+[a-zæøåA-ZÆØÅ ,.'-]{1,20}(\s[A-ZÆØÅ]+[a-zæøåA-ZÆØÅ ,.'-]{1,20})?(\s[A-ZÆØÅ]+[a-zæøåA-ZÆØÅ ,.'-]{1,20})?$"
                                                       title="City name has to start with an upper case letter and have at least 2 characters."
                                                       name="shipping_city" disabled={!this.state.separate_shipping}/>
                                                <input type="text" onChange={this.handleInputChange}
                                                       className="form-control mt-2" placeholder="Zip Code"
                                                       pattern="^\d{4,5}(?:[-\s]\d{4})?$"
                                                       name="shipping_zipCode" disabled={!this.state.separate_shipping}/>
                                                <input type="text" onChange={this.handleInputChange}
                                                       className="form-control mt-2" placeholder="Street name"
                                                       pattern="^[A-ZÆØÅ]+[a-zæøåA-ZÆØÅ ,.'-]{1,20}([A-ZÆØÅ]+[a-zæøåA-ZÆØÅ ,.'-]{1,20})?(\s[A-ZÆØÅ]+[a-zæøåA-ZÆØÅ ,.'-]{1,20})?\s\d+\s?[a-zæøåA-ZÆØÅ]?"
                                                       title="The address should follow this format:
                                       <Address> <Number><Letter(optional)>."
                                                       name="shipping_street" disabled={!this.state.separate_shipping}/>
                                            </div>
                                        </div>
                                        <div className="row mb-4 mt-3">
                                            <div className="col-md-12">
                                                {this.state.toggle_loading ? <LoadingSpinnerPrimaryLongBtn/> :
                                                    <button type="submit" className="btn btn-lg btn-primary btn-block mt-2">
                                                        Check Out!
                                                    </button>}
                                                {this.state.toggle_success_feedback &&
                                                <SuccessFeedback feedback_success_text={this.state.feedback_text}/>}
                                                {this.state.toggle_error_feedback &&
                                                <DangerFeedback feedback_error_text={this.state.feedback_text}/>}
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-md-4 h-100 overflow-auto text-left">
                                    <div className="row text-nowrap mt-2">
                                        <div className="col-4 text-center">
                                            <h6>Quantity:</h6>
                                        </div>
                                        <div className="col-5 text-center">
                                            <h6>Product:</h6>
                                        </div>
                                        <div className="col-3 text-center">
                                            <h6>Price:</h6>
                                        </div>
                                    </div>
                                    {this.props.cart_objects.map(product => (
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-4 align-self-center">
                                                    <p className="text-center">
                                                        {product.quantity}x
                                                    </p>
                                                </div>
                                                <div className="col-5 align-self-center">
                                                    <p className="text-center">
                                                        {product.name}
                                                    </p>
                                                </div>
                                                <div className="col-3 align-self-center">
                                                    <p className="text-center">
                                                        ${product.price * product.quantity}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12">
                                                    <hr/>
                                                </div>
                                            </div>
                                        </div>))}
                                    <p className="align-self-end">Price total: {this.props.price_total}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CheckOut;