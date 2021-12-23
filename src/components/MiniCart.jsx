import React, { Component } from "react";

// Icons
import CartIcon from "../Icons/CartIcon";
import PlusIcon from "../Icons/PlusIcon";
import MinusIcon from "../Icons/MinusIcon";

export class MiniCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMiniCart: false,
    };
  }

  componentDidUpdate(prevProp) {
    if (this.state.showMiniCart) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }

  setShowMiniCart = () => {
    const showMiniCart = !this.state.showMiniCart;
    this.setState((prev) => {
      return { ...prev, showMiniCart };
    });
  };

  render() {
    return (
      <div className="navCart">
        <div className="cartIcon" onClick={this.setShowMiniCart}>
          <CartIcon />
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
            {this.props.cart.map((item, index) => {
              let price = item.product.prices.filter((p) => {
                return p.currency.label === this.props.currency;
              });
              return (
                <div className="miniCartItem" key={index}>
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
                                  key={item.id}
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
          </div>
        </div>
      </div>
    );
  }
}

export default MiniCart;
