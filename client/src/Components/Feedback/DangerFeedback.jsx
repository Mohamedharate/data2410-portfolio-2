import React, {Component} from "react";
import Alert from 'react-bootstrap/Alert'


class DangerFeedback extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Alert className="m-2" variant="danger">
                <p>
                   <strong>Oh snap!</strong><br/> {this.props.feedback_error_text}
                </p>
            </Alert>
        );
    }
}

export default DangerFeedback;