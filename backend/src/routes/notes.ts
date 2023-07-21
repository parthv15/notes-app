import * as NoteHandler from "../controllers/notes";
import express from "express";

const router = express.Router();

router.get("/", NoteHandler.getNotes);
router.get("/:noteId", NoteHandler.getNote);
router.post("/", NoteHandler.createNote);
router.patch("/:noteId", NoteHandler.updateNote);
router.delete("/:noteId", NoteHandler.deleteNote);

export default router;
