import React, { Component } from "react";

// Styles
import "../../styles/navbar.css";

// Components
import NavButtons from "./NavButtons";
import CurrenciesList from "./CurrenciesList";
import MiniCart from "./MiniCart";

// Icons
import Logo from "../../icons/Logo";

export class Navbar extends Component {
  render() {
    return (
      <nav>
        <NavButtons
          category={this.props.category}
          categories={this.props.categories}
          setCategory={this.props.setCategory}
        />
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
