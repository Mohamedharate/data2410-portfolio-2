import React, {Component} from "react";

class LoadingSpinnerLargeSuccess extends Component {
    render() {
        return (
            <div className="d-flex align-items-center justify-content-center w-100 h-100">
                <div className="spinner-border text-success text-center m-5" role="status"/>
            </div>
        )
    }
}

export default LoadingSpinnerLargeSuccess;