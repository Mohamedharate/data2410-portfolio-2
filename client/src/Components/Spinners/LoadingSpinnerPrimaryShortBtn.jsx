import React, {Component} from "react";


class LoadingSpinnerPrimaryShortBtn extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button className="btn btn-primary m-2" type="button" disabled>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
            </button>
        );
    }
}

export default LoadingSpinnerPrimaryShortBtn;