import React, {Component} from "react";


class LoadingSpinnerSuccessLongBtn extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button className="btn btn-success btn-block" type="button" disabled>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
                Loading...
            </button>
        );
    }
}

export default LoadingSpinnerSuccessLongBtn;