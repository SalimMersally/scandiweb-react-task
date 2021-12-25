import { ApolloClient, InMemoryCache } from "@apollo/client";

// apollo client used to fetch from graphQL backend
const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

export default client;
