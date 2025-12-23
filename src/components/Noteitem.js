import React,{useContext} from "react";
import notecontext from "../context/notes/noteContext";
const Noteitem = (props) => {
  //destructring from Notes
  const context = useContext(notecontext);
  const {deleteNote} = context;//destructing
  const { note,updateNote } = props;

  return (
    <div className="col-md-4 col-sm-6 my-2">
      <div className="card h-100 shdow-sm border-0">
        <div className="card-body">
          <div className="d-flex align-item-center">
            <h5 className="card-title text-primary d-flex justify -content-between align-items-center">{note.title}</h5> 
            <i className="fa-solid fa-trash text-danger mx-3 cursor-pointer" onClick={()=>{deleteNote(note._id);alert("Deleted Successfully!!")}}></i>
            <i className="fa-solid fa-pen-to-square mx-3 text-warning cursor-pointer" onClick={()=>{updateNote(note)}}></i>
          </div>
        <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;


