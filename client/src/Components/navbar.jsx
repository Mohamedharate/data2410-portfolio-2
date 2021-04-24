import React, { Component } from "react";

class Navbar extends Component{
    state = {
        toggleLogin: true,
        toggleRegister: true,
    };

    handleLogin = () => {
        this.props.loginCallback(this.state.toggleLogin)
        this.setState({toggleLogin: !this.state.toggleLogin})
    }
    handleRegister = () => {
        this.props.registerCallback(this.state.toggleRegister)
        this.setState({toggleRegister: !this.state.toggleRegister})
    }

    render() {
        return (
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="#">Carousel</a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false"
                                    aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon">tag</span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarCollapse">
                                <ul className="navbar-nav me-auto mb-2 mb-md-0">
                                    <li className="nav-item">
                                        <a className="nav-link active" aria-current="page" href="#">Home</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Link</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link disabled" href="#" tabIndex="-1"
                                           aria-disabled="true">Disabled</a>
                                    </li>
                                    <button onClick={this.handleLogin} className="btn btn-primary mr-2">Login</button>
                                    <button onClick={this.handleRegister} className="btn btn-primary mr-2">Register</button>
                                </ul>

                            </div>
                        </div>
                    </nav>
                </header>
        );
    }
}
export default Navbar;