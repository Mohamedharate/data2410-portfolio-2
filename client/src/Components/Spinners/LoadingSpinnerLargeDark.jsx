import React, {Component} from "react";

class LoadingSpinnerLargeDark extends Component{
    render() {
        return(
            <div className="d-flex align-items-center" style={{height: 200}}>
                <strong>Loading...</strong>
                <div className="spinner-border ml-auto text-dark" role="status" aria-hidden="true"></div>
            </div>
        )
    }
}
export default LoadingSpinnerLargeDark;