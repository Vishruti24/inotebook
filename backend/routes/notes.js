const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');


//Router 1: Get all the notes GET"/api/notes/fetchallnotes  login required
router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    try {
    const notes = await Notes.find({user:req.user.id})
    res.json(notes)
   
    } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
    }
})


//Router 2: Add a new note POST "/api/notes/addnote"  login required
router.post('/addnote',fetchuser,[
  body('title', 'Enter a valid title').isLength({ min: 3 }),               //validation
  body('description', 'Desc atleast 5 characters').isLength({ min: 5 }),
], async (req,res)=>{
    try {
    const{title,description,tag} = req.body;  //destructing
    //validation
   const errors = validationResult(req);  
   if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const note = new Notes({
    title,description,tag, 
    user : req.user.id
  })
  const saveNotes = await note.save()
    res.json(saveNotes)

    } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
    }
})


// Route 3: Update existing note - PUT "/api/notes/updatenote/:id" - Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body; //destructing

    // Create a newNote object
    const newNote ={};                      //validation
    if (title) {newNote.title = title};
    if (description) {newNote.description = description};
    if (tag) {newNote.tag = tag};
    

    try {
        // Find the note to be updated
         let note = await Notes.findById(req.params.id);
        if (!note) {return res.status(404).send("Note not found")};
 
        // Allow update only if the user owns this note
        if (!note.user || note.user.toString() !== req.user.id) {
        return res.status(401).send("Unauthorized");
         }
         
        // Update the note
         note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
         res.json({note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 4: Update existing note - DELETE "/api/notes/deletenote/:id" - Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    
    try {
        // Find the note to be updated deleted
         let note = await Notes.findById(req.params.id);
        if (!note) {return res.status(404).send("Note not found")};
 
        // Allow delete only if the user owns this note
        if (!note.user || note.user.toString() !== req.user.id) {
        return res.status(401).send("Unauthorized");
        }
         
        // delete the note
         note = await Notes.findByIdAndDelete(req.params.id);
         res.json({ message: "Deleted successfully" });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


module.exports=router
