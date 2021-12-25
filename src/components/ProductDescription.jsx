import React, { Component } from "react";
import { Link } from "react-router-dom";
import WithRouter from "./WithRouter";

// Queries
import { GET_PRODUCT } from "../Queries";
import client from "../Client";

// Styles
import "../styles/productDescription.css";

export class ProductDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {
        // the product fetch based on the params in url
        gallery: [], // arrays of product images' url
        prices: [], // arrays of product prices in different currencies
        attributes: [], // arrays of product attributes
      },
      currentImage: "", // the current select image url
      currentPrice: {
        // the current price mapped from the prices array based on prop
        amount: "",
        currency: {
          Symbol: "",
          label: "",
        },
      },
      selectedAttribute: [], // the index of the selected attributes
      productInCart: false,
    };
  }

  // fetch the product based on the param in url
  // select price based on the prop by mapping prices array
  // select the first attribute (mapped is used to set 0 based on attributes lenght)
  // check if product is in cart by filtering on id
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

  // if currency props changed we update the selected currency in the state
  // if cart props changed and the item was in the cart and then removed
  // we changed the boolean value in state
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

  // change the current image url
  setImage = (currentImage) => {
    this.setState((prev) => {
      return { ...prev, currentImage };
    });
  };

  // select and attribute from the attribute array
  // index 1 is the attribute index, since we might have multiple attribute
  // index 2 is the index of the selected item of an attribute
  // selected attribute is an array of index2 placed at index1
  selectAttribute = (index1, index2) => {
    let selectedAttribute = this.state.selectedAttribute;
    selectedAttribute[index1] = index2;
    this.setState((prev) => {
      return { ...prev, selectedAttribute };
    });
  };

  // add product to cart with selected attributes
  // function addToCart is provided from App.js
  add = () => {
    const selectAttributes = this.state.selectedAttribute;
    const product = { ...this.state.product, selectAttributes };
    this.props.addToCart(product);
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
            {/* We have an attributes array with each attribute having an items array */}
            {this.state.product.attributes.map((attribute, index1) => {
              return (
                <div className="attribute" key={attribute.id}>
                  <h2>{attribute.name}:</h2>
                  <div className="attributeItems">
                    {attribute.items.map((item, index2) => {
                      let classN = "attributeItem";
                      let style = {};
                      // check if it is swatch to style it different based on the color
                      if (
                        attribute.type === "swatch" &&
                        item.value === "#000000"
                      ) {
                        style = {
                          backgroundColor: item.value,
                          color: "white", // set it white to see the text
                        };
                      } else if (attribute.type === "swatch") {
                        style = {
                          backgroundColor: item.value, // else we can have black text
                        };
                      }
                      // check if this is the selected one to change it is style
                      if (index2 === this.state.selectedAttribute[index1]) {
                        if (attribute.type === "swatch") {
                          classN += " swatchSelectedAttribute";
                        } else {
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
            // if product is already in cart we don't want to added again
            <div className="productInCart">PRODUCT ALREADY IN CART</div>
          ) : (
            // if the item is added to cart, we go back to product list page
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
