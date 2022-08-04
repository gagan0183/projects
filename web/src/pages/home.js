import React from "react";
import {gql, useQuery} from "@apollo/client";
import ReactMarkdown from "react-markdown";
import NoteFeed from "../components/NoteFeed";

const GET_NOTES = gql`
    query noteFeed($cursor: String!) {
        noteFeed(cursor: $cursor) {
            cursor
            hasNextPage
            notes {
                id
                createdAt
                content
                author {
                    username
                    id
                    avatar
                }
            }
        }
    }
`

const Home = () => {
    const { data, loading, error, fetchMore } = useQuery(GET_NOTES, {
        variables: { cursor: "62e023fe53bf199d607afe16" }
    });

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error!</p>;
    }

    return (
        <div>
            <NoteFeed notes={data.noteFeed.notes} />
        </div>
    )
};

export default Home;
