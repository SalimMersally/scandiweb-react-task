import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GET_CATEGORIES } from "./Queries";
import client from "./Client";
import "./App.css";

// Components
import ProductList from "./components/ProductsList";
import Navbar from "./components/Navbar";
import ProductDescription from "./components/ProductDescription";
import Cart from "./components/Cart";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      currency: "",
      categories: [],
      category: "",
    };
  }

  componentDidMount() {
    client
      .query({
        query: GET_CATEGORIES,
      })
      .then((result) =>
        this.setState((prev) => {
          const categories = result.data.categories;
          const category = categories[0].name;
          return { ...prev, categories, category };
        })
      );
  }

  setCurrency = (currency) => {
    this.setState((prev) => {
      return { ...prev, currency };
    });
  };

  addToCart = (product) => {
    this.setState((prev) => {
      const productToAdd = { product, quantity: 1 };
      const cart = [...prev.cart];
      cart.push(productToAdd);
      return { ...prev, cart };
    });
  };

  increaseQunatity = (index) => {
    this.setState((prev) => {
      const cart = [...prev.cart];
      const product = prev.cart[index].product;
      const quantity = prev.cart[index].quantity + 1;
      cart[index] = { product, quantity };
      return { ...prev, cart };
    });
  };

  decreaseQuantity = (index) => {
    if (this.state.cart[index].quantity > 1) {
      this.setState((prev) => {
        const cart = [...prev.cart];
        const product = prev.cart[index].product;
        const quantity = prev.cart[index].quantity - 1;
        cart[index] = { product, quantity };
        return { ...prev, cart };
      });
    } else {
      this.setState((prev) => {
        const cart = prev.cart.filter((item, itemIndex) => {
          return index !== itemIndex;
        });
        return { ...prev, cart };
      });
    }
  };

  setAttribute = (productIndex, attributeIndex, newItemIndex) => {
    this.setState((prev) => {
      const cart = [...prev.cart];
      let product = cart[productIndex].product;
      const selectAttributes = [...product.selectAttributes];
      selectAttributes[attributeIndex] = newItemIndex;
      product = { ...product, selectAttributes };
      const quantity = cart[productIndex].quantity;
      cart[productIndex] = { product, quantity };
      return { ...prev, cart };
    });
  };

  calculateTotal = () => {
    let total = 0;
    let symbol = "";
    this.state.cart.forEach((item) => {
      let price = item.product.prices.filter((p) => {
        return p.currency.label === this.state.currency;
      });
      total = total + item.quantity * price[0].amount;
      symbol = price[0].currency.symbol;
    });
    return symbol + "" + total.toFixed(2);
  };

  setCategory = (category) => {
    this.setState((prev) => {
      return { ...prev, category };
    });
  };

  render() {
    return (
      <Router>
        <Navbar
          setCurrency={this.setCurrency}
          cart={this.state.cart}
          currency={this.state.currency}
          increaseQunatity={this.increaseQunatity}
          decreaseQuantity={this.decreaseQuantity}
          setAttribute={this.setAttribute}
          calculateTotal={this.calculateTotal}
          categories={this.state.categories}
          category={this.state.category}
          setCategory={this.setCategory}
        />
        <Routes>
          <Route
            path="/"
            element={
              <ProductList
                currency={this.state.currency}
                category={this.state.category}
              />
            }
            exact
          ></Route>
          <Route
            path="/product/:productID"
            element={
              <ProductDescription
                currency={this.state.currency}
                addToCart={this.addToCart}
                cart={this.state.cart}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart currency={this.state.currency} cart={this.state.cart} />
            }
          />
        </Routes>
      </Router>
    );
  }
}

export default App;
