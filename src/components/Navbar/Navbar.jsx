import React, { Component } from "react";
import { Link } from "react-router-dom";

// Styles
import "../../styles/navbar.css";

// Components
import MiniCart from "./MiniCart";
import CurrenciesList from "./CurrenciesList";

// Icons
import Logo from "../../icons/Logo";

export class Navbar extends Component {
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
          <CurrenciesList setCurrency={this.props.setCurrency} />
          <MiniCart
            cart={this.props.cart}
            currency={this.props.currency}
            increaseQunatity={this.props.increaseQunatity}
            decreaseQuantity={this.props.decreaseQuantity}
            setAttribute={this.props.setAttribute}
            closeCurrencyListIfOpen={this.closeCurrencyListIfOpen}
            calculateTotal={this.props.calculateTotal}
            checkout={this.props.checkout}
          />
        </div>
      </nav>
    );
  }
}

export default Navbar;
