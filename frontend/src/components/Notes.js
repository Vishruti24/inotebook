// import React, { useContext, useEffect, useRef, useState } from "react";
// import notecontext from "../context/notes/noteContext";
// import Noteitem from "./Noteitem";
// import AddNote from "./AddNote";
// import { useNavigate } from "react-router-dom";

// const Notes = () => {
//   const context = useContext(notecontext);
//   const { notes, getNotes, editNote } = context; //destructing
//   const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

//   let navigate = useNavigate();
//   useEffect(() => {
//     if (localStorage.getItem("token")) {
//       getNotes();
//     }
//     else {
//       navigate("/login")
//     }
//   }, []);


//   const ref = useRef(null);
//   const refClose = useRef(null);
//   const updateNote = (currentnote) => {
//     ref.current.click();
//     setNote({
//       etitle: currentnote.title,
//       edescription: currentnote.description,
//       etag: currentnote.tag,
//       id: currentnote._id,
//     });
//   };


//   const handleClick = async (e) => {
//     await editNote(note.id, note.etitle, note.edescription, note.etag);
//     refClose.current.click();
//     alert("Updated successfully!!")
//   };

//   const onChange = (e) => {
//     setNote({ ...note, [e.target.name]: e.target.value });
//   };
 
//   return (
//     <>
//       <AddNote />

//       <button
//         ref={ref}
//         type="button"
//         className="btn btn-primary d-none"
//         data-bs-toggle="modal"
//         data-bs-target="#exampleModal"
//       >
//         Launch demo modal
//       </button>

//       <div
//         className="modal fade"
//         id="exampleModal"
//         tabIndex="-1"
//         aria-labelledby="exampleModalLabel"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header bg-primary text-white">
//               <h1 className="modal-title fs-5" id="exampleModalLabel">
//                 Edit Note
//               </h1>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               ></button>
//             </div>
//             <div className="modal-body">
//               {/* form */}
//               <form className="my-3">
//                 <div className="mb-3">
//                   <label htmlFor="etitle" className="form-label">
//                     Title
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="etitle"
//                     name="etitle"
//                     value={note.etitle}
//                     aria-describedby="emailHelp"
//                     onChange={onChange}
//                     minLength={5} required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlfor="edescription" className="form-label">
//                     Description
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="edescription"
//                     name="edescription"
//                     value={note.edescription}
//                     onChange={onChange}
//                     minLength={5} required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlfor="etag" className="form-label">
//                     Tag
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="etag"
//                     name="etag"
//                     value={note.etag}
//                     onChange={onChange}
//                   />
//                 </div>
//               </form>
//             </div>
//             <div className="modal-footer">
//               <button ref={refClose}
//                 type="button"
//                 className="btn btn-secondary"
//                 data-bs-dismiss="modal"
//               >
//                 Close
//               </button>
//               <button
//                 disabled={note.etitle.length < 5 || note.edescription.length < 5}
//                 onClick={handleClick}
//                 type="button"
//                 className="btn btn-primary"
//               >
//                 Update Note
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="row my-3">
//         <h1 className="text-secondary my-4">Your Notes</h1>
//         <div className="container mx-2">
//           {notes.length === 0 && <p>' No notes to display'</p>}
//         </div>
//         { notes.map((note) => (
//             <Noteitem key={note._id} updateNote={updateNote} note={note} />
//            //props to items
//         ))}
        
//       </div>
//     </>
//   );
// };

// export default Notes;

import React, { useContext, useEffect, useRef, useState } from "react";
import notecontext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const context = useContext(notecontext);
  const { notes, getNotes, editNote } = context;

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const navigate = useNavigate();

  /* 🔹 FIX 1: add dependencies OR disable eslint safely */
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (currentnote) => {
    ref.current.click();
    setNote({
      id: currentnote._id,
      etitle: currentnote.title,
      edescription: currentnote.description,
      etag: currentnote.tag,
    });
  };

  const handleClick = async () => {
    await editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    alert("Updated successfully!!");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote />

      {/* Hidden button to trigger modal */}
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch modal
      </button>

      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>

                <div className="mb-3">
                  {/* 🔹 FIX 2: htmlFor (React uses camelCase) */}
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>

              <button
                disabled={
                  note.etitle.length < 5 || note.edescription.length < 5
                }
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notes list */}
      <div className="row my-3">
        <h2 className="text-secondary my-4">Your Notes</h2>

        <div className="container mx-2">
          {/* 🔹 FIX 3: remove extra quotes */}
          {notes.length === 0 && <p>No notes to display</p>}
        </div>

        {notes.map((note) => (
          <Noteitem
            key={note._id}
            updateNote={updateNote}
            note={note}
          />
        ))}
      </div>
    </>
  );
};

export default Notes;

