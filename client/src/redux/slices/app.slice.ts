import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit";
import { INote } from "../../types/note.types";
import { IUser } from "../../types/users.types";
import { UsersApi } from "../../api/users.api";


////////////////////////////////////////
// ASYNC ACTIONS ///////////////////////
////////////////////////////////////////

export const fetchLoggedInUser = createAsyncThunk("app/fetchLoggedInUser", async () => {
    return await UsersApi.getLoggedInUser();
})

////////////////////////////////////////
// STATE  //////////////////////////////
////////////////////////////////////////

export type IAppState = {
    showAddNoteModal: boolean;
    showSignUpLoginModal: boolean;
    isLogin: boolean;
    isAppLoading: boolean;
    editingNote: INote | null;
    user: IUser | null;
};

const initialState: IAppState = {
    showAddNoteModal: false,
    isAppLoading: false,
    editingNote: null,
    showSignUpLoginModal: false,
    isLogin: false,
    user: null,
};

///////////////////////////////////////
// SLICE //////////////////////////////
///////////////////////////////////////

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
        },
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => {

        builder
        .addCase(fetchLoggedInUser.pending, (state) => {
            state.isAppLoading = true;
        })
        .addCase(fetchLoggedInUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isAppLoading = false;
        })
        .addCase(fetchLoggedInUser.rejected, (state, action) => {
            state.isAppLoading = false;
        })
    }
});

///////////////////////////////////////
// EXPORT ACTIONS /////////////////////
///////////////////////////////////////

export const {
    showHideAddEditNoteModal,
    setAppLoading,
    setEditingNote,
    showHideSignUpLoginModal,
    setUser,
    setIsLogin
} = appSlice.actions;

///////////////////////////////////////
// EXPORT REDUCER /////////////////////
///////////////////////////////////////

export default appSlice.reducer;