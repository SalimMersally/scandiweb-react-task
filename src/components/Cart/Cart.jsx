import React, { Component } from "react";

// Components
import CartItem from "./CartItem";

// Styles
import "../../styles/cart.css";

export class Cart extends Component {
  // this component is very simillar to miniCart
  // we don't have here the total price and the buttons
  // also we can here change the image displayed

  render() {
    const { cart, currency, increaseQuantity, decreaseQuantity } = this.props;

    return (
      <div className="cart">
        <div className="cartHeader">CART</div>
        {cart.map((item, index) => {
          let price = item.product.prices.filter((p) => {
            return p.currency.label === currency;
          });

          return (
            <CartItem
              key={item.product.id + " " + index}
              index={index}
              item={item}
              price={price[0]}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
            />
          );
        })}
      </div>
    );
  }
}

export default Cart;
