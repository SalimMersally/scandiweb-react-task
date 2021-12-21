import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

// Components
import ItemsList from "./components/ItemsList";
import Navbar from "./components/Navbar";

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
            element={<ItemsList currency={this.state.currency} />}
            exact
          ></Route>
        </Routes>
      </Router>
    );
  }
}

export default App;
