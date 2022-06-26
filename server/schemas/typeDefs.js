// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
    type User {
        _id: ID
        username: String!
        email: String
        password: String
        savedBooks: [Book]
        
    }
    type Book {
        authors: String
        description: String
        bookId: ID
        image: String
        link: String
        Title: String
    }
    
    type Auth {
        token: ID!
        user: User
    }


    type Query {
        users: [User]
        books: [Book]
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(authors: [String!], description: String, title: String, bookId: String, image:String, link: String): User
        #Look into creating what's known as an input type to handle all of these parameters
        removeBook(bookId: ID): User
    }

    `;

// export the typeDefs
module.exports = typeDefs;