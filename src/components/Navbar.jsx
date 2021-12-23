import React, { Component } from "react";
import { GET_CURRENCIES } from "../Queries";
import client from "../Client";

// Components
import MiniCart from "./MiniCart";

// Icons
import Logo from "../Icons/Logo";
import UpArrow from "../Icons/UpArrow";
import DownArrow from "../Icons/DownArrow";

export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
      currentCurrency: "",
      showCurrencyList: false,
    };
  }

  componentDidMount() {
    client.query({ query: GET_CURRENCIES }).then((result) =>
      this.setState((prev) => {
        const currencies = result.data.currencies;
        const currentCurrency = currencies[0].symbol;
        this.props.setCurrency(currencies[0].label);
        return { ...prev, currencies, currentCurrency };
      })
    );
  }

  setCurrentCurrency = (currentCurrency) => {
    this.setState((prev) => {
      return { ...prev, currentCurrency };
    });
  };

  setShowCurrencyList = () => {
    const showCurrencyList = !this.state.showCurrencyList;
    this.setState((prev) => {
      return { ...prev, showCurrencyList };
    });
  };

  render() {
    return (
      <nav>
        <div className="navButtons">Buttons</div>
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
              {this.state.currencies.map((currency, index) => {
                return (
                  <div
                    className="option"
                    key={index}
                    onClick={() => {
                      this.setShowCurrencyList();
                      this.setCurrentCurrency(currency.symbol);
                      this.props.setCurrency(currency.label);
                    }}
                  >
                    {currency.symbol + " " + currency.label}
                  </div>
                );
              })}
            </div>
          </div>
          <MiniCart
            cart={this.props.cart}
            currency={this.props.currency}
            increaseQunatity={this.props.increaseQunatity}
            decreaseQuantity={this.props.decreaseQuantity}
          />
        </div>
      </nav>
    );
  }
}

export default Navbar;
