import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

// Components
import ItemsList from "./components/ItemsList";
import Navbar from "./components/Navbar";

export class App extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ItemsList />} exact></Route>
        </Routes>
      </Router>
    );
  }
}

export default App;
