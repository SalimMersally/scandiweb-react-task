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
      product: {},
      selectedAttributes: [], // the index of the selected attributes
      fetched: false,
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
        const fetched = true;
        let selectedAttributes = [];

        // by default we select the first item of each attribute
        if (product.attributes) {
          selectedAttributes = Array(product.attributes.length).fill(0);
        }

        this.setState({
          product,
          selectedAttributes,
          fetched,
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
    const selectedAttributes = this.state.selectedAttributes;
    const product = { ...this.state.product, selectedAttributes };
    this.props.addToCart(product);
  };

  render() {
    if (!this.state.fetched) {
      return "";
    }

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
    const { currentCurrency } = this.props;

    let price = prices.find((p) => {
      return p.currency.label === currentCurrency;
    });

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
          price={price}
          selectedAttributes={this.state.selectedAttributes}
          selectAttribute={this.selectAttribute}
          addToCart={this.addToCart}
        />
      </div>
    );
  }
}

export default WithRouter(ProductDescription);
