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
          currentCategory={this.props.currentCategory}
          setCategory={this.props.setCategory}
        />
        <div className="navLogo">
          <Logo />
        </div>
        <div className="navSelect">
          <CurrenciesList setCurrency={this.props.setCurrency} />
          <MiniCart
            cart={this.props.cart}
            currentCurrency={this.props.currentCurrency}
            increaseQuantity={this.props.increaseQuantity}
            decreaseQuantity={this.props.decreaseQuantity}
            calculateTotal={this.props.calculateTotal}
            checkout={this.props.checkout}
          />
        </div>
      </nav>
    );
  }
}

export default Navbar;
