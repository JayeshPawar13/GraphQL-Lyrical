import { gql } from "@apollo/client";

// GraphQL query to fetch songs
export default gql`
  query {
    songs {
      id
      title
    }
  }
`;
