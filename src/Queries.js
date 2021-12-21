import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query {
    categories {
      name
    }
  }
`;

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

export const GET_CURRENCIES = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;
