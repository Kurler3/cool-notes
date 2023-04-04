import {
    NextFunction,
    Request,
    RequestHandler,
    Response,
} from "express";
import NoteModel from "../models/note.model";

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
        console.log("Note id: ", noteId)

        const note = await NoteModel.findById(noteId).exec();

        if(!note) {
            return res.status(404).json({
                error: 'Note not found!'
            })
        }

        return res.status(200).json(note);

    } catch (error) {
        next(error);
    }

}