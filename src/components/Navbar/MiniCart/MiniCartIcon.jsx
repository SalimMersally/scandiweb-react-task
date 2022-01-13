import React, { Component } from "react";

// Icons
import { CartIcon } from "../../../icons/CartIcon";

export class MiniCartIcon extends Component {
  render() {
    const { length, setShowMiniCart } = this.props;
    // show the number of items over the cart icon only if there is itmes

    return (
      <div className="miniCartButton">
        <div className="cartIcon" onClick={setShowMiniCart}>
          <CartIcon />
          {length === 0 ? "" : <div className="cartLength">{length}</div>}
        </div>
      </div>
    );
  }
}

export default MiniCartIcon;
