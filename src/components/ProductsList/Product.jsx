import React, { Component } from "react";
import { Link } from "react-router-dom";

// Queries
import { GET_PRODUCT } from "../../Queries";
import client from "../../Client";

// Icons
import CartIcon from "../../icons/CartIcon";

export class Product extends Component {
  // The item in the list are not fetched with all values
  // when adding them to cart we need them all
  // so we fetch the specific product by id and get all it values
  // then add it to cart
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
    const price = prices.find((p) => {
      return p.currency.label === this.props.currentCurrency;
    });

    return (
      <div className="gridItem">
        <Link to={"/product/" + id}>
          <div className={inStock ? "productItem" : "productItemDisabled"}>
            <img src={gallery[0]} alt={name} />
            <div className="productName">{name}</div>
            <div className="productPrice">
              {price.currency.symbol + "" + price.amount}
            </div>
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
