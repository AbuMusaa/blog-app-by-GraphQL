import { gql } from "apollo-server";

export const typeDefs = gql`
  type Query {
    hello: String
  }

  type Mutation {
    createPost(title: String!, content: String!): PostPayload!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    createdAt: String!
    published: Boolean!
    user: User!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post]
    profile: Profile
  }

  type Profile {
    id: ID!
    bio: String!
    user: User!
  }

  type UserError {
    massage: String!
  }

  type PostPayload {
    userError: [UserError!]!
    post: Post
  }
`;
