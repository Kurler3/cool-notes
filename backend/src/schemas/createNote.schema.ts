import {
    object, string
} from "zod";

const createNoteSchema = object({
    body: object({
        title: string({
            required_error: "Title is required!",
        }),
        text: string({
            required_error: "Text is required!"
        })
    })
});

export default createNoteSchema;