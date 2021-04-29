import React, { Component } from "react";

class Navbar extends Component{
    state = {
    };

    handleLogin = () => {
        this.props.loginCallback()
    }
    handleRegister = () => {
        this.props.registerCallback()
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
                                        <a className="nav-link" href="cart.jsx">Cart</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#" tabIndex="-1">Orders</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <button onClick={this.handleLogin} className="btn text-white float-right mr-2">Login</button>
                        <button onClick={this.handleRegister} className="btn text-white float-right mr-2">Register</button>
                    </nav>
                </header>
        );
    }
}
export default Navbar;