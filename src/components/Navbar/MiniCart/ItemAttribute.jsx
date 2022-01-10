import React, { Component } from "react";

export class ItemAttribute extends Component {
  render() {
    const { attribute, index, selectAttributes } = this.props;
    const { name, type, items } = attribute;

    return (
      <div>
        <div className="miniCartAttributeName">{name + ":"}</div>
        <div className="miniCartAttribute">
          {items.map((item, index1) => {
            const { displayValue, id, value } = item;

            let className = "miniCartAttributeItem";
            let style = {};

            if (selectAttributes[index] === index1) {
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
              <div key={id} className={className} style={style}>
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
