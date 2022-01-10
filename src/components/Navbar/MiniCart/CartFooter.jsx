import React, { Component } from "react";
import { Link } from "react-router-dom";

export class CartFooter extends Component {
  render() {
    const { length, checkout, calculateTotal, setShowMiniCart } = this.props;

    if (length === 0) return "";

    return (
      <div>
        <div className="miniCartTotal">
          <p>Total</p>
          <p className="miniCartTotalAmount">{calculateTotal()}</p>
        </div>
        <div className="miniCartButtons">
          <Link to="/cart" onClick={setShowMiniCart}>
            <button className="viewBagButton">VIEW BAG</button>
          </Link>
          <Link
            to="/"
            onClick={() => {
              setShowMiniCart();
              checkout();
            }}
          >
            <button className="checkoutButton">CHECKOUT</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default CartFooter;
