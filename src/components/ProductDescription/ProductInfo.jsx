import React, { Component } from "react";
import JsxParser from "react-jsx-parser";

// Components
import ProductAttribute from "./ProductAttribute";

export class ProductInfo extends Component {
  render() {
    const {
      id,
      name,
      brand,
      attributes,
      description,
      inStock,
      price,
      selectedAttributes,
      selectAttribute,
      addToCart,
    } = this.props;

    return (
      <div className="productInfo">
        <h1>{brand}</h1>
        <h2>{name}</h2>
        <div className="productAttributes">
          {attributes.map((attribute, attIndex) => {
            return (
              <ProductAttribute
                key={id + " Attribute: " + attribute.id}
                attribute={attribute}
                attIndex={attIndex}
                selectedAttributes={selectedAttributes}
                selectAttribute={selectAttribute}
              />
            );
          })}
        </div>
        <div className="productInfoPrice">
          <h2>PRICE: </h2>
          <p>{price.currency.symbol + "" + price.amount}</p>
        </div>
        {inStock ? (
          <button onClick={addToCart}>ADD TO CART</button>
        ) : (
          <div className="productOut">PRODUCT OUT OF STOCK</div>
        )}
        <div className="productDescription">
          <JsxParser jsx={description} />
        </div>
      </div>
    );
  }
}

export default ProductInfo;
