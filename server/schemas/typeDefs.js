// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        savedBooks: [Book]
        
    }
    type Book {
        _id: ID
        authors: String
        description: String
        bookId: String
        image: String
        link: String
        Title: String
    }
    
    type Query {
        users: [User]
        books: [Book]
    }
    

    `;

// export the typeDefs
module.exports = typeDefs;