import React, {Component} from "react";
import AdminLogin from "./AdminLogin";
import AdminPage from "./AdminPage"


class Admin extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        toggleLogin: false,
        current_user: {}
    };

    handleLoginCallback = user => {
        this.setState({current_user: user, toggleLogin: true})
    };
    handleLogoutCallback = () => {
        this.setState({current_user: {}, toggleLogin: false})
    }

    render() {
        return (
            <React.Fragment>
                {this.state.toggleLogin ?
                    <AdminPage
                        logoutCallback={this.handleLogoutCallback}
                        toggle_admin={this.props.toggle_admin}
                    /> :
                    <AdminLogin
                        loginCallback={this.handleLoginCallback}
                        toggle_admin={this.props.toggle_admin}
                    />}
            </React.Fragment>
        );
    }
}

export default Admin;