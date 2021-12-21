import React, { Component } from "react";

// Icons
import CartIcon from "../Icons/CartIcon";

export class Product extends Component {
  render() {
    const { product } = this.props;
    const price = product.prices.filter((p) => {
      return p.currency.label === this.props.currency;
    });

    return (
      <div className={product.inStock ? "productItem" : "productItemDisabled"}>
        <img src={product.gallery[0]} alt={product.name} />
        <div className="productName">{product.name}</div>
        <div className="productPrice">
          {price[0].currency.symbol + "" + price[0].amount}
        </div>
        <div className="addToCart">
          <CartIcon />
        </div>
        {product.inStock ? "" : <div className="outStock">OUT OF STOCK</div>}
      </div>
    );
  }
}

export default Product;
