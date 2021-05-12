import React, {Component} from "react";
import {Link} from "react-router-dom";

class Navbar extends Component {

    handleLogin = () => {
        this.props.toggleLoginCallback()
    }
    handleLogout = () => {
        this.props.handleLogoutCallback()
    }
    handleRegister = () => {
        this.props.toggleRegisterCallback()
    }
    handleShoppingCart = () => {
        this.props.toggleShoppingCartCallback()
    }
    handleProfile = () => {
        this.props.toggleProfilePageCallback()
    }

    render() {
        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                    <div className="container-fluid">
                        <Link to="/"> <img className="navbar-logo" src="/LogoMet.svg" alt=""/></Link>
                        <a className="navbar-brand"/>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon">tag</span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarCollapse">
                            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                                <li className="nav-item">
                                </li>
                                <li className="nav-item">


                                </li>
                                <li className="nav-item">
                                    <div className="btn btn-dark justify-content-center text-center">
                                        <span className="position-absolute float-right ml-4 mt-3">
                                            <span className="badge badge-dark border border-light">
                                                {this.props.cart_counter} - ${this.props.cart_total_price}
                                            </span>
                                        </span>
                                        <button onClick={this.handleShoppingCart} className="btn text-white">
                                            <i className="material-icons">shopping_cart</i>
                                        </button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {!this.props.isAuthenticated &&
                    <button onClick={this.handleLogin} className="btn text-white float-right mr-2">Login</button>}
                    {!this.props.isAuthenticated &&
                    <button onClick={this.handleRegister} className="btn text-white float-right mr-2">Register</button>}

                    {this.props.isAuthenticated &&
                    <button className="btn btn-dark text-nowrap">
                        <div className="row">
                            <div className="col-4 align-self-center p-1">
                                <span className="material-icons mt-1">account_box</span>
                            </div>
                            <div className="col-8 align-self-center p-1 text-left text-nowrap">
                                {this.props.current_user.firstName}
                            </div>
                        </div>
                    </button>}
                    {this.props.isAuthenticated &&
                    <button onClick={this.handleLogout} className="btn text-white float-right mr-2">Logout</button>}

                </nav>
            </header>
        );
    }
}

export default Navbar;