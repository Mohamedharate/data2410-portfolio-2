import React, {Component} from "react";
import {Link} from "react-router-dom";
import LoadingSpinnerSmallLight from "./Spinners/LoadingSpinnerSmallLight";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

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
    handleProfile = () => {
        this.props.toggleProfilePageCallback()
    }

    render() {
        return (
            <header>
                <nav className="row fixed-top align-items-center bg-dark py-lg-3">
                    <div className={"col-lg-1 col-0"}>
                    </div>
                    <div className="col-8 col-lg-6">
                        <Link to="/"> <img className="navbar-logo float-left ml-2 mt-1" src="/LogoMet.svg"
                                           alt=""/></Link>
                        {!this.props.loading &&
                        <button onClick={this.handleShoppingCart}
                                className="btn btn-dark justify-content-center text-center">
                                        <span className="position-absolute float-right ml-3 mt-2">
                                            <span className="btn badge badge-dark border border-secondary">
                                                {this.props.cart_counter} - ${this.props.cart_total_price}
                                            </span>
                                        </span>
                            <ShoppingCartIcon/>
                        </button>}
                    </div>
                    <div className="col-4">
                        {this.props.loading ? <LoadingSpinnerSmallLight/> :
                            <React.Fragment>
                            {!this.props.isAuthenticated &&
                            <button onClick={this.handleLogin}
                            className="btn btn-dark float-right mr-2 p-1">Login</button>}
                        {!this.props.isAuthenticated &&
                            <button onClick={this.handleRegister}
                            className="btn btn-dark float-right mr-2 p-1">Register</button>}
                        {this.props.isAuthenticated &&
                            <button onClick={this.handleProfile}
                            className="btn btn-dark float-right rtl mr-2 pl-3">
                            <span className="position-absolute float-right mr-3 mt-2">
                            <span className="btn badge badge-dark border border-secondary">
                            {this.props.current_user.firstName}
                            </span>
                            </span>
                            <AccountBoxIcon/>
                            </button>}
                            </React.Fragment>
                        }
                    </div>
                    <div className={"col-lg-1 col-0"}>
                    </div>
                </nav>
            </header>
        );
    }
}

export default Navbar;