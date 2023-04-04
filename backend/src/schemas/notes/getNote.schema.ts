import {
    object,
    string,
} from "zod";

const getNoteSchema = object({
    params: object({
        noteId: string({
            required_error: "noteId is required!"
        })
    })
});

export default getNoteSchema;