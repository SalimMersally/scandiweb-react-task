import React, { Component } from "react";
import { GET_CURRENCIES } from "../Queries";
import client from "../Client";

// Icons
import Logo from "../Icons/Logo";
import CartIcon from "../Icons/CartIcon";

export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
    };
  }

  componentDidMount() {
    client.query({ query: GET_CURRENCIES }).then((result) =>
      this.setState((prev) => {
        let currencies = result.data.currencies;
        this.props.setCurrency(currencies[0].label);
        return { ...prev, currencies };
      })
    );
  }

  render() {
    return (
      <nav>
        <div className="navButtons">Buttons</div>
        <div className="navLogo">
          <Logo />
        </div>
        <div className="navSelect">
          <div className="currencies">
            <select onChange={(e) => this.props.setCurrency(e.target.value)}>
              {this.state.currencies.map((currency, index) => {
                return (
                  <option value={currency.label} key={index}>
                    {currency.symbol + " " + currency.label}
                  </option>
                );
              })}
            </select>
          </div>
          <CartIcon />
        </div>
      </nav>
    );
  }
}

export default Navbar;
