import React, { Component } from "react";
import { Link } from "react-router-dom";

// Queries
import { GET_PRODUCT } from "../../Queries";
import client from "../../Client";

// Icons
import CartIcon from "../../icons/CartIcon";

export class Product extends Component {
  addToCart = () => {
    client
      .query({
        query: GET_PRODUCT,
        variables: { id: this.props.product.id },
      })
      .then((result) => {
        const product = result.data.product;
        let selectedAttributes = [];

        if (product.attributes) {
          selectedAttributes = Array(product.attributes.length).fill(0);
        }

        this.props.addToCart({ ...product, selectedAttributes });
      })
      .catch((error) => console.log(error));
  };

  render() {
    const { prices, gallery, name, id, inStock } = this.props.product;

    // filter the current price from the prices array
    const price = prices.filter((p) => {
      return p.currency.label === this.props.currentCurrency;
    });

    return (
      <div className="gridItem">
        <Link to={"/product/" + id}>
          <div className={inStock ? "productItem" : "productItemDisabled"}>
            <img src={gallery[0]} alt={name} />
            <div className="productName">{name}</div>
            {price[0] ? (
              <div className="productPrice">
                {price[0].currency.symbol + "" + price[0].amount}
              </div>
            ) : (
              ""
            )}
            {inStock ? "" : <div className="outStock">OUT OF STOCK</div>}
          </div>
        </Link>
        {inStock ? (
          <div className="addToCart" onClick={this.addToCart}>
            <CartIcon />
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Product;
