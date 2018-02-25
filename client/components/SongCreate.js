import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

import fetchSongs from "../queries/fetchSongs";

class SongCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { title: "" };
  }

  onSubmit(event) {
    event.preventDefault();

    this.props
      .mutate({
        variables: {
          title: this.state.title
        },
        refetchQueries: [
          {
            query: fetchSongs
          }
        ]
      })
      .then(() => this.props.history.push("/"));
  }

  render() {
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>FORM</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label htmlFor="">Song Title:</label>
          <input
            onChange={event => this.setState({ title: event.target.value })}
            value={this.state.title}
            type="text"
          />
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

export default withRouter(graphql(mutation)(SongCreate));
