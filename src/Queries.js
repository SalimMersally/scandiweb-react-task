import { gql } from "@apollo/client";

// get all categories query
export const GET_CATEGORIES = gql`
  query {
    categories {
      name
    }
  }
`;

// get all products in a specific category query
// take the category name as input
export const GET_PRODUCTS = gql`
  query GetProducts($category: String!) {
    category(input: { title: $category }) {
      products {
        id
        name
        inStock
        gallery
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  }
`;

// get a specific product query
// the product id is the input
export const GET_PRODUCT = gql`
  query GetProduct($id: String!) {
    product(id: $id) {
      name
      id
      inStock
      gallery
      description
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        amount
        currency {
          label
          symbol
        }
      }
      brand
    }
  }
`;

// get all currencies query
export const GET_CURRENCIES = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;
