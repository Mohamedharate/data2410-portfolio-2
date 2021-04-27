import React, {Component} from "react";
import Alert from 'react-bootstrap/Alert'


class DangerFeedback extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Alert className="mt-4" variant="danger">
                <Alert.Heading>Oh snap!</Alert.Heading>
                <hr/>
                <p>
                    {this.props.feedback_error_text}
                </p>
            </Alert>
        );
    }
}

export default DangerFeedback;