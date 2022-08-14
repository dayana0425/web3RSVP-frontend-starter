import { ApolloClient, InMemoryCache } from "@apollo/client"; // Apollo GraphQL Client to easily query our subgraph from the front-end

const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/dayana0425/web3rsvp",
  cache: new InMemoryCache(),
});

export default client;