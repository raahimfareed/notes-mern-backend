import Note from "../models/Note.js";
import mongoose from "mongoose";

// get all notes
export const getNotes = async (req, res) => {
  const notes = await Note.find({}).sort({ createdAt: -1 });

  res.status(200).json(notes)
}

// get a single note
export const getNote = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      error: "Note not found"
    })
  }

  const note = await Note.findById(id);

  if (!note) {
    return res.status(404).json({
      error: "Note not found"
    })
  }

  res.status(200).json(note);
}

// create a new note
export const createNote = async (req, res) => {
  const { title, body } = req.body;

  // Add document to database
  try {
    const note = await Note.create({
      title,
      body
    });
    res
      .status(200)
      .json(note);
  } catch (error) {
    console.error("Unable to make note")
    console.error(error);
    res
      .status(400)
      .json({ message: error.message })
  }
}

// delete a note
export const deleteNote = async (req, res) => {
  res.json({
    message: "Deleting a note"
  });
}

// update a note
export const updateNote = async (req, res) => {
  res.json({
    message: "Updating a note"
  });
}
