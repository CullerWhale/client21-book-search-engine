const { User, Book } = require('../models');

const resolvers = {
    Query: {
        users: async () => {
            return User.find({});
        },

        books: async () => {
            return Book.find({});
        },

        me: async (parent, args, context) => {
            return User.findOne({ _id: context.user._id });
        }
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },

        saveBook: async (parent, args, context) => {
            return User.findOneAndUpdate(
                {_id: context.user._id },
                { $push: {savedBooks: args }},
                { new: true }
            )
        },

        removeBook: async (parent, args, context) => {
            return User.findOneAndUpdate(
                {_id: context.user._id },
                { $pull: {savedBooks: {_id: args.bookId } }},
                { new: true }
            )
        }

    }
};

module.exports = resolvers;

