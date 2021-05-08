import React, {Component} from "react";
import axios from "axios";
import { Link } from 'react-router-dom';



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
        <div className="productContainer">
          <div className="row">
            <div className="col-lg-3">

              <h1 className="my-4">ShopMet</h1>
              <div className="list-group">
                <Link to="/category/coffee" className="list-group-item">Coffee beans</Link>
                <Link to="/category/capsules" className="list-group-item">Coffee capsules</Link>
                <Link to="/category/filter" className="list-group-item">Filter Ground coffee</Link>
                <Link to="/category/machines" className="list-group-item">Coffee machines</Link>
                <Link to="/category/access" className="list-group-item">Other</Link>
                <Link to="/" className="list-group-item">All</Link>
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
                    <img className="d-block img-fluid" src="https://www.fino.eu/wp-content/uploads/2013/12/Coffee-Filters.jpg" alt="First slide"/>
                  </div>
                  <div className="carousel-item">
                    <img className="d-block img-fluid" src="https://www.thegeneralpost.com/wp-content/uploads/2021/01/cofee-900x350.jpg" alt="Second slide"/>
                  </div>
                  <div className="carousel-item">
                    <img className="d-block img-fluid" src="https://i0.wp.com/www.toptensell.com/wp-content/uploads/2020/05/best-coffee-makers.jpg?fit=900%2C350&ssl=1" alt="Third slide"/>
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
                <div className="row" dangerouslySetInnerHTML={{ __html: this.state.product}} />



            </div>
          </div>
        </div>
    )
  }
}


