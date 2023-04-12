import { RootState } from "../store";

export const getNotesState = (state: RootState) => state.notes;

export const getNotes = (state: RootState) => state.notes.notes;

export const getFetchNotesError = (state: RootState) => state.notes.fetchNotesError;

export const getLoadingNotes = (state: RootState) => state.notes.loadingNotes;

export const getEditingNote = (state: RootState) => state.notes.editingNote;