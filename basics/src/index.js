import { GraphQLServer } from 'graphql-yoga';

// type definitions
const typeDefs = `
    type Query {
        title: String!
        price: Float!
        releaseYear: Int
        rating: Float
        inStock: Boolean!    
    }
`;

// resolvers
const resolvers = {
    Query: {
        title() {
            return 'title'
        },
        price() {
            return 1.99
        },
        releaseYear() {
            return 2018
        },
        rating() {
            return 5
        },
        inStock() {
            return true
        }
    }
};

const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(() => {
    console.log('the server is up!');
});
