import gql from 'graphql-tag';

export const GET_GAME = gql`
query Game($id: ID!) {
  store {
    game(id: $id) {
      id
      title
      genres
      description
      summary
      developer
      publisher
      releaseDate
      media {
        screenshots {
          url
        }
        trailers {
          url
        }
      }
      languages {
        audio
        text
      }
    }
  }
}
`;
