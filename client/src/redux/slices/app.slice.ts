import {
    createSlice
} from "@reduxjs/toolkit";
import { INote } from "../../types/note.types";

export type IAppState = {
    showAddNoteModal: boolean;
    isAppLoading: boolean;
    editingNote: INote | null;
};

const initialState: IAppState = {
    showAddNoteModal: false,
    isAppLoading: false,
    editingNote: null,
};

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        showHideAddEditNoteModal: (state) => {
            state.showAddNoteModal = !state.showAddNoteModal;
        },
        setEditingNote: (state, action) => {
            state.editingNote = action.payload;
        },   
        setAppLoading: (state, action) => {
            state.isAppLoading = action.payload;
        }
    }
});

export const {
    showHideAddEditNoteModal,
    setAppLoading,
    setEditingNote
} = appSlice.actions;

export default appSlice.reducer;