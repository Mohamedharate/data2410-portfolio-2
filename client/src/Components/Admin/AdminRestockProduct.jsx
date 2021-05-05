import React, {Component} from "react";
import DangerFeedback from "../dangerFeedback";

class AdminRestockProduct extends Component {
    state = {
        value: null,
        toggle_error_feedback: false,
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }

    handleAddStock = event => {
        event.preventDefault();
        if (this.state.value != null) {
            this.props.addStock(this.props.product._id, this.state.value);
            this.setState({toggle_error_feedback: false});
        } else {
            this.setState({toggle_error_feedback: true});
        }
    };

    handleRemoveStock = event => {
        event.preventDefault();
        if (this.state.value != null) {
            this.props.removeStock(this.props.product._id, this.state.value);
            this.setState({toggle_error_feedback: false});
        } else {
            this.setState({toggle_error_feedback: true});
        }
    };


    render() {
        return (
            <div className="mt-4">
                <hr/>
                <div className="row justify-content-center">
                    <div className="col-md-2 text-center">
                        <p>{this.props.product.name}</p>
                    </div>
                    <div className="col-md-2 text-center">
                        <p>In Stock: {this.props.product.quantity}</p>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-2 text-center mb-2">
                        <input onChange={this.handleInputChange} type="number" className="form-control" name="value"
                               placeholder="Quantity" required/>
                    </div>
                    <div className="col-md-2 text-center mb-2">
                        <button onClick={this.handleAddStock} className="btn btn-primary mr-2">Add</button>
                        <button onClick={this.handleRemoveStock} className="btn btn-danger">Remove</button>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        {this.state.toggle_error_feedback &&
                        <DangerFeedback feedback_error_text="Add the quantity you want to replenish!"/>}
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminRestockProduct;