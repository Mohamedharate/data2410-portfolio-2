import React, {Component} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

export default class Category extends Component{
    constructor(props) {
        super(props);
        this.state = {categories: ""};
    }

    getCategories = async () => {
        await axios({
            method: "get",
            url: 'https://localhost:3001/api/products/get/allProductsPure',
        }).then(res =>{
            this.setState({categories: res.data.categories})
        })
    }
    render() {
        return(
            <div className="col-lg-3">
                <h1 className="my-4">ShopMet</h1>
                <div className="list-group">
                    {this.state.categories &&
                        this.state.categories.map((cat, index) =>(
                            <div key={index}
                            />
                        ))
                    }
                </div>
            </div>
        )
    }

}