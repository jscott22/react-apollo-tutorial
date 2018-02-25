import React from "react";
import { withRouter } from "react-router-dom";
import { graphql, compose } from "react-apollo";

import fetchSongById from "../queries/fetchSongById";

const SongDetail = ({ data }) => (
  <div>{data.song ? <h3>{data.song.title}</h3> : ""}</div>
);

export default compose(
  graphql(fetchSongById, {
    options: props => ({
      variables: {
        id: props.match.params.id
      }
    })
  }),
  withRouter
)(SongDetail);
