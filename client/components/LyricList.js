import React, { Component } from "react";
import { graphql } from "react-apollo";

import likeLyric from "../mutations/likeLyric";

class LyricList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onLike(lyricId, likes) {
    this.props.mutate({
      variables: {
        id: lyricId
      },
      optimisticResponse: {
        __typename: "Mutation",
        likeLyric: {
          id: lyricId,
          __typename: "LyricType",
          likes: likes + 1
        }
      }
    });
  }

  renderLyrics(lyrics) {
    if (!lyrics) return;
    return lyrics.map(({ id, content, likes }) => (
      <li className="collection-item" key={id}>
        {content}
        <div className="vote-box">
          <i className="material-icons" onClick={() => this.onLike(id, likes)}>
            thumb_up
          </i>
          {likes}
        </div>
      </li>
    ));
  }

  render() {
    const { lyrics } = this.props;
    return <ul className="collection">{this.renderLyrics(lyrics)}</ul>;
  }
}

export default graphql(likeLyric)(LyricList);
