import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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
      currentCurrency: "",
      currentCategory: "",
      popUpStyle: "hidden",
    };
  }

  // set category in product list page
  setCategory = (currentCategory) => {
    this.setState((prev) => {
      return { ...prev, currentCategory };
    });
  };

  // set the currency label
  setCurrency = (currentCurrency) => {
    this.setState((prev) => {
      return { ...prev, currentCurrency };
    });
  };

  // add a product to cart (the default quantity is 1 at the start)
  // the product contains the selectedAttributes
  // if the product is already available in the cart with the same selected attributes
  // we just increase the quantity
  addToCart = (product) => {
    let inCart = false;
    this.state.cart.forEach((productInCart, pIndex) => {
      if (product.id === productInCart.product.id) {
        const cartSelection = productInCart.product.selectedAttributes;
        inCart = true;
        product.selectedAttributes.forEach((attribute, aIndex) => {
          if (attribute !== cartSelection[aIndex]) {
            inCart = false;
          }
        });
        if (inCart) {
          this.increaseQuantity(pIndex);
        }
      }
    });
    if (!inCart) {
      this.setState((prev) => {
        const cart = [...prev.cart];
        cart.push({ product, quantity: 1 });
        return { ...prev, cart };
      });
    }
    this.showPopUp();
  };

  // show pop with css animtion
  showPopUp = () => {
    let popUpStyle = "popUp";
    this.setState((prev) => {
      return { ...prev, popUpStyle };
    });
    setTimeout(() => {
      popUpStyle = "hidden";
      this.setState((prev) => {
        return { ...prev, popUpStyle };
      });
    }, 3000);
  };

  // increase the quantity of the prduct at index
  increaseQuantity = (index) => {
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

  // calculte the total price based on the current currency and quantities
  calculateTotal = () => {
    let total = 0;
    let symbol = "";
    this.state.cart.forEach((item) => {
      let price = item.product.prices.filter((p) => {
        return p.currency.label === this.state.currentCurrency;
      });
      total = total + item.quantity * price[0].amount;
      symbol = price[0].currency.symbol;
    });
    return symbol + "" + total.toFixed(2);
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
    const { currentCategory, currentCurrency } = this.state;

    return (
      <Router>
        <div className={this.state.popUpStyle}>
          Item Added Succefully to Cart
        </div>
        <Navbar
          currentCurrency={this.state.currentCurrency}
          setCurrency={this.setCurrency}
          currentCategory={this.state.currentCategory}
          setCategory={this.setCategory}
          cart={this.state.cart}
          increaseQuantity={this.increaseQuantity}
          decreaseQuantity={this.decreaseQuantity}
          calculateTotal={this.calculateTotal}
          checkout={this.checkout}
        />
        {
          // We will not mount these component until we fetch currencies and categories to avoid errors
          currentCategory !== "" && currentCurrency !== "" ? (
            <Routes>
              <Route
                path="/"
                element={
                  <ProductList
                    currentCurrency={this.state.currentCurrency}
                    currentCategory={this.state.currentCategory}
                    addToCart={this.addToCart}
                  />
                }
                exact
              ></Route>
              <Route
                path="/product/:productID"
                element={
                  <ProductDescription
                    currentCurrency={this.state.currentCurrency}
                    addToCart={this.addToCart}
                  />
                }
              />
              <Route
                path="/cart"
                element={
                  <Cart
                    cart={this.state.cart}
                    currentCurrency={this.state.currentCurrency}
                    increaseQuantity={this.increaseQuantity}
                    decreaseQuantity={this.decreaseQuantity}
                  />
                }
              />
            </Routes>
          ) : (
            ""
          )
        }
      </Router>
    );
  }
}

export default App;
