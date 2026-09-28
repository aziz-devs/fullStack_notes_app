const { Note } = require("../modules/Note");

// get all notes Controller frome the database and send it to the client side
async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({createdAt:-1}); // newest first 
    res.status(200).json(notes);
  
  } catch (error) {
    console.log("error in get all notes controller ", error);
    res.status(500).json({ message: "intenal server error " });
  }
}

// get note by id 

async function getNotebyId(req,res) {

  try {
    const {title,content}=req.body
     const getNote=await Note.findById( req.params.id ,{title,content});
     
     res.status(200).json(getNote);
  } catch (error) {
    console.log("error in get note by id controller " , error);
    res.status(500).json({message:"external server error"})
    
  }
  
}

// creating a new note in the database and send it to the client side

async function createNotes(req, res) {
  try {
    const { title, content } = req.body;
    console.log(req.body);
    const newNote = new Note({ title, content });

    await newNote.save();
    res.status(201).json({ "note created sccessfully": newNote });
  } catch (error) {
    console.log("erro in create note controller ", error);
    res.status(500).json({ message: "internal server  error" });
  }
}

// updating a note in the database and send it to the client side

async function updateNotes(req, res) {
  try {
    const { title, content } = req.body;

    const upadateNote = await Note.findByIdAndUpdate(req.params.id, {
      title,
      content,
    });

    if (!upadateNote)
      return res.status(404).json({ message: "note not found to update" });

    res.status(200).json({ "notes updated succussfully": upadateNote });
  } catch (error) {
    console.log("erro in upadate note controller ", error);
    res.status(500).json({ message: "internal server  error" });
  }
}

// deleting a note in the database and send it to the client side

async function deleteNotes(req, res) {
  try {
    const { title, content } = req.body;
    const deletedNote = await Note.findByIdAndDelete(req.params.id, {
      title,
      content,
    });
    if (!deletedNote)
      return res.status(404).json({ message: "note not found to delete" });
    res.status(200).json({ message: "your notes deleted successfully" });
  } catch (error) {
    console.log("error on delete controller",error);
    res.status(500).json({ message: "internal server  error" });
  }
}



module.exports = {
  getAllNotes,
  createNotes,
  updateNotes,
  deleteNotes,
  getNotebyId
};
