import React, { Component } from "react";
import { Link } from "react-router-dom";

export class NavButtons extends Component {
  render() {
    const { categories, currentCategory, setCategory } = this.props;

    return (
      <div className="navButtons">
        {
          // map the categories fetch in App.js to show them as buttons
          categories.map((current) => {
            const { name } = current;
            let className = "navButton";
            // check the selected one to show it in different style
            if (name === currentCategory) {
              className += " navButtonSelected";
            }
            // when a user click on a button it become the selected one
            // the set category is provided by App.js
            // it also take him to the home page if he is not there
            return (
              <Link to="/" key={name}>
                <button className={className} onClick={() => setCategory(name)}>
                  {name.toUpperCase()}
                </button>
              </Link>
            );
          })
        }
      </div>
    );
  }
}

export default NavButtons;
