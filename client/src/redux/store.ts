import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/app.slice';
import notesReducer from './slices/notes.slice';

const store = configureStore({
    reducer: {
        app: appReducer,
        notes: notesReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

// EXPORT DEFAULT STORE
export default store;