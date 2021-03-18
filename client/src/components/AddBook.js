import React, { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { getAuthorsQuery } from '../queries/queries';

class AddBook extends Component {
   state = {
     name: "",
     genre: "",
     authorId: ""
   };

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

  submitForm(e) {
    e.preventDefault();
    console.log(this.state); // binds context of this to the submitForm function
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

export default graphql(getAuthorsQuery)(AddBook); // bind graphql query to the component
