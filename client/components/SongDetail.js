import React from "react";
import { withRouter, Link } from "react-router-dom";
import { graphql, compose } from "react-apollo";

import LyricCreate from "./LyricCreate";
import LyricList from "./LyricList";

import fetchSongById from "../queries/fetchSongById";

const SongDetail = ({ data, match }) => (
  <div>
    <Link to="/">Back</Link>
    {data.song ? (
      <div>
        <h3>{data.song.title}</h3>
        <LyricCreate songId={match.params.id} />
        {data.song.lyrics ? <LyricList lyrics={data.song.lyrics} /> : ""}
      </div>
    ) : (
      ""
    )}
  </div>
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
