import {
    NextFunction,
    Request,
    RequestHandler,
    Response,
} from "express";
import NoteModel from "../models/note.model";
import createHttpError from "http-errors";

// GET ALL NOTES CONTROLLER
export const getAllNotes: RequestHandler = async (
    req: Request, 
    res: Response,
    next: NextFunction 
) => {
    try {

        // .EXEC RETURNS A REAL PROMISE INSTANCE
        const notes = await NoteModel.find().exec();

        return res.status(200).json(notes);

    } catch (error) {
        next(error);
    }
}

// CREATE NOTE CONTROLLER
export const createNote: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {

        const {title, text} = req.body;

        const newNote = await NoteModel.create({
            title,
            text,
        });

        return res.status(201).json(newNote);

    } catch (error) {
        next(error);
    }

}

// GET NOTE CONTROLLER
export const getNote: RequestHandler = async (
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
export const updateNote: RequestHandler = async (
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
export const deleteNote: RequestHandler = async (
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

        return res.status(200).json({
            message: "Note deleted!"
        })

    } catch (error) {
        next(error);
    }
}