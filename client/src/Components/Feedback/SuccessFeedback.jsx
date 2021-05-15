import React, {Component} from "react";
import Alert from 'react-bootstrap/Alert'


class SuccessFeedback extends Component {
    constructor(props) {
        super(props);
        /*
        this.state = {
            showingAlert: false
        };

         */
    }
/*

    handleClickShowAlert() {
        this.setState({
            showingAlert: true
        });

        setTimeout(() => {
            this.setState({
                showingAlert: false
            });
        }, 10000);
    }
${this.state.showingAlert ? 'alert-shown' : 'alert-hidden'}
 */

    render() {
        return (
            <Alert className ="m-2" variant="success">
                <p>
                    {this.props.feedback_success_text}
                </p>
            </Alert>
        );
    }
}

export default SuccessFeedback;