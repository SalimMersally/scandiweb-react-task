import React, { Component } from "react";

export class ItemAttribute extends Component {
  render() {
    const { attIndex, attribute, selectedAttributes } = this.props;
    const { id, type, name } = attribute;

    return (
      <div className="cartAttribute">
        <div className="attributeName">{name + " :"}</div>
        <div className="attributeItems">
          {attribute.items.map((attributeItem, itemIndex) => {
            const { value, displayValue } = attributeItem;
            let className = "cartAttributeItem";
            let style = {};

            if (selectedAttributes[attIndex] === itemIndex) {
              if (type === "swatch") {
                className += " cartAttributeSelectedItemSwatch";
              } else {
                className += " cartAttributeSelectedItem";
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
              <div key={id + " " + value} className={className} style={style}>
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
