const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt } = require('graphql');
const Book = require('../models/book');
const Author = require('../models/author');

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        genre: { type: GraphQLString },
        title: { type: GraphQLString },
        authorId: { type: GraphQLID }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return books.filter(elem => elem.id == args.id)[0]
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return authors.filter(elem => elem.id == args.id)[0]
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt }
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                genre: { type: GraphQLString },
                title: { type: GraphQLString },
                authorId: {type: GraphQLID}
            },
            resolve(parent, args) {
                let book = new Book({
                    genre: args.genre,
                    title: args.title,
                    authorId: args.authorId
                });
                return book.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});