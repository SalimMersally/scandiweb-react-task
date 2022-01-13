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
            {attributes.map((attribute, attIndex) => {
              return (
                <ItemAttribute
                  attribute={attribute}
                  attIndex={attIndex}
                  selectedAttributes={selectedAttributes}
                  key={attribute.id}
                />
              );
            })}
          </div>
        </div>
        <ItemQuantity
          index={index}
          quantity={quantity}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
        />
        <div className="miniCartItemImage">
          <img src={gallery[0]} alt={name} />
        </div>
      </div>
    );
  }
}

export default CartItem;
