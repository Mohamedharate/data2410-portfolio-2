import React, {Component} from "react";
import AdminLogin from "./AdminLogin";
import AdminPage from "./AdminPage"


class Admin extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        toggleLogin: true,
    };

    render() {
        return (
            <React.Fragment>
                {this.state.toggleLogin ?
                    <AdminPage toggle_admin = {this.props.toggle_admin}/> :
                    <AdminLogin toggle_admin = {this.props.toggle_admin}/>}
            </React.Fragment>
        );
    }
}

export default Admin;