import React, {Component} from "react";
import axios from "axios";


class ProfilePage extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        edit_firstName: false,
        edit_lastName: false,
        edit_email: false,
        edit_phoneNumber: false,

        edit_country: false,
        edit_city: false,
        edit_zipCode: false,
        edit_street: false,

        firstName: this.props.current_user.firstName,
        lastName: this.props.current_user.lastName,
        email: this.props.current_user.email,
        phoneNumber: this.props.current_user.phoneNumber,

        country: this.props.current_user.country,
        city: this.props.current_user.city,
        zipCode: this.props.current_user.zipCode,
        street: this.props.current_user.street,
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }

    handleEditBtn = async (name, value) => {
        if (!value) {
            let change = false;
            let data = {}

            if(name === "edit_firstName"){
                if(this.props.current_user.firstName !== this.state.firstName){
                    change = true;
                    data['firstName'] = this.state.firstName;
                }
            }
            if(name === "edit_lastName"){
                if(this.props.current_user.lastName !== this.state.lastName){
                    change = true;
                    data['lastName'] = this.state.lastName;
                }
            }
            if(name === "edit_email"){
                if(this.props.current_user.email !== this.state.email){
                    change = true;
                    data['email'] = this.state.email;
                }
            }
            if(name === 'edit_phoneNumber'){
                if(this.props.current_user.phoneNumber !== this.state.phoneNumber){
                    change = true;
                    data['phoneNumber'] = this.state.phoneNumber;
                }
            }
            if(name === "edit_country"){
                if(this.props.current_user.country !== this.state.country){
                    change = true;
                    data['country'] = this.state.country;
                }
            }
            if(name === "edit_city"){
                if(this.props.current_user.city !== this.state.city){
                    change = true;
                    data['city'] = this.state.city;
                }
            }
            if(name === "edit_zipCode"){
                if(this.props.current_user.zipCode !== this.state.zipCode){
                    change = true;
                    data['zipCode'] = this.state.zipCode;
                }
            }
            if(name === 'edit_street'){
                if(this.props.current_user.street !== this.state.street){
                    change = true;
                    data['street'] = this.state.street;
                }
            }
            if(change){
                await axios({
                    method: 'put',
                    url: `http://localhost:3001/api/users/update/${this.props.current_user.email}`,
                    data: data,
                }).then(res =>{
                    console.log(res)
                    this.props.feedback(true, res.data.Message)
                    this.props.current_user.firstName = this.state.firstName;
                    this.props.current_user.lastName = this.state.lastName;
                    this.props.current_user.email = this.state.email;
                    this.props.current_user.phoneNumber = this.state.phoneNumber;
                    this.props.current_user.country = this.state.country;
                    this.props.current_user.city = this.state.city;
                    this.props.current_user.zipCode = this.state.zipCode;
                    this.props.current_user.street = this.state.street;
                }).catch(err => {
                    console.log(err)
                    this.props.feedback(false, err.data.Error)
                })
            }
        }
        this.setState({
            [name]: value
        })
    }


    render() {
        return (
            <div className="container">
                <div className="row justify-content-center mt-2">
                    <div className="col-10 text-left">
                        Persona:
                    </div>
                </div>
                <div className="row justify-content-center mt-2">
                    <div className="col-7">
                        <input type="text" onChange={this.handleInputChange}
                               className="form-control" placeholder="Firstname"
                               pattern="^[A-ZÆØÅ]+[a-zæøå ,.'-]{1,20}(\s[A-ZÆØÅ]+[a-zæøå ,.'-]{1,20})?$"
                               title="First name has to start with an upper case letter and have at least 2 characters."
                               defaultValue={this.props.current_user.firstName ? this.props.current_user.firstName : ''}
                               name="firstName" disabled={!this.state.edit_firstName}/>
                    </div>
                    <div className="col-3">
                        <button onClick={() => this.handleEditBtn("edit_firstName", !this.state.edit_firstName)}
                                className="btn btn-light border border-secondary pb-0 float-left">
                            {this.state.edit_firstName ? <span className="material-icons">done</span> :
                                <span className="material-icons">edit</span>}
                        </button>
                    </div>
                </div>
                <div className="row justify-content-center mt-2">
                    <div className="col-7">
                        <input type="text" onChange={this.handleInputChange}
                               className="form-control" placeholder="Lastname"
                               pattern="^[A-ZÆØÅ]+[a-zæøå ,.'-]{1,20}$"
                               title="Last name has to start with an upper case letter and have at least 2 characters."
                               defaultValue={this.props.current_user.lastName ? this.props.current_user.lastName : ''}
                               name="lastName" disabled={!this.state.edit_lastName}/>
                    </div>
                    <div className="col-3">
                        <button onClick={() => this.handleEditBtn("edit_lastName", !this.state.edit_lastName)}
                                className="btn btn-light border border-secondary pb-0 float-left">
                            {this.state.edit_lastName ? <span className="material-icons">done</span> :
                                <span className="material-icons">edit</span>}
                        </button>
                    </div>
                </div>
                <div className="row justify-content-center mt-2">
                    <div className="col-7">
                        <input type="email" onChange={this.handleInputChange}
                               className="form-control" placeholder="Email"
                               defaultValue={this.props.current_user.email ? this.props.current_user.email : ''}
                               name="email" disabled={!this.state.edit_email}/>
                    </div>
                    <div className="col-3">
                        <button onClick={() => this.handleEditBtn("edit_email", !this.state.edit_email)}
                                className="btn btn-light border border-secondary pb-0 float-left">
                            {this.state.edit_email ? <span className="material-icons">done</span> :
                                <span className="material-icons">edit</span>}
                        </button>
                    </div>
                </div>
                <div className="row justify-content-center mt-2">
                    <div className="col-7">
                        <input type="text" onChange={this.handleInputChange}
                               className="form-control" placeholder="Phone"
                               pattern="^(\+|00)?[1-9][0-9 \-\(\)\.]{7,}$"
                               title="The address should follow this format:
                                       <Country code(optional)> <Number(At least 7 digits>."
                               defaultValue={this.props.current_user.phoneNumber ? this.props.current_user.phoneNumber : ''}
                               name="phoneNumber" disabled={!this.state.edit_phoneNumber}/>
                    </div>
                    <div className="col-3">
                        <button onClick={() => this.handleEditBtn("edit_phoneNumber", !this.state.edit_phoneNumber)}
                                className="btn btn-light border border-secondary pb-0 float-left">
                            {this.state.edit_phoneNumber ? <span className="material-icons">done</span> :
                                <span className="material-icons">edit</span>}
                        </button>
                    </div>
                </div>
                <hr/>
                <div className="row justify-content-center mt-2">
                    <div className="col-10 text-left">
                        Address:
                    </div>
                </div>
                <div className="row justify-content-center mt-2">
                    <div className="col-7">
                        <select name="country" onChange={this.handleInputChange}
                                className="custom-select my-1 mr-sm-2"
                                defaultValue={this.props.current_user.country ? this.props.current_user.country : ''}
                                disabled={!this.state.edit_country}>
                            <option value="" defaultValue="">Choose...</option>
                            <option value="Norway">Norway</option>
                            <option value="Sweden">Sweden</option>
                            <option value="Denmark">Denmark</option>
                        </select>
                    </div>
                    <div className="col-3">
                        <button onClick={() => this.handleEditBtn("edit_country", !this.state.edit_country)}
                                className="btn btn-light border border-secondary pb-0 float-left">
                            {this.state.edit_country ? <span className="material-icons">done</span> :
                                <span className="material-icons">edit</span>}
                        </button>
                    </div>
                </div>
                <div className="row justify-content-center mt-2">
                    <div className="col-7">
                        <input type="text" onChange={this.handleInputChange}
                               className="form-control mt-2" placeholder="City"
                               pattern="^[A-ZÆØÅ]+[a-zæøåA-ZÆØÅ ,.'-]{1,20}(\s[A-ZÆØÅ]+[a-zæøåA-ZÆØÅ ,.'-]{1,20})?(\s[A-ZÆØÅ]+[a-zæøåA-ZÆØÅ ,.'-]{1,20})?$"
                               title="City name has to start with an upper case letter and have at least 2 characters."
                               defaultValue={this.props.current_user.city ? this.props.current_user.city : ''}
                               name="city" disabled={!this.state.edit_city}/>
                    </div>
                    <div className="col-3">
                        <button onClick={() => this.handleEditBtn("edit_city", !this.state.edit_city)}
                                className="btn btn-light border border-secondary pb-0 float-left">
                            {this.state.edit_city ? <span className="material-icons">done</span> :
                                <span className="material-icons">edit</span>}
                        </button>
                    </div>
                </div>
                <div className="row justify-content-center mt-2">
                    <div className="col-7">
                        <input type="text" onChange={this.handleInputChange}
                               className="form-control mt-2" placeholder="Zip Code"
                               pattern="^\d{4,5}(?:[-\s]\d{4})?$"
                               defaultValue={this.props.current_user.zipCode ? this.props.current_user.zipCode : ''}
                               name="zipCode" disabled={!this.state.edit_zipCode}/>
                    </div>
                    <div className="col-3">
                        <button onClick={() => this.handleEditBtn("edit_zipCode", !this.state.edit_zipCode)}
                                className="btn btn-light border border-secondary pb-0 float-left">
                            {this.state.edit_zipCode ? <span className="material-icons">done</span> :
                                <span className="material-icons">edit</span>}
                        </button>
                    </div>
                </div>
                <div className="row justify-content-center mt-2">
                    <div className="col-7">
                        <input type="text" onChange={this.handleInputChange}
                               className="form-control mt-2" placeholder="Street name"
                               pattern="^[A-ZÆØÅ]+[a-zæøåA-ZÆØÅ ,.'-]{1,20}([A-ZÆØÅ]+[a-zæøåA-ZÆØÅ ,.'-]{1,20})?(\s[A-ZÆØÅ]+[a-zæøåA-ZÆØÅ ,.'-]{1,20})?\s\d+\s?[a-zæøåA-ZÆØÅ]?"
                               title="The address should follow this format:
                                       <Address> <Number><Letter(optional)>."
                               defaultValue={this.props.current_user.street ? this.props.current_user.street : ''}
                               name="street" disabled={!this.state.edit_street}/>
                    </div>
                    <div className="col-3">
                        <button onClick={() => this.handleEditBtn("edit_street", !this.state.edit_street)}
                                className="btn btn-light border border-secondary pb-0 float-left">
                            {this.state.edit_street ? <span className="material-icons">done</span> :
                                <span className="material-icons">edit</span>}
                        </button>
                    </div>
                </div>
                <hr/>
            </div>
        );
    }
}

export default ProfilePage;