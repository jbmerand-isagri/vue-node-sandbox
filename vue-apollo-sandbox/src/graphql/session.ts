import { gql } from '@apollo/client/core'

export const GET_SESSIONS = gql`
  query Sessions {
    sessions {
      id
      sessionName
      createdBy {
        username
      }
      createdAt
      updatedAt
    }
  }
`

export const CREATE_SESSION = gql`
  mutation CreateSession($sessionName: String!, $authorUsername: String!) {
    createSession(sessionName: $sessionName, authorUsername: $authorUsername) {
      sessionName
    }
  }
`
