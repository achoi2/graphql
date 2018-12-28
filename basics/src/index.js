import { GraphQLServer } from 'graphql-yoga';

// type definitions
const typeDefs = `
    type Query {
        hello: String!
        name: String!
        location: String!
        bio: String!
    }
`

// resolvers
const resolvers = {
    Query: {
        hello() {
            return 'first query'
        },
        name() {
            return 'andrew'
        },
        location() {
            return 'atl'
        },
        bio() {
            return 'is a programmer'
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('the server is up!')
});