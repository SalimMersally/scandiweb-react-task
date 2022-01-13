import React, { Component } from "react";

// components
import ItemAttribute from "./ItemAttribute";
import ItemImage from "./ItemImage";
import ItemQuantity from "./ItemQuantity";

export class CartItem extends Component {
  render() {
    const { index, item, price, increaseQuantity, decreaseQuantity } =
      this.props;

    const { product, quantity } = item;
    const { id, name, brand, attributes, gallery, selectedAttributes } =
      product;

    return (
      <div className="cartItem" key={item.product.id}>
        <div className="cartItemInfo">
          <h3>{brand}</h3>
          <h4>{name}</h4>
          <p>{price.currency.symbol + "" + price.amount}</p>
          <div className="miniCartAttributes">
            {attributes.map((attribute, attIndex) => {
              return (
                <ItemAttribute
                  key={id + " attribute " + attIndex}
                  attribute={attribute}
                  attIndex={attIndex}
                  selectedAttributes={selectedAttributes}
                />
              );
            })}
          </div>
        </div>
        <div className="ImageAndQuantity">
          <ItemQuantity
            index={index}
            quantity={quantity}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
          />
          <ItemImage gallery={gallery} id={id} />
        </div>
      </div>
    );
  }
}

export default CartItem;
