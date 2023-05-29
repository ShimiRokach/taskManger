import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from './slices/authSlice';
import { usersApiSlice } from './apis/usersApiSlice';


export const store = configureStore({
    reducer: {
        [usersApiSlice.reducerPath]: usersApiSlice.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(usersApiSlice.middleware),
    devTools: true,
});

setupListeners(store.dispatch);

export {
    useLoginMutation,
    useRegisterMutation
} from './apis/usersApiSlice';