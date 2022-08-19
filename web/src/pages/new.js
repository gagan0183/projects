import React, { useEffect } from "react";
import NoteForm from "../components/NoteForm";

const NewNote = props => {
    useEffect(() => {
       document.title = "New note - notedly";
    });

    return <NoteForm />
};

export default NewNote;
