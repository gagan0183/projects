import React from "react";
import ReactDOM from "react-dom";
import Pages from "./pages";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import GlobalStyle from "./components/GlobalStyle";

const uri = process.env.API_URI;
const cache = new InMemoryCache();

const client = new ApolloClient({
    uri,
    cache,
    headers: {
        "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZGZmZjA5ZTI3NmQxOGQ0NWY3YTEzZiIsImlhdCI6MTY1ODg0Njk4NX0.pADUE_8LcdlCxb5awBTYS4BZV3wcby0n1y5zBb5jSbA"
    },
    connectToDevTools: true
});

const App = () => {
    return (
        <ApolloProvider client={client}>
            <GlobalStyle />
            <Pages />
        </ApolloProvider>
    )
};

ReactDOM.render(<App />, document.getElementById("root"));
