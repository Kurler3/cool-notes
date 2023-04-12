import {
    NextFunction,
    Request,
    RequestHandler,
    Response,
} from "express";
import NoteModel from "../models/note.model";
import createHttpError from "http-errors";
import { createNote, findNotes } from "../services/notes.service";

// GET ALL NOTES CONTROLLER
export const getAllNotesController: RequestHandler = async (
    req: Request, 
    res: Response,
    next: NextFunction 
) => {
    try {

        // FIND USER NOTES
        const notes = await findNotes({userId: res.locals.userId});

        return res.status(200).json(notes);

    } catch (error) {
        next(error);
    }
}

// CREATE NOTE CONTROLLER
export const createNoteController: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {

        const {title, text} = req.body;

        const newNote = await createNote({
            title,
            text,
            userId: res.locals.userId,
        });

        return res.status(201).json(newNote);

    } catch (error) {
        next(error);
    }

}

// GET NOTE CONTROLLER
export const getNoteController: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const noteId = req.params.noteId;
    
    try {

        const note = await NoteModel.findById(noteId).exec();
        
        if(!note) {
            throw createHttpError(
                404,
                "Note not found!"
            )
        }

        return res.status(200).json(note);

    } catch (error) {
        next(error);
    }

}

// UPDATE NOTE CONTROLLER
export const updateNoteController: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {

    const noteId = req.params.noteId;

    const {
        title,
        text
    } = req.body;

    // NEED AT LEAST 1 PARAMETER TO UPDATE
    if(!title && !text) {
        throw createHttpError(400, "Need to update at least one field: title or text")
    }

    try {
        
        const note = await NoteModel.findById(noteId);

        if(!note) {
            throw createHttpError(404, "Note not found!");
        }

        if(title) {
            note.title = title;
        }

        if(text) {
            note.text = text;
        }

        const updatedNote = await note.save();

        return res.status(200).json(updatedNote);

    } catch (error) {
        next(error);
    }
}

// DELETE NOTE CONTROLLER
export const deleteNoteController: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {

    // NOTE ID
    const noteId = req.params.noteId;

    try {
        
        const note = await NoteModel.findById(noteId);

        if(!note) {
            throw createHttpError(404, "Note not found!");
        }

        // FIND AND DELETE NOTE
        await note.deleteOne();

        return res.sendStatus(204)

    } catch (error) {
        next(error);
    }
}