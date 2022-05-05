import { gql } from "apollo-server";

export const typeDefs = gql`
  type Query {
    posts: [Post!]!
    users: [User!]!
  }

  type Mutation {
    createPost(post: PostInput): PostPayload!
    updatePost(postId: ID!, post: PostInput): PostPayload!
    deletePost(postId: ID!): PostPayload!
    signup(
      email: String!
      name: String!
      password: String!
      bio: String!
    ): AuthPayload
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
    password: String!
    posts: [Post]
    profile: Profile
  }

  type Profile {
    id: ID!
    bio: String!
    user: User!
  }

  type UserErrors {
    message: String!
  }

  type PostPayload {
    userErrors: [UserErrors!]!
    post: Post
  }

  type AuthPayload {
    userErrors: [UserErrors!]!
    user: User
  }

  input PostInput {
    title: String
    content: String
  }
`;
