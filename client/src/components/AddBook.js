import React, { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { getBooksQuery, getAuthorsQuery, addBookMutation } from '../queries/queries';
import * as compose from 'lodash.flowright';

class AddBook extends Component {
   state = {
     name: "",
     genre: "",
     authorId: ""
   };

  displayAuthors() {
    let data = this.props.getAuthorsQuery; // data is attached to props when we bind a GraphQL query to a component
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

  submitForm(e) {
    e.preventDefault();
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
  }

  render () {
    return (
      <form id="add-book" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label>Book name:</label>
          <input type="text" onChange={e => this.setState({ name: e.target.value })}/>
        </div>

        <div className="field">
          <label>Genre:</label>
          <input type="text" onChange={e => this.setState({ genre: e.target.value })}/>
        </div>

        <div className="field">
          <label>Author:</label>
          <select onChange={e => this.setState({ authorId: e.target.value })}>
            <option>Select author</option>
            { this.displayAuthors() }
          </select>
        </div>

        <button>+</button>
      </form>
    );
  }
};

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery"}),
  graphql(addBookMutation, { name: "addBookMutation"})
)(AddBook); // bind graphql queries and mutations to the component
