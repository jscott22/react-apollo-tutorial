import React, { Component } from "react";
import { graphql } from "react-apollo";

import addLyricToSong from "../mutations/addLyricToSong";

class LyricCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ""
    };

    this.updateContent = this.updateContent.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props
      .mutate({
        variables: {
          content: this.state.content,
          songId: this.props.songId
        }
      })
      .then(() => this.setState({ content: "" }));
  }

  updateContent(e) {
    this.setState({ content: e.target.value });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <label htmlFor="">Add a Lyric</label>
        <input
          onChange={this.updateContent}
          value={this.state.content}
          type="text"
        />
      </form>
    );
  }
}

export default graphql(addLyricToSong)(LyricCreate);
