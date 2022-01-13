import React, { Component } from "react";

// Components
import ItemQuantity from "./ItemQuantity";
import ItemAttribute from "./ItemAttribute";

export class CartItem extends Component {
  render() {
    const { item, index, currentCurrency, increaseQuantity, decreaseQuantity } =
      this.props;
    const { product, quantity } = item;
    const { brand, name, attributes, gallery, prices, selectedAttributes } =
      product;

    let price = prices.filter((p) => {
      return p.currency.label === currentCurrency;
    });
    price = price[0];

    return (
      <div className="miniCartItem">
        <div className="miniCartItemInfo">
          <h3>{brand}</h3>
          <h3>{name}</h3>
          <p>{price.currency.symbol + "" + price.amount}</p>
          <div className="miniCartAttributes">
            {attributes.map((attribute, index) => {
              return (
                <ItemAttribute
                  attribute={attribute}
                  index={index}
                  selectedAttributes={selectedAttributes}
                  key={attribute.id}
                />
              );
            })}
          </div>
        </div>
        <ItemQuantity
          quantity={quantity}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          index={index}
        />
        <div className="miniCartItemImage">
          <img src={gallery[0]} alt={name} />
        </div>
      </div>
    );
  }
}

export default CartItem;
