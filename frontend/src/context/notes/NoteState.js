// import React, { useState } from "react";
// import noteContext from "./noteContext";

// const NoteState = (props) => {
//   const host = "http://localhost:5000";
//   const notesinitial = [];
//   const [notes, setNotes] = useState(notesinitial);
// //  const [notes, setNotes] = useState([]);
//   //Get all notes

//   const getNotes = async () => {
//     //API call
    
//     const response = await fetch(`${host}/api/notes/fetchallnotes`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         "auth-token":localStorage.getItem("token"),
//       },
//     });
//     const json = await response.json();
//     console.log(json);
//     setNotes(json);
//     //       if (Array.isArray(json)) {
//     //     setNotes(json); // If backend returns a direct array
//     //   } else if (Array.isArray(json.notes)) {
//     //     setNotes(json.notes); // If backend returns { notes: [...] }
//     //   } else {
//     //     console.error("Unexpected notes response:", json);
//     //     setNotes([]); // fallback
//     //   }
//     // } catch (error) {
//     //   console.error("Error fetching notes:", error);
//     //   setNotes([]); // prevent crash
//     // }
//    };

//   //Add note
//  const addNote = async (title, description, tag) => {
//     //API call
//     const response = await fetch(`${host}/api/notes/addnote`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "auth-token":localStorage.getItem("token")
//       },
//       body: JSON.stringify({ title, description, tag }),
//     });

//     const note = await response.json();
//     setNotes(notes.concat(note)); //notes.concat return new array
//     // const json = response.json();
//     // console.log(json);
//   };



//   //Delete Note
//   const deleteNote = async (id) => {
//     //API call
//     const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         "auth-token":localStorage.getItem("token"),
//       },
//     });
//     // const json = response.json();
//     // console.log(json);
//     //delete note client
//     const newNotes = notes.filter((note) => {
//       return note._id !== id;
//     });
//     setNotes(newNotes);
//   };

//   //Edit Note
//   const editNote = async (id, title, description, tag) => {
//     //API call

//     const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         "auth-token":localStorage.getItem("token"),
//       },
//       body: JSON.stringify({ title, description, tag }),
//     });
//     console.log("updating note...");
//     // const json = response.json();
//     // console.log(json);

//     let newNote = JSON.parse(JSON.stringify(notes));
//     //For client side editing
//     for (let index = 0; index < newNote.length; index++) {
//       const element = newNote[index];
//       if (element._id === id) {
//         newNote[index].title = title;
//         newNote[index].description = description;
//         newNote[index].tag = tag;
//         break;
//       }
//     }
//     setNotes(newNote);
//   };

//   return (
//     <noteContext.Provider
//       value={{ notes, addNote, deleteNote, editNote, getNotes }}
//     >
//       {props.children}
//     </noteContext.Provider>
//   );
// };

// export default NoteState;

import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const [notes, setNotes] = useState([]);

  // GET NOTES
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    const json = await response.json();
    setNotes(json);
  };

  // ADD NOTE
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = await response.json();
    setNotes((prev) => prev.concat(note));
  };

  // DELETE NOTE
  const deleteNote = async (id) => {
    await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    setNotes((prev) => prev.filter((note) => note._id !== id));
  };

  // EDIT NOTE
  const editNote = async (id, title, description, tag) => {
    await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    setNotes((prev) =>
      prev.map((note) =>
        note._id === id
          ? { ...note, title, description, tag }
          : note
      )
    );
  };

  return (
    <NoteContext.Provider
      value={{ notes, getNotes, addNote, deleteNote, editNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
