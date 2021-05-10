import React, {Component} from "react";
import {Link} from "react-router-dom";

class Navbar extends Component {

    handleLogin = () => {
        this.props.toggleLoginCallback()
    }
    handleRegister = () => {
        this.props.toggleRegisterCallback()
    }
    handleShoppingCart = () => {
        this.props.toggleShoppingCartCallback()
    }
    handleLogout = () => {
        this.props.handleLogoutCallback()
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
                                    <Link to="/" className="nav-link active" aria-current="page">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/orders" className="nav-link" href="#" tabIndex="-1">Orders</Link>
                                </li>
                                <li className="nav-item">
                                    <button onClick={this.handleShoppingCart} className="btn text-white">
                                        <span className="position-absolute ml-3 mt-2">
                                            <p><span className="badge badge-primary">
                                                {this.props.cart_counter}
                                            </span> - ${this.props.cart_total_price}</p>
                                        </span>
                                        <i className="material-icons">shopping_cart</i>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {!this.props.isAuthenticated &&
                    <button onClick={this.handleLogin} className="btn text-white float-right mr-2">Login</button>}
                    {!this.props.isAuthenticated &&
                    <button onClick={this.handleRegister} className="btn text-white float-right mr-2">Register</button>}
                    {this.props.isAuthenticated &&
                    <div
                        className="welcomeText text-white float-right mr-2">Welcome, {this.props.current_user.firstName}</div>}
                    {this.props.isAuthenticated &&
                    <button onClick={this.handleLogout} className="btn text-white float-right mr-2">Logout</button>}

                </nav>
            </header>
        );
    }
}

export default Navbar;