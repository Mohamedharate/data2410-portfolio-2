import React, { Component } from "react";


class About extends Component{
    render() {
        return (
            <div className="bestsellers">
                <h2>About us</h2>
            <main>
            <div className="container marketing">
                    <div className="row">
                        <div className="col-lg-4">
                            <svg className="bd-placeholder-img rounded-circle" width="140" height="140"
                                 xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140"
                                 preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title>
                                <rect width="100%" height="100%" fill="#777"/>
                                <text x="50%" y="50%" fill="#777" dy=".3em">140x140</text>
                            </svg>

                            <h2>Organic coffee</h2>
                            <p>Organic coffee blah bah</p>
                            <p><a className="btn btn-secondary" href="#">View details &raquo;</a></p>
                        </div>
                        <div className="col-lg-4">
                            <svg className="bd-placeholder-img rounded-circle" width="140" height="140"
                                 xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140"
                                 preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title>
                                <rect width="100%" height="100%" fill="#777"/>
                                <text x="50%" y="50%" fill="#777" dy=".3em">140x140</text>
                            </svg>

                            <h2>Excellent selection</h2>
                            <p>The best machines on the market</p>
                            <p><a className="btn btn-secondary" href="#">View details &raquo;</a></p>
                        </div>
                        <div className="col-lg-4">
                            <svg className="bd-placeholder-img rounded-circle" width="140" height="140"
                                 xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140"
                                 preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title>
                                <rect width="100%" height="100%" fill="#777"/>
                                <text x="50%" y="50%" fill="#777" dy=".3em">140x140</text>
                            </svg>

                            <h2>Small business</h2>
                            <p>And lastly this, the third column of representative placeholder content.</p>
                            <p><a className="btn btn-secondary" href="#">View details &raquo;</a></p>
                        </div>
                    </div>
                </div>
            </main>
            </div>
        )

    }

}

export default About;