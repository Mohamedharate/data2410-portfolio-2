import React from 'react';
import Mainpage from "./mainpage";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Productpage from "./productpage";

export default function Path() {
    return(
        <div>
                <Route exact path="/" component = {Mainpage}/>
                <Route path="/category/:id" component={Mainpage}/>
                <Route path="/products/:itemId" component={Productpage}/>
        </div>
    )
}