import { createSlice, createAsyncThunk, ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { NotesApi } from '../../api/notes.api';
import { INote } from '../../types/note.types';

export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
  return await NotesApi.getNotes();
});

interface NotesState {
    notes: INote[] | null,
    fetchNotesError: null | string | undefined;
    loadingNotes: boolean;
    editingNote: INote | null;
}

const initialState: NotesState = {
    notes: null,
    fetchNotesError: null,
    loadingNotes: true,
    editingNote: null,
}

const notesSlice = createSlice({
  name: 'notes',
  initialState: initialState,
  reducers: {
    addNote: (state, action) => {

      state.notes?.unshift(action.payload);

    },
    removeNote: (state, action) => {

      state.notes = state.notes!.filter((note) => note._id !== action.payload);

    },
    setEditingNote: (state, action) => {
      state.editingNote = action.payload;
    },  
    updateNote: (state, action) => {

      // FIND INDEX
      const indexToSubstitute = state.notes!.findIndex((note) => note._id === action.payload._id);

      // SUBSTITUTE
      state.notes![indexToSubstitute] = action.payload;

    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.loadingNotes = true;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.notes = action.payload;
        state.loadingNotes = false;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loadingNotes = false;
        state.fetchNotesError = action.error.message;
      });
  },
});

export const {
  addNote,
  removeNote,
  updateNote,
  setEditingNote
} = notesSlice.actions;

export default notesSlice.reducer;
