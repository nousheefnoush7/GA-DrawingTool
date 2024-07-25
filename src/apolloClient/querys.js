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
const GET_DATA2 = gql`
subscription MySubscription {
  initaldiagram {
    category
    create_time
    is_baseframe
    location
    projectid
  }
}
`

const PROJECT_DELETE = gql`
mutation MyMutation($projectid: Int = 10) {
  delete_initaldiagram(where: {projectid: {_eq: $projectid}}) {
    affected_rows
    returning {
      category
      create_time
      is_baseframe
      location
      projectid
    }
  }
}
`;

const INSERT_PROJECT= gql`
mutation MyMutation($category: String = "", $is_baseframe: Boolean = false, $location: jsonb = "") {
  insert_initaldiagram(objects: {category: $category, is_baseframe: $is_baseframe, location: $location}) {
    affected_rows
    returning {
      category
      create_time
      is_baseframe
      location
      projectid
    }
  }
}
`;

const UPDATE_PROJECT = gql`
mutation MyMutation($_eq: Int = 10, $category: String = "", $is_baseframe: Boolean = false, $location: jsonb = "") {
  update_initaldiagram(where: {projectid: {_eq: $_eq}}, _set: {category: $category, is_baseframe: $is_baseframe, location: $location}) {
    affected_rows
    returning {
      category
      create_time
      location
      projectid
      is_baseframe
    }
  }
}
`;

export{ GET_DATA2, GET_DATA, PROJECT_DELETE, INSERT_PROJECT, UPDATE_PROJECT};
