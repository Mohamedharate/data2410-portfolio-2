import React, {Component} from "react";
import Home from "./home";
import Admin from "./Admin/Admin"


class App extends Component {
    state = {
        toggleAdmin: false,
    };

    handleToggleAdminPage = () => {
        this.setState({toggleAdmin: !this.state.toggleAdmin})
    }

    render() {
        return (
            <React.Fragment>
                {!this.state.toggleAdmin &&
                <Home toggle_admin = {this.handleToggleAdminPage}/>}
                {this.state.toggleAdmin &&
                <Admin toggle_admin = {this.handleToggleAdminPage}/>}
            </React.Fragment>
        );
    }
}

export default App;