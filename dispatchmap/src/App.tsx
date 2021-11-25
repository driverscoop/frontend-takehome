import React from "react";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import CarMap from "./CarMap";
import "./App.css";

const httpUrl = "http://localhost:4000/graphql";
const wsUrl = "ws://localhost:4000/graphql";

// Initialize Apollo Client and Http/WebSocket links
const httpLink = new HttpLink({
  uri: httpUrl,
});
const wsLink = new WebSocketLink({
  uri: wsUrl,
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div style={{ height: "100vh", width: "100%" }}>
        <CarMap />
      </div>
    </ApolloProvider>
  );
}

export default App;
