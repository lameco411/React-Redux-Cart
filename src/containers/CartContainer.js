
import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Cart from './../components/Cart';
import CartItem from "../components/CartItem";
import * as Message from './../constants/Message';
import CartResult from "../components/CartResult";
import * as actions from './../actions/index';
class CartContainer extends Component {
  render() {
    var { cart } = this.props;
    console.log(cart)
    return (<Cart>
      {this.showCartItem(cart)}
      {this.showTotalAmount(cart)}
    </Cart>
    );
  }


  showTotalAmount = (cart) => {
    var result = null;
    if (cart.length > 0) {
      result = <CartResult cart={cart} />
    }
    return result;
  }
  showCartItem = (cart) => {
    let result = <tr><td>{Message.MSG_CART_EMPTY}</td></tr>;
    if (cart.length > 0) {
      result = cart.map((item, index) => {
        return <CartItem
          key={index}
          item={item}
          index={index}
          onDeleteProduct={this.props.onDeleteProduct}
          onChangeMessage={this.props.onChangeMessage}
          onUpdateProductInCart={this.props.onUpdateProductInCart}
        />
      })
    }
    return result;

  }
}
//Kiểm tra thuộc tính của prop
CartContainer.propsTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      inventory: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired
    }).isRequired
  ).isRequired
}
const mapStateToProps = (state) => {
  return {
    cart: state.cart
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    onDeleteProduct: (product) => {
      dispatch(actions.actRemoveProductInCart(product))
    },
    onChangeMessage: (message) => {
      dispatch(actions.addChangeMessage(message))
    },
    onUpdateProductInCart:(product,quantity)=>{
      dispatch(actions.actUpdateProductInCart(product,quantity))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CartContainer);
