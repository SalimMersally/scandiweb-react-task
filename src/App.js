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

  render() {
    return (
      <Router>
        <Navbar setCurrency={this.setCurrency} />
        <Routes>
          <Route
            path="/"
            element={<ProductList currency={this.state.currency} />}
            exact
          ></Route>
          <Route path="/product/:productID" element={<ProductDescription />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
