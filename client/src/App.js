import React, { Component } from "react";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";

// components
import BookList from "./components/BookList";
import AddBook from './components/AddBook';

// apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // making requests to this endpoint
  cache: new InMemoryCache(),
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Ninja's Reading List</h1>
          <BookList />
          <AddBook />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
