import React from "react";

// Icons
import Logo from "../Icons/Logo";
import Cart from "../Icons/Cart";

function Navbar() {
  return (
    <nav>
      <div className="navButtons">Buttons</div>
      <div>
        <Logo />
      </div>
      <div className="navSelect">
        <Cart />
      </div>
    </nav>
  );
}

export default Navbar;
