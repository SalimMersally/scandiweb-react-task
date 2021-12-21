import React, { Component } from "react";

// Icons
import Cart from "../Icons/Cart";

export class Item extends Component {
  render() {
    const { item } = this.props;
    const price = item.prices.filter((p) => {
      return p.currency.label === this.props.currency;
    });

    return (
      <div className={item.inStock ? "productItem" : "productItemDisabled"}>
        <img src={item.gallery[0]} alt={item.name} />
        <div className="productName">{item.name}</div>
        <div className="productPrice">
          {price[0].currency.symbol + "" + price[0].amount}
        </div>
        <div className="addToCart">
          <Cart />
        </div>
        {item.inStock ? "" : <div className="outStock">OUT OF STOCK</div>}
      </div>
    );
  }
}

export default Item;
