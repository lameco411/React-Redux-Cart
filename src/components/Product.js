
import React, { Component } from "react";
import message from "../reducers/message";
import * as Message  from "./../constants/Message";
class Product extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var { product } = this.props   
    return (
      <div className="col-lg-4 col-md-6 mb-r">
        <div className="card text-center card-cascade narrower">
          <div className="view overlay hm-white-slight z-depth-1">
            <img src={product.image} className="img-fluid" alt={product.name} />
            <a>
              <div className="mask waves-light waves-effect waves-light" />
            </a>
          </div>
          <div className="card-body">
            <h4 className="card-title">
              <strong>
                <a>{product.name}</a>
              </strong>
            </h4>
            <ul className="rating">
              {this.showRating(product.rating)}
            </ul>
            <p className="card-text">
              {product.description}
            </p>
            <div className="card-footer">
              <span className="left">{product.price}$</span>
              <span className="right">
                <a 
                onClick={()=>{
                  this.props.onAddToCart(product);
                  this.props.onChangeMessage(Message.MSG_ADD_TO_CART_SUCCESS)
                  
                  }}
                className="btn-floating blue-gradient" 
                data-toggle="tooltip" 
                data-placement="top" 
                data-original-title="Add to Cart"
                >
                  <i className="fa fa-shopping-cart" />
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  } 
  showRating = (rating) => {
    var r = []
    for (let i = 1; i <= rating; i++) {
      r.push(<li key={i}><i className="fa fa-star" /></li>)
    }
    for (let i = 1; i <= 5 - rating; i++) {
      r.push(<li key={i+5}><i className="fa fa-star-o" /></li>)
    }
    return r;
  }
}
export default Product;
