import mongoose, { InferSchemaType } from "mongoose";

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
    },
}, {
    timestamps: true,
});

type INote = InferSchemaType<typeof noteSchema>;

const NoteModel = mongoose.model<INote>("Note", noteSchema);
 
export default NoteModel;