import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
    };
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
    }
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
        />
        <Routes>
          <Route
            path="/"
            element={<ProductList currency={this.state.currency} />}
            exact
          ></Route>
          <Route
            path="/product/:productID"
            element={
              <ProductDescription
                currency={this.state.currency}
                addToCart={this.addToCart}
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
