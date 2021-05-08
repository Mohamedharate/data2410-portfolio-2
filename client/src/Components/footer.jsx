import React, { Component } from "react";

class Footer extends Component{
    constructor(props) {
        super(props);

    }

    render() {
        return(
            <footer className="py-5 bg-dark">
                <div className="row m-2">
                    <div className="col-md-3"/>
                    <div className="col-md-6 text-center">
                        <button onClick={this.props.toggle_admin} className="btn btn-info text-white">
                            Admin
                        </button>
                    </div>
                    <div className="col-md-3"/>
                </div>
                <div className="row m-2">
                    <div className="col-12">
                        <p className="m-0 text-center text-white">Copyright &copy; ShopMet 2021</p>
                    </div>
                </div>
            </footer>
        )
    }
}
export default Footer;