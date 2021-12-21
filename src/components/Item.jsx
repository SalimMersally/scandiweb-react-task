import React, { Component } from "react";

// Icons
import Cart from "../Icons/Cart";

export class Item extends Component {
  render() {
    const { item } = this.props;
    return (
      <div className="productItem">
        <img src={item.gallery[0]} alt={item.name} />
        <div className="productName">{item.name}</div>
        <div className="productPrice">
          {item.prices[0].currency.symbol + "" + item.prices[0].amount}
        </div>
        <div className="addToCart">
          <Cart />
        </div>
      </div>
    );
  }
}

export default Item;
