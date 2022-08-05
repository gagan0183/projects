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
    
    const fetchRecords = () => {
        fetchMore({
            variables: {
                cursor: data.noteFeed.cursor
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                return {
                    noteFeed: {
                        cursor: fetchMoreResult.noteFeed.cursor,
                        hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
                        notes: [
                            ...previousResult.noteFeed.notes,
                            ...fetchMoreResult.noteFeed.notes
                        ],
                        _typename: "noteFeed"
                    }
                };
            }
        })
    }

    return (
        <div>
            <NoteFeed notes={data.noteFeed.notes} />
            {data.noteFeed.hasNextPage && (
                <Button onClick={fetchRecords}>Load more</Button>
            )}
        </div>
    )
};

export default Home;
