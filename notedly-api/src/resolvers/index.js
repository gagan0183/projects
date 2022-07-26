const Query = require("./query");
const Mutation = require("./mutation");
const { GraphQLDateTime } = require("graphql-iso-date");
const Note = require("../resolvers/note");
const User = require("../resolvers/user");

module.exports = {
    Query,
    Mutation,
    Note,
    User,
    DateTime: GraphQLDateTime
}
