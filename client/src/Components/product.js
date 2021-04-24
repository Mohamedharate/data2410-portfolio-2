import React, { Component } from "react";

class Product extends Component{
    state = {
        inCart: this.props.inCart,
    };
    addToCart = (e) => {
        e.preventDefault();
        this.props.addToCart(this.props.product);

        this.setState({
            inCart: true,
        })
    }
}