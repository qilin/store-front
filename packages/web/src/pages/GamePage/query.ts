import gql from 'graphql-tag';

export const GET_GAME = gql`
query Game($slug: String!) {
  store {
    gameBySlug(slug: $slug) {
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
