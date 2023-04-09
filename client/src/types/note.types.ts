
export type INote = {
    _id: string;
    title: string;
    text: string;
    createdAt: string;
    updatedAt: string;
}

export interface NoteInput {
    title: string;
    text: string;
}