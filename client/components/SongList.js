import React, { Component } from "react";
import { Link } from "react-router-dom";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";

import fetchSongs from "../queries/fetchSongs";

class SongList extends Component {
  onSongDelete(id) {
    this.props
      .mutate({
        variables: { id }
      })
      .then(() => this.props.data.refetch());
  }

  renderSongs(songs) {
    return songs.map(({ id, title }) => (
      <li className="collection-item" key={id}>
        {title}
        <i className="material-icons" onClick={() => this.onSongDelete(id)}>
          delete
        </i>
      </li>
    ));
  }

  render() {
    const { loading, songs } = this.props.data;
    return songs ? (
      <div>
        <ul className="collection">{this.renderSongs(songs)}</ul>
        <Link to="/songs/new" className="btn-floating btn-large red right">
          <i className="material-icons">add</i>
        </Link>
      </div>
    ) : (
      <h1>Loading</h1>
    );
  }
}

const deleteSong = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export default compose(graphql(deleteSong), graphql(fetchSongs))(SongList);
