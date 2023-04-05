import mongoose from "mongoose";
import {
    object,
    string,
} from "zod";

const getNoteSchema = object({
    params: object({
        noteId: string({
            required_error: "noteId is required!"
        }).refine(
            (noteId) => mongoose.isValidObjectId(noteId), 
            "noteId must be a valid id"
        )
    })
});

export default getNoteSchema;