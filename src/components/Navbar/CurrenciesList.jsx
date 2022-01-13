import React, { Component } from "react";

// Queries
import { GET_CURRENCIES } from "../../Queries";
import client from "../../Client";

// Icons
import UpArrow from "../../icons/UpArrow";
import DownArrow from "../../icons/DownArrow";

export class CurrenciesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [], // the fetched currencies list
      currentCurrencySymbol: "", // the select currency symbole
      showCurrencyList: false,
    };
    // reference of this component
    this.ref = React.createRef();
  }

  // on mount we fetch all the currency and put them in the state
  // we set the first one as the selected currency at the start
  // we also add an event listener to the document to check for outside clicks
  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside.bind(this));
    client
      .query({ query: GET_CURRENCIES })
      .then((result) =>
        this.setState((prev) => {
          const currencies = result.data.currencies;
          const currentCurrencySymbol = currencies[0].symbol;
          this.props.setCurrency(currencies[0].label);
          return { ...prev, currencies, currentCurrencySymbol };
        })
      )
      .catch((error) => console.log(error));
  }

  // remove event listener
  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside.bind(this));
  }

  // if the user click and the click is outside
  // and the currency list is shown, we close it
  handleClickOutside(event) {
    if (this.ref.current && !this.ref.current.contains(event.target)) {
      if (this.state.showCurrencyList) {
        this.setShowCurrencyList();
      }
    }
  }

  // set a new current currency by the user
  setCurrentCurrency = (currentCurrencySymbol) => {
    this.setState((prev) => {
      return { ...prev, currentCurrencySymbol };
    });
  };

  // toggle showCurrencyList
  setShowCurrencyList = () => {
    const showCurrencyList = !this.state.showCurrencyList;
    this.setState((prev) => {
      return { ...prev, showCurrencyList };
    });
  };

  render() {
    const { showCurrencyList, currencies, currentCurrencySymbol } = this.state;

    return (
      <div className="select" ref={this.ref}>
        <div className="selectedOption" onClick={this.setShowCurrencyList}>
          <p>{currentCurrencySymbol}</p>
          {showCurrencyList ? <UpArrow /> : <DownArrow />}
        </div>
        <div className={showCurrencyList ? "selectList" : "selectClosed"}>
          {currencies.map((currency) => {
            return (
              <div
                className="option"
                key={currency.label}
                onClick={() => {
                  this.setShowCurrencyList(); // close the list
                  this.setCurrentCurrency(currency.symbol); // change the selected currency symbol in state
                  this.props.setCurrency(currency.label); // change selected currency in App.js
                }}
              >
                {currency.symbol + " " + currency.label}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default CurrenciesList;
