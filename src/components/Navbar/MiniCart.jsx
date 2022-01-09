import React, { Component } from "react";
import { Link } from "react-router-dom";

// Styles
import "../../styles/minicart.css";

// Icons
import CartIcon from "../../icons/CartIcon";
import PlusIcon from "../../icons/PlusIcon";
import MinusIcon from "../../icons/MinusIcon";

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
  componentDidUpdate(prevProp) {
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
    return (
      <>
        <div
          className={this.state.showMiniCart ? "miniCartBack" : "hide"}
        ></div>
        <div className="navCart" ref={this.ref}>
          <div className="cartIcon" onClick={this.setShowMiniCart}>
            <CartIcon />
            {
              // show the number of items over the cart icon only if there is itmes
              this.props.cart.length === 0 ? (
                ""
              ) : (
                <div className="cartLength">{this.props.cart.length}</div>
              )
            }
          </div>
          <div className={this.state.showMiniCart ? "miniCartContent" : "hide"}>
            <div className="miniCartHeader">
              <h1>My Bag.&nbsp;</h1>
              <h2>{this.props.cart.length + " items"}</h2>
            </div>
            {this.props.cart.length === 0 ? (
              <div className="cartEmpty">YOUR CART IS EMPTY</div>
            ) : (
              ""
            )}
            {
              // show all items in cart
              this.props.cart.map((item, index) => {
                let price = item.product.prices.filter((p) => {
                  return p.currency.label === this.props.currency;
                });
                return (
                  <div className="miniCartItem" key={item.product.id}>
                    <div className="miniCartItemInfo">
                      <h3>{item.product.brand}</h3>
                      <h3>{item.product.name}</h3>
                      <p>{price[0].currency.symbol + "" + price[0].amount}</p>
                      <div className="miniCartAttributes">
                        {item.product.attributes.map((attribute, index1) => {
                          return (
                            <div
                              className="miniCartAttribute"
                              key={attribute.id}
                            >
                              {attribute.items.map((attributeItem, index2) => {
                                let classN = "";
                                let style = {};
                                if (
                                  item.product.selectAttributes[index1] ===
                                  index2
                                ) {
                                  if (attribute.type === "swatch") {
                                    classN =
                                      "miniCartAttributeSelectedItemSwatch miniCartAttributeItem";
                                  } else {
                                    classN =
                                      "miniCartAttributeSelectedItem miniCartAttributeItem";
                                  }
                                } else {
                                  classN = "miniCartAttributeItem";
                                }
                                if (
                                  attribute.type === "swatch" &&
                                  attributeItem.value === "#000000"
                                ) {
                                  style = {
                                    backgroundColor: attributeItem.value,
                                    color: "white",
                                  };
                                } else if (attribute.type === "swatch") {
                                  style = {
                                    backgroundColor: attributeItem.value,
                                  };
                                }
                                return (
                                  <div
                                    key={index2}
                                    className={classN}
                                    style={style}
                                    onClick={() =>
                                      // this function is provided by App.js
                                      // index is the index of item in cart
                                      // index1 is the index of attribute of this product
                                      // index2 is the selected item in the attribute array
                                      this.props.setAttribute(
                                        index,
                                        index1,
                                        index2
                                      )
                                    }
                                  >
                                    {attributeItem.displayValue}
                                  </div>
                                );
                              })}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="miniCartItemQuantity">
                      <div
                        className="miniCartItemQuantityBox"
                        onClick={() => this.props.increaseQunatity(index)}
                      >
                        <PlusIcon />
                      </div>
                      <p>{item.quantity}</p>
                      <div
                        className="miniCartItemQuantityBox"
                        onClick={() => this.props.decreaseQuantity(index)}
                      >
                        <MinusIcon />
                      </div>
                    </div>
                    <div className="miniCartItemImage">
                      <img
                        src={item.product.gallery[0]}
                        alt={item.product.name}
                      />
                    </div>
                  </div>
                );
              })
            }
            {this.props.cart.length > 0 ? (
              <div className="miniCartTotal">
                <p>Total</p>
                <p className="miniCartTotalAmount">
                  {this.props.calculateTotal()}
                </p>
              </div>
            ) : (
              ""
            )}
            {this.props.cart.length === 0 ? (
              ""
            ) : (
              <div className="miniCartButtons">
                <Link to="/cart" onClick={this.setShowMiniCart}>
                  <button className="viewBagButton">VIEW BAG</button>
                </Link>
                <Link
                  to="/"
                  onClick={() => {
                    this.setShowMiniCart();
                    this.props.checkout();
                  }}
                >
                  <button className="checkoutButton">CHECKOUT</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default MiniCart;
