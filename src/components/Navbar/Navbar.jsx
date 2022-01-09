import React, { Component } from "react";
import { Link } from "react-router-dom";

// Queries
import { GET_CURRENCIES } from "../../Queries";
import client from "../../Client";

// Styles
import "../../styles/navbar.css";

// Components
import MiniCart from "./MiniCart";

// Icons
import Logo from "../../icons/Logo";
import UpArrow from "../../icons/UpArrow";
import DownArrow from "../../icons/DownArrow";

export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [], // the fetched currencies list
      currentCurrency: "", // the select currency symbole
      showCurrencyList: false,
    };
  }

  // on mount we fetch all the currency and put them in the state
  // we set the first one as the selected currency at the start
  componentDidMount() {
    client
      .query({ query: GET_CURRENCIES })
      .then((result) =>
        this.setState((prev) => {
          const currencies = result.data.currencies;
          const currentCurrency = currencies[0].symbol;
          this.props.setCurrency(currencies[0].label);
          return { ...prev, currencies, currentCurrency };
        })
      )
      .catch((error) => console.log(error));
  }

  // set a new current currency by the user
  setCurrentCurrency = (currentCurrency) => {
    this.setState((prev) => {
      return { ...prev, currentCurrency };
    });
  };

  // on click show the currency list
  setShowCurrencyList = () => {
    const showCurrencyList = !this.state.showCurrencyList;
    this.setState((prev) => {
      return { ...prev, showCurrencyList };
    });
  };

  // this is used when the user open the mini cart
  // the currency list is open it should be closed
  closeCurrencyListIfOpen = () => {
    if (this.state.showCurrencyList === true) {
      this.setShowCurrencyList();
    }
  };

  render() {
    return (
      <nav>
        <div className="navButtons">
          {
            // map the categories fetch in App.js to show them as buttons
            this.props.categories.map((category) => {
              let classN = "";
              // check the selected one to show it in different style
              if (category.name === this.props.category) {
                classN = "navButtonSelected";
              }
              // when a user click on a button it become the selected one
              // the set category is provided by App.js
              // it also take him to the home page if he is not there
              return (
                <Link to="/" key={category.name}>
                  <button
                    className={classN + " navButton"}
                    onClick={() => this.props.setCategory(category.name)}
                  >
                    {category.name.toUpperCase()}
                  </button>
                </Link>
              );
            })
          }
        </div>
        <div className="navLogo">
          <Logo />
        </div>
        <div className="navSelect">
          <div className="select">
            <div className="selectedOption" onClick={this.setShowCurrencyList}>
              <p>{this.state.currentCurrency}</p>
              {this.state.showCurrencyList ? <UpArrow /> : <DownArrow />}
            </div>
            <div
              className="selectList"
              style={this.state.showCurrencyList ? {} : { display: "none" }}
            >
              {
                // make the list based on the currencies fetched
                this.state.currencies.map((currency, index) => {
                  return (
                    <div
                      className="option"
                      key={index}
                      onClick={() => {
                        this.setShowCurrencyList(); // close the list
                        this.setCurrentCurrency(currency.symbol); // change the selected currency symbol in state
                        this.props.setCurrency(currency.label); // change selected currency in App.js
                      }}
                    >
                      {currency.symbol + " " + currency.label}
                    </div>
                  );
                })
              }
            </div>
          </div>
          <MiniCart
            cart={this.props.cart}
            currency={this.props.currency}
            increaseQunatity={this.props.increaseQunatity}
            decreaseQuantity={this.props.decreaseQuantity}
            setAttribute={this.props.setAttribute}
            closeCurrencyListIfOpen={this.closeCurrencyListIfOpen}
            showCurrencyList={this.state.showCurrencyList}
            calculateTotal={this.props.calculateTotal}
            checkout={this.props.checkout}
          />
        </div>
      </nav>
    );
  }
}

export default Navbar;
