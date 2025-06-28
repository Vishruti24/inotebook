import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  // const notesinitial = [];
  // const [notes, setNotes] = useState(notesinitial);
 const [notes, setNotes] = useState([]);
  //Get all notes

  const getNotes = async () => {
    //API call
    try{
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token")
      },
    });
    const json = await response.json();
    console.log(json);
    //setNotes(json);
          if (Array.isArray(json)) {
        setNotes(json); // If backend returns a direct array
      } else if (Array.isArray(json.notes)) {
        setNotes(json.notes); // If backend returns { notes: [...] }
      } else {
        console.error("Unexpected notes response:", json);
        setNotes([]); // fallback
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
      setNotes([]); // prevent crash
    }
   };

  //Add note
 const addNote = async (title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = await response.json();
    setNotes(notes.concat(note)); //notes.concat return new array
    // const json = response.json();
    // console.log(json);
  };



  //Delete Note
  const deleteNote = async (id) => {
    //API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token"),
      },
    });
    // const json = response.json();
    // console.log(json);
    //delete note client
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //Edit Note
  const editNote = async (id, title, description, tag) => {
    //API call

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    console.log("updating note...");
    // const json = response.json();
    // console.log(json);

    let newNote = JSON.parse(JSON.stringify(notes));
    //For client side editing
    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index];
      if (element._id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        break;
      }
    }
    setNotes(newNote);
  };

  return (
    <noteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;



