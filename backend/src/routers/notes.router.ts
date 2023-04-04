import express from "express";
import * as NotesController from "../controllers/notes.controller";
import validate from "../middleware/validateResource.middleware";
import createNoteSchema from "../schemas/notes/createNote.schema";
import getNoteSchema from "../schemas/notes/getNote.schema";

////////////////////////////////////
// INIT NOTES ROUTER ///////////////
////////////////////////////////////

const notesRouter = express.Router();

////////////////////////////////////
// GET ROUTES //////////////////////
////////////////////////////////////

notesRouter.get("/list", NotesController.getAllNotes);

notesRouter.get("/get/:noteId", validate(getNoteSchema), NotesController.getNote);

////////////////////////////////////
// POST ROUTES /////////////////////
////////////////////////////////////

notesRouter.post("/create", validate(createNoteSchema), NotesController.createNote);

////////////////////////////////////
// EXPORT ROUTER ///////////////////
////////////////////////////////////

export default notesRouter;

