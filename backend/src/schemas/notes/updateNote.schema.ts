
import { object } from "zod";
import { noteIdParams } from "./getDeleteNote.schema";
import { titleTextBody } from "./createNote.schema";


const updateNodeSchema = object({
    ...noteIdParams,
    ...titleTextBody,
});

export default updateNodeSchema;