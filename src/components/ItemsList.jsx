import React, { Component } from "react";
import { GET_CATEGORIES, GET_PRODUCTS } from "../Queries";
import client from "../Client";

// components
import Item from "./Item";

export class ItemsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      selectedCategory: "all",
      products: [],
    };
  }

  componentDidMount() {
    client
      .query({
        query: GET_CATEGORIES,
      })
      .then((result) =>
        this.setState((prev) => {
          let categories = result.data.categories;
          let newState = { ...prev, categories };
          return newState;
        })
      );
    client
      .query({
        query: GET_PRODUCTS,
        variables: {
          category: this.state.selectedCategory,
        },
      })
      .then((result) =>
        this.setState((prev) => {
          let products = result.data.category.products;
          return { ...prev, products };
        })
      );
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedCategory !== prevState.selectedCategory) {
      client
        .query({
          query: GET_PRODUCTS,
          variables: {
            category: this.state.selectedCategory,
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
        <div>
          <select onChange={(e) => this.setCategory(e.target.value)}>
            {this.state.categories.map((category, index) => {
              return <option key={index}>{category.name}</option>;
            })}
          </select>
        </div>
        <div className="itemsList">
          {this.state.products.map((item) => {
            return <Item item={item} key={item.id} />;
          })}
        </div>
      </div>
    );
  }
}

export default ItemsList;
