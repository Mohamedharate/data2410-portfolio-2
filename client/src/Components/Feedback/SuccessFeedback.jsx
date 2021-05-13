import React, {Component} from "react";
import Alert from 'react-bootstrap/Alert'


class SuccessFeedback extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Alert className="m-2" variant="success">
                <p>
                    <strong>This is great!</strong><br/> {this.props.feedback_success_text}
                </p>
            </Alert>
        );
    }
}

export default SuccessFeedback;