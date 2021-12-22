import React, { Component } from "react";
import WithRouter from "./WithRouter";
import { GET_PRODUCT } from "../Queries";
import client from "../Client";

export class ProductDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {
        gallery: [],
        prices: [],
      },
      currentImage: "",
      currentPrice: {
        amount: "",
        currency: {
          Symbol: "",
          label: "",
        },
      },
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
        this.setState({ product, currentImage, currentPrice });
      });
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
  }

  setImage = (currentImage) => {
    this.setState((prev) => {
      return { ...prev, currentImage };
    });
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
          <div className="productInfoPrice">
            <h2>PRICE: </h2>
            <p>
              {this.state.currentPrice.currency.symbol +
                "" +
                this.state.currentPrice.amount}
            </p>
          </div>
          <button>ADD TO CART</button>
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
