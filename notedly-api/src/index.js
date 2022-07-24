const express = require("express");
require("dotenv").config();
const { ApolloServer } = require("apollo-server-express");
const app = express();
const models = require("./models");
const port = process.env.PORT || 4000;

const db = require("./db");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const DB_HOST = process.env.DB_HOST;
db.connect(DB_HOST);

app.get("/", (req, res) => {
    res.send("Hello world");
});

const server = new ApolloServer({ typeDefs, resolvers, context: () => {
        return { models };
    }
});

server.applyMiddleware({ app, path: "/api" });

app.listen(port, () => console.log(`GraphQL Server running at http://localhost:${port}${server.graphqlPath}`));
