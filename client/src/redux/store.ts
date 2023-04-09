import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/app.slice';


const store = configureStore({
    reducer: {
        app: appReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

// EXPORT DEFAULT STORE
export default store;