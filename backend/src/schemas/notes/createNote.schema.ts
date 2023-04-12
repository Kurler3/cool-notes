import {
    object, string
} from "zod";

export const titleTextBody = {
    body: object({
        title: string({
            required_error: "Title is required!",
        }),
        text: string({
            required_error: "Text is required!"
        }),
    })
};

const createNoteSchema = object(titleTextBody);

export default createNoteSchema;