import {
    createSlice
} from "@reduxjs/toolkit";

export type IAppState = {
    showAddNoteModal: boolean,
};

const initialState: IAppState = {
    showAddNoteModal: true,
};

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {

        showHideAddNoteModal: (state) => {
            state.showAddNoteModal = !state.showAddNoteModal;
        },

    }
});

export const {
    showHideAddNoteModal
} = appSlice.actions;

export default appSlice.reducer;