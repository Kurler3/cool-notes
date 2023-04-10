import { RootState } from "../store";


export const getShowAddNoteModal = (state: RootState) => state.app.showAddNoteModal;

export const getIsAppLoading = (state: RootState) => state.app.isAppLoading;

export const getEditingNote = (state: RootState) => state.app.editingNote;