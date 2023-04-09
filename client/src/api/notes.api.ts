import axios from "axios";
import {
    INote, NoteInput
} from "../types/note.types";

export class NotesApi {

    // GET NOTES METHOD
    static async getNotes():Promise<INote[]> {
        return axios.get("http://localhost:5000/api/notes/list")
        .then((res) => res.data);
    } 

    // CREATE NOTE METHOD
    static async createNote(newNote: NoteInput): Promise<INote> {
       const createResult = await axios.post(
            "http://localhost:5000/api/notes/create", 
            newNote
        );
       
       return createResult.data;
    }

}