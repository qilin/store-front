import gql from 'graphql-tag';

export const GET_GAME = gql`
query {
  store {
    game(id:"ec215564-58a4-4375-bcc6-d88178d17424") {
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
