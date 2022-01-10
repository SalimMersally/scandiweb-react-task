import React, { Component } from "react";

export class ProductAttribute extends Component {
  render() {
    const { attribute, attIndex, selectedAttributes, selectAttribute } =
      this.props;
    const { id, name, type, items } = attribute;

    return (
      <div className="attribute" key={id}>
        <h2>{name}:</h2>
        <div className="attributeItems">
          {items.map((item, itemIndex) => {
            const { displayValue, value } = item;

            let className = "attributeItem";
            let style = {};

            // check if it is swatch to style it different based on the color
            if (type === "swatch") {
              if (value === "#000000") {
                style = { backgroundColor: value, color: "white" };
              } else {
                style = { backgroundColor: value };
              }
            }

            // check if this is the selected one to change it is style
            if (itemIndex === selectedAttributes[attIndex]) {
              if (type === "swatch") {
                className += " swatchSelectedAttribute";
              } else {
                className += " selectedAttribute";
              }
            }

            return (
              <div
                key={item.id}
                className={className}
                onClick={() => selectAttribute(attIndex, itemIndex)}
                style={style}
              >
                {displayValue}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default ProductAttribute;
