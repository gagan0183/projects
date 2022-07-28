import React from "react";
import {gql, useQuery} from "@apollo/client";
import ReactMarkdown from "react-markdown";

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
            {data.noteFeed.notes.map(note => (
                <article key={note.id}>
                    <img src={note.author.avatar} alt={`${note.author.username} avatar`} height="50px" />{' '}
                    {note.author.username} {note.createdAt} {note.favoriteCount}{' '}
                    <ReactMarkdown source={note.content}/>
                </article>
            ))}
            <p>This is the home page</p>
        </div>
    )
};

export default Home;
