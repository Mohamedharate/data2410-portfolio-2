import React, {Component} from "react";
import AdminLogin from "./AdminLogin";
import AdminPage from "./AdminPage"


class Admin extends Component {
    state = {
        toggleLogin: false,
    };

    render() {
        return (
            <React.Fragment>
                {!this.state.toggleAdmin &&
                <AdminLogin toggle_admin = {this.props.toggle_admin}/>}
                {this.state.toggleAdmin &&
                <AdminPage toggle_admin = {this.props.toggle_admin}/>}
            </React.Fragment>
        );
    }
}

export default Admin;