import React, {Component} from "react";
import Alert from 'react-bootstrap/Alert'


class SuccessFeedback extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Alert className="mt-4" variant="success">
                <Alert.Heading>This is great!</Alert.Heading>
                <hr/>
                <p>
                    {this.props.feedback_success_text}
                </p>
            </Alert>
        );
    }
}

export default SuccessFeedback;