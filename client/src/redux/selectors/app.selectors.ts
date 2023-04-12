import { RootState } from "../store";


export const getShowAddNoteModal = (state: RootState) => state.app.showAddNoteModal;

export const getIsAppLoading = (state: RootState) => state.app.isAppLoading;

export const getEditingNote = (state: RootState) => state.app.editingNote;

export const getShowSignUpLoginModal = (state: RootState) => state.app.showSignUpLoginModal;

export const getAuthenticatedUser = (state:RootState) => state.app.user;

export const getIsLogin = (state: RootState) => state.app.isLogin;