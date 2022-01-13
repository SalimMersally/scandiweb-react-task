import React, { Component } from "react";

//Queries
import { GET_PRODUCTS } from "../../Queries";
import client from "../../Client";

// Styles
import "../../styles/productList.css";

// components
import Product from "./Product";

export class ProductsList extends Component {
  constructor(props) {
    super(props);
    // products is an array with all product fetched
    this.state = {
      products: [],
    };
  }

  // fetch all product on mount based on the prop provided
  componentDidMount() {
    client
      .query({
        query: GET_PRODUCTS,
        variables: {
          category: this.props.currentCategory,
        },
      })
      .then((result) =>
        this.setState(() => {
          let products = result.data.category.products;
          return { products };
        })
      )
      .catch((error) => console.log(error));
  }

  // refetch all the products if prop changed
  // meaning user changed the category
  componentDidUpdate(prevProps) {
    if (this.props.currentCategory !== prevProps.currentCategory) {
      client
        .query({
          query: GET_PRODUCTS,
          variables: {
            category: this.props.currentCategory,
          },
        })
        .then((result) =>
          this.setState(() => {
            let products = result.data.category.products;
            return { products };
          })
        )
        .catch((error) => console.log(error));
    }
  }

  render() {
    return (
      <div>
        <div className="category">
          Category: <span>{this.props.currentCategory.toUpperCase()}</span>
        </div>
        <div className="itemsList">
          {this.state.products.map((product) => {
            return (
              <Product
                product={product}
                key={product.id}
                currency={this.props.currency}
                addToCart={this.props.addToCart}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default ProductsList;
