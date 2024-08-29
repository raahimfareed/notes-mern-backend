import { Request, Response } from "express";
import Note from "../models/Note";
import mongoose from "mongoose";

// get all notes
export const getNotes = async (request: Request, response: Response) => {
  const notes = await Note.find({}).sort({ createdAt: -1 });

  response.status(200).json(notes)
}

// get a single note
export const getNote = async (request: Request, response: Response) => {
  const { id } = request.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({
      error: "Note not found"
    })
  }

  const note = await Note.findById(id);

  if (!note) {
    return response.status(404).json({
      error: "Note not found"
    })
  }

  response.status(200).json(note);
}

// create a new note
export const createNote = async (request: Request, response: Response) => {
  const { title, body } = request.body;

  // Add document to database
  try {
    const note = await Note.create({
      title,
      body
    });
    response
      .status(200)
      .json(note);
  } catch (error) {
    console.error("Unable to make note")
    console.error(error);
    response
      .status(400)
      //@ts-ignore
      .json({ message: error.message })
  }
}

// delete a note
export const deleteNote = async (request: Request, response: Response) => {
  const { id } = request.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({
      error: "Note not found"
    })
  }

  const note = await Note.findOneAndDelete({ _id: id });

  if (!note) {
    return response.status(400).json({
      error: "Note not found"
    })
  }

  response.status(200).json(note);
}

// update a note
export const updateNote = async (request: Request, response: Response) => {
  const { id } = request.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return response.status(404).json({
      error: "Note not found"
    })
  }
  
  const note = await Note.findOneAndUpdate({ _id: id }, {
    ...request.body
  });

  if (!note) {
    return response.status(400).json({
      error: "Note not found"
    })
  }

  response.status(200).json(note);
}
