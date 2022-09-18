import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import NoteForm from '../components/NoteForm';
import { GET_NOTE } from '../gql/query';

const EditNote = props => {
  const id = props.match.params.id;
  const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });

  if (loading) return 'Loading...';
  if (error) return <p>Error! Note not found</p>;
  if (userdata.me.id !== data.note.author.id) {
    return <p>You do not have access to edit this note</p>;
  }
  return <NoteForm content={data.note.content}></NoteForm>;
};

export default EditNote;
