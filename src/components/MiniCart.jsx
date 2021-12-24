import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/minicart.css";

// Icons
import CartIcon from "../icons/CartIcon";
import PlusIcon from "../icons/PlusIcon";
import MinusIcon from "../icons/MinusIcon";

export class MiniCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMiniCart: false,
    };
  }

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
    if (this.state.showMiniCart && this.props.showCurrencyList) {
      const showMiniCart = !this.state.showMiniCart;
      this.setState((prev) => {
        return { ...prev, showMiniCart };
      });
    }
  }

  setShowMiniCart = () => {
    const showMiniCart = !this.state.showMiniCart;
    this.setState((prev) => {
      return { ...prev, showMiniCart };
    });
    this.props.closeCurrencyListIfOpen();
  };

  render() {
    return (
      <div className="navCart">
        <div className="cartIcon" onClick={this.setShowMiniCart}>
          <CartIcon />
          {this.props.cart.length === 0 ? (
            ""
          ) : (
            <div className="cartLength">{this.props.cart.length}</div>
          )}
        </div>
        <div
          className="miniCart"
          style={this.state.showMiniCart ? { display: "block" } : {}}
        >
          <div className="miniCartContent">
            <div className="miniCartHeader">
              <h1>My Bag.&nbsp;</h1>
              <h2>{this.props.cart.length + " items"}</h2>
            </div>
            {this.props.cart.length === 0 ? (
              <div className="cartEmpty">YOUR CART IS EMPTY</div>
            ) : (
              ""
            )}
            {this.props.cart.map((item, index) => {
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
                          <div className="miniCartAttribute" key={attribute.id}>
                            {attribute.items.map((attributeItem, index2) => {
                              let classN = "";
                              let style = {};
                              if (
                                item.product.selectAttributes[index1] === index2
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
            })}
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
      </div>
    );
  }
}

export default MiniCart;
