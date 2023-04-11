import {
    createSlice
} from "@reduxjs/toolkit";
import { INote } from "../../types/note.types";

export type IAppState = {
    showAddNoteModal: boolean;
    showSignUpLoginModal: boolean;
    isLogin: boolean;
    isAppLoading: boolean;
    editingNote: INote | null;
};

const initialState: IAppState = {
    showAddNoteModal: false,
    isAppLoading: false,
    editingNote: null,
    showSignUpLoginModal: false,
    isLogin: false,
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
        },
        showHideSignUpLoginModal: (state) => {
            state.showSignUpLoginModal = !state.showSignUpLoginModal;
        },
        setIsLogin: (state, action) => {
            state.isLogin = action.payload;
        }
    }
});

export const {
    showHideAddEditNoteModal,
    setAppLoading,
    setEditingNote,
    showHideSignUpLoginModal
} = appSlice.actions;

export default appSlice.reducer;