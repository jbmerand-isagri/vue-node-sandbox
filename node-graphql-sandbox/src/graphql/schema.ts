import { buildSchema } from "graphql";

/**
 * Represents the GraphQL schema for the application.
 */
export const schema = buildSchema(`
  type Participant {
    id: Int!
    session: Session!
    user: User!
    joinedAt: String!
  }

  type Session {
    id: Int!
    sessionName: String!
    createdBy: User!
    createdAt: String!
    updatedAt: String!
  }

  type Story {
    id: Int!
    session: Session!
    title: String!
    description: String
    createdAt: String!
    updatedAt: String!
  }

  type User {
    id: Int!
    username: String!
    createdAt: String!
    updatedAt: String!
  }

  type Vote {
    id: Int!
    story: Story!
    user: User!
    voteValue: Int!
    votedAt: String!
  }

  type Query {
    users: [User!]!
    sessions: [Session!]!
    stories(sessionId: Int!): [Story!]!
  }

  type Mutation {
    createUser(username: String!): User!
    deleteUser(id: Int!): User!

    createSession(sessionName: String!, createdBy: Int!): Session!

    createStory(sessionId: Int!, title: String!, description: String): Story!
    
    createVote(storyId: Int!, userId: Int!, voteValue: Int!): Vote!
  }
`);