import React, {Component} from "react";
import Footer from "./footer";

class AdminLogin extends Component {
    state = {
    };


    render() {
        return (
            <React.Fragment>
                <Footer toggle_admin = {this.props.toggle_admin}/>
            </React.Fragment>
        );
    }
}

export default AdminLogin;