import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { NotesApi } from '../../api/notes.api';
import { INote } from '../../types/note.types';

export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
  return await NotesApi.getNotes();
});

interface NotesState {
    notes: INote[] | null,
    error: null | string | undefined;
    loading: boolean;
}

const initialState: NotesState = {
    notes: null,
    error: null,
    loading: true,
}

const notesSlice = createSlice({
  name: 'notes',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.notes = action.payload;
        state.loading = false;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default notesSlice.reducer;