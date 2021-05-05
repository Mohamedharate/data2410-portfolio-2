import React, { Component } from "react";

class Footer extends Component{
    constructor(props) {
        super(props);

    }

    render() {
        return(
            <footer className="py-5 bg-dark">
                <div className="container">
                    <p className="m-0 text-center text-white">Copyright &copy; ShopMet 2021</p>
                </div>
                <div className="align-center">
                    <button onClick={this.props.toggle_admin} className="btn text-white">
                        Admin
                    </button>
                </div>

            </footer>
        )
    }
}
export default Footer;