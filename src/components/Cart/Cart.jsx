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
    const { cart, currentCurrency, increaseQuantity, decreaseQuantity } =
      this.props;

    return (
      <div className="cart">
        <div className="cartHeader">CART</div>
        {cart.map((item, index) => {
          let price = item.product.prices.find((p) => {
            return p.currency.label === currentCurrency;
          });

          return (
            <CartItem
              key={item.product.id + " " + index}
              index={index}
              item={item}
              price={price}
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
