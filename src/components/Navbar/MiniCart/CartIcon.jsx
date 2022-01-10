import React, { Component } from "react";

// Icons
import { CartIcon as Icon } from "../../../icons/CartIcon";

export class CartIcon extends Component {
  render() {
    const { length, setShowMiniCart } = this.props;
    // show the number of items over the cart icon only if there is itmes

    return (
      <div className="cartIcon" onClick={setShowMiniCart}>
        <Icon />
        {length === 0 ? "" : <div className="cartLength">{length}</div>}
      </div>
    );
  }
}

export default CartIcon;
