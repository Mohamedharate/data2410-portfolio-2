import React, {Component,} from "react";
import axios from "axios";

class AddReview extends Component{
render() {
    return(
        <div className="container">
            <div className="row">
                <h2>Feedback</h2>
                <table width="100%" border="0">
                    <div className="col-md-9 col-md-offset-0">
                        <tr>
                            <td width="77%">
                                <div className="">
                                    <form className="form-horizontal">
                                        <fieldset>
                                            <div className="form-group">
                                                <label className="col-md-3 control-label" htmlFor="name">Full
                                                    Name</label>
                                                <div className="col-md-9">
                                                    <input id="name" name="name" type="text" placeholder="Your name"
                                                           className="form-control"/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="col-md-3 control-label" htmlFor="email">Your
                                                    E-mail</label>
                                                <div className="col-md-9">
                                                    <input id="email" name="email" type="text" placeholder="Your email"
                                                           className="form-control"/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="col-md-3 control-label" htmlFor="message">Your
                                                    message</label>
                                                <div className="col-md-9">
                                                    <textarea className="form-control" id="message" name="message"
                                                              placeholder="Please enter your feedback here..."
                                                              rows="5"/>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    </div>
                </table>
            </div>
        </div>
    )
}
}