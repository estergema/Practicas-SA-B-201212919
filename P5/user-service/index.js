const express = require("express")
const { ApolloServer } = require("apollo-server-express")
const { typeDefs } = require("./src/schema/user")
const { resolvers } = require("./src/resolvers/resolvers")
const  global = require('./src/const/global');

const app = express()

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  })

  await server.start()
  server.applyMiddleware({ app })

  app.get("/check", (req, res) => {
    res.status(200).json({ status: "ok", service: "users" })
  })

  app.listen(global.PORT, () => {
    console.log(`Users service running at http://localhost:${global.PORT}`)
    console.log(`GraphQL endpoint: http://localhost:${global.PORT}${server.graphqlPath}`)
  })
}

startServer()

