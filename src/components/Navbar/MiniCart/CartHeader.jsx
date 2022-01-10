import React, { Component } from "react";

export class CartHeader extends Component {
  render() {
    const { length } = this.props;

    return (
      <>
        <div className="miniCartHeader">
          <h1>My Bag.&nbsp;</h1>
          <h2>{length + " items"}</h2>
        </div>
        {length === 0 ? (
          <div className="cartEmpty">YOUR CART IS EMPTY</div>
        ) : (
          ""
        )}
      </>
    );
  }
}

export default CartHeader;
