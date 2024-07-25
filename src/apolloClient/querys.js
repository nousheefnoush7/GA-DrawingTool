// src/queries.js
import { gql } from '@apollo/client';

const GET_DATA = gql`
query MyQuery {
  initaldiagram {
    category
    create_time
    is_baseframe
    location
    projectid
  }
}
`;

export{  GET_DATA};
