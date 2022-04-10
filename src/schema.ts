import { gql } from "apollo-server";

export const typeDefs = gql`
  type Query {
    posts: [Post!]!
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

  type UserErrors {
    massage: String!
  }

  type PostPayload {
    userErrors: [UserErrors!]!
    post: Post
  }
`;
