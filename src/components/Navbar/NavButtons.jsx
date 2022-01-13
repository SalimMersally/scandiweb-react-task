import React, { Component } from "react";
import { Link } from "react-router-dom";

// Queries
import { GET_CATEGORIES } from "./../../Queries";
import client from "./../../Client";

export class NavButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  // on mount get all categories and put them in state
  componentDidMount() {
    client
      .query({
        query: GET_CATEGORIES,
      })
      .then((result) =>
        this.setState((prev) => {
          const categories = result.data.categories;
          this.props.setCategory(categories[0].name);
          return { ...prev, categories };
        })
      )
      .catch((error) => console.log(error));
  }

  render() {
    const { categories } = this.state;
    const { currentCategory, setCategory } = this.props;

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
