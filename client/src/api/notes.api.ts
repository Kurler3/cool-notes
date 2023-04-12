import axios from "axios";
axios.defaults.withCredentials = true;
import {
    INote, NoteInput
} from "../types/note.types";

export class NotesApi {

    static BASE_URL = "http://localhost:5000/api/notes";

    // GET NOTES METHOD
    static async getNotes():Promise<INote[]> {
        return axios.get(`${this.BASE_URL}/list`)
        .then((res) => res.data);
    } 

    // CREATE NOTE METHOD
    static async createNote(newNote: NoteInput): Promise<INote> {
       const createResult = await axios.post(
            `${this.BASE_URL}/create`, 
            newNote
        );
       
       return createResult.data;
    }

    static async deleteNote(noteId: string): Promise<void> {
        await axios.delete(`${this.BASE_URL}/delete/${noteId}`);
    }

    static async updateNote(noteId: string, updatedNote: NoteInput): Promise<INote> {
        const note = await axios.patch(`${this.BASE_URL}/update/${noteId}`, updatedNote);
        return note.data;
    }

}