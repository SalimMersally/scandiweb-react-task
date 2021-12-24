import React, { Component } from "react";
import { GET_PRODUCTS } from "../Queries";
import client from "../Client";
import "../styles/productList.css";

// components
import Product from "./Product";

export class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    client
      .query({
        query: GET_PRODUCTS,
        variables: {
          category: this.props.category,
        },
      })
      .then((result) =>
        this.setState((prev) => {
          let products = result.data.category.products;
          return { ...prev, products };
        })
      );
  }

  componentDidUpdate(prevProps) {
    if (this.props.category !== prevProps.category) {
      client
        .query({
          query: GET_PRODUCTS,
          variables: {
            category: this.props.category,
          },
        })
        .then((result) =>
          this.setState((prev) => {
            let products = result.data.category.products;
            return { ...prev, products };
          })
        );
    }
  }

  setCategory = (selectedCategory) => {
    this.setState((prev) => {
      return { ...prev, selectedCategory };
    });
  };

  render() {
    return (
      <div>
        <div className="category">
          Category: <span>{this.props.category.toUpperCase()}</span>
        </div>
        <div className="itemsList">
          {this.state.products.map((product) => {
            return (
              <Product
                product={product}
                key={product.id}
                currency={this.props.currency}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default ProductsList;
