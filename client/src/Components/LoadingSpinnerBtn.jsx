import React, {Component} from "react";


class LoadingSpinnerBtn extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button className="btn btn-primary" type="button" disabled>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
                Loading...
            </button>
        );
    }
}

export default LoadingSpinnerBtn;