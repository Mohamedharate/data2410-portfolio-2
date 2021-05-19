import React, {Component} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

export default class Category extends Component{
    constructor(props) {
        super(props);
        this.state = {product: [], category: []};
    }
    componentDidMount = async () => {
        await axios({
            method: "get",
            url: 'https://localhost:3001/api/products/get/allProductsPure',
        }).then(res => {
            this.setState({category: res.data.category, product: res.data});
            console.log(this.state.category)

        })
    }
    handleClick(e, catName){
        const categories = this.state.categories
            .map((cat)=>{
                if (cat === catName) return {...cat, selected: true}
                else return {...cat, selected: false}
            })
        this.setState({categories})
    }
    render() {
        return(
            <div className="list-group">
                    <Link to="/category/coffee" className="list-group-item">Coffee beans</Link>
                    <Link to="/category/capsules" className="list-group-item">Coffee capsules</Link>
                    <Link to="/category/filter" className="list-group-item">Filter Ground coffee</Link>
                    <Link to="/category/machines" className="list-group-item">Coffee machines</Link>
                    <Link to="/category/access" className="list-group-item">Other</Link>
                    <Link to="/" className="list-group-item">All</Link>
                </div>

        )
    }

}