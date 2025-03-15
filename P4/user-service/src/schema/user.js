const { gql } = require("apollo-server-express")

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    full_name: String!
    is_active: Boolean!
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    createUser(username: String!, email: String!, full_name: String!): User
    updateUser(id: ID!, username: String, email: String, full_name: String): User
    deleteUser(id: ID!): Boolean
  }
`

module.exports = { typeDefs }

