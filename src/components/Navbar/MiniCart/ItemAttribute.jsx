import React, { Component } from "react";

export class ItemAttribute extends Component {
  render() {
    const { attribute, attIndex, selectedAttributes } = this.props;
    const { name, type, items } = attribute;

    return (
      <div>
        <div className="miniCartAttributeName">{name + ":"}</div>
        <div className="miniCartAttribute">
          {items.map((item, itemIndex) => {
            const { displayValue, id, value } = item;

            let className = "miniCartAttributeItem";
            let style = {};

            if (selectedAttributes[attIndex] === itemIndex) {
              if (type === "swatch") {
                className += " miniCartAttributeSelectedItemSwatch";
              } else {
                className += " miniCartAttributeSelectedItem";
              }
            }

            if (type === "swatch" && value === "#000000") {
              style = {
                backgroundColor: value,
                color: "white",
              };
            } else if (type === "swatch") {
              style = {
                backgroundColor: value,
              };
            }

            return (
              <div
                key={"Attribute: " + name + " item: " + id}
                className={className}
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

export default ItemAttribute;
