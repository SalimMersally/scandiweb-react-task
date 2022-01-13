import React, { Component } from "react";

// Icons
import PlusIcon from "../../icons/PlusIcon";
import MinusIcon from "../../icons/MinusIcon";

export class ItemQuantity extends Component {
  render() {
    const { index, quantity, increaseQuantity, decreaseQuantity } = this.props;

    return (
      <div className="cartItemQuantity">
        <div
          className="cartItemQuantityBox"
          onClick={() => increaseQuantity(index)}
        >
          <PlusIcon />
        </div>
        <p>{quantity}</p>
        <div
          className="cartItemQuantityBox"
          onClick={() => decreaseQuantity(index)}
        >
          <MinusIcon />
        </div>
      </div>
    );
  }
}

export default ItemQuantity;
