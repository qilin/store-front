import gql from 'graphql-tag';

export const MAIN_PAGE = gql`
query MainPage{
  store {
    recommended: module(id: "recommended") {
      ... on FreeGamesGroup {
        games {
          game {
            __typename
            id
          }
        }
      }
    }
    popular: module(id: "popular") {
      ... on FreeGamesGroup {
        games {
          game {
            __typename
            id
          }
        }
      }
    }
    new: module(id: "popular") {
      ... on FreeGamesGroup {
        games {
          game {
            __typename
            id
          }
        }
      }
    }
  }
  viewer {
    friendsGames {
      game {
        __typename
        id
      }
      friends {
        id
      }
    }
  }
}
`;

export const CARD_GAME = gql`
query CardGame($id: ID!) {
  store {
    game(id: $id) {
      __typename
      id
      title
      description
      rating
      media {
        screenshots {
          url
        }
      }
      price
      discount
      currency
      platforms
    }
  }
}
`;
