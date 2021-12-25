import React, { Component } from "react";

// Styles
import "../styles/cart.css";

// Icons
import PlusIcon from "../icons/PlusIcon";
import MinusIcon from "../icons/MinusIcon";
import RightArrow from "../icons/RightArrow";
import LeftArrow from "../icons/LeftArrow";

export class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: [],
    };
  }

  // this component is very simillar to miniCart
  // we don't have here the total price and the buttons
  // also we can here change the image displayed

  // by default we display the first image for all items
  componentDidMount() {
    this.setState((prev) => {
      const currentImage = this.props.cart.map((item) => {
        return 0;
      });
      return { ...prev, currentImage };
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.cart !== prevProps.cart) {
      this.setState((prev) => {
        const currentImage = this.props.cart.map((item) => {
          return 0;
        });
        return { ...prev, currentImage };
      });
    }
  }

  // go the next image of item at cart[index]
  // if this is the last image go back to the first
  nextImage = (index) => {
    if (
      this.state.currentImage[index] <
      this.props.cart[index].product.gallery.length - 1
    ) {
      this.setState((prev) => {
        const currentImage = [...prev.currentImage];
        currentImage[index] = currentImage[index] + 1;
        return { ...prev, currentImage };
      });
    } else {
      this.setState((prev) => {
        const currentImage = [...prev.currentImage];
        currentImage[index] = 0;
        return { ...prev, currentImage };
      });
    }
  };

  // go the the previous image of item at cart[index]
  // if this is the first go the last item
  prevImage = (index) => {
    if (this.state.currentImage[index] > 0) {
      this.setState((prev) => {
        const currentImage = [...prev.currentImage];
        currentImage[index] = currentImage[index] - 1;
        return { ...prev, currentImage };
      });
    } else {
      this.setState((prev) => {
        const currentImage = [...prev.currentImage];
        currentImage[index] = this.props.cart[index].product.gallery.length - 1;
        return { ...prev, currentImage };
      });
    }
  };

  render() {
    return (
      <div className="cart">
        <div className="cartHeader">CART</div>
        {this.props.cart.map((item, index) => {
          let price = item.product.prices.filter((p) => {
            return p.currency.label === this.props.currency;
          });
          return (
            <div className="cartItem" key={item.product.id}>
              <div className="cartItemInfo">
                <h3>{item.product.brand}</h3>
                <h4>{item.product.name}</h4>
                <p>{price[0].currency.symbol + "" + price[0].amount}</p>
                <div className="miniCartAttributes">
                  {item.product.attributes.map((attribute, index1) => {
                    return (
                      <div className="cartAttribute" key={attribute.id}>
                        {attribute.items.map((attributeItem, index2) => {
                          let classN = "";
                          let style = {};
                          if (
                            item.product.selectAttributes[index1] === index2
                          ) {
                            if (attribute.type === "swatch") {
                              classN =
                                "cartAttributeSelectedItemSwatch cartAttributeItem";
                            } else {
                              classN =
                                "cartAttributeSelectedItem cartAttributeItem";
                            }
                          } else {
                            classN = "cartAttributeItem";
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
                                this.props.setAttribute(index, index1, index2)
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
              <div className="cartItemImQ">
                <div className="cartItemQuantity">
                  <div
                    className="cartItemQuantityBox"
                    onClick={() => this.props.increaseQunatity(index)}
                  >
                    <PlusIcon />
                  </div>
                  <p>{item.quantity}</p>
                  <div
                    className="cartItemQuantityBox"
                    onClick={() => this.props.decreaseQuantity(index)}
                  >
                    <MinusIcon />
                  </div>
                </div>
                <div className="cartItemImage">
                  <div
                    className="leftArrow"
                    onClick={() => this.prevImage(index)}
                  >
                    <LeftArrow />
                  </div>
                  <img
                    src={item.product.gallery[this.state.currentImage[index]]}
                    alt={item.product.name}
                  />
                  <div
                    className="rightArrow"
                    onClick={() => this.nextImage(index)}
                  >
                    <RightArrow />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Cart;
