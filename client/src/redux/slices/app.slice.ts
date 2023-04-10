import {
    createSlice
} from "@reduxjs/toolkit";

export type IAppState = {
    showAddNoteModal: boolean,
    isAppLoading: boolean
};

const initialState: IAppState = {
    showAddNoteModal: false,
    isAppLoading: false,
};

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {

        showHideAddNoteModal: (state) => {
            state.showAddNoteModal = !state.showAddNoteModal;
        },

        setAppLoading: (state, action) => {
            state.isAppLoading = action.payload;
        }

    }
});

export const {
    showHideAddNoteModal,
    setAppLoading
} = appSlice.actions;

export default appSlice.reducer;