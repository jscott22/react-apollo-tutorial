import gql from "graphql-tag";

const addLyricToSong = gql`
  mutation addLyricToSong($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

export default addLyricToSong;
