import React, { Component } from 'react';
import { gql } from "@apollo/client";
import { graphql } from '@apollo/client/react/hoc';

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`

class AddBook extends Component {

  displayAuthors() {
    let data = this.props.data; // data is attached to props when we bind a GraphQL query to a component
    if(data.loading) {
      return (<option disabled>Loading Authors...</option>)
    } else {
      return data.authors.map(author => {
        return (
          <option key={author.id} value={author.id}>{author.name}</option>
        )
      })
    }
  }

  render () {
    return (
      <form id="add-book">
        <div className="field">
          <label>Book name:</label>
          <input type="text"/>
        </div>

        <div className="field">
          <label>Genre:</label>
          <input type="text"/>
        </div>

        <div className="field">
          <label>Author:</label>
          <select>
            <option>Select author</option>
            { this.displayAuthors() }
          </select>
        </div>

        <button>+</button>
      </form>
    );
  }
};

export default graphql(getAuthorsQuery)(AddBook); // bind graphql query to the component
