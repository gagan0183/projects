const express = require("express");
require("dotenv").config();
const { ApolloServer } = require("apollo-server-express");
const depthLimit = require("graphql-depth-limit");
const { createComplexityLimitRule } = require("graphql-validation-complexity");
const app = express();
const models = require("./models");
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 4000;
const helmet = require("helmet");
const cors = require("cors");

app.use(helmet());
app.use(cors());

const db = require("./db");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const DB_HOST = process.env.DB_HOST;
db.connect(DB_HOST);

app.get("/", (req, res) => {
    res.send("Hello world");
});

const getUser = token => {
    if (token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            throw new Error("Session invalid");
        }
    }
};

const server = new ApolloServer({ typeDefs, resolvers, validationRules: [depthLimit(5), createComplexityLimitRule(1000)], context: ({ req }) => {
        const token = req.headers.authorization;
        const user = getUser(token);
        console.log("user", user);
        return { models, user };
    }
});

server.applyMiddleware({ app, path: "/api" });

app.listen(port, () => console.log(`GraphQL Server running at http://localhost:${port}${server.graphqlPath}`));
