import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Queries
import { GET_CATEGORIES } from "./Queries";
import client from "./Client";

// Styles
import "./App.css";

// Components
import ProductList from "./components/ProductsList";
import Navbar from "./components/Navbar";
import ProductDescription from "./components/ProductDescription";
import Cart from "./components/Cart";

export class App extends Component {
  constructor(props) {
    super(props);
    // the state of App.js is like a globale state to the application
    // different part are provided to differen component based on need
    // changed it in other component is done by function made here and provided as props
    this.state = {
      cart: [],
      currency: "",
      categories: [],
      category: "",
    };
  }

  // on mount get all categories and put them in state
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
      )
      .catch((error) => console.log(error));
  }

  // set the currency label
  setCurrency = (currency) => {
    this.setState((prev) => {
      return { ...prev, currency };
    });
  };

  // add a product to cart
  // the product contains the selectedAttributes
  // the default quantity is 1 at the start
  addToCart = (product) => {
    this.setState((prev) => {
      const productToAdd = { product, quantity: 1 };
      const cart = [...prev.cart];
      cart.push(productToAdd);
      return { ...prev, cart };
    });
  };

  // increase the quantity of the prduct at index
  increaseQunatity = (index) => {
    this.setState((prev) => {
      const cart = [...prev.cart];
      const product = prev.cart[index].product;
      const quantity = prev.cart[index].quantity + 1;
      cart[index] = { product, quantity };
      return { ...prev, cart };
    });
  };

  // decrease the quantity of the product at index
  // if it is 1, we remove the product completely
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

  // change the selectedAttrivute of product in cart at productIndex
  // the attribute to change is at attributeIndex in attributes array
  // the new selected attribute is at newItemIndex in items array
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

  // calculte the total price based on the current currency and quantities
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

  // set category in product list page
  setCategory = (category) => {
    this.setState((prev) => {
      return { ...prev, category };
    });
  };

  // checkout is by clearing the cart and alerting the user of successfull purchase
  checkout = () => {
    alert("Your order have been placed successfully!");
    this.state((prev) => {
      const cart = [];
      return { ...prev, cart };
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
          checkout={this.checkout}
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
              <Cart
                cart={this.state.cart}
                currency={this.state.currency}
                increaseQunatity={this.increaseQunatity}
                decreaseQuantity={this.decreaseQuantity}
                setAttribute={this.setAttribute}
              />
            }
          />
        </Routes>
      </Router>
    );
  }
}

export default App;
