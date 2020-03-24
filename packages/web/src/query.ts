import gql from 'graphql-tag';

export const GET_USER = gql`
query User {
  auth{
    profile{
      firstName,
      lastName,
      phone,
      email
    }
  }
}
`;
