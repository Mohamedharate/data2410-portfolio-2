import React, {Component} from "react";


class LoadingSpinnerSmallGeneral extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="spinner-border spinner-border-sm text-light float-right mr-4" role="status"/>
        );
    }
}

export default LoadingSpinnerSmallGeneral;