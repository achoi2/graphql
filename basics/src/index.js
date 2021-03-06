import {
    GraphQLServer
} from 'graphql-yoga'

// Scalar types - String, Boolean, Int, Float, ID

// user data
const users = [{
        id: '1',
        name: 'andrew',
        email: 'andrew@example.com',
        age: 28
    },
    {
        id: '2',
        name: 'steve',
        email: 'steve@example.com',
    },
    {
        id: '3',
        name: 'amy',
        email: 'amy@example.com',
    }
]

// posts data
const posts = [{
        id: '1',
        title: 'first',
        body: 'This is the first post',
        published: true,
        author: '1'
    },
    {
        id: '2',
        title: 'second',
        body: 'This is the second post',
        published: true,
        author: '1'
    },
    {
        id: '3',
        title: 'third',
        body: 'This is the third post',
        published: true,
        author: '2'
    }
]

// Type definitions (schema)
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        me: User!
        post(query: String): [Post!]!
    }
    
    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
    }
`

// Resolvers
const resolvers = {
    Query: {
        users(parent, args, ctx, info) {
            if (!args.query) {
                return users
            }

            return users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })
        },

        me() {
            return {
                id: '1',
                name: 'Steve',
                email: 'steve@example.com'
            }
        },

        post(parent, args, ctx, info) {
            if (!args.query) {
                return posts
            }

            return posts.filter((post) => {
                const titleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
                const bodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())

                return bodyMatch || titleMatch
            })
        }
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter((post) => {
                return post.author === parent.id
            })
        }
    }

}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('The server is up!')
})