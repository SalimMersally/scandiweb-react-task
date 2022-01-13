import React, { Component } from "react";

// Styles
import "../../../styles/minicart.css";

// components
import MiniCartIcon from "./MiniCartIcon";
import CartHeader from "./CartHeader";
import CartItem from "./CartItem";
import CartFooter from "./CartFooter";

export class MiniCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMiniCart: false,
    };
    // reference of this component
    this.ref = React.createRef();
  }

  // we add an event listener to the document to check for outside clicks
  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside.bind(this));
  }

  // if state change meaning we want to open or close the miniCart
  // we change the body style to unallow scrolling
  componentDidUpdate() {
    if (this.state.showMiniCart) {
      document.body.style.position = "fixed";
      document.body.style.overflowY = "scroll";
      document.body.style.left = "0";
      document.body.style.right = "0";
    } else {
      document.body.style.position = "static";
      document.body.style.overflowY = "auto";
    }
  }

  // remove event listener
  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside.bind(this));
  }

  // open and close miniCart
  setShowMiniCart = () => {
    const showMiniCart = !this.state.showMiniCart;
    this.setState((prev) => {
      return { ...prev, showMiniCart };
    });
  };

  // if the user click and the click is outside
  // and the currency list is shown, we close it
  handleClickOutside(event) {
    if (this.ref.current && !this.ref.current.contains(event.target)) {
      if (this.state.showMiniCart) {
        this.setShowMiniCart();
      }
    }
  }

  render() {
    const {
      cart,
      currency,
      increaseQunatity,
      decreaseQuantity,
      calculateTotal,
      checkout,
    } = this.props;

    return (
      <>
        <div
          className={this.state.showMiniCart ? "miniCartBack" : "hide"}
        ></div>
        <div className="navCart" ref={this.ref}>
          <MiniCartIcon
            length={cart.length}
            setShowMiniCart={this.setShowMiniCart}
          />
          <div className={this.state.showMiniCart ? "miniCartContent" : "hide"}>
            <CartHeader length={cart.length} />
            {
              // show all items in cart
              cart.map((item, index) => {
                return (
                  <CartItem
                    key={"CartItem: " + index}
                    item={item}
                    currency={currency}
                    index={index}
                    increaseQunatity={increaseQunatity}
                    decreaseQuantity={decreaseQuantity}
                  />
                );
              })
            }
            <CartFooter
              length={cart.length}
              checkout={checkout}
              calculateTotal={calculateTotal}
              setShowMiniCart={this.setShowMiniCart}
            />
          </div>
        </div>
      </>
    );
  }
}

export default MiniCart;
