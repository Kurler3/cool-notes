import mongoose from "mongoose";
import {
    object,
    string,
} from "zod";

export const noteIdParams = {
    params: object({
        noteId: string({
            required_error: "noteId is required!"
        }).refine(
            (noteId) => mongoose.isValidObjectId(noteId), 
            "noteId must be a valid id"
        )
    })
};

const getNoteSchema = object(noteIdParams);

export default getNoteSchema;