import React, {Component} from "react";
import {Button} from "react-bootstrap";


class LoadingSpinnerSuccessLongBtn extends Component {

    render() {
        return (
            <button style={{ padding: '0 10px', marginLeft: '20px', width: '50%', fontSize: 'large'}} className="btn btn-success" type="button" disabled>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
                Loading...
            </button>
        );
    }
}

export default LoadingSpinnerSuccessLongBtn;