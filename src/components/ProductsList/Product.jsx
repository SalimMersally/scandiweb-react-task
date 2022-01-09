import React, { Component } from "react";
import { Link } from "react-router-dom";

// Icons
import CartIcon from "../../icons/CartIcon";

export class Product extends Component {
  render() {
    const { product } = this.props;
    // filter the current price from the prices array
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
        <Link to={"/product/" + product.id}>
          <div className="addToCart">
            <CartIcon />
          </div>
        </Link>
        {product.inStock ? "" : <div className="outStock">OUT OF STOCK</div>}
      </div>
    );
  }
}

export default Product;
