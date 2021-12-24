import React, { Component } from "react";
import { Link } from "react-router-dom";
import WithRouter from "./WithRouter";
import { GET_PRODUCT } from "../Queries";
import client from "../Client";
import "../styles/productDescription.css";

export class ProductDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {
        gallery: [],
        prices: [],
        attributes: [],
      },
      currentImage: "",
      currentPrice: {
        amount: "",
        currency: {
          Symbol: "",
          label: "",
        },
      },
      selectedAttribute: [],
      productInCart: false,
    };
  }

  componentDidMount() {
    client
      .query({
        query: GET_PRODUCT,
        variables: { id: this.props.params.productID },
      })
      .then((result) => {
        const product = result.data.product;
        const currentImage = result.data.product.gallery[0];
        let currentPrice = result.data.product.prices.filter((p) => {
          return p.currency.label === this.props.currency;
        });
        currentPrice = currentPrice[0];
        const selectedAttribute = result.data.product.attributes.map(
          (attribue) => 0
        );
        let productInCart = false;
        const filtered = this.props.cart.filter((item) => {
          return item.product.id === product.id;
        });
        if (filtered.length !== 0) {
          productInCart = true;
        }
        this.setState({
          product,
          currentImage,
          currentPrice,
          selectedAttribute,
          productInCart,
        });
      })
      .catch((error) => console.log(error));
  }

  componentDidUpdate(prevProp) {
    if (this.props.currency !== prevProp.currency) {
      let currentPrice = this.state.product.prices.filter((p) => {
        return p.currency.label === this.props.currency;
      });
      currentPrice = currentPrice[0];
      if (currentPrice) {
        this.setState((prev) => {
          return { ...prev, currentPrice };
        });
      }
    }
    if (this.props.cart !== prevProp.cart) {
      let productInCart = false;
      const filtered = this.props.cart.filter((item) => {
        return item.product.id === this.state.product.id;
      });
      if (filtered.length !== 0) {
        productInCart = true;
      }
      this.setState((prev) => {
        return { ...prev, productInCart };
      });
    }
  }

  setImage = (currentImage) => {
    this.setState((prev) => {
      return { ...prev, currentImage };
    });
  };

  selectAttribute = (index1, index2) => {
    let selectedAttribute = this.state.selectedAttribute;
    selectedAttribute[index1] = index2;
    this.setState((prev) => {
      return { ...prev, selectedAttribute };
    });
  };

  add = () => {
    const filtered = this.props.cart.filter((item) => {
      return item.product.id === this.state.product.id;
    });
    if (filtered.length === 0) {
      const selectAttributes = this.state.selectedAttribute;
      const product = { ...this.state.product, selectAttributes };
      this.props.addToCart(product);
    }
  };

  render() {
    return (
      <div className="productDesc">
        <div className="imageList">
          {this.state.product.gallery.map((url, index) => {
            return (
              <img
                src={url}
                key={index}
                alt={this.state.name + "image " + index}
                onClick={(e) => this.setImage(url)}
              />
            );
          })}
        </div>
        <div className="productImage">
          <img
            src={this.state.currentImage}
            alt={this.state.name + "big image"}
          />
        </div>
        <div className="productInfo">
          <h1>{this.state.product.brand}</h1>
          <h2>{this.state.product.name}</h2>
          <div className="productAttributes">
            {this.state.product.attributes.map((attribute, index1) => {
              return (
                <div className="attribute" key={attribute.id}>
                  <h2>{attribute.name}:</h2>
                  <div className="attributeItems">
                    {attribute.items.map((item, index2) => {
                      let classN = "attributeItem";
                      let style = {};
                      if (
                        attribute.type === "swatch" &&
                        item.value === "#000000"
                      ) {
                        style = {
                          backgroundColor: item.value,
                          color: "white",
                        };
                        if (index2 === this.state.selectedAttribute[index1]) {
                          classN += " swatchSelectedAttribute";
                        }
                      } else if (attribute.type === "swatch") {
                        style = {
                          backgroundColor: item.value,
                        };
                        if (index2 === this.state.selectedAttribute[index1]) {
                          classN += " swatchSelectedAttribute";
                        }
                      } else {
                        if (index2 === this.state.selectedAttribute[index1]) {
                          classN += " selectedAttribute";
                        }
                      }
                      return (
                        <div
                          key={item.id}
                          className={classN}
                          onClick={() => this.selectAttribute(index1, index2)}
                          style={style}
                        >
                          {item.displayValue}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="productInfoPrice">
            <h2>PRICE: </h2>
            <p>
              {this.state.currentPrice.currency.symbol +
                "" +
                this.state.currentPrice.amount}
            </p>
          </div>
          {this.state.productInCart ? (
            <div className="productInCart">PRODUCT ALREADY IN CART</div>
          ) : (
            <Link to="/">
              <button onClick={this.add}>ADD TO CART</button>
            </Link>
          )}

          <div
            className="productDescription"
            dangerouslySetInnerHTML={{ __html: this.state.product.description }}
          ></div>
        </div>
      </div>
    );
  }
}

export default WithRouter(ProductDescription);
