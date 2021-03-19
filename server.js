const {GraphQLServer } = require('graphql-yoga')

const messages = []

// set types
const typeDefs = `
  type Message {
    id: ID!
    user: String!
    content: String!
  }

  type Query {
    getMessages: [Message!]
  }

  type Mutation {
    postMessage(user: String!, content: String!): ID!
  }
`

// get the data
const resolvers = {
  Query: {
    getMessages: () => messages, 
  },
  Mutation: {
    postMessage: (parent, { user, content }) => {
      const id = messages.length
      messages.push({
        id,
        user,
        content
      })
      return id
    }
  }
}


const server = new GraphQLServer({typeDefs, resolvers})
server.start(({port}) => {
  console.log(`server running on http://localhost:${port}`)
})