import { Router } from "express";

import { createNote, deleteNote, getNote, getNotes, updateNote } from "../controllers/noteController.js";

const router = Router();

router.get('/', getNotes);
router.get('/:id', getNote);
router.post('/', createNote);
router.delete('/:id', deleteNote);
router.patch('/:id', updateNote);

export default router;
