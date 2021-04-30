import React, {Component,} from "react";
import axios from "axios";



export default class Mainpage extends Component {
  constructor(props) {
    super(props);
    this.state = {'product': []};

  }

  async componentDidMount() {
    const that = this;
    await axios({
      method: "get",
      url: 'http://localhost:3001/api/products/get/allProducts',
    }).then(function (response) {
      console.log("Data: ", response);
      that.setState({product: response.data});
    }).catch(function (error) {
      if (!error.data) {
        console.log(error.data)
      }
      console.log(error);
    });
  };


  render() {
    return (
        <div className="container">
          <div className="row">
            <div className="col-lg-3">

              <h1 className="my-4">ShopMet</h1>
              <div className="list-group">
                <a href="#" className="list-group-item">Coffee</a>
                <a href="#" className="list-group-item">Coffee and espresso machines</a>
                <a href="#" className="list-group-item">Accessories</a>
              </div>

            </div>

            <div className="col-lg-9">

              <div id="carouselExampleIndicators" className="carousel slide my-4" data-ride="carousel">
                <ol className="carousel-indicators">
                  <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"/>
                  <li data-target="#carouselExampleIndicators" data-slide-to="1"/>
                  <li data-target="#carouselExampleIndicators" data-slide-to="2"/>
                </ol>
                <div className="carousel-inner" role="listbox">
                  <div className="carousel-item active">
                    <img className="d-block img-fluid" src="http://placehold.it/900x350" alt="First slide"/>
                  </div>
                  <div className="carousel-item">
                    <img className="d-block img-fluid" src="http://placehold.it/900x350" alt="Second slide"/>
                  </div>
                  <div className="carousel-item">
                    <img className="d-block img-fluid" src="http://placehold.it/900x350" alt="Third slide"/>
                  </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button"
                   data-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"/>
                  <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button"
                   data-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"/>
                  <span className="sr-only">Next</span>
                </a>
              </div>
                <div className="row">
                    <div className="col-lg-4 col-md-6 mb-4">
                      {<div dangerouslySetInnerHTML={{ __html: this.state.product}} />}
                    </div>
                </div>
            </div>
          </div>
        </div>
    )
  }
}


