import express from "express";
import * as NotesController from "../controllers/notes.controller";
import validate from "../middleware/validateResource.middleware";
import createNoteSchema from "../schemas/notes/createNote.schema";
import getDeleteNoteSchema from "../schemas/notes/getDeleteNote.schema";
import updateNodeSchema from "../schemas/notes/updateNote.schema";

////////////////////////////////////
// INIT NOTES ROUTER ///////////////
////////////////////////////////////

const notesRouter = express.Router();

////////////////////////////////////
// GET ROUTES //////////////////////
////////////////////////////////////

notesRouter.get("/list", NotesController.getAllNotesController);

notesRouter.get("/get/:noteId", validate(getDeleteNoteSchema), NotesController.getNoteController);

////////////////////////////////////
// POST ROUTES /////////////////////
////////////////////////////////////

notesRouter.post("/create", validate(createNoteSchema), NotesController.createNoteController);

////////////////////////////////////
// PATCH ROUTES ////////////////////
////////////////////////////////////

notesRouter.patch("/update/:noteId", validate(updateNodeSchema), NotesController.updateNoteController);

////////////////////////////////////
// DELETE ROUTES ///////////////////
////////////////////////////////////

notesRouter.delete("/delete/:noteId", validate(getDeleteNoteSchema), NotesController.deleteNoteController);

////////////////////////////////////
// EXPORT ROUTER ///////////////////
////////////////////////////////////

export default notesRouter;

