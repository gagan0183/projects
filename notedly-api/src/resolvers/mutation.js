const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { AuthenticationError, ForbiddenError } = require("apollo-server-express");
const mongoose = require("mongoose");
require("dotenv").config()

const gravatar = require("../util/gravatar");

module.exports = {
    newNote: async (parent, args, { models, user  }) => {
        if (!user) {
            throw new AuthenticationError("User must be signed in to create note");
        }
        return await models.Note.create({
            content: args.content,
            author: mongoose.Types.ObjectId(user.id)
        });
    },
    deleteNote: async (parent, { id }, { models, user }) => {
        try {
            if (!user) {
                throw new AuthenticationError("User must be signed in to delete note");
            }
            const note = await models.Note.findById(id);
            if (note && String(note.author) !== user.id) {
                throw new ForbiddenError("You don't have permission to delete the note");
            }
            await note.remove();
            return true;
        } catch (err) {
            return false;
        }
    },
    updateNote: async (parent, { content, id }, { models, user }) => {
        if (!user) {
            throw new AuthenticationError("User must be signed in to update the note");
        }
        const note = await models.Note.findById(id);
        if (note && String(note.author) !== user.id) {
            throw new ForbiddenError("You don't have permission to update the note");
        }
        return await models.Note.findOneAndUpdate({
            _id: id
        }, {
            $set: {
                content
            }
        }, {
            new: true
        });
    },
    signUp: async (parent, { username, email, password }, { models }) => {
        email = email.trim().toLowerCase();
        const hashed = await bcrypt.hash(password, 10);
        const avatar = gravatar(email);
        try {
            const user = await models.User.create({
                username,
                password: hashed,
                avatar,
                email,
            });
            return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        } catch (error) {
            console.log(error);
            throw new Error("Error creating accounts");
        }
    },
    signIn: async (parent, { username, email, password }, { models }) => {
        if (email) {
            email = email.trim().toLowerCase();
        }
        const user = await models.User.findOne({
            $or: [{ email }, { username }]
        });
        if (!user) {
            throw new AuthenticationError("Error signing in");
        }
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new AuthenticationError("Error signing in");
        }
        return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    },
    toggleFavorite: async (parent, { id }, { models, user }) => {
        if (!user) {
            throw new AuthenticationError();
        }
        let noteCheck = await models.Note.findById(id);
        const hasUser = noteCheck.favoritedBy.indexOf(user.id);

        if (hasUser >= 0) {
            return await models.Note.findByIdAndUpdate(
                id,
                {
                    $pull: {
                        favoritedBy: mongoose.Types.ObjectId(user.id)
                    },
                    $inc: {
                        favoriteCount: -1
                    }
                },
                {
                    new: true
                }
            );
        } else {
            return await models.Note.findByIdAndUpdate(
                id,
                {
                    $push: {
                        favoritedBy: mongoose.Types.ObjectId(user.id)
                    },
                    $inc: {
                        favoriteCount: 1
                    }
                },
                {
                    new: true
                }
            );
        }

    }
};
