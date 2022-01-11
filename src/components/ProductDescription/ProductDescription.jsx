import React, { Component } from "react";
import WithRouter from "../WithRouter";

// Queries
import { GET_PRODUCT } from "../../Queries";
import client from "../../Client";

// Components
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";

// Styles
import "../../styles/productDescription.css";

export class ProductDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {
        gallery: [],
        prices: [],
        attributes: [],
      },
      selectedAttributes: [], // the index of the selected attributes
    };
  }

  // fetch the product based on the param in url
  // select the first attribute (mapp is used to set 0s based on attributes length)
  componentDidMount() {
    client
      .query({
        query: GET_PRODUCT,
        variables: { id: this.props.params.productID },
      })
      .then((result) => {
        const product = result.data.product;
        let selectedAttributes = [];

        if (product.attributes) {
          selectedAttributes = Array(product.attributes.length).fill(0);
        }

        this.setState({
          product,
          selectedAttributes,
        });
      })
      .catch((error) => console.log(error));
  }

  // select an attribute from the attribute array
  selectAttribute = (attIndex, itemIndex) => {
    let selectedAttributes = [...this.state.selectedAttributes];
    selectedAttributes[attIndex] = itemIndex;
    this.setState((prev) => {
      return { ...prev, selectedAttributes };
    });
  };

  // add product to cart with selected attributes
  // function addToCart is provided from App.js
  addToCart = () => {
    const selectAttributes = this.state.selectedAttributes;
    const product = { ...this.state.product, selectAttributes };
    this.props.addToCart(product);
  };

  render() {
    const {
      id,
      name,
      brand,
      attributes,
      description,
      inStock,
      prices,
      gallery,
    } = this.state.product;
    const { currency } = this.props;

    let currentPrice = prices.filter((p) => {
      return p.currency.label === currency;
    });
    currentPrice = currentPrice[0];

    return (
      <div className="productDesc">
        <ProductImages gallery={gallery} name={name} />
        <ProductInfo
          id={id}
          brand={brand}
          name={name}
          attributes={attributes}
          description={description}
          inStock={inStock}
          price={currentPrice}
          selectedAttributes={this.state.selectedAttributes}
          selectAttribute={this.selectAttribute}
          addToCart={this.addToCart}
        />
      </div>
    );
  }
}

export default WithRouter(ProductDescription);
