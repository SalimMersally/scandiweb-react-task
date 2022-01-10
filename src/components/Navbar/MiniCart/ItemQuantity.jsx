import React, { Component } from "react";

// Icons
import PlusIcon from "../../../icons/PlusIcon";
import MinusIcon from "../../../icons/MinusIcon";

export class ItemQuantity extends Component {
  render() {
    const { quantity, increaseQunatity, decreaseQuantity, index } = this.props;

    return (
      <div className="miniCartItemQuantity">
        <div
          className="miniCartItemQuantityBox"
          onClick={() => increaseQunatity(index)}
        >
          <PlusIcon />
        </div>
        <p>{quantity}</p>
        <div
          className="miniCartItemQuantityBox"
          onClick={() => decreaseQuantity(index)}
        >
          <MinusIcon />
        </div>
      </div>
    );
  }
}

export default ItemQuantity;
