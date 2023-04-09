import { FilterQuery } from "mongoose";
import NoteModel, { INote } from "../models/note.model";


export const findNotes = async (
    query?: FilterQuery<INote>
) => {
    return await NoteModel.find(query ?? {}).sort({createdAt: -1}).exec();
}

export const findNote = async(
    query?: FilterQuery<INote>
) => {
    return await NoteModel.findOne(query ?? {}).exec();
}

export const createNote = async(newNote: {
    title: string;
    text: string;
} ) => {
    return await NoteModel.create(newNote);
}